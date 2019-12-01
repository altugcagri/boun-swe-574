package com.fellas.bespoke.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.client.AnnotationServerClient;
import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.service.implementation.AnnotationServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

public class AnnotationServiceTest extends AbstractServiceTest {

    @Mock
    private AnnotationServerClient annotationServerClient;

    @Mock
    private ConfigurableConversionService bespokeConversionService;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private AnnotationServiceImpl sut;

    @Test
    public void testCreateAnnotation_Success() throws JsonProcessingException {
        //Prepare
        final Annotation annotation = TestUtils.createDummyAnnotation();
        final AnnotationServerRequest annotationServerRequest = TestUtils.createDummyAnnotationServerRequest();
        final String annotationServerRequestJson = TestUtils.createDummyAnnotationServerCreateRequestJson();
        when(bespokeConversionService.convert(annotation, AnnotationServerRequest.class)).thenReturn(annotationServerRequest);
        when(objectMapper.writeValueAsString(annotationServerRequest)).thenReturn(annotationServerRequestJson);

        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.createAnnotation(currentUser, annotation);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), true);
    }

    @Test
    public void testCreateAnnotation_NotCreated() throws JsonProcessingException {
        //Prepare
        final Annotation annotation = TestUtils.createDummyAnnotation();
        final AnnotationServerRequest annotationServerRequest = TestUtils.createDummyAnnotationServerRequest();
        when(bespokeConversionService.convert(annotation, AnnotationServerRequest.class)).thenReturn(annotationServerRequest);
        when(objectMapper.writeValueAsString(annotationServerRequest)).thenThrow(new JsonProcessingException("Error"){});

        //Test
        final ResponseEntity<ApiResponse> responseEntity = sut.createAnnotation(currentUser, annotation);

        //Verify
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody().getSuccess(), false);
    }

    @Test
    public void testGetAnnotation_Success(){
        //Prepare
        final String targetUrl = "www.target.com";
        final AnnotationServerSearchResponse annotationServerSearchResponse = TestUtils.createDummyAnnotationServerSearchResponse();
        final List<Annotation> annotationList = Arrays.asList(TestUtils.createDummyAnnotation());
        when(annotationServerClient.searchAnnotationsByTargetUrl(targetUrl)).thenReturn(annotationServerSearchResponse);
        when(bespokeConversionService.convert(annotationServerSearchResponse,List.class)).thenReturn(annotationList);

        //Test
        ResponseEntity<List<Annotation>> responseEntity = sut.getAnnotationsByTarget(currentUser,targetUrl);

        //Verify
        assertNotNull(responseEntity);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
        assertEquals(responseEntity.getBody(),annotationList);
    }


}
