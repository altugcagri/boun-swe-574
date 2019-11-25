package com.fellas.bespoke.converter;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.ChoiceRequest;
import com.fellas.bespoke.persistence.model.Choice;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@RunWith(MockitoJUnitRunner.class)
public class ChoiceRequestToChoiceTest {

    @InjectMocks
    private ChoiceRequestToChoice sut;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testConvertSuccessfully() {
        //Prepare
        final ChoiceRequest source = TestUtils.createDummyChoiceRequest();
        //Test
        final Choice choice = sut.convert(source);
        //Verify
        assertNotNull(choice);
        assertEquals(choice.getCorrect(), source.getCorrect());
        assertEquals(choice.getText(), source.getText());
        assertNull(choice.getQuestion());
    }

}
