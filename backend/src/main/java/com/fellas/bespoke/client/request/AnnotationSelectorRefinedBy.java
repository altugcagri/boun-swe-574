package com.fellas.bespoke.client.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSelectorRefinedBy {

    private String type;
    private String exact;
    private String prefix;
    private String suffix;

}
