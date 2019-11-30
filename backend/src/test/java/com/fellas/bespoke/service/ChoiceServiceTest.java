package com.fellas.bespoke.service;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.ChoiceRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.exception.CreatedByException;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.ChoiceRepository;
import com.fellas.bespoke.persistence.QuestionRepository;
import com.fellas.bespoke.persistence.model.Choice;
import com.fellas.bespoke.persistence.model.Question;
import com.fellas.bespoke.service.implementation.ChoiceServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class ChoiceServiceTest extends AbstractServiceTest {

    @Mock
    private ChoiceRepository choiceRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private ConfigurableConversionService bespokeConversionService;

    @InjectMocks
    private final ChoiceService sut = new ChoiceServiceImpl(choiceRepository, questionRepository,
            bespokeConversionService);

    @Test(expected = ResourceNotFoundException.class)
    public void testCreateChoiceByQuestionId_QuestionNotFound() {
        //Prepare
        final ChoiceRequest request = TestUtils.createDummyChoiceRequest();
        when(questionRepository.findById(request.getQuestionId())).thenReturn(Optional.empty());

        //Test
        sut.createChoiceByQuestionId(currentUser, request);
    }


    @Test(expected = CreatedByException.class)
    public void testCreateChoiceByQuestionId_CreateByFail() {
        //Prepare
        final ChoiceRequest request = TestUtils.createDummyChoiceRequest();
        final Question question = TestUtils.createDummyQuestion();
        question.setCreatedBy(1L);
        when(questionRepository.findById(request.getQuestionId())).thenReturn(Optional.of(question));

        //Test
        sut.createChoiceByQuestionId(currentUser, request);
    }

    @Test
    public void testCreateChoiceByQuestionId_Success() {
        //Prepare
        final ChoiceRequest request = TestUtils.createDummyChoiceRequest();
        final Question question = TestUtils.createDummyQuestion();
        final Choice choice = TestUtils.createDummyChoice();
        question.setCreatedBy(currentUser.getId());
        when(questionRepository.findById(request.getQuestionId())).thenReturn(Optional.of(question));
        when(bespokeConversionService.convert(request, Choice.class)).thenReturn(choice);

        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.createChoiceByQuestionId(currentUser, request);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }


    @Test(expected = ResourceNotFoundException.class)
    public void testDeleteChoiceById_ChoiceNotFound() {
        //Prepare
        when(choiceRepository.findById(0L)).thenReturn(Optional.empty());

        //Test
        sut.deleteChoiceById(currentUser, 0L);
    }


    @Test(expected = CreatedByException.class)
    public void testDeleteChoiceById_CreateByFail() {
        //Prepare
        final Choice choice = TestUtils.createDummyChoice();
        choice.setCreatedBy(1L);
        when(choiceRepository.findById(0L)).thenReturn(Optional.of(choice));

        //Test
        sut.deleteChoiceById(currentUser, 0L);
    }

    @Test
    public void testDeleteChoiceById_Success() {
        //Prepare
        final Choice choice = TestUtils.createDummyChoice();
        choice.setCreatedBy(currentUser.getId());
        when(choiceRepository.findById(0L)).thenReturn(Optional.of(choice));

        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.deleteChoiceById(currentUser, 0L);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }
}
