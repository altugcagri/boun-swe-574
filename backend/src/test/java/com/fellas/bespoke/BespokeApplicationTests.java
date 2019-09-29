package com.fellas.bespoke;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@PropertySource("classpath:application-test.properties")
@SpringBootTest
public class BespokeApplicationTests {

	@Test
	public void contextLoads() {
	}

}
