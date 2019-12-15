package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.response.ProfileResponse;
import com.fellas.bespoke.controller.dto.response.UserProfile;
import com.fellas.bespoke.controller.dto.response.UserSummary;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.service.implementation.ProfileServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ProfileServiceTest extends AbstractServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private TopicService topicService;

    @InjectMocks
    private final ProfileService sut = new ProfileServiceImpl(userService, topicService);

    @Test(expected = ResourceNotFoundException.class)
    public void testGetProfile_CurrentUserNotFound() {
        //Test
        sut.getProfile(currentUser, 123L);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testGetProfile_UserNotFound() {
        //Prepare
        final UserProfile currentUserProfile = mock(UserProfile.class);
        when(userService.getUserProfileByUserId(0L)).thenReturn(currentUserProfile).thenReturn(null);
        //Test
        sut.getProfile(currentUser, 0L);
    }

    @Test
    public void testGetProfile() {
        //Prepare
        final UserProfile userProfile = UserProfile.builder().id(0L).name("Cagri Altug").username("altugcagri").build();
        final UserSummary userSummary = UserSummary.builder().id(0L).name("Cagri Altug").username("altugcagri").build();
        final List<UserSummary> userProfiles = new ArrayList<>();
        userProfiles.add(userSummary);
        final UserProfile currentUserProfile = UserProfile.builder().id(1L).name("Cihangir Ozmus").username("cihangir")
                .followedUsers(userProfiles).build();
        when(userService.getUserProfileByUserId(0L)).thenReturn(currentUserProfile).thenReturn(userProfile);
        //Test
        ProfileResponse response = sut.getProfile(currentUser, 0L);
        //Verify
        assertNotNull(response);
        assertEquals(response.getName(), userProfile.getName());
        assertTrue(response.isCurrentUserIsAlreadyFollowing());
    }
}
