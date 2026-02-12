package com.yisusystem.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Supabase Storage 配置属性
 *
 * @author liufuming
 * @since 2026-02-12
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "supabase")
public class SupabaseStorageConfig {

    /**
     * Supabase 项目 URL
     */
    private String url;

    /**
     * Supabase API Key (anon key)
     */
    private String apiKey;

    /**
     * Storage 配置
     */
    private Storage storage = new Storage();

    @Data
    public static class Storage {
        /**
         * 存储桶名称
         */
        private String bucketName;

        /**
         * 最大文件大小（字节）
         */
        private Long maxFileSize;
    }
}
