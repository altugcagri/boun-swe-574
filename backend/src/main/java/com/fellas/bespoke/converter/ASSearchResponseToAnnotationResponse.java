package com.fellas.bespoke.converter;

import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.Annotation;
import com.fellas.bespoke.controller.dto.response.AnnotationResponse;
import org.springframework.core.convert.converter.Converter;

import java.util.ArrayList;
import java.util.List;

public class ASSearchResponseToAnnotationResponse implements Converter<AnnotationServerSearchResponse, AnnotationResponse> {

    @Override
    public AnnotationResponse convert(AnnotationServerSearchResponse searchResponse) {
        List<Annotation> annotations = new ArrayList<>();

        searchResponse.getFirst().getItems().stream().forEach(annotation -> {
            Annotation retrievedAnnotation = Annotation.builder()
                    .author(annotation.getCreator())
                    .date(annotation.getCreated())
                    .annotatedText(annotation.getTarget().getSelector().getRefinedBy() != null ? annotation.getTarget().getSelector().getRefinedBy().getExact() : "" )
                    .comment(annotation.getBody().getValue())
                    .page(annotation.getTarget().getSource())
                    .selector(annotation.getTarget().getSelector().getValue())
                    .build();

            annotations.add(retrievedAnnotation);
        });

        return AnnotationResponse.builder().annotations(annotations).build();
    }

}
