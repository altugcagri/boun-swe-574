package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.AnswerRequest;
import com.fellas.bespoke.controller.dto.request.QuestionRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.LearningStepsResponse;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface QuestionService {

    ResponseEntity<ApiResponse> createQuestionByContentId(UserPrincipal currentUser, QuestionRequest questionRequest);

    ResponseEntity<ApiResponse> deleteQuestionById(Long questionId, UserPrincipal currentUser);

    ResponseEntity<LearningStepsResponse> getLearningSteps(UserPrincipal currentUser, Long contentId);

    ResponseEntity<ApiResponse> giveAnswer(UserPrincipal currentUser, AnswerRequest answerRequest);

}
