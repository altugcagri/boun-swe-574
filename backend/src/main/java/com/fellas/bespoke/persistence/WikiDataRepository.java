package com.fellas.bespoke.persistence;

import com.fellas.bespoke.persistence.model.WikiData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WikiDataRepository extends JpaRepository<WikiData, String> {

}
