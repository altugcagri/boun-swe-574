package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.request.ChoiceRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.ChoiceRepository;
import com.fellas.bespoke.persistence.QuestionRepository;
import com.fellas.bespoke.persistence.model.Choice;
import com.fellas.bespoke.persistence.model.Question;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ChoiceService;
import com.fellas.bespoke.service.util.BespokeUtilities;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ChoiceServiceImpl implements ChoiceService {

    private ChoiceRepository choiceRepository;

    private QuestionRepository questionRepository;

    private ConfigurableConversionService bespokeConversionService;

    public ChoiceServiceImpl(ChoiceRepository choiceRepository, QuestionRepository questionRepository,
            ConfigurableConversionService bespokeConversionService) {
        this.choiceRepository = choiceRepository;
        this.questionRepository = questionRepository;
        this.bespokeConversionService = bespokeConversionService;
    }

    @Override
    public ResponseEntity<ApiResponse> createChoiceByQuestionId(UserPrincipal currentUser,
                                                                ChoiceRequest choiceRequest) {

        final Question question = questionRepository.findById(choiceRequest.getQuestionId()).orElseThrow(
                () -> new ResourceNotFoundException("Question", "id", choiceRequest.getQuestionId().toString()));

        BespokeUtilities.checkCreatedBy("Question", currentUser.getId(), question.getCreatedBy());

        final Choice choice = bespokeConversionService.convert(choiceRequest, Choice.class);
        choice.setQuestion(question);
        choiceRepository.save(choice);
        return ResponseEntity.ok().body(new ApiResponse(true, "Choice created successfully"));
    }

    @Override
    public ResponseEntity<ApiResponse> deleteChoiceById(UserPrincipal currentUser, Long choiceId) {

        final Choice choice = choiceRepository.findById(choiceId).orElseThrow(
                () -> new ResourceNotFoundException("Choice", "id", choiceId.toString()));

        BespokeUtilities.checkCreatedBy("Choice", currentUser.getId(), choice.getCreatedBy());

        choiceRepository.delete(choice);
        return ResponseEntity.ok().body(new ApiResponse(true, "Choice deleted successfully"));
    }
}
