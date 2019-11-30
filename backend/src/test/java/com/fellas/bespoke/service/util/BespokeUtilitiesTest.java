package com.fellas.bespoke.service.util;

import com.fellas.bespoke.exception.CreatedByException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class BespokeUtilitiesTest{

    @Test(expected = CreatedByException.class)
    public void testCheckCreatedBy_ThrowsException_(){
        //Test
        BespokeUtilities.checkCreatedBy("SomeEntity",0L, 1L );
    }

    @Test()
    public void testCheckCreatedBy(){
        //Test
        BespokeUtilities.checkCreatedBy("SomeEntity",0L, 0L );
    }

}
