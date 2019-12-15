package com.fellas.bespoke.service;

import com.fellas.bespoke.persistence.model.UserHomePageSummary;
import com.fellas.bespoke.security.UserPrincipal;

public interface UserHomePageSummaryService {
    UserHomePageSummary getUserHomePageSummary(UserPrincipal currentUser);
}
