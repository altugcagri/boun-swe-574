package com.fellas.bespoke.converter;

import com.fellas.bespoke.TestUtils;
import com.fellas.bespoke.controller.dto.request.QuestionRequest;
import com.fellas.bespoke.persistence.model.Question;
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
public class QuestionRequestToQuestionTest {

    @InjectMocks
    private QuestionRequestToQuestion sut;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testConvertSuccessfully() {
        //Prepare
        final QuestionRequest source = TestUtils.createDummyQuestionRequest();
        //Test
        final Question question = sut.convert(source);
        //Verify
        assertNotNull(question);
        assertEquals(question.getText(), source.getText());
        assertNull(question.getChoiceList());
        assertNull(question.getContent());
    }
}
