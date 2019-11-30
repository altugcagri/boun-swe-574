package com.fellas.bespoke.client.request;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSelectorRefinedBy implements Serializable {

    private String type;
    private String exact;
    private String prefix;
    private String suffix;

}
