package com.fellas.bespoke.service;

import com.fellas.bespoke.persistence.model.ActivityContentType;
import com.fellas.bespoke.persistence.model.ActivityStreamType;
import com.fellas.bespoke.persistence.model.Topic;
import com.fellas.bespoke.security.UserPrincipal;

public interface ActivityService {
    void createTopicActivityByUser(UserPrincipal currentUser, Topic topic, ActivityContentType activityContentType, ActivityStreamType activityStreamType, String summary);
}
