package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.persistence.ActivityRepository;
import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {
    private ActivityRepository activityRepository;

    public ActivityServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public List<Activity> getAllActivities() {
        // toDo - will be filtered according to followedUsers and enrolledTopicList
        List<Activity> filteredActivities = new ArrayList<>();



        return activityRepository.findAll();
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
