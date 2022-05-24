package com.github.jayreturns.slserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SlServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SlServerApplication.class, args);
        try {
            System.out.println(new ClassPathResource("").getFile().getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
