package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.ContentRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.ContentResponse;
import com.fellas.bespoke.security.CurrentUser;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ContentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(value = "/api/contents")
public class ContentController {

    private ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @Transactional
    @PostMapping(value = "/")
    public ResponseEntity<ApiResponse> createContentByTopicId(@CurrentUser UserPrincipal currentUser,
                                                              @Valid @RequestBody ContentRequest contentRequest) {
        return contentService.createContentByTopicId(currentUser, contentRequest);
    }

    @Transactional
    @GetMapping(value = "/{contentId}")
    public ResponseEntity<ContentResponse> getContentById(@CurrentUser UserPrincipal currentUser,
                                                          @PathVariable Long contentId) {
        return contentService.getContentById(currentUser, contentId);
    }

    @Transactional
    @DeleteMapping(value = "/{contentId}")
    public ResponseEntity<ApiResponse> deleteContentById(@CurrentUser UserPrincipal currentUser,
                                                         @PathVariable Long contentId) {
        return contentService.deleteContentById(currentUser, contentId);
    }

}
