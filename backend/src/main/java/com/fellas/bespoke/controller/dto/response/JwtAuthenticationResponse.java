package com.fellas.bespoke.controller.dto.response;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {

    private String accessToken;
    private static String tokenType = "Bearer";
    private String usernameOrEmail;

}
