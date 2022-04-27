package com.github.jayreturns.slserver;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "SteakLasagne",
                description = "Expense Tracker for Anwendungsprojekt",
                version = "v1",
                contact = @Contact(url = "https://github.com/JayReturns/SteakLasagne", name = "Jan-Luca", email = "jan-luca-wolf@web.de"),
                license = @License(url = "https://www.gnu.de/documents/gpl-3.0.en.html", name = "GNU General Public License v3.0")
        )
)
public class SlServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SlServerApplication.class, args);
    }

}
