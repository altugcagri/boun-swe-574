package com.fellas.bespoke.controller.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

    private String name;

    private boolean currentUserIsAlreadyFollowing;

    private List<TopicResponse> topics;
}
