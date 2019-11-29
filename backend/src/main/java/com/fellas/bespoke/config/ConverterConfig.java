package com.fellas.bespoke.config;

import com.fellas.bespoke.converter.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.core.convert.support.GenericConversionService;

@Configuration
public class ConverterConfig {

    @Bean
    public ConfigurableConversionService bespokeConversionService() {
        final ContentRequestToContent contentRequestToContent = new ContentRequestToContent();
        final QuestionRequestToQuestion questionRequestToQuestion = new QuestionRequestToQuestion();
        final ChoiceRequestToChoice choiceRequestToChoice = new ChoiceRequestToChoice();
        final TopicRequestToTopic topicRequestToTopic = new TopicRequestToTopic();
        final TopicToTopicResponse topicToTopicResponse = new TopicToTopicResponse();
        final ContentToContentResponse contentToContentResponse = new ContentToContentResponse();
        final ConfigurableConversionService conversionService = new GenericConversionService();
        final AnnotationCreateRequestToASRequest annotationCreateRequestToASRequest = new AnnotationCreateRequestToASRequest();
        final ASSearchResponseToAnnotationResponse ASSearchResponseToAnnotationResponse = new ASSearchResponseToAnnotationResponse();
        conversionService.addConverter(contentRequestToContent);
        conversionService.addConverter(questionRequestToQuestion);
        conversionService.addConverter(choiceRequestToChoice);
        conversionService.addConverter(topicRequestToTopic);
        conversionService.addConverter(topicToTopicResponse);
        conversionService.addConverter(contentToContentResponse);
        conversionService.addConverter(annotationCreateRequestToASRequest);
        conversionService.addConverter(ASSearchResponseToAnnotationResponse);

        return conversionService;
    }
}
