package com.fellas.bespoke.persistence;

import com.fellas.bespoke.persistence.model.ActivityStream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityStreamRepository extends JpaRepository<ActivityStream, Long> {
}
