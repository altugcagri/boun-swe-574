package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.response.ProfileResponse;
import com.fellas.bespoke.security.UserPrincipal;

public interface ProfileService {

    ProfileResponse getProfile(UserPrincipal currentUser, Long profileId);
}
