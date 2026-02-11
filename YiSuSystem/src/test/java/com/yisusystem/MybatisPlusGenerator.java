package com.yisusystem;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import java.util.Collections;

/**
 * MyBatis-Plus代码生成器（适配7张酒店表）
 */
public class MybatisPlusGenerator {

    // 1. 数据库连接配置
    private static final String DB_URL = "jdbc:mysql://localhost:3306/yisuhotel?useSSL=false&serverTimezone=UTC&characterEncoding=utf8";
    private static final String DB_USERNAME = "root";
    private static final String DB_PASSWORD = "123456";

    // 2. 项目基础配置
    private static final String PROJECT_PATH = System.getProperty("user.dir");

    private static final String AUTHOR = "liufuming";
    private static final String BASE_PACKAGE = "com.yisusystem";

    // 3. 需生成的表名
    private static final String[] TABLE_NAMES = {
            "user", "hotel", "hotel_attribute", "hotel_attr_relation",
            "hotel_image", "room_type", "room_image"
    };

    public static void main(String[] args) {
        FastAutoGenerator.create(DB_URL, DB_USERNAME, DB_PASSWORD)
                // 全局配置
                .globalConfig(builder -> {
                    builder.author(AUTHOR)
                            .outputDir(PROJECT_PATH + "/YiSuSystem/src/main/java")
                            .commentDate("yyyy-MM-dd")
                            .disableOpenDir();
                })
                // 包配置
                .packageConfig(builder -> {
                    builder.parent(BASE_PACKAGE)
                            .entity("pojo.entity")
                            .mapper("mapper")
                            .service("service")
                            .serviceImpl("service.impl")
                            .controller("controller")
                            .pathInfo(Collections.singletonMap(OutputFile.xml, PROJECT_PATH + "/src/main/resources/mapper"));
                })
                // 策略配置
                .strategyConfig(builder -> {
                    builder.addInclude(TABLE_NAMES)
                            // 实体类策略
                            .entityBuilder()
                            .enableLombok()
                            .enableTableFieldAnnotation()
                            .logicDeleteColumnName("deleted")
                            // Controller策略
                            .controllerBuilder()
                            .enableRestStyle()
                            .enableHyphenStyle();
                })
                // 使用Freemarker模板引擎
                .templateEngine(new FreemarkerTemplateEngine())
                // 执行生成
                .execute();
    }
}