package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.controller.dto.response.UserIdentityAvailability;
import com.fellas.bespoke.controller.dto.response.UserProfile;
import com.fellas.bespoke.controller.dto.response.UserSummary;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.TopicRepository;
import com.fellas.bespoke.persistence.UserRepository;
import com.fellas.bespoke.persistence.model.User;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private TopicRepository topicRepository;

    public UserServiceImpl(UserRepository userRepository, TopicRepository topicRepository) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public UserSummary getCurrentUser(UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());
    }

    @Override
    public UserIdentityAvailability checkUsernameAvailability(String email) {
        return new UserIdentityAvailability(!userRepository.existsByEmail(email));
    }

    @Override
    public UserProfile getUserProfileByUserName(String username) {
        final User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("UserEntity", "username", username));

        assert user.getFollowedUsers() != null;
        final List<UserSummary> followedUsers = user.getFollowedUsers().stream().map(followedUser ->
                UserSummary.builder().name(followedUser.getName()).
                        username(followedUser.getUsername()).
                        id(followedUser.getId()).build())
                .collect(Collectors.toList());

        assert user.getEnrolledTopics() != null;
        final List<TopicResponse> enrolledTopics = user.getEnrolledTopics().stream().map(enrolledTopic ->
                TopicResponse.builder()
                        .id(enrolledTopic.getId())
                        .title(enrolledTopic.getTitle())
                        .wikiData(enrolledTopic.getWikiDataSet())
                        .build())
                .collect(Collectors.toList());

        return new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(),
                topicRepository.countByCreatedBy(user.getId()), followedUsers, enrolledTopics);
    }

    @Override
    public UserProfile getUserProfileByUserId(Long userId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("UserEntity", "userId", Long.toString(userId)));

        assert user.getFollowedUsers() != null;
        final List<UserSummary> followedUsers = user.getFollowedUsers().stream().map(followedUser ->
                UserSummary.builder().name(followedUser.getName()).
                        username(followedUser.getUsername()).
                        id(followedUser.getId()).build())
                .collect(Collectors.toList());

        assert user.getEnrolledTopics() != null;
        final List<TopicResponse> enrolledTopics = user.getEnrolledTopics().stream().map(enrolledTopic ->
                TopicResponse.builder()
                        .id(enrolledTopic.getId())
                        .title(enrolledTopic.getTitle())
                        .wikiData(enrolledTopic.getWikiDataSet())
                        .build())
                .collect(Collectors.toList());

        return new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(),
                topicRepository.countByCreatedBy(user.getId()), followedUsers, enrolledTopics);
    }
}
