package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.request.ActivityRequest;
import com.fellas.bespoke.controller.dto.response.ActivityResponse;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.ActivityRepository;
import com.fellas.bespoke.persistence.model.Activity;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityServiceImpl implements ActivityService {

    private static final String ACTIVITY = "Activity";
    private static final String CONTENT = "https://www.w3.org/ns/activitystreams";

    private ActivityRepository activityRepository;
    private ConfigurableConversionService smepConversionService;

    public ActivityServiceImpl(ActivityRepository activityRepository, ConfigurableConversionService smepConversionService) {
        this.activityRepository = activityRepository;
        this.smepConversionService = smepConversionService;
    }

    @Override
    public List<ActivityResponse> getAllActivities() {
        List<Activity> activities = activityRepository.findAll();
        return activities.stream().map(activity -> smepConversionService.convert(activity, ActivityResponse.class)).collect(Collectors.toList());
    }

    @Override
    public ActivityResponse createActivity(UserPrincipal currentUser, ActivityRequest activityRequest) {
        activityRequest.setContext(CONTENT);
        activityRequest.setPublished(new Timestamp(System.currentTimeMillis()));
        Activity activity =  activityRepository.save(smepConversionService.convert(activityRequest, Activity.class));
        return smepConversionService.convert(activity, ActivityResponse.class);
    }
}
