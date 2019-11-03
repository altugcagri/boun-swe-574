package com.fellas.bespoke.controller;


import com.fellas.bespoke.controller.dto.request.LoginRequest;
import com.fellas.bespoke.controller.dto.request.SignUpRequest;
import com.fellas.bespoke.service.AuthService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private final AuthController sut = new AuthController(authService);

    @Test
    public void testAuthenticateUser() {
        //Prepare
        final LoginRequest request = LoginRequest.builder().password("pass").usernameOrEmail("email").build();
        //Test
        sut.authenticateUser(request);
        //Verify
        verify(authService, times(1)).authenticateUser(request);
    }

    @Test
    public void testRegisterUser() {
        //Prepare
        final SignUpRequest request = SignUpRequest.builder().password("pass").email("email").name("name")
                .username("username").build();
        //Test
        sut.registerUser(request);
        //Verify
        verify(authService, times(1)).registerUser(request);
    }

}
