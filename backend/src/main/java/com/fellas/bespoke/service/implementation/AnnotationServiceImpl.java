package com.fellas.bespoke.service.implementation;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fellas.bespoke.client.AnnotationServerClient;
import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.controller.dto.response.ApiResponse;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.AnnotationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class AnnotationServiceImpl implements AnnotationService {

    private final AnnotationServerClient annotationServerClient;
    private final ConfigurableConversionService conversionService;
    private final ObjectMapper objectMapper;

    public AnnotationServiceImpl(AnnotationServerClient annotationServerClient,
                                 ConfigurableConversionService smepConversionService,
                                 ObjectMapper objectMapper) {
        this.annotationServerClient = annotationServerClient;
        this.conversionService = smepConversionService;
        this.objectMapper = objectMapper;
    }

    @Override
    public ResponseEntity<ApiResponse> createAnnotation(UserPrincipal currentUser, Annotation annotation) {
        AnnotationServerRequest annotationServerRequest = conversionService.convert(annotation,AnnotationServerRequest.class);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);

        try{
            String json = objectMapper.writeValueAsString(annotationServerRequest)
                    .replaceFirst("\\{", "\\{\"@context\": \"http://www.w3.org/ns/anno.jsonld\",");
            log.info("Annotation Server Request Json : {}", json);

            annotationServerClient.createAnnotation(json);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            return ResponseEntity.ok().body(new ApiResponse(false, "Annotation could not be created"));
        }

        return ResponseEntity.ok().body(new ApiResponse(true, "Annotation created successfully"));
    }

    @Override
    public ResponseEntity<List<Annotation>> getAnnotationsByTarget(UserPrincipal currentUser, String targetUrl) {
        AnnotationServerSearchResponse annotationServerSearchResponse = annotationServerClient.searchAnnotationsByTargetUrl(targetUrl);
        List<Annotation> annotations = conversionService.convert(annotationServerSearchResponse, List.class);
        return ResponseEntity.ok().body(annotations);
    }

}
