package com.fellas.bespoke.controller.dto.response;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSummary {

    private Long id;
    private String username;
    private String name;

}
