package com.fellas.bespoke.converter;

import com.fellas.bespoke.client.response.AnnotationCollection;
import com.fellas.bespoke.client.response.AnnotationServerCreateResponse;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.Annotation;
import org.springframework.core.convert.converter.Converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ASSearchResponseToAnnotationResponse implements Converter<AnnotationServerSearchResponse, List<Annotation>> {

    @Override
    public List<Annotation> convert(AnnotationServerSearchResponse searchResponse) {
        final List<Annotation> annotations = new ArrayList<>();
        final AnnotationCollection annotationCollection = Optional.ofNullable(searchResponse.getFirst()).orElse(new AnnotationCollection());
        final List<AnnotationServerCreateResponse> items = annotationCollection.getItems();

        if (items != null) {
            items.stream().map(annotation -> Annotation.builder()
                    .author(annotation.getCreator())
                    .date(annotation.getCreated())
                    .annotatedText(annotation.getTarget().getSelector().getRefinedBy() != null ?
                            annotation.getTarget().getSelector().getRefinedBy().getExact() : "")
                    .comment(annotation.getBody().getValue())
                    .motivation(annotation.getMotivation())
                    .page(annotation.getTarget().getSource())
                    .selector(annotation.getTarget().getSelector().getValue())
                    .build()).forEach(annotations::add);
        }

        return annotations;
    }

}
