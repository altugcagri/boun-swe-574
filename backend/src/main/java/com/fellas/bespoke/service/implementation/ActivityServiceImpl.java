package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.response.UserProfile;
import com.fellas.bespoke.persistence.ActivityRepository;
import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import com.fellas.bespoke.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityServiceImpl implements ActivityService {
    private ActivityRepository activityRepository;
    private UserService userService;

    public ActivityServiceImpl(ActivityRepository activityRepository, UserService userService) {
        this.activityRepository = activityRepository;
        this.userService = userService;
    }

    @Override
    public List<Activity> getAllActivities(UserPrincipal currentUser) {
        UserProfile currentUserProfile = userService.getUserProfileByUserId(currentUser.getId());
        List<Activity> allActivities = activityRepository.findAll();
        List<Activity> userActivities = allActivities.stream().filter(activity -> activity.getActivityContentType() == ActivityContentType.USER).collect(Collectors.toList());
        List<Activity> topicActivities = allActivities.stream().filter(activity -> activity.getActivityContentType() == ActivityContentType.TOPIC).collect(Collectors.toList());
        List<Activity> filteredActivities = new ArrayList<>();

        userActivities.forEach(userActivity -> currentUserProfile.getFollowedUsers().forEach(followedUser -> {
            if (followedUser.getId().equals(userActivity.getActor_id())){
                filteredActivities.add(userActivity);
            }
        }));

        topicActivities.forEach(topicActivity -> currentUserProfile.getEnrolledTopics().forEach(enrolledTopic -> {
            if (enrolledTopic.getId().equals(topicActivity.getActor_id())){
                filteredActivities.add(topicActivity);
            }
        }));

        return filteredActivities;
    }

    @Override
    public void createTopicActivityByUser(UserPrincipal currentUser, Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary) {
        ActivityStream activityStream = ActivityStream.builder()
                .summary(currentUser.getUsername() + " " + summary + " " + topic.getTitle())
                .type(activityStreamType)
                .actor("http://www.bespoke-domain.com/profile/" + currentUser.getUsername())
                .object("http://www.bespoke-domain.com/topic/view/" + topic.getId())
                .build();
        Activity activity = Activity.builder()
                .activityContentType(activityContentType)
                .activityStream(activityStream)
                .actor_id(currentUser.getId())
                .build();
        activityRepository.save(activity);
    }

    @Override
    public void createTopicActivityByTopic(Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary) {
        ActivityStream activityStream = ActivityStream.builder()
                .summary(topic.getTitle() + " " + summary)
                .type(activityStreamType)
                .actor("http://www.bespoke-domain.com/profile/" + topic.getTitle())
                .object("http://www.bespoke-domain.com/topic/view/" + topic.getId())
                .build();
        Activity activity = Activity.builder()
                .activityContentType(activityContentType)
                .activityStream(activityStream)
                .actor_id(topic.getId())
                .build();
        activityRepository.save(activity);
    }

    @Override
    public void signUpActivity(User user, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary) {
        ActivityStream activityStream = ActivityStream.builder()
                .summary(user.getUsername() + " " + summary)
                .type(activityStreamType)
                .actor("http://www.bespoke-domain.com/profile/" + user.getUsername())
                .object("http://www.bespoke-domain.com/user/view/" + user.getId())
                .build();
        Activity activity = Activity.builder()
                .activityContentType(activityContentType)
                .activityStream(activityStream)
                .actor_id(user.getId())
                .build();
        activityRepository.save(activity);
    }
}
