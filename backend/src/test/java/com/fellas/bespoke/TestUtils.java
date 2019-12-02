package com.fellas.bespoke;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fellas.bespoke.client.request.*;
import com.fellas.bespoke.client.response.AnnotationCollection;
import com.fellas.bespoke.client.response.AnnotationServerCreateResponse;
import com.fellas.bespoke.client.response.AnnotationServerSearchResponse;
import com.fellas.bespoke.controller.dto.request.*;
import com.fellas.bespoke.controller.dto.response.ContentResponse;
import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.persistence.model.*;
import com.fellas.bespoke.security.UserPrincipal;
import org.springframework.http.HttpHeaders;

import java.util.*;

public class TestUtils {

    public static ChoiceRequest createDummyChoiceRequest() {
        final ChoiceRequest choiceRequest = new ChoiceRequest();
        choiceRequest.setCorrect(true);
        choiceRequest.setQuestionId(0L);
        choiceRequest.setText("someText");
        return choiceRequest;
    }

    public static Choice createDummyChoice() {
        final Choice choice = new Choice();
        choice.setCorrect(true);
        choice.setId(0L);
        choice.setText("someText");
        return choice;
    }

    public static List<Choice> createDummyChoiceList() {
        final List<Choice> choiceList = new ArrayList<>();
        choiceList.add(createDummyChoice());
        return choiceList;
    }

    public static ContentRequest createDummyContentRequest() {
        final ContentRequest contentRequest = new ContentRequest();
        contentRequest.setId(0L);
        contentRequest.setTitle("someTitle");
        contentRequest.setTopicId(0L);
        contentRequest.setText("someText");
        return contentRequest;
    }

    public static Content createDummyContent() {
        final Content content = new Content();
        content.setId(0L);
        content.setTitle("someTitle");
        content.setText("someText");
        content.setTopic(createDummyTopic());
        return content;
    }

    public static ContentResponse createDummyContentResponse() {
        final ContentResponse contentResponse = new ContentResponse();
        contentResponse.setId(0L);
        contentResponse.setTitle("someTitle");
        contentResponse.setText("someText");
        contentResponse.setTopicId(0L);
        return contentResponse;
    }

    public static Topic createDummyTopic() {
        final Topic topic = new Topic();
        topic.setId(0L);
        topic.setDescription("someDescription");
        topic.setTitle("someTitle");
        topic.setImageUrl("someImgUrl");
        topic.setWikiDataSet(createDummyWikiDataSet());
        topic.setEnrolledUsers(createDummyUserSet());
        return topic;
    }

    public static List<Topic> createDummyTopicList() {
        final List<Topic> topicList = new ArrayList<>();
        topicList.add(createDummyTopic());
        return topicList;
    }

    public static Question createDummyQuestion() {
        final Question question = new Question();
        question.setId(0L);
        question.setText("someText");
        question.setContent(createDummyContent());
        return question;
    }

    public static List<Question> createDummyQuetionList() {
        final List<Question> questionList = new ArrayList<>();
        questionList.add(createDummyQuestion());
        return questionList;
    }

    public static QuestionRequest createDummyQuestionRequest() {
        final QuestionRequest questionRequest = new QuestionRequest();
        questionRequest.setContentId(0L);
        questionRequest.setText("someText");
        return questionRequest;
    }

    public static TopicRequest createDummyTopicRequest() {
        final TopicRequest topicRequest = new TopicRequest();
        topicRequest.setEnrolledUsers(createDummyUserSet());
        topicRequest.setWikiData(createDummyWikiDataSet());
        topicRequest.setContentList(createDummyContentList());
        topicRequest.setId(0L);
        topicRequest.setDescription("someDescription");
        topicRequest.setImageUrl("someImageUrl");
        topicRequest.setTitle("someTitle");
        return topicRequest;
    }

    public static TopicResponse createDummyTopicResponse() {
        final TopicResponse topicResponse = new TopicResponse();
        topicResponse.setWikiData(createDummyWikiDataSet());
        topicResponse.setContentList(createDummyContentList());
        topicResponse.setId(0L);
        topicResponse.setDescription("someDescription");
        topicResponse.setImageUrl("someImageUrl");
        topicResponse.setTitle("someTitle");
        return topicResponse;
    }

    public static WikiData createDummyWikiData() {
        final WikiData wikiData = new WikiData();
        wikiData.setId("id");
        wikiData.setDescription("someDescription");
        wikiData.setConceptUri("someConceptUri");
        wikiData.setLabel("someLabel");
        return wikiData;
    }

    public static Set<WikiData> createDummyWikiDataSet() {
        final Set<WikiData> wikiDataSet = new HashSet<>();
        wikiDataSet.add(createDummyWikiData());
        return wikiDataSet;
    }

    public static List<Content> createDummyContentList() {
        final List<Content> contentList = new ArrayList<>();
        contentList.add(createDummyContent());
        return contentList;
    }

    public static User createDummyUser() {
        final User user = new User();
        user.setEmail("email");
        user.setId(0L);
        user.setName("name");
        user.setPassword("pass");
        user.setUsername("userName");
        return user;
    }

    public static Set<User> createDummyUserSet() {
        final Set<User> userSet = new HashSet<>();
        userSet.add(createDummyUser());
        return userSet;
    }

    public static UserPrincipal createDummyCurrentUser() {
        return UserPrincipal
                .create(User.builder().name("name").username("username").email("email").id(0L).password("pass")
                        .enrolledTopics(new HashSet<>()).build());
    }

    public static EnrollmentRequest createDummyEnrollmentRequest() {
        final EnrollmentRequest enrollmentRequest = new EnrollmentRequest();
        enrollmentRequest.setTopicId(0L);
        enrollmentRequest.setUsername("username");
        return enrollmentRequest;
    }

    public static SignUpRequest createDummySignUpRequest() {
        final SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setEmail("email");
        signUpRequest.setName("name");
        signUpRequest.setPassword("pass");
        signUpRequest.setUsername("username");
        return signUpRequest;

    }

    public static LoginRequest createDummyLoginRequest() {
        final LoginRequest loginRequest = new LoginRequest();
        loginRequest.setPassword("pass");
        loginRequest.setUsernameOrEmail("usernameOrEmail");
        return loginRequest;
    }

    public static PublishRequest createDummyPublishRequest() {
        final PublishRequest publishRequest = new PublishRequest();
        publishRequest.setPublish(true);
        publishRequest.setTopicId(0L);
        return publishRequest;
    }

    public static LearningStep createDummyLearningStep() {
        final LearningStep learningStep = new LearningStep();
        learningStep.setAnswerId(0L);
        learningStep.setContentId(0L);
        learningStep.setQuestionId(0L);
        learningStep.setUserId(0L);
        learningStep.setCreatedBy(0L);
        return learningStep;
    }

    public static List<LearningStep> createDummyLearningStepList() {
        final List<LearningStep> learningSteps = new ArrayList<>();
        learningSteps.add(createDummyLearningStep());
        return learningSteps;
    }

    public static AnswerRequest createDummyAnswerRequest() {
        final AnswerRequest answerRequest = new AnswerRequest();
        answerRequest.setChoiceId(0L);
        answerRequest.setQuestionId(0L);
        return answerRequest;
    }

    public static ActivityStream createDummyActivityStream(){
        return new ActivityStream();
    }

    public static Annotation createDummyAnnotation() {
        final Annotation annotation = Annotation.builder()
                .annotatedText("annotated-text")
                .author("author")
                .comment("comment")
                .page("www.target.com")
                .selector("#elemid > .elemclass + p")
                .date("2019-11-30T13:08Z")
                .build();
        return annotation;
    }

    public static AnnotationServerRequest createDummyAnnotationServerRequest() {
        final AnnotationServerRequest annotationServerRequest = AnnotationServerRequest.builder()
                .type("Annotation")
                .created("2019-11-30T13:08Z")
                .creator("author")
                .body(AnnotationBody.builder().type("TextualBody").value("comment").build())
                .target(AnnotationTarget.builder().source("www.target.com")
                        .selector(AnnotationSelector.builder().type("CssSelector").value("#elemid > .elemclass + p")
                                .refinedBy(AnnotationSelectorRefinedBy.builder().exact("comment").type("TextQuoteSelector").build())
                                .build())
                        .build())
                .build();
        return annotationServerRequest;
    }

    public static AnnotationServerSearchResponse createDummyAnnotationServerSearchResponse() {
        final AnnotationServerSearchResponse annotationServerSearchResponse = AnnotationServerSearchResponse.builder()
                .id("id")
                .last("last")
                .total(1)
                .type("AnnotationCollection")
                .first(AnnotationCollection.builder().items(Arrays.asList(createDummyAnnotationServerCreateResponse())).build())
                .build();
        return annotationServerSearchResponse;
    }

    public static AnnotationServerCreateResponse createDummyAnnotationServerCreateResponse() {
        final AnnotationServerCreateResponse annotationServerCreateResponse = AnnotationServerCreateResponse.builder()
                .id("id")
                .created("2019-11-30T13:08Z")
                .creator("author")
                .type("Annotation")
                .body(AnnotationBody.builder().type("TextualBody").value("comment").build())
                .target(AnnotationTarget.builder().source("www.target.com")
                        .selector(AnnotationSelector.builder().type("CssSelector").value("#elemid > .elemclass + p")
                                .refinedBy(AnnotationSelectorRefinedBy.builder().exact("comment").type("TextQuoteSelector").build())
                                .build())
                        .build())
                .build();
        return annotationServerCreateResponse;
    }

    public static String createDummyAnnotationServerCreateRequestJson() throws JsonProcessingException {
        ObjectMapper objectMapper =  new ObjectMapper();
        return objectMapper.writeValueAsString(createDummyAnnotationServerRequest())
                .replaceFirst("\\{", "\\{\"@context\": \"http://www.w3.org/ns/anno.jsonld\",");
    }

    public static HttpHeaders createDummyAnnotationServerHttpHeaders(){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(org.springframework.http.HttpHeaders.CONTENT_TYPE, "application/ld+json; profile=\"http://www.w3.org/ns/anno.jsonld\"");
        httpHeaders.set(org.springframework.http.HttpHeaders.ACCEPT, "application/ld+json; profile=\"http://www.w3.org/ns/anno.jsonld\"");
        return httpHeaders;
    }
}
