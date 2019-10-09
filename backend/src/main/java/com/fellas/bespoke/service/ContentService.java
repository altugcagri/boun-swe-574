package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.ContentRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.ContentResponse;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

public interface ContentService {

    ResponseEntity<ApiResponse> createContentByTopicId(UserPrincipal currentUser, ContentRequest contentRequest);

    ResponseEntity<ContentResponse> getContentById(UserPrincipal currentUser, Long contentId);

    ResponseEntity<ApiResponse> deleteContentById(UserPrincipal currentUser, Long contentId);

}
