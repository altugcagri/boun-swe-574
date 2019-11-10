package com.fellas.bespoke.controller.dto.request;

import com.fellas.bespoke.persistence.model.Content;
import com.fellas.bespoke.persistence.model.User;
import com.fellas.bespoke.persistence.model.WikiData;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopicRequest {

    private Long id = 0L;

    @NotBlank
    private String title;

    @NotBlank
    private String description;
    
    private String createdByName;

    @NotBlank
    private String imageUrl;

    @Nullable
    private Set<WikiData> wikiData;

    @Nullable
    private Set<User> enrolledUsers;

    @Nullable
    private List<Content> contentList;

}
