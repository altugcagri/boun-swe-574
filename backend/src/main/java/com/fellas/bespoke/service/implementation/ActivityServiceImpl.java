package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.persistence.ActivityRepository;
import com.fellas.bespoke.persistence.model.Activity;
import com.fellas.bespoke.persistence.model.ActivityContentType;
import com.fellas.bespoke.persistence.model.ActivityStream;
import com.fellas.bespoke.persistence.model.Topic;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService {
    private ActivityRepository activityRepository;

    public ActivityServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public void createActivity(UserPrincipal currentUser, Topic topic, ActivityContentType activityContentType) {
        ActivityStream activityStream = ActivityStream.builder()
                .summary(currentUser.getUsername() + " created a new topic: " + topic.getTitle())
                .type("Create")
                .actor("http://www.bespoke-domain.com/profile/" + currentUser.getUsername())
                .object("http://www.bespoke-domain.com/topic/view/" + topic.getId())
                .build();
        Activity activity = Activity.builder()
                .activityContentType(activityContentType)
                .activityStream(activityStream.toString())
                .actor_id(currentUser.getId())
                .build();
        activityRepository.save(activity);
    }
}
