package com.fellas.bespoke.service;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.security.UserPrincipal;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public abstract class AbstractServiceTest {

    public static UserPrincipal currentUser;

    @BeforeClass
    public static void setUp() {
        currentUser = TestUtils.createDummyCurrentUser();
    }
}
