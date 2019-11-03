package com.fellas.bespoke.security;

import com.fellas.bespoke.TestUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class JwtTokenProviderTest {

    @InjectMocks
    private final JwtTokenProvider sut = new JwtTokenProvider();


    @Before
    public void setUp() {
        sut.setJwtExpirationInMs(604800000);
        sut.setJwtSecret("JWTSuperSecretKey");
    }

    @Test
    public void testGenerateToken() {
        //Prepare
        final Authentication authentication = Mockito.mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(TestUtils.createDummyCurrentUser());
        //Test
        final String token = sut.generateToken(authentication);
        //Verify
        assertTrue(!StringUtils.isEmpty(token));
    }

    @Test
    public void testGetUserIdFromJWT() {
        //Prepare
        final Authentication authentication = Mockito.mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(TestUtils.createDummyCurrentUser());
        //Test
        final Long userId = sut.getUserIdFromJWT(sut.generateToken(authentication));
        //Verify
        assertNotNull(userId);
    }

    @Test
    public void testValidateToken_Success() {
        //Prepare
        final Authentication authentication = Mockito.mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(TestUtils.createDummyCurrentUser());
        //Test
        final boolean status = sut.validateToken(sut.generateToken(authentication));
        //Verify
        assertTrue(status);
    }

    @Test
    public void testValidateToken_Fail() {
        //Test
        final boolean status = sut.validateToken("");
        //Verify
        assertFalse(status);
    }

}
