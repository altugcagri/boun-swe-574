package com.fellas.bespoke.persistence;

import com.fellas.bespoke.persistence.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    Optional<Content> findById(Long contentId);

    List<Content> findByCreatedBy(Long userId);

    Long countByCreatedBy(Long userId);

    void deleteContentById(Long contentId);

}
