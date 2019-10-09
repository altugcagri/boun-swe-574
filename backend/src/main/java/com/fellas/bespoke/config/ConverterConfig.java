package com.fellas.bespoke.config;

import com.fellas.bespoke.converter.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.core.convert.support.GenericConversionService;

@Configuration
public class ConverterConfig {

    @Bean
    public ConfigurableConversionService smepConversionService() {
        final ContentRequestToContent contentRequestToContent = new ContentRequestToContent();
        final QuestionRequestToQuestion questionRequestToQuestion = new QuestionRequestToQuestion();
        final ChoiceRequestToChoice choiceRequestToChoice = new ChoiceRequestToChoice();
        final TopicRequestToTopic topicRequestToTopic = new TopicRequestToTopic();
        final TopicToTopicResponse topicToTopicResponse = new TopicToTopicResponse();
        final ContentToContentResponse contentToContentResponse = new ContentToContentResponse();
        final ConfigurableConversionService conversionService = new GenericConversionService();
        conversionService.addConverter(contentRequestToContent);
        conversionService.addConverter(questionRequestToQuestion);
        conversionService.addConverter(choiceRequestToChoice);
        conversionService.addConverter(topicRequestToTopic);
        conversionService.addConverter(topicToTopicResponse);
        conversionService.addConverter(contentToContentResponse);
        return conversionService;
    }
}
