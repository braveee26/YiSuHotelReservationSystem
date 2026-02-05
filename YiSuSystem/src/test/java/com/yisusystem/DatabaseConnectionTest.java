package com.yisusystem;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * 数据库连接测试类
 * 用于验证Supabase PostgreSQL数据库连接是否成功
 */
@SpringBootTest
public class DatabaseConnectionTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private DataSource dataSource;

    /**
     * 测试Spring上下文加载
     */
    @Test
    public void contextLoads() {
        assertThat(applicationContext).isNotNull();
        System.out.println("✅ Spring应用上下文加载成功");
    }

    /**
     * 测试数据源注入
     */
    @Test
    public void testDataSourceInjection() {
        assertThat(dataSource).isNotNull();
        System.out.println("✅ DataSource Bean注入成功");
        System.out.println("数据源类型: " + dataSource.getClass().getSimpleName());
    }

    /**
     * 测试数据库连接
     */
    @Test
    public void testDatabaseConnection() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            assertThat(connection).isNotNull();
            assertThat(connection.isValid(5)).isTrue(); // 5秒超时
            
            System.out.println("✅ 数据库连接成功!");
            System.out.println("连接URL: " + connection.getMetaData().getURL());
            System.out.println("数据库产品名称: " + connection.getMetaData().getDatabaseProductName());
            System.out.println("数据库产品版本: " + connection.getMetaData().getDatabaseProductVersion());
            System.out.println("驱动程序名称: " + connection.getMetaData().getDriverName());
            System.out.println("驱动程序版本: " + connection.getMetaData().getDriverVersion());
            
        } catch (SQLException e) {
            System.err.println("❌ 数据库连接失败: " + e.getMessage());
            throw e;
        }
    }

    /**
     * 测试基本查询
     */
    @Test
    public void testBasicQuery() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            // 执行简单查询来验证连接
            var statement = connection.createStatement();
            var resultSet = statement.executeQuery("SELECT 1 as test_value");
            
            assertThat(resultSet.next()).isTrue();
            int result = resultSet.getInt("test_value");
            assertThat(result).isEqualTo(1);
            
            System.out.println("✅ 基本查询测试通过，返回值: " + result);
            resultSet.close();
            statement.close();
            
        } catch (SQLException e) {
            System.err.println("❌ 基本查询测试失败: " + e.getMessage());
            throw e;
        }
    }
}