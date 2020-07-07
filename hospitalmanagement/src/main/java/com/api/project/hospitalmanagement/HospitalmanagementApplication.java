package com.api.project.hospitalmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class HospitalmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(HospitalmanagementApplication.class, args);
	}

}
