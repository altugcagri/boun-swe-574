package com.fellas.bespoke.persistence;

import com.fellas.bespoke.persistence.model.LearningStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LearningStepRepository extends JpaRepository<LearningStep, Long> {

    Optional<LearningStep> findByUserIdAndContentIdAndQuestionIdAndAnswerId(Long userId, Long contentId,
                                                                            Long questionId, Long answerId);

    List<LearningStep> findByUserIdAndContentId(Long userId, Long contentId);
}
