package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.LoginRequest;
import com.fellas.bespoke.controller.dto.request.SignUpRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<ApiResponse> registerUser(SignUpRequest signUpRequest);

    ResponseEntity authenticateUser(LoginRequest loginRequest);
}
