package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.ActivityRequest;
import com.fellas.bespoke.controller.dto.response.ActivityResponse;
import com.fellas.bespoke.persistence.model.Activity;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/activity")
public class ActivityController {
    private ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping(value = {"", "/"})
    public ResponseEntity<List<ActivityResponse>> getAllActivities(){
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @PostMapping
    public ResponseEntity<ActivityResponse> createActivity(@CurrentUser UserPrincipal currentUser,
                                                   @Valid @RequestBody ActivityRequest activityRequest){
        return ResponseEntity.ok(activityService.createActivity(currentUser, activityRequest));
    }
}
