package com.fellas.bespoke.client.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationTarget {

    private String source;
    private AnnotationSelector selector;

}
