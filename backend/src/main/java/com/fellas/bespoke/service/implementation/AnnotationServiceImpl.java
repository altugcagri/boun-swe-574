package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.client.AnnotationServerClient;
import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.AnnotationRequest;
import com.fellas.bespoke.controller.dto.response.AnnotationResponse;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.AnnotationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AnnotationServiceImpl implements AnnotationService {

    private final AnnotationServerClient annotationServerClient;
    private final ConfigurableConversionService conversionService;

    public AnnotationServiceImpl(AnnotationServerClient annotationServerClient, ConfigurableConversionService smepConversionService) {
        this.annotationServerClient = annotationServerClient;
        this.conversionService = smepConversionService;
    }

    @Override
    public ResponseEntity<ApiResponse> createAnnotation(UserPrincipal currentUser, AnnotationRequest annotationRequest) {
        AnnotationServerRequest annotationServerRequest = conversionService.convert(annotationRequest,AnnotationServerRequest.class);
        annotationServerClient.createAnnotation(annotationServerRequest);
        return ResponseEntity.ok().body(new ApiResponse(true, "Annotation created successfully"));
    }

    @Override
    public ResponseEntity<AnnotationResponse> getAnnotationsByTarget(UserPrincipal currentUser,String targetUrl) {
        AnnotationServerSearchResponse annotationServerSearchResponse = annotationServerClient.searchAnnotationsByTargetUrl(targetUrl);
        AnnotationResponse annotationResponse = conversionService.convert(annotationServerSearchResponse, AnnotationResponse.class);
        return ResponseEntity.ok().body(annotationResponse);
    }

}
