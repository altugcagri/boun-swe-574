package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.response.UserIdentityAvailability;
import com.fellas.bespoke.controller.dto.response.UserProfile;
import com.fellas.bespoke.controller.dto.response.UserSummary;
import com.fellas.bespoke.security.UserPrincipal;

public interface UserService {

    UserSummary getCurrentUser(UserPrincipal currentUser);

    UserIdentityAvailability checkUsernameAvailability(String email);

    UserProfile getUserProfile(String username);
}
