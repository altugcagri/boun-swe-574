package com.fellas.bespoke.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Configuration
public class DbConfiguration {

    @Configuration
    @Profile("dev")
    @PropertySource("classpath:application-db-dev.properties")
    static class Dev {

    }

    @Configuration
    @Profile("prod")
    @PropertySource("classpath:application-db-prod.properties")
    static class Prod {

    }


}
