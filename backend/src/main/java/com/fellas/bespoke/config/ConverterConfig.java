package com.fellas.bespoke.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.core.convert.support.GenericConversionService;

@Configuration
public class ConverterConfig {
    @Bean
    public ConfigurableConversionService bespokeDTOService() {

        // toDo - comments will be deleted
        //DTO class initialization

        // conversion service
        final ConfigurableConversionService conversionService = new GenericConversionService();

        //adding dto objects to conversion service

        return conversionService;
    }
}
