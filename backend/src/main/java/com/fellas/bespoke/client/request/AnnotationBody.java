package com.fellas.bespoke.client.request;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationBody implements Serializable {

    private String type;
    private String value;

}
