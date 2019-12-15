package com.fellas.bespoke.controller;

import com.fellas.bespoke.persistence.model.UserHomePageSummary;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.UserHomePageSummaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usersummary")
public class UserHomePageController {
    private final UserHomePageSummaryService userHomePageSummaryService;

    public UserHomePageController(UserHomePageSummaryService userHomePageSummaryService) {
        this.userHomePageSummaryService = userHomePageSummaryService;
    }

    @Transactional
    @GetMapping({"", "/"})
    public ResponseEntity<UserHomePageSummary> getUserHomePageSummary(@CurrentUser UserPrincipal currentUser){
        return ResponseEntity.ok(userHomePageSummaryService.getUserHomePageSummary(currentUser));
    }
}
