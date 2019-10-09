package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.AnswerRequest;
import com.fellas.bespoke.controller.dto.request.QuestionRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.LearningStepsResponse;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(value = "api/questions")
public class QuestionController {

    private QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @Transactional
    @PostMapping(value = "/")
    public ResponseEntity<ApiResponse> createQuestionByContentId(@CurrentUser UserPrincipal currentUser,
                                                                 @Valid @RequestBody QuestionRequest questionRequest) {
        return questionService.createQuestionByContentId(currentUser, questionRequest);
    }

    @Transactional
    @DeleteMapping("/{questionId}")
    public ResponseEntity<ApiResponse> deleteQuestionById(@CurrentUser UserPrincipal currentUser,
                                                          @PathVariable Long questionId) {
        return questionService.deleteQuestionById(questionId, currentUser);
    }

    @Transactional
    @GetMapping("/{contentId}")
    public ResponseEntity<LearningStepsResponse> getLearningStepsByContentId(@CurrentUser UserPrincipal currentUser,
                                                                             @PathVariable Long contentId) {
        return questionService.getLearningSteps(currentUser, contentId);
    }

    @Transactional
    @PostMapping(value = "/answer/")
    public ResponseEntity<ApiResponse> giveAnswer(@CurrentUser UserPrincipal currentUser,
                                                  @Valid @RequestBody AnswerRequest answerRequest) {
        return questionService.giveAnswer(currentUser, answerRequest);
    }
}