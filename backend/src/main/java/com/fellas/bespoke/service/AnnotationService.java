package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AnnotationService {

    ResponseEntity<ApiResponse> createAnnotation(UserPrincipal currentUser, Annotation annotation);

    ResponseEntity<List<Annotation>> getAnnotationsByTarget(UserPrincipal currentUser, String targetUrl);

}
