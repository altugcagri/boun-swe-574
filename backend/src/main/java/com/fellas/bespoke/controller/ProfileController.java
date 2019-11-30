package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.response.ProfileResponse;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/profile")
public class ProfileController {

    private ProfileService profileService;


    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Transactional
    @GetMapping(value = "/{profileId}")
    public ResponseEntity<ProfileResponse> getProfile(@CurrentUser UserPrincipal currentUser, @PathVariable Long profileId) {
        return ResponseEntity.ok().body(profileService.getProfile(currentUser, profileId));
    }
}
