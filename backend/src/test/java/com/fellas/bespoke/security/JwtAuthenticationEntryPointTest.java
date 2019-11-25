package com.fellas.bespoke.security;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class JwtAuthenticationEntryPointTest {


    @InjectMocks
    private final JwtAuthenticationEntryPoint sut = new JwtAuthenticationEntryPoint();
    
    @Test
    public void testCommence() throws IOException {
        //Prepare
        final HttpServletRequest req = Mockito.mock(HttpServletRequest.class);
        final HttpServletResponse resp = Mockito.mock(HttpServletResponse.class);
        final AuthenticationException ex = Mockito.mock(AuthenticationException.class);
        //Test
        sut.commence(req, resp, ex);
        //Verify
        verify(resp, times(1)).sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
    }
}
