package com.fellas.bespoke.client.request;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSelector implements Serializable {

    private String type;
    private String value;
    private AnnotationSelectorRefinedBy refinedBy;

}
