package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.ChoiceRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface ChoiceService {

    ResponseEntity<ApiResponse> createChoiceByQuestionId(UserPrincipal currentUser,
                                                         ChoiceRequest choiceRequest);

    ResponseEntity<ApiResponse> deleteChoiceById(UserPrincipal currentUser, Long choiceId);
}
