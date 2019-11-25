package com.fellas.bespoke.converter;

import com.fellas.bespoke.client.request.*;
import com.fellas.bespoke.controller.dto.request.Annotation;
import org.springframework.core.convert.converter.Converter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class AnnotationCreateRequestToASRequest implements Converter<Annotation, AnnotationServerRequest> {

    private static final String BODY_TYPE = "TextualBody";
    private static final String TYPE = "Annotation";
    private static final String SELECTOR = "CssSelector";
    private static final String REFINED_BY_TYPE = "TextQuoteSelector";
    private static final TimeZone TIME_ZONE = TimeZone.getTimeZone("UTC");
    private static final DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'");

    @Override
    public AnnotationServerRequest convert(Annotation source) {
        DATE_FORMAT.setTimeZone(TIME_ZONE);
        return AnnotationServerRequest.builder()
                .type(TYPE)
                .created(DATE_FORMAT.format(new Date()))
                .creator(source.getAuthor())
                .body(AnnotationBody.builder().type(BODY_TYPE).value(source.getComment()).build())
                .target(AnnotationTarget.builder().source(source.getPage())
                        .selector(AnnotationSelector.builder().type(SELECTOR).value(source.getSelector())
                                .refinedBy(AnnotationSelectorRefinedBy.builder()
                                        .exact(source.getAnnotatedText())
                                        .type(REFINED_BY_TYPE)
                                        .build()).build()).build()).build();
    }

}
