package com.yisusystem.config;

import jakarta.annotation.Resource;
import lombok.Data;
import com.yisusystem.common.HttpStatus;
import com.yisusystem.common.Response;
import com.yisusystem.filter.JwtAuthenticationTokenFilter;
import com.yisusystem.utils.ServletUtil;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;

/**
 * 安全配置类
 * 
 * @author 代征诚
 */
@Data
@Configuration
@ConfigurationProperties("spring.security")
@EnableMethodSecurity
public class SecurityConfig {
    @Resource
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    /**
     * 配置安全相关过滤器链
     *
     * @param http http 请求相关安全配置
     * @return 安全过滤器链
     * @throws Exception 异常
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(Customizer.withDefaults());

        // 异常处理器
        http.exceptionHandling(config -> config
                .authenticationEntryPoint(((request, response, authException) -> ServletUtil.rewrite(response,
                        Response.error(HttpStatus.NotLoginForbidden))))
                .accessDeniedHandler(((request, response, authException) -> ServletUtil.rewrite(response,
                        Response.error(HttpStatus.DenyForbidden)))));

        // AuthenticationFilter 认证过滤器
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(WhiteListConfig.getWHITE_LIST()).permitAll()
                .anyRequest().authenticated() // 其他接口需要认证
        );

        // headers 配置
        http.headers(headers -> headers
                .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable) // 禁用 X-Frame-Options
                .cacheControl(HeadersConfigurer.CacheControlConfig::disable) // 禁用缓存
        );

        // 添加 JWT 认证过滤器
        http.addFilterBefore(jwtAuthenticationTokenFilter, AuthorizationFilter.class);

        return http.build();
    }

    /**
     * 密码加密器
     *
     * @return BCryptPasswordEncoder 实例
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
