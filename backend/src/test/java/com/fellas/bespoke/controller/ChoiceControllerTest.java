package com.fellas.bespoke.controller;

import com.fellas.bespoke.controller.dto.request.ChoiceRequest;
import com.fellas.bespoke.service.ChoiceService;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class ChoiceControllerTest extends AbstractEntityControllerTest {

    @Mock
    private ChoiceService choiceService;

    @InjectMocks
    private final ChoiceController sut = new ChoiceController(choiceService);

    @Test
    public void testCreateChoiceByQuestionId() {
        //Prepare
        final ChoiceRequest request = ChoiceRequest.builder().questionId(0L).text("someText").correct(true).build();
        //Test
        sut.createChoiceByQuestionId(currentUser, request);
        //Verify
        verify(choiceService, times(1)).createChoiceByQuestionId(currentUser, request);
    }


    @Test
    public void testDeleteChoiceById() {
        //Test
        sut.deleteChoiceById(currentUser, 0L);
        //Verify
        verify(choiceService, times(1)).deleteChoiceById(currentUser, 0L);
    }

}
