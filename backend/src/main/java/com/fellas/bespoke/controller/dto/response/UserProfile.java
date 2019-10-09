package com.fellas.bespoke.controller.dto.response;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    private Long id;
    private String username;
    private String name;
    private Instant joinedAt;
    private Long topicCount;

}
