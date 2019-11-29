package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.request.ContentRequest;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.controller.dto.response.ContentResponse;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.ContentRepository;
import com.fellas.bespoke.persistence.TopicRepository;
import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import com.fellas.bespoke.service.ContentService;
import com.fellas.bespoke.service.util.BespokeUtilities;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ContentServiceImpl implements ContentService {

    private static final String TOPIC = "Topic";
    private static final String CONTENT = "Content";

    private ContentRepository contentRepository;

    private TopicRepository topicRepository;

    private ActivityService activityService;

    private ConfigurableConversionService bespokeConversionService;

    public ContentServiceImpl(ContentRepository contentRepository, TopicRepository topicRepository,
                              ActivityService activityService, ConfigurableConversionService bespokeConversionService) {
        this.contentRepository = contentRepository;
        this.topicRepository = topicRepository;
        this.activityService = activityService;
        this.bespokeConversionService = bespokeConversionService;
    }

    @Override
    public ResponseEntity<ApiResponse> createContentByTopicId(UserPrincipal currentUser,
                                                              ContentRequest contentRequest) {

        final Topic topic = topicRepository.findById(contentRequest.getTopicId())
                .orElseThrow(
                        () -> new ResourceNotFoundException(TOPIC, "id", contentRequest.getTopicId().toString()));

        BespokeUtilities.checkCreatedBy(TOPIC, currentUser.getId(), topic.getCreatedBy());

        final Content content = bespokeConversionService.convert(contentRequest, Content.class);
        content.setTopic(topic);
        contentRepository.save(content);

        if (topic.isPublished()){
            activityService.createTopicActivityByUser(currentUser, topic, ActivityContentType.USER, ActivityStreamType.Add, "added a new content to");
            activityService.createTopicActivityByTopic(topic, ActivityContentType.TOPIC, ActivityStreamType.Update, " 's content is updated. Check out out!");
        }

        return ResponseEntity.ok().body(new ApiResponse(true, "Content created successfully"));
    }

    @Override
    public ResponseEntity<ContentResponse> getContentById(UserPrincipal currentUser, Long contentId) {

        final Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException(CONTENT, "id", contentId.toString()));

        final ContentResponse contentResponse = bespokeConversionService.convert(content, ContentResponse.class);

        final AtomicLong nextContentId = new AtomicLong(0L);

        content.getTopic().getContentList().stream()
                .map(Content::getId).collect(Collectors.toList()).stream().filter(id -> id > contentId).min(
                Comparator.comparing(Long::valueOf)).ifPresent(nextContentId::set);

        Objects.requireNonNull(contentResponse).setNextContentId(nextContentId.get());

        return ResponseEntity.ok().body(contentResponse);
    }

    @Override
    public ResponseEntity<ApiResponse> deleteContentById(UserPrincipal currentUser, Long contentId) {

        final Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException(CONTENT, "id", contentId.toString()));

        BespokeUtilities.checkCreatedBy(CONTENT, currentUser.getId(), content.getCreatedBy());

        contentRepository.delete(content);
        return ResponseEntity.ok().body(new ApiResponse(true, "Content deleted successfully"));
    }

}
