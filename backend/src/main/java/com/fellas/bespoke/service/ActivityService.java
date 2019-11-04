package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.ActivityRequest;
import com.fellas.bespoke.controller.dto.response.ActivityResponse;
import com.fellas.bespoke.security.UserPrincipal;

import java.util.List;

public interface ActivityService {
        List<ActivityResponse> getAllActivities();
        ActivityResponse createActivity(UserPrincipal currentUser, ActivityRequest activityRequest);
}
