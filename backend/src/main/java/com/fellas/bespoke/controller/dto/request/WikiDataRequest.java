package com.fellas.bespoke.controller.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WikiDataRequest {

    @NotBlank
    private String id;
    @NotBlank
    private String label;
    private String description;
    private String conceptUri;

}
