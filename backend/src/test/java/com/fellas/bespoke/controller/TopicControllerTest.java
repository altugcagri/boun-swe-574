package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.EnrollmentRequest;
import com.fellas.bespoke.controller.dto.request.PublishRequest;
import com.fellas.bespoke.controller.dto.request.TopicRequest;
import com.fellas.bespoke.service.TopicService;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.HashSet;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class TopicControllerTest extends AbstractEntityControllerTest {

    @Mock
    private TopicService topicService;

    @InjectMocks
    private final TopicController sut = new TopicController(topicService);

    @Test
    public void testGetAllTopics() {
        //Test
        sut.getAllTopics(currentUser);
        //Verify
        verify(topicService, times(1)).getAllTopics(currentUser);
    }


    @Test
    public void testGetTopicsByUsername() {
        //Test
        sut.getTopicsByUsername("someName", currentUser);
        //Verify
        verify(topicService, times(1)).getTopicsCreatedBy("someName", currentUser);
    }

    @Test
    public void testGetTopicsById() {
        //Test
        sut.getTopicById(currentUser, 0L);
        //Verify
        verify(topicService, times(1)).getTopicById(0L, currentUser);
    }

    @Test
    public void testCreateTopic() {
        //Prepare
        final TopicRequest request = TopicRequest.builder().contentList(new ArrayList<>()).description("description")
                .id(0L).imageUrl("someUrl").title("title").wikiData(new HashSet<>()).build();
        //Test
        sut.createTopic(currentUser, request);
        //Verify
        verify(topicService, times(1)).createTopic(currentUser, request);
    }

    @Test
    public void testPublishStatusUpdate() {
        //Prepare
        final PublishRequest request = PublishRequest.builder().publish(true).topicId(0L).build();
        //Test
        sut.publishStatusUpdate(currentUser, request);
        //Verify
        verify(topicService, times(1)).publishStatusUpdate(currentUser, request);
    }

    @Test
    public void testDeleteTopicById() {
        //Test
        sut.deleteTopicById(currentUser, 0L);
        //Verify
        verify(topicService, times(1)).deleteTopicById(0L, currentUser);
    }

    @Test
    public void testEnrollToTopicByUsername() {
        //Prepare
        final EnrollmentRequest request = EnrollmentRequest.builder().topicId(0L).username("username").build();
        //Test
        sut.enrollToTopicByUsername(currentUser, request);
        //Verify
        verify(topicService, times(1)).enrollToTopicByUsername(currentUser, request);
    }

    @Test
    public void testGetEnrolledTopics() {
        //Test
        sut.getEnrolledTopics(currentUser, 0L);
        //Verify
        verify(topicService, times(1)).getTopicsByEnrolledUserId(currentUser, 0L);
    }
}
