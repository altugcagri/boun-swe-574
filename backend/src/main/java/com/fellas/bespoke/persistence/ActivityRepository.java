package com.fellas.bespoke.persistence;

import com.fellas.bespoke.persistence.model.ActivityContentType;
import com.fellas.bespoke.persistence.model.ActivityWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<ActivityWrapper, Long> {

    List<ActivityWrapper> findByActorIdInAndActivityContentType(List<Long> actorIdList, ActivityContentType contentType);
}
