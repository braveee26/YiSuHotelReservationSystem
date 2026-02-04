package com.yisusystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/db")
public class DBTestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-connection")
    public String testConnection() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(5)) { // 5秒超时
                return "数据库连接成功！";
            } else {
                return "数据库连接失败！";
            }
        } catch (SQLException e) {
            return "数据库连接异常: " + e.getMessage();
        }
    }
}