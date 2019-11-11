package com.fellas.bespoke.client;

import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.client.response.AnnotationServerCreateResponse;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class AnnotationServerClient {

    private final RestTemplate restTemplate;
    private static String ANNOTATION_SERVER_API_URL;

    public AnnotationServerClient(RestTemplate restTemplate,
                                  @Value("annotation.server.api.url") String annotationServerApiUrl){
        this.restTemplate = restTemplate;
        ANNOTATION_SERVER_API_URL = annotationServerApiUrl;
    }

    public AnnotationServerCreateResponse createAnnotation(AnnotationServerRequest annotationServerRequest){
        ResponseEntity<AnnotationServerCreateResponse> response = restTemplate.exchange(ANNOTATION_SERVER_API_URL,
                HttpMethod.POST, new HttpEntity<>(annotationServerRequest,getHttpHeaders()), AnnotationServerCreateResponse.class);
        //todo implement here
        //checkResponse(response);
        return response.getBody();
    }

    public AnnotationServerSearchResponse searchAnnotationsByTargetUrl(String url){
        StringBuilder apiUrl = new StringBuilder();
        apiUrl.append(ANNOTATION_SERVER_API_URL)
                .append("services/search/target?value=%")
                .append(url)
                .append("%&fields=source");

        ResponseEntity<AnnotationServerSearchResponse> response = restTemplate.exchange(apiUrl.toString(),
                HttpMethod.GET,  new HttpEntity<>(getHttpHeaders()), AnnotationServerSearchResponse.class);
        //todo implement here
        //checkResponse(response);
        return response.getBody();
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.CONTENT_TYPE, "application/ld+json; profile=\"http://www.w3.org/ns/anno.jsonld\"");
        httpHeaders.set(HttpHeaders.ACCEPT, "application/ld+json; profile=\"http://www.w3.org/ns/anno.jsonld\"");
        return httpHeaders;
    }


}
