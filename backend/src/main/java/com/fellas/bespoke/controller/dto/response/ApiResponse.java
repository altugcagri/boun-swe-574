package com.fellas.bespoke.controller.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    private Boolean success;
    private String message;

}
