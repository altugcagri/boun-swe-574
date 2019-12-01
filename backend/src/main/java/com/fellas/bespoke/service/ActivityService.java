package com.fellas.bespoke.service;

import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;

import java.util.List;

public interface ActivityService {
    void createTopicActivityByUser(UserPrincipal currentUser, Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary);
    void createTopicActivityByTopic(Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary);
    void signUpActivity(User user, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary);
    List<Activity> getAllActivities(UserPrincipal currentUser);
}
