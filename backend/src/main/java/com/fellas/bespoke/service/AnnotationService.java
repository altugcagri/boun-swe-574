package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.AnnotationRequest;
import com.fellas.bespoke.controller.dto.response.AnnotationResponse;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface AnnotationService {

    ResponseEntity<ApiResponse> createAnnotation(UserPrincipal currentUser, AnnotationRequest annotationRequest);

    ResponseEntity<AnnotationResponse> getAnnotationsByTarget(UserPrincipal currentUser, String targetUrl);

}
