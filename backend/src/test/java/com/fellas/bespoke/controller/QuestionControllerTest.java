package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.AnswerRequest;
import com.fellas.bespoke.controller.dto.request.QuestionRequest;
import com.fellas.bespoke.service.QuestionService;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class QuestionControllerTest extends AbstractEntityControllerTest {

    @Mock
    private QuestionService questionService;

    @InjectMocks
    private final QuestionController sut = new QuestionController(questionService);

    @Test
    public void testCreateQuestionByContentId() {
        //Prepare
        final QuestionRequest request = QuestionRequest.builder().contentId(0L).text("someText").build();
        //Test
        sut.createQuestionByContentId(currentUser, request);
        //Verify
        verify(questionService, times(1)).createQuestionByContentId(currentUser, request);
    }

    @Test
    public void testDeleteQuestionById() {
        //Test
        sut.deleteQuestionById(currentUser, 0L);
        //Verify
        verify(questionService, times(1)).deleteQuestionById(0L, currentUser);
    }

    @Test
    public void testGetLearningStepsByContentId() {
        //Test
        sut.getLearningStepsByContentId(currentUser, 0L);
        //Verify
        verify(questionService, times(1)).getLearningSteps(currentUser, 0L);
    }

    @Test
    public void testGiveAnswer() {
        //Prepare
        final AnswerRequest request = AnswerRequest.builder().choiceId(0L).questionId(0L).build();
        //Test
        sut.giveAnswer(currentUser, request);
        //Verify
        verify(questionService, times(1)).giveAnswer(currentUser, request);
    }

}
