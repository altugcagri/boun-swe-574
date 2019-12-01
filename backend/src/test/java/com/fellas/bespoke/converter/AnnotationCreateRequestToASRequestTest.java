package com.fellas.bespoke.converter;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.controller.dto.request.Annotation;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class AnnotationCreateRequestToASRequestTest {

    @InjectMocks
    private AnnotationCreateRequestToASRequest sut;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testConvertSuccessfully() {
        //Prepare
        Annotation annotation = TestUtils.createDummyAnnotation();
        //Test
        AnnotationServerRequest annotationServerRequest = sut.convert(annotation);
        //Verify
        //Verify
        assertNotNull(annotationServerRequest);
        assertEquals(annotationServerRequest.getCreator(), annotation.getAuthor());
        assertEquals(annotationServerRequest.getBody().getValue(), annotation.getComment());
        assertEquals(annotationServerRequest.getTarget().getSelector().getValue(), annotation.getSelector());
    }

}
