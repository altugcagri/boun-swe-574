package com.fellas.bespoke.controller;


import com.fellas.bespoke.service.ProfileService;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class ProfileControllerTest extends AbstractEntityControllerTest{

    @Mock
    private ProfileService profileService;

    @InjectMocks
    private ProfileController sut;

    @Test
    public void testGetProfile(){
        //Test
        sut.getProfile(currentUser,123L);
        //Verify
        verify(profileService,times(1)).getProfile(currentUser,123L);
    }


}
