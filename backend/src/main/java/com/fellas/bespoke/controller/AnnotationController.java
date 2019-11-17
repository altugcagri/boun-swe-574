package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.AnnotationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@Validated
@RequestMapping(value = "api/annotation")
public class AnnotationController {

    private final AnnotationService annotationService;

    public AnnotationController(AnnotationService annotationService) {
        this.annotationService = annotationService;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<ApiResponse> createAnnotation(@CurrentUser UserPrincipal currentUser,
                                                              @Valid @RequestBody Annotation annotation) {
        return annotationService.createAnnotation(currentUser, annotation);
    }

    @Transactional
    @GetMapping
    public ResponseEntity<List<Annotation>> getAnnotations(@CurrentUser UserPrincipal currentUser,
                                                           @RequestParam(value = "page") String pageUrl) {
        return annotationService.getAnnotationsByTarget(currentUser,pageUrl);
    }


}
