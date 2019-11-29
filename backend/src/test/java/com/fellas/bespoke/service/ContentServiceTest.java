package com.fellas.bespoke.service;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.ContentRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.ContentResponse;
import com.fellas.bespoke.exception.CreatedByException;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.ContentRepository;
import com.fellas.bespoke.persistence.TopicRepository;
import com.fellas.bespoke.persistence.model.Content;
import com.fellas.bespoke.persistence.model.Topic;
import com.fellas.bespoke.service.implementation.ContentServiceImpl;
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
import static org.mockito.Mockito.when;

public class ContentServiceTest extends AbstractServiceTest {

    @Mock
    private ContentRepository contentRepository;

    @Mock
    private TopicRepository topicRepository;

    @Mock
    private ActivityService activityService;

    @Mock
    private ConfigurableConversionService bespokeConversionService;

    @InjectMocks
    private final ContentService sut = new ContentServiceImpl(contentRepository, topicRepository,
            activityService, bespokeConversionService);

    @Test(expected = ResourceNotFoundException.class)
    public void testCreateContentByTopicId_TopicNotFound() {
        //Prepare
        final ContentRequest request = TestUtils.createDummyContentRequest();
        when(topicRepository.findById(request.getTopicId())).thenReturn(Optional.empty());

        //Test
        sut.createContentByTopicId(currentUser, request);
    }

    @Test(expected = CreatedByException.class)
    public void testCreateContentByTopicId_CreateByFail() {
        //Prepare
        final ContentRequest request = TestUtils.createDummyContentRequest();
        final Topic topic = TestUtils.createDummyTopic();
        topic.setCreatedBy(1L);
        when(topicRepository.findById(request.getTopicId())).thenReturn(Optional.of(topic));

        //Test
        sut.createContentByTopicId(currentUser, request);
    }

    @Test
    public void testCreateChoiceByQuestionId_Success() {
        //Prepare
        final ContentRequest request = TestUtils.createDummyContentRequest();
        final Topic topic = TestUtils.createDummyTopic();
        final Content content = TestUtils.createDummyContent();
        topic.setCreatedBy(currentUser.getId());
        when(topicRepository.findById(request.getTopicId())).thenReturn(Optional.of(topic));
        when(bespokeConversionService.convert(request, Content.class)).thenReturn(content);

        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.createContentByTopicId(currentUser, request);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testGetContentById_ContentNotFound() {
        //Prepare
        when(contentRepository.findById(0L)).thenReturn(Optional.empty());

        //Test
        sut.getContentById(currentUser, 0L);
    }

    @Test
    public void testGetContentById_Success() {
        //Prepare
        final Content content = TestUtils.createDummyContent();
        final List<Content> contentList = new ArrayList<>();
        final Topic topic = TestUtils.createDummyTopic();
        contentList.add(content);
        content.setTopic(topic);
        topic.setContentList(contentList);
        final ContentResponse contentResponse = TestUtils.createDummyContentResponse();
        when(contentRepository.findById(0L)).thenReturn(Optional.of(content));
        when(bespokeConversionService.convert(content, ContentResponse.class)).thenReturn(contentResponse);

        //Test
        final ResponseEntity<ContentResponse> responseEntity = sut.getContentById(currentUser, 0L);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody(), contentResponse);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testDeleteContentById_ContentNotFound() {
        //Prepare
        when(contentRepository.findById(0L)).thenReturn(Optional.empty());

        //Test
        sut.deleteContentById(currentUser, 0L);
    }


    @Test(expected = CreatedByException.class)
    public void testDeleteContentById_CreateByFail() {
        //Prepare
        final Content content = TestUtils.createDummyContent();
        content.setCreatedBy(1L);
        when(contentRepository.findById(0L)).thenReturn(Optional.of(content));

        //Test
        sut.deleteContentById(currentUser, 0L);
    }

    @Test
    public void testDeleteContentById_Success() {
        //Prepare
        final Content content = TestUtils.createDummyContent();
        content.setCreatedBy(currentUser.getId());
        when(contentRepository.findById(0L)).thenReturn(Optional.of(content));

        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.deleteContentById(currentUser, 0L);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }

}
