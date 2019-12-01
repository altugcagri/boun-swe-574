package com.fellas.bespoke.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.client.response.AnnotationServerCreateResponse;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.exception.AnnotationServerException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.*;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.mockito.Mockito.when;
import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class AnnotationServerClientTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private AnnotationServerClient sut;

    @Before
    public void setUp() {
        ReflectionTestUtils.setField(sut, "annotationServerApiUrl", "http:localhost/annotation/w3c/");
        ReflectionTestUtils.setField(sut, "annotationContainerId", "container-id");
    }

    @Test
    public void testCreateAnnotation_Success() throws JsonProcessingException {
        //Prepare
        final String annotationServerRequestJson = TestUtils.createDummyAnnotationServerCreateRequestJson();
        final HttpHeaders httpHeaders = TestUtils.createDummyAnnotationServerHttpHeaders();
        final ResponseEntity<AnnotationServerCreateResponse> annotationServerCreateResponseResponseEntity = new ResponseEntity<>(HttpStatus.CREATED);
        when(restTemplate.exchange("http:localhost/annotation/w3c/container-id", HttpMethod.POST,
                new HttpEntity<>(annotationServerRequestJson,httpHeaders), AnnotationServerCreateResponse.class))
                .thenReturn(annotationServerCreateResponseResponseEntity);

        //Test
        sut.createAnnotation(annotationServerRequestJson);
    }

    @Test(expected = AnnotationServerException.class)
    public void testCreateAnnotation_NotCreated() throws JsonProcessingException {
        //Prepare
        final String annotationServerRequestJson = TestUtils.createDummyAnnotationServerCreateRequestJson();
        final HttpHeaders httpHeaders = TestUtils.createDummyAnnotationServerHttpHeaders();
        final ResponseEntity<AnnotationServerCreateResponse> annotationServerCreateResponseResponseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        when(restTemplate.exchange("http:localhost/annotation/w3c/container-id", HttpMethod.POST,
                new HttpEntity<>(annotationServerRequestJson,httpHeaders), AnnotationServerCreateResponse.class))
                .thenReturn(annotationServerCreateResponseResponseEntity);

        //Test
        sut.createAnnotation(annotationServerRequestJson);
    }

    @Test
    public void testSearchAnnotationsByTarget_Success() {
        //Prepare
        final String searchTargetUrl = "www.target.com";
        final HttpHeaders httpHeaders = TestUtils.createDummyAnnotationServerHttpHeaders();
        final AnnotationServerSearchResponse serverSearchResponse = TestUtils.createDummyAnnotationServerSearchResponse();
        final ResponseEntity<AnnotationServerSearchResponse> annotationServerSearchResponseEntity = ResponseEntity.ok(serverSearchResponse);
        when(restTemplate.exchange("http:localhost/annotation/w3c/services/search/target?value=%www.target.com%&fields=source", HttpMethod.GET,
                new HttpEntity<>(httpHeaders), AnnotationServerSearchResponse.class))
                .thenReturn(annotationServerSearchResponseEntity);

        //Test
        AnnotationServerSearchResponse asResponse = sut.searchAnnotationsByTargetUrl(searchTargetUrl);

        //Verify
        assertNotNull(asResponse);
        assertEquals(serverSearchResponse.getFirst(),asResponse.getFirst());
        assertEquals(serverSearchResponse.getFirst().getItems(), asResponse.getFirst().getItems());
    }

    @Test(expected = AnnotationServerException.class)
    public void testSearchAnnotationsByTarget_NotOk() {
        //Prepare
        final String searchTargetUrl = "www.target.com";
        final HttpHeaders httpHeaders = TestUtils.createDummyAnnotationServerHttpHeaders();
        final AnnotationServerSearchResponse serverSearchResponse = TestUtils.createDummyAnnotationServerSearchResponse();
        final ResponseEntity<AnnotationServerSearchResponse> annotationServerCreateResponseResponseEntity = new ResponseEntity<>(serverSearchResponse,HttpStatus.NOT_FOUND);
        when(restTemplate.exchange("http:localhost/annotation/w3c/services/search/target?value=%www.target.com%&fields=source", HttpMethod.GET,
                new HttpEntity<>(httpHeaders), AnnotationServerSearchResponse.class))
                .thenReturn(annotationServerCreateResponseResponseEntity);

        //Test
        sut.searchAnnotationsByTargetUrl(searchTargetUrl);
    }

}
