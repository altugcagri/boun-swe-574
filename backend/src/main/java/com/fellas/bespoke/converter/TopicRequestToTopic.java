package com.fellas.bespoke.converter;

import com.fellas.bespoke.controller.dto.request.TopicRequest;
import com.fellas.bespoke.persistence.model.Topic;
import org.springframework.core.convert.converter.Converter;

public class TopicRequestToTopic implements Converter<TopicRequest, Topic> {

    @Override
    public Topic convert(TopicRequest source) {

        final Topic topic = Topic.builder()
                .title(source.getTitle())
                .description(source.getDescription())
                .wikiDataSet(source.getWikiData())
                .enrolledUsers(source.getEnrolledUsers())
                .imageUrl(source.getImageUrl())
                .createdByName(source.getCreatedByName())
                .build();

        if (source.getId() != 0L) {
            topic.setId(source.getId());
        }

        return topic;
    }
}
