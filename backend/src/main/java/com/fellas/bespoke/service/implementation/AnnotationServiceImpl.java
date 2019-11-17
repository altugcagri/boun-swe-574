package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.client.AnnotationServerClient;
import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.controller.dto.response.AnnotationResponse;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.AnnotationService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class AnnotationServiceImpl implements AnnotationService {

    private final AnnotationServerClient annotationServerClient;
    private final ConfigurableConversionService conversionService;
    private final Gson gson;

    public AnnotationServiceImpl(AnnotationServerClient annotationServerClient,
                                 ConfigurableConversionService smepConversionService,
                                 Gson gson) {
        this.annotationServerClient = annotationServerClient;
        this.conversionService = smepConversionService;
        this.gson = gson;
    }

    @Override
    public ResponseEntity<ApiResponse> createAnnotation(UserPrincipal currentUser, Annotation annotation) {
        AnnotationServerRequest annotationServerRequest = conversionService.convert(annotation,AnnotationServerRequest.class);

        String json = gson.toJson(annotationServerRequest)
                .replaceFirst("\\{", "\\{\"@context\": \"http://www.w3.org/ns/anno.jsonld\",");
        log.info("Annotation Server Request Json : {}", json);

        annotationServerClient.createAnnotation(json);
        return ResponseEntity.ok().body(new ApiResponse(true, "Annotation created successfully"));
    }

    @Override
    public ResponseEntity<AnnotationResponse> getAnnotationsByTarget(UserPrincipal currentUser,String targetUrl) {
        AnnotationServerSearchResponse annotationServerSearchResponse = annotationServerClient.searchAnnotationsByTargetUrl(targetUrl);
        AnnotationResponse annotationResponse = conversionService.convert(annotationServerSearchResponse, AnnotationResponse.class);
        return ResponseEntity.ok().body(annotationResponse);
    }

}
