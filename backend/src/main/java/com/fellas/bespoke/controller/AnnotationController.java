package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.AnnotationRequest;
import com.fellas.bespoke.controller.dto.response.AnnotationResponse;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.AnnotationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(value = "api/annotation")
public class AnnotationController {

    private final AnnotationService annotationService;

    public AnnotationController(AnnotationService annotationService) {
        this.annotationService = annotationService;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<ApiResponse> createAnnotation(@CurrentUser UserPrincipal currentUser,
                                                              @Valid @RequestBody AnnotationRequest annotationRequest) {
        return annotationService.createAnnotation(currentUser,annotationRequest);
    }

    @Transactional
    @GetMapping
    public ResponseEntity<AnnotationResponse> getAnnotations(@CurrentUser UserPrincipal currentUser,
                                                                     @RequestParam(value = "page") String pageUrl) {
        return annotationService.getAnnotationsByTarget(currentUser,pageUrl);
    }


}
