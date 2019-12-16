package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.controller.dto.response.UserProfile;
import com.fellas.bespoke.controller.dto.response.UserSummary;
import com.fellas.bespoke.persistence.ActivityRepository;
import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import com.fellas.bespoke.service.UserService;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
    public List<Activity> getActivityStream(UserPrincipal currentUser) {

        final UserProfile currentUserProfile = userService.getUserProfileByUserId(currentUser.getId());

        final List<Long> followedUserIds = currentUserProfile.getFollowedUsers()
                .stream().map(UserSummary::getId).collect(Collectors.toList());

        final List<Long> enrolledTopicIds = currentUserProfile.getEnrolledTopics()
                .stream().map(TopicResponse::getId).collect(Collectors.toList());

        final List<ActivityWrapper> userActivities = activityRepository
                .findByActorIdInAndActivityContentType(followedUserIds, ActivityContentType.USER);

        final List<ActivityWrapper> topicActivities = activityRepository
                .findByActorIdInAndActivityContentType(enrolledTopicIds, ActivityContentType.TOPIC);

        final List<Activity> activityStream = new ArrayList<>();

        userActivities.forEach(userActivityWrapper -> activityStream.add(userActivityWrapper.getActivity()));

        topicActivities.forEach(topicActivityWrapper -> activityStream.add(topicActivityWrapper.getActivity()));

        return activityStream;
    }

    @Override
    public void createTopicActivityByUser(UserPrincipal currentUser, Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary) {
        Activity activity = Activity.builder()
                .summary(currentUser.getUsername() + " " + summary + " " + topic.getTitle())
                .type(activityStreamType)
                .actor("http://www.bespoke-domain.com/profile/" + currentUser.getUsername())
                .object("http://www.bespoke-domain.com/topic/view/" + topic.getId())
                .published(Instant.now())
                .build();
        ActivityWrapper activityWrapper = ActivityWrapper.builder()
                .activityContentType(activityContentType)
                .activity(activity)
                .actorId(currentUser.getId())
                .build();
        activityRepository.save(activityWrapper);
    }

    @Override
    public void createTopicActivityByTopic(Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary) {
        Activity activity = Activity.builder()
                .summary(topic.getTitle() + " " + summary)
                .type(activityStreamType)
                .actor("http://www.bespoke-domain.com/profile/" + topic.getTitle())
                .object("http://www.bespoke-domain.com/topic/view/" + topic.getId())
                .published(Instant.now())
                .build();
        ActivityWrapper activityWrapper = ActivityWrapper.builder()
                .activityContentType(activityContentType)
                .activity(activity)
                .actorId(topic.getId())
                .build();
        activityRepository.save(activityWrapper);
    }

    @Override
    public void signUpActivity(User user, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary) {
        Activity activity = Activity.builder()
                .summary(user.getUsername() + " " + summary)
                .type(activityStreamType)
                .actor("http://www.bespoke-domain.com/profile/" + user.getUsername())
                .object("http://www.bespoke-domain.com/user/view/" + user.getId())
                .published(Instant.now())
                .build();
        ActivityWrapper activityWrapper = ActivityWrapper.builder()
                .activityContentType(activityContentType)
                .activity(activity)
                .actorId(user.getId())
                .build();
        activityRepository.save(activityWrapper);
    }
}
