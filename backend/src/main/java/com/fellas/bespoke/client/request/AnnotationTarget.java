package com.fellas.bespoke.client.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationTarget {

    private String source;
    private AnnotationSelector selector;

}
