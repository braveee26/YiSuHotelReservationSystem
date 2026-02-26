package com.yisusystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@MapperScan("com.yisusystem.mapper")
public class YiSuSystemApplication {

    @Value("${server.port:8080}")
    private static String serverPort;
    
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(YiSuSystemApplication.class, args);
        
        // 获取实际的端口号
        String actualPort = context.getEnvironment().getProperty("server.port", "8080");
        String baseUrl = "http://localhost:" + actualPort;
        String docUrl = baseUrl + "/doc/debug-all.html";
        
        // 打印美观的启动信息
        System.out.println("\n" + "=".repeat(60));
        System.out.println("🎉 易宿酒店预订系统后端服务启动成功！");
        System.out.println("=".repeat(60));
        System.out.println("🏠 主页地址: " + baseUrl);
        System.out.println("📚 API文档地址: " + docUrl);
        System.out.println("💡 提示: 复制API文档地址到浏览器即可查看接口文档");
        System.out.println("=".repeat(60));
    }

}
