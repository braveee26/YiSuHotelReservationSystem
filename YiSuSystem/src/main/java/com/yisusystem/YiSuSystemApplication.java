package com.yisusystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("com.yisusystem.mapper")
public class YiSuSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(YiSuSystemApplication.class, args);
    }

}
