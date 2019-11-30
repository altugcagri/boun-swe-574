package com.fellas.bespoke.client.request;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationTarget implements Serializable {

    private String source;
    private AnnotationSelector selector;

}
