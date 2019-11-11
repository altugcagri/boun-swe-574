package com.fellas.bespoke.controller.dto.response;

import com.fellas.bespoke.controller.dto.request.AnnotationRequest;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationResponse {

    private String status;
    private List<AnnotationRequest> annotations;

}
