package com.fellas.bespoke.security;

import com.fellas.bespoke.TestUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class JwtAuthenticationFilterTest {

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @InjectMocks
    private final JwtAuthenticationFilter sut = new JwtAuthenticationFilter();

    @Test
    public void testDoFilterInternal() throws ServletException, IOException {
        //Prepare
        final HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        final HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        final FilterChain chain = Mockito.mock(FilterChain.class);
        when(request.getHeader("Authorization")).thenReturn("Bearer SomeToken");
        when(tokenProvider.validateToken("SomeToken")).thenReturn(true);
        when(tokenProvider.getUserIdFromJWT("SomeToken")).thenReturn(0L);
        when(customUserDetailsService.loadUserById(0L)).thenReturn(TestUtils.createDummyCurrentUser());
        //Test
        sut.doFilterInternal(request, response, chain);
        //Verify
        verify(chain, times(1)).doFilter(request, response);
    }

    @Test
    public void testDoFilterInternal_NoToken() throws ServletException, IOException {
        //Prepare
        final HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        final HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        final FilterChain chain = Mockito.mock(FilterChain.class);
        when(request.getHeader("Authorization")).thenReturn("");
        //Test
        sut.doFilterInternal(request, response, chain);
        //Verify
        verify(chain, times(1)).doFilter(request, response);
    }

}
