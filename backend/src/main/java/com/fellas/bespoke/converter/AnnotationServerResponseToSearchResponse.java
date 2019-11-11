package com.fellas.bespoke.converter;

import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.response.AnnotationResponse;
import org.springframework.core.convert.converter.Converter;

public class AnnotationServerResponseToSearchResponse implements Converter<AnnotationServerSearchResponse, AnnotationResponse> {

    @Override
    public AnnotationResponse convert(AnnotationServerSearchResponse source) {
        return null;
    }

}
