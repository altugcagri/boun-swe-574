package com.fellas.bespoke.service;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.AnswerRequest;
import com.fellas.bespoke.controller.dto.request.QuestionRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.LearningStepsResponse;
import com.fellas.bespoke.exception.CreatedByException;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.ContentRepository;
import com.fellas.bespoke.persistence.LearningStepRepository;
import com.fellas.bespoke.persistence.QuestionRepository;
import com.fellas.bespoke.persistence.model.Choice;
import com.fellas.bespoke.persistence.model.Content;
import com.fellas.bespoke.persistence.model.LearningStep;
import com.fellas.bespoke.persistence.model.Question;
import com.fellas.bespoke.persistence.model.Topic;
import com.fellas.bespoke.service.implementation.QuestionServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

public class QuestionServiceTest extends AbstractServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private ContentRepository contentRepository;

    @Mock
    private LearningStepRepository learningStepRepository;

    @Mock
    private ConfigurableConversionService smepConversionService;


    @InjectMocks
    private final QuestionService sut = new QuestionServiceImpl(questionRepository, contentRepository,
            smepConversionService, learningStepRepository);


    @Test(expected = ResourceNotFoundException.class)
    public void testCreateQuestionByContentId_ContentNotFound() {
        //Prepare
        final QuestionRequest questionRequest = TestUtils.createDummyQuestionRequest();
        when(contentRepository.findById(questionRequest.getContentId())).thenReturn(Optional.empty());
        //Test
        sut.createQuestionByContentId(currentUser, questionRequest);
    }

    @Test(expected = CreatedByException.class)
    public void testCreateQuestionByContentId_CreateByFail() {
        //Prepare
        final QuestionRequest questionRequest = TestUtils.createDummyQuestionRequest();
        final Content content = TestUtils.createDummyContent();
        content.setCreatedBy(1L);
        when(contentRepository.findById(questionRequest.getContentId())).thenReturn(Optional.of(content));
        //Test
        sut.createQuestionByContentId(currentUser, questionRequest);
    }

    @Test
    public void testCreateQuestionByContentId_Success() {
        //Prepare
        final QuestionRequest questionRequest = TestUtils.createDummyQuestionRequest();
        final Content content = TestUtils.createDummyContent();
        final Question question = TestUtils.createDummyQuestion();
        content.setCreatedBy(currentUser.getId());
        when(contentRepository.findById(questionRequest.getContentId())).thenReturn(Optional.of(content));
        when(smepConversionService.convert(questionRequest, Question.class)).thenReturn(question);
        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.createQuestionByContentId(currentUser, questionRequest);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }


    @Test(expected = ResourceNotFoundException.class)
    public void testDeleteQuestionById_ContentNotFound() {
        //Prepare
        when(questionRepository.findById(0L)).thenReturn(Optional.empty());
        //Test
        sut.deleteQuestionById(0L, currentUser);
    }

    @Test(expected = CreatedByException.class)
    public void testDeleteQuestionById_CreateByFail() {
        //Prepare
        final Question question = TestUtils.createDummyQuestion();
        question.setCreatedBy(1L);
        when(questionRepository.findById(0L)).thenReturn(Optional.of(question));
        //Test
        sut.deleteQuestionById(0L, currentUser);
    }

    @Test
    public void testDeleteQuestionById_Success() {
        //Prepare
        final Question question = TestUtils.createDummyQuestion();
        question.setCreatedBy(currentUser.getId());
        when(questionRepository.findById(0L)).thenReturn(Optional.of(question));
        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.deleteQuestionById(0L, currentUser);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }


    @Test
    public void testGetLearningSteps() {
        //Prepare
        final List<LearningStep> learningStepList = TestUtils.createDummyLearningStepList();
        final List<Question> questionList = TestUtils.createDummyQuetionList();
        final List<Choice> choiceList = TestUtils.createDummyChoiceList();
        final Content content = TestUtils.createDummyContent();
        final List<Content> contentList = new ArrayList<>();
        final Topic topic = TestUtils.createDummyTopic();
        contentList.add(content);
        questionList.get(0).setChoiceList(choiceList);
        content.setTopic(topic);
        content.setQuestionList(questionList);
        topic.setContentList(contentList);
        when(contentRepository.findById(0L)).thenReturn(Optional.of(content));
        when(learningStepRepository.findByUserIdAndContentId(currentUser.getId(), content.getId()))
                .thenReturn(learningStepList);
        //Test
        final ResponseEntity<LearningStepsResponse> responseEntity = sut.getLearningSteps(currentUser, 0L);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testGiveAnswer() {
        //Prepare
        final AnswerRequest answerRequest = TestUtils.createDummyAnswerRequest();
        final Question question = TestUtils.createDummyQuestion();
        final LearningStep learningStep = TestUtils.createDummyLearningStep();
        when(questionRepository.findById(answerRequest.getQuestionId())).thenReturn(Optional.of(question));
        when(learningStepRepository
                .findByUserIdAndContentIdAndQuestionIdAndAnswerId(currentUser.getId(), question.getContent().getId(),
                        answerRequest.getQuestionId(), answerRequest.getChoiceId()))
                .thenReturn(Optional.of(learningStep));
        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.giveAnswer(currentUser, answerRequest);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);

    }


}
