package com.fellas.bespoke.client.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationServerRequest implements Serializable {

    private String type;
    private String creator;
    private String created;
    private String motivation;
    private AnnotationBody body;
    private AnnotationTarget target;

}
