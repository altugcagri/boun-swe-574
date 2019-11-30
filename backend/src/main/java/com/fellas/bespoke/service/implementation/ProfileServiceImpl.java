package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.response.ProfileResponse;
import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.controller.dto.response.UserProfile;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ProfileService;
import com.fellas.bespoke.service.TopicService;
import com.fellas.bespoke.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
@Service
public class ProfileServiceImpl implements ProfileService {

    private UserService userService;

    private TopicService topicService;

    public ProfileServiceImpl(UserService userService, TopicService topicService) {
        this.userService = userService;
        this.topicService = topicService;
    }

    @Override
    public ProfileResponse getProfile(UserPrincipal currentUser, Long profileId) {

        final UserProfile currentUserProfile = userService.getUserByUserId(currentUser.getId());

        if (null == currentUserProfile) {
            throw new ResourceNotFoundException("User", "id", currentUser.getId().toString());
        }

        final UserProfile userProfile = userService.getUserByUserId(profileId);

        if (null == userProfile) {
            throw new ResourceNotFoundException("User", "id", profileId.toString());
        }

        final AtomicBoolean currentUserIsAlreadyFollowing = new AtomicBoolean(false);

        currentUserProfile.getFollowedUsers().stream().filter(t ->
                t.getId().equals(userProfile.getId())).findAny().ifPresent(v -> currentUserIsAlreadyFollowing.set(true));

        final List<TopicResponse> topicList = topicService.getPublishedTopicsCreatedBy(userProfile.getId());

        return ProfileResponse.builder()
                .currentUserIsAlreadyFollowing(currentUserIsAlreadyFollowing.get())
                .name(userProfile.getName())
                .topics(topicList)
                .build();
    }
}
