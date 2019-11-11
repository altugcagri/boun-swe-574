package com.fellas.bespoke.client.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSelector {

    private String type;
    private String value;
    private AnnotationSelectorRefinedBy refinedBy;

}
