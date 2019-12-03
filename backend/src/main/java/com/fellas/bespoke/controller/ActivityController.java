package com.fellas.bespoke.controller;

import com.fellas.bespoke.persistence.model.Activity;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {
    private ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<Activity>> getActivityStream(@CurrentUser UserPrincipal currentUser){
        return ResponseEntity.ok(activityService.getActivityStream(currentUser));
    }
}
