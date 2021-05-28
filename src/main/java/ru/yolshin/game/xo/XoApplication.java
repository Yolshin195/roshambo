package ru.yolshin.game.xo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class XoApplication {
	public static void main(String[] args) {
		SpringApplication.run(XoApplication.class, args);
	}

}
