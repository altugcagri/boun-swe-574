package com.fellas.bespoke.service;

import com.fellas.bespoke.controller.dto.request.EnrollmentRequest;
import com.fellas.bespoke.controller.dto.request.PublishRequest;
import com.fellas.bespoke.controller.dto.request.TopicRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TopicService {

    ResponseEntity<List<TopicResponse>> getAllTopics(UserPrincipal currentUser);

    ResponseEntity<List<TopicResponse>> getTopicsCreatedBy(String username, UserPrincipal currentUser);

    ResponseEntity<TopicResponse> getTopicById(Long topicId, UserPrincipal currentUser);

    ResponseEntity<TopicResponse> createTopic(UserPrincipal currentUser, TopicRequest topicRequest);

    ResponseEntity<ApiResponse> publishStatusUpdate(UserPrincipal currentUser, PublishRequest publishRequest);

    ResponseEntity<ApiResponse> deleteTopicById(Long topicId, UserPrincipal currentUser);

    ResponseEntity<ApiResponse> enrollToTopicByUsername(UserPrincipal currentUser, EnrollmentRequest enrollmentRequest);

    ResponseEntity<List<TopicResponse>> getTopicsByEnrolledUserId(UserPrincipal currentUser, Long userId);
}
