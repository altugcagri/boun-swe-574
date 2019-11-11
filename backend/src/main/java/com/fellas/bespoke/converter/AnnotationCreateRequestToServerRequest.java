package com.fellas.bespoke.converter;

import com.fellas.bespoke.client.request.AnnotationServerRequest;
import com.fellas.bespoke.controller.dto.request.AnnotationRequest;
import com.github.jsonldjava.core.JsonLdOptions;
import com.github.jsonldjava.core.JsonLdProcessor;
import com.github.jsonldjava.utils.JsonUtils;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class AnnotationCreateRequestToServerRequest implements Converter<AnnotationRequest, AnnotationServerRequest> {

    @Autowired
    private Gson gson;

    //todo test here
    @Override
    public AnnotationServerRequest convert(AnnotationRequest source) {
        String json = gson.toJson(source);
        Map context = new HashMap();
        context.put("@context", "http://www.w3.org/ns/anno.jsonld");
        context.put("type", "Annotation");
        JsonLdOptions options = new JsonLdOptions();
        Object compact = JsonLdProcessor.compact(json,context,options);
        AnnotationServerRequest annotationServerRequest = new AnnotationServerRequest();
        try {
            String request = JsonUtils.toString(compact);
            annotationServerRequest = gson.fromJson(request, AnnotationServerRequest.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return annotationServerRequest;
    }

}
