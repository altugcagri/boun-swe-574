package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.request.LoginRequest;
import com.fellas.bespoke.controller.dto.request.SignUpRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.JwtAuthenticationResponse;
import com.fellas.bespoke.persistence.UserRepository;
import com.fellas.bespoke.persistence.model.ActivityContentType;
import com.fellas.bespoke.persistence.model.ActivityStreamType;
import com.fellas.bespoke.persistence.model.User;
import com.fellas.bespoke.security.JwtTokenProvider;
import com.fellas.bespoke.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private JwtTokenProvider tokenProvider;

    private ActivityServiceImpl activityService;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository, PasswordEncoder passwordEncoder,
                           JwtTokenProvider tokenProvider, ActivityServiceImpl activityService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.activityService = activityService;
    }

    @Override
    public ResponseEntity<ApiResponse> registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        final User user = User.builder().name(signUpRequest.getName()).username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail()).password(signUpRequest.getPassword()).build();

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userRepository.save(user);

        activityService.signUpActivity(result, ActivityContentType.USER, ActivityStreamType.Join, "registered to BeSpoke.");

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @Override
    public ResponseEntity authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, loginRequest.getUsernameOrEmail()));
    }
}
