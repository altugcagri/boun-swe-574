package com.fellas.bespoke.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fellas.bespoke.persistence.model.Activity;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;

@Slf4j
@Converter
public class ActivityObjectConverter implements AttributeConverter<Activity, String> {

    @Override
    public String convertToDatabaseColumn(Activity attribute) {

        if (attribute == null)
            return null;

        final ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());


        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            return null;
        }
    }

    @Override
    public Activity convertToEntityAttribute(String dbData) {

        if (dbData == null)
            return null;

        final ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        try {
            return mapper.readValue(dbData, Activity.class);
        } catch (IOException e) {
            log.error(e.getMessage());
            return null;
        }
    }
}
