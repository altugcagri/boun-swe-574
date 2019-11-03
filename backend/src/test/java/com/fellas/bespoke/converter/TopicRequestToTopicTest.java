package com.fellas.bespoke.converter;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.TopicRequest;
import com.fellas.bespoke.persistence.model.Topic;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class TopicRequestToTopicTest {

    @InjectMocks
    private TopicRequestToTopic sut;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testConvertSuccessfully() {
        //Prepare
        final TopicRequest source = TestUtils.createDummyTopicRequest();
        source.setId(1L);
        //Test
        final Topic topic = sut.convert(source);
        //Verify
        assertNotNull(topic);
        assertEquals(topic.getDescription(), source.getDescription());
        assertEquals(topic.getTitle(), source.getTitle());
        assertEquals(topic.getImageUrl(), source.getImageUrl());
        assertEquals(topic.getEnrolledUsers(), source.getEnrolledUsers());
        assertEquals(topic.getWikiDataSet(), source.getWikiData());
    }

}
