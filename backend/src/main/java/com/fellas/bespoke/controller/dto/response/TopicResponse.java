package com.fellas.bespoke.controller.dto.response;

import com.fellas.bespoke.persistence.model.Content;
import com.fellas.bespoke.persistence.model.WikiData;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopicResponse {

    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private Long createdBy;
    private String createdByName;
    private Instant creationDateTime;
    private Set<WikiData> wikiData;
    private List<Content> contentList;
    private boolean published;

}
