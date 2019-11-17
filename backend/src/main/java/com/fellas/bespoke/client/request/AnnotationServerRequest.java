package com.fellas.bespoke.client.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationServerRequest {

    private String type;
    private String creator;
    private String created;
    private AnnotationBody body;
    private AnnotationTarget target;

}
