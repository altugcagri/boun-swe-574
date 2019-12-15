package com.fellas.bespoke.converter;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.Annotation;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.*;

import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class ASSearchResponseToAnnotationResponseTest {

    @InjectMocks
    private ASSearchResponseToAnnotationResponse sut;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testConvertSuccessfully() {
        //Prepare
        AnnotationServerSearchResponse annotationServerSearchResponse = TestUtils.createDummyAnnotationServerSearchResponse();
        //Test
        List<Annotation> annotations = sut.convert(annotationServerSearchResponse);
        //Verify
        assertNotNull(annotations);
        assertEquals(annotations.get(0).getAuthor(), annotationServerSearchResponse.getFirst().getItems().get(0).getCreator());
        assertEquals(annotations.get(0).getAnnotatedText(), annotationServerSearchResponse.getFirst().getItems().get(0).getBody().getValue());
        assertEquals(annotations.get(0).getSelector(), annotationServerSearchResponse.getFirst().getItems().get(0).getTarget().getSelector().getValue());
    }


}
