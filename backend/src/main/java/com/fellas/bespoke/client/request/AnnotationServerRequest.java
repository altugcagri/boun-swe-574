package com.fellas.bespoke.client.request;

import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationServerRequest implements Serializable {

    private String type;
    private String creator;
    private String created;
    private AnnotationBody body;
    private AnnotationTarget target;

}
