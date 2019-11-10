package com.fellas.bespoke.service;

import com.fellas.bespoke.persistence.model.ActivityStream;

import java.util.List;

public interface ActivityStreamService {
    List<ActivityStream> getAllActivityStreams();
    ActivityStream createActivityStream(ActivityStream activityStream);
}
