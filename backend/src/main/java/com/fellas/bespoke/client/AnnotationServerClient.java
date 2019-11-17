package com.fellas.bespoke.client;

import com.fellas.bespoke.client.response.AnnotationServerCreateResponse;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.AnnotationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class AnnotationServerClient {

    private final RestTemplate restTemplate;

    @Value("${annotation.server.api.url}")
    private String annotationServerApiUrl;

    @Value("${annotation.container.id}")
    private String annotationContainerId;

    public AnnotationServerClient(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public AnnotationServerCreateResponse createAnnotation(String annotationServerRequest){
        StringBuilder apiUrl = new StringBuilder();
        apiUrl.append(annotationServerApiUrl)
                .append(annotationContainerId);

        ResponseEntity<AnnotationServerCreateResponse> response = restTemplate.exchange(apiUrl.toString(),
                HttpMethod.POST, new HttpEntity<>(annotationServerRequest,getHttpHeaders()), AnnotationServerCreateResponse.class);

        if (response.getStatusCode() != HttpStatus.CREATED) {
            throw new AnnotationException("Annotation could not be created");
        }

        return response.getBody();
    }

    public AnnotationServerSearchResponse searchAnnotationsByTargetUrl(String url){
        StringBuilder apiUrl = new StringBuilder();
        apiUrl.append(annotationServerApiUrl)
                .append("services/search/target?value=%")
                .append(url)
                .append("%&fields=source");

        ResponseEntity<AnnotationServerSearchResponse> response = restTemplate.exchange(apiUrl.toString(),
                HttpMethod.GET,  new HttpEntity<>(getHttpHeaders()), AnnotationServerSearchResponse.class);

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new AnnotationException("Annotations could not be retrieved from Annotation Server");
        }

        return response.getBody();
    }


    private HttpHeaders getHttpHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.CONTENT_TYPE, "application/ld+json; profile=\"http://www.w3.org/ns/anno.jsonld\"");
        httpHeaders.set(HttpHeaders.ACCEPT, "application/ld+json; profile=\"http://www.w3.org/ns/anno.jsonld\"");
        return httpHeaders;
    }


}
