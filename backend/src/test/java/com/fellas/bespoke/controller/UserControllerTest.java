package com.fellas.bespoke.controller;

import com.fellas.bespoke.service.UserService;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class UserControllerTest extends AbstractEntityControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private final UserController sut = new UserController(userService);

    @Test
    public void testGetCurrentUser() {
        //Test
        sut.getCurrentUser(currentUser);
        //Verify
        verify(userService, times(1)).getCurrentUser(currentUser);
    }

    @Test
    public void testCheckUsernameAvailability() {
        //Test
        sut.checkUsernameAvailability("email");
        //Verify
        verify(userService, times(1)).checkUsernameAvailability("email");
    }

    @Test
    public void getGetUserProfile() {
        //Test
        sut.getUserProfile("username");
        //Verify
        verify(userService, times(1)).getUserProfileByUserName("username");
    }

}
