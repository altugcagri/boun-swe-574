package com.fellas.bespoke.security;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.persistence.UserRepository;
import com.fellas.bespoke.persistence.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private final CustomUserDetailsService sut = new CustomUserDetailsService(userRepository);

    @Test(expected = UsernameNotFoundException.class)
    public void testLoadByUsername_NotFound() {
        //Prepare
        when(userRepository.findByUsernameOrEmail("username", "username")).thenReturn(Optional.empty());
        //Test
        sut.loadUserByUsername("username");
    }

    @Test
    public void testLoadByUsername() {
        //Prepare
        final User user = TestUtils.createDummyUser();
        when(userRepository.findByUsernameOrEmail("username", "username")).thenReturn(Optional.of(user));
        //Test
        final UserDetails userDetails = sut.loadUserByUsername("username");
        //Verify
        assertEquals(user.getUsername(), userDetails.getUsername());
        assertEquals(user.getPassword(), userDetails.getPassword());
        assertTrue(userDetails.isAccountNonExpired());
        assertTrue(userDetails.isAccountNonLocked());
        assertTrue(userDetails.isCredentialsNonExpired());
        assertTrue(userDetails.isEnabled());
    }

    @Test(expected = UsernameNotFoundException.class)
    public void testLoadUserById_NotFound() {
        //Prepare
        when(userRepository.findById(0L)).thenReturn(Optional.empty());
        //Test
        sut.loadUserById(0L);
    }

    @Test
    public void testLoadUserById() {
        //Prepare
        final User user = TestUtils.createDummyUser();
        when(userRepository.findById(0L)).thenReturn(Optional.of(user));
        //Test
        final UserDetails userDetails = sut.loadUserById(0L);
        //Verify
        assertEquals(user.getUsername(), userDetails.getUsername());
        assertEquals(user.getPassword(), userDetails.getPassword());
        assertTrue(userDetails.isAccountNonExpired());
        assertTrue(userDetails.isAccountNonLocked());
        assertTrue(userDetails.isCredentialsNonExpired());
        assertTrue(userDetails.isEnabled());
    }


}
