package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.ChoiceRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ChoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(value = "api/choices")
public class ChoiceController {

    private ChoiceService choiceService;

    public ChoiceController(ChoiceService choiceService) {
        this.choiceService = choiceService;
    }

    @Transactional
    @PostMapping(value = "/")
    public ResponseEntity<ApiResponse> createChoiceByQuestionId(@CurrentUser UserPrincipal currentUser,
                                                                @Valid @RequestBody ChoiceRequest choiceRequest) {
        return choiceService.createChoiceByQuestionId(currentUser, choiceRequest);
    }

    @Transactional
    @DeleteMapping(value = "/{choiceId}")
    public ResponseEntity<ApiResponse> deleteChoiceById(@CurrentUser UserPrincipal currentUser,
                                                        @PathVariable Long choiceId) {
        return choiceService.deleteChoiceById(currentUser, choiceId);
    }
}