package com.fellas.bespoke.service;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.EnrollmentRequest;
import com.fellas.bespoke.controller.dto.request.PublishRequest;
import com.fellas.bespoke.controller.dto.request.TopicRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.exception.CreatedByException;
import com.fellas.bespoke.exception.NotValidTopicException;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.TopicRepository;
import com.fellas.bespoke.persistence.UserRepository;
import com.fellas.bespoke.persistence.WikiDataRepository;
import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.implementation.TopicServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

public class TopicServiceTest extends AbstractServiceTest {

    @Mock
    private TopicRepository topicRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ActivityService activityService;

    @Mock
    private WikiDataRepository wikiDataRepository;

    @Mock
    private ConfigurableConversionService smepConversionService;

    @InjectMocks
    private final TopicService sut = new TopicServiceImpl(topicRepository, userRepository, wikiDataRepository,
            activityService, smepConversionService);

    @Test
    public void testGetAllTopics() {
        //Prepare
        final List<Topic> topicList = TestUtils.createDummyTopicList();
        when(topicRepository.findByPublished(true)).thenReturn(topicList);
        when(smepConversionService.convert(topicList.get(0), TopicResponse.class))
                .thenReturn(TestUtils.createDummyTopicResponse());
        //Test
        final ResponseEntity<List<TopicResponse>> responseEntity = sut.getAllTopics(currentUser);
        //Verify
        assertTrue(Objects.requireNonNull(responseEntity.getBody()).size() > 0);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testGetTopicsCreatedBy_UserNotFound() {
        //Prepare
        when(userRepository.findByUsername("username")).thenReturn(Optional.empty());
        //Test
        sut.getTopicsCreatedBy("username", currentUser);
    }

    @Test
    public void testGetTopicsCreatedBy_Success() {
        //Prepare
        final User user = TestUtils.createDummyUser();
        final List<Topic> topicList = TestUtils.createDummyTopicList();
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        when(topicRepository.findByCreatedBy(user.getId())).thenReturn(topicList);
        when(smepConversionService.convert(topicList.get(0), TopicResponse.class))
                .thenReturn(TestUtils.createDummyTopicResponse());
        //Test
        final ResponseEntity<List<TopicResponse>> responseEntity = sut.getTopicsCreatedBy("username", currentUser);
        //Verify
        assertTrue(Objects.requireNonNull(responseEntity.getBody()).size() > 0);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testGetTopicById_TopicNotFound() {
        //Prepare
        when(topicRepository.findById(0L)).thenReturn(Optional.empty());
        //Test
        sut.getTopicById(0L, currentUser);
    }

    @Test
    public void testGetTopicById_Success() {
        //Prepare
        final Topic topic = TestUtils.createDummyTopic();
        when(topicRepository.findById(0L)).thenReturn(Optional.of(topic));
        when(smepConversionService.convert(topic, TopicResponse.class))
                .thenReturn(TestUtils.createDummyTopicResponse());
        //Test
        final ResponseEntity<TopicResponse> responseEntity = sut.getTopicById(0L, currentUser);
        //Verify
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testCreateTopic() {
        //Prepare
        final TopicRequest topicRequest = TestUtils.createDummyTopicRequest();
        final Topic topic = TestUtils.createDummyTopic();
        final TopicResponse topicResponse = TestUtils.createDummyTopicResponse();
        final ActivityStream activityStream = TestUtils.createDummyActivityStream();
        when(topicRepository.findById(topicRequest.getId())).thenReturn(Optional.of(topic));
        when(smepConversionService.convert(topicRequest, Topic.class)).thenReturn(topic);
        when(topicRepository.save(topic)).thenReturn(topic);
        when(smepConversionService.convert(topic, TopicResponse.class)).thenReturn(topicResponse);
        //Test
        final ResponseEntity<TopicResponse> responseEntity = sut.createTopic(currentUser, topicRequest);
        //Verify
        assertNotNull(responseEntity.getBody());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testpublishStatusUpdate_TopicNotFound() {
        //Prepare
        final PublishRequest publishRequest = TestUtils.createDummyPublishRequest();
        when(topicRepository.findById(publishRequest.getTopicId())).thenReturn(Optional.empty());
        //Test
        sut.publishStatusUpdate(currentUser, publishRequest);
    }

    @Test(expected = CreatedByException.class)
    public void testPublishStatusUpdate_CreateByFail() {
        //Prepare
        final PublishRequest publishRequest = TestUtils.createDummyPublishRequest();
        final Topic topic = TestUtils.createDummyTopic();
        topic.setCreatedBy(1L);
        when(topicRepository.findById(publishRequest.getTopicId())).thenReturn(Optional.of(topic));
        //Test
        sut.publishStatusUpdate(currentUser, publishRequest);
    }

    @Test(expected = NotValidTopicException.class)
    public void testPublishStatusUpdate_NotValidTopic_NullOrEmptyContentList() {
        //Prepare
        final PublishRequest publishRequest = TestUtils.createDummyPublishRequest();
        final Topic topic = TestUtils.createDummyTopic();
        topic.setContentList(null);
        topic.setCreatedBy(currentUser.getId());
        when(topicRepository.findById(publishRequest.getTopicId())).thenReturn(Optional.of(topic));
        //Test
        sut.publishStatusUpdate(currentUser, publishRequest);
    }

    @Test(expected = NotValidTopicException.class)
    public void testPublishStatusUpdate_NotValidTopic_NullOrEmptyQuestionList() {
        //Prepare
        final PublishRequest publishRequest = TestUtils.createDummyPublishRequest();
        final Topic topic = TestUtils.createDummyTopic();
        final List<Content> contentList = TestUtils.createDummyContentList();
        contentList.get(0).setQuestionList(null);
        topic.setContentList(contentList);
        topic.setCreatedBy(currentUser.getId());
        when(topicRepository.findById(publishRequest.getTopicId())).thenReturn(Optional.of(topic));
        //Test
        sut.publishStatusUpdate(currentUser, publishRequest);
    }

    @Test
    public void testPublishStatusUpdate_Success() {
        //Prepare
        final PublishRequest publishRequest = TestUtils.createDummyPublishRequest();
        final Topic topic = TestUtils.createDummyTopic();
        final List<Content> contentList = TestUtils.createDummyContentList();
        final List<Question> questionList = TestUtils.createDummyQuetionList();
        contentList.get(0).setQuestionList(questionList);
        topic.setContentList(contentList);
        topic.setCreatedBy(currentUser.getId());
        when(topicRepository.findById(publishRequest.getTopicId())).thenReturn(Optional.of(topic));
        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.publishStatusUpdate(currentUser, publishRequest);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }


    @Test(expected = ResourceNotFoundException.class)
    public void testDeleteByTopicId_TopicNotFound() {
        //Prepare
        when(topicRepository.findById(0L)).thenReturn(Optional.empty());
        //Test
        sut.deleteTopicById(0L, currentUser);
    }

    @Test(expected = CreatedByException.class)
    public void testDeleteByTopicId_CreateByFail() {
        //Prepare
        final Topic topic = TestUtils.createDummyTopic();
        topic.setCreatedBy(1L);
        when(topicRepository.findById(0L)).thenReturn(Optional.of(topic));
        //Test
        sut.deleteTopicById(0L, currentUser);
    }

    @Test
    public void testDeleteByTopicId_Success() {
        //Prepare
        final Topic topic = TestUtils.createDummyTopic();
        topic.setCreatedBy(currentUser.getId());
        when(topicRepository.findById(topic.getId())).thenReturn(Optional.of(topic));
        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.deleteTopicById(0L, currentUser);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testEnrollToTopicByUsername_TopicNotFound() {
        //Prepare
        final EnrollmentRequest enrollmentRequest = TestUtils.createDummyEnrollmentRequest();
        when(topicRepository.findById(enrollmentRequest.getTopicId())).thenReturn(Optional.empty());
        //Test
        sut.enrollToTopicByUsername(currentUser, enrollmentRequest);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testEnrollToTopicByUsername_UserNotFound() {
        //Prepare
        final EnrollmentRequest enrollmentRequest = TestUtils.createDummyEnrollmentRequest();
        final Topic topic = TestUtils.createDummyTopic();
        when(topicRepository.findById(enrollmentRequest.getTopicId())).thenReturn(Optional.of(topic));
        when(userRepository.findByUsername(enrollmentRequest.getUsername())).thenReturn(Optional.empty());
        //Test
        sut.enrollToTopicByUsername(currentUser, enrollmentRequest);
    }

    @Test
    public void testEnrollToTopicByUsername_Success() {
        //Prepare
        final EnrollmentRequest enrollmentRequest = TestUtils.createDummyEnrollmentRequest();
        final Topic topic = TestUtils.createDummyTopic();
        final User user = TestUtils.createDummyUser();
        when(topicRepository.findById(enrollmentRequest.getTopicId())).thenReturn(Optional.of(topic));
        when(userRepository.findByUsername(enrollmentRequest.getUsername())).thenReturn(Optional.of(user));
        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.enrollToTopicByUsername(currentUser, enrollmentRequest);
        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }


    @Test(expected = ResourceNotFoundException.class)
    public void testGetTopicsByEnrolledUserId_UserNotFound() {
        //Prepare
        when(userRepository.findById(0L)).thenReturn(Optional.empty());
        //Test
        sut.getTopicsByEnrolledUserId(currentUser, 0L);
    }

    @Test
    public void testGetTopicsByEnrolledUserId() {
        //Prepare
        final User user = TestUtils.createDummyUser();
        final List<Topic> enrolledTopics = TestUtils.createDummyTopicList();
        final TopicResponse topicResponse = TestUtils.createDummyTopicResponse();
        when(userRepository.findById(0L)).thenReturn(Optional.of(user));
        when(topicRepository.findTopicByEnrolledUsersContainsAndPublished(user, true)).thenReturn(enrolledTopics);
        when(smepConversionService.convert(enrolledTopics.get(0), TopicResponse.class)).thenReturn(topicResponse);
        //Test
        final ResponseEntity<List<TopicResponse>> responseEntity = sut.getTopicsByEnrolledUserId(currentUser, 0L);
        //Verify
        assertTrue(Objects.requireNonNull(responseEntity.getBody()).size() > 0);
    }


}
