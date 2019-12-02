package com.fellas.bespoke.controller;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.service.AnnotationService;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class AnnotationControllerTest extends AbstractEntityControllerTest {

    @Mock
    private AnnotationService annotationService;

    @InjectMocks
    private AnnotationController sut;

    @Test
    public void testCreateAnnotation(){
        //Prepare
        final Annotation annotation = TestUtils.createDummyAnnotation();
        //Test
        sut.createAnnotation(currentUser,annotation);
        //Verify
        verify(annotationService,(times(1))).createAnnotation(currentUser,annotation);
    }

    @Test
    public void testGetAnnotations(){
        //Prepare
        final String pageUrl = "www.test-page.com";
        //Test
        sut.getAnnotations(currentUser,pageUrl);
        //Verify
        verify(annotationService,(times(1))).getAnnotationsByTarget(currentUser,pageUrl);
    }


}
