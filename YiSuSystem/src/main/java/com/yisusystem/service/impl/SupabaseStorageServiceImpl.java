package com.yisusystem.service.impl;

import com.yisusystem.config.SupabaseStorageConfig;
import com.yisusystem.service.ISupabaseStorageService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Supabase Storage 文件上传服务实现类
 *
 * @author liufuming
 * @since 2026-02-12
 */
@Slf4j
@Service
public class SupabaseStorageServiceImpl implements ISupabaseStorageService {

    @Resource
    private SupabaseStorageConfig config;

    private OkHttpClient httpClient;
    private String storageUrl;

    @PostConstruct
    public void init() {
        this.httpClient = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
        this.storageUrl = config.getUrl() + "/storage/v1/object/" + config.getStorage().getBucketName();
        log.info("Supabase Storage Service initialized. Bucket: {}", config.getStorage().getBucketName());
    }

    /**
     * 上传文件到 Supabase Storage
     *
     * @param file   要上传的文件
     * @param folder 存储文件夹（如 "hotel" 或 "room"）
     * @return 文件的公开访问 URL
     * @throws IOException 上传失败时抛出异常
     */
    @Override
    public String uploadFile(MultipartFile file, String folder) throws IOException {
        // 验证文件
        validateFile(file);

        // 生成唯一文件名
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";
        String fileName = folder + "/" + UUID.randomUUID() + extension;

        // 构建请求
        RequestBody requestBody = RequestBody.create(
                file.getBytes(),
                MediaType.parse(file.getContentType()));

        Request request = new Request.Builder()
                .url(storageUrl + "/" + fileName)
                .addHeader("apikey", config.getApiKey())
                .addHeader("Authorization", "Bearer " + config.getApiKey())
                .addHeader("Content-Type", file.getContentType())
                .post(requestBody)
                .build();

        // 执行上传
        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "Unknown error";
                log.error("Upload failed: {}", errorBody);
                throw new IOException("Upload failed: " + errorBody);
            }

            // 返回公开访问 URL
            String publicUrl = config.getUrl() + "/storage/v1/object/public/"
                    + config.getStorage().getBucketName() + "/" + fileName;
            log.info("File uploaded successfully: {}", publicUrl);
            return publicUrl;
        }
    }

    /**
     * 从 Supabase Storage 删除文件
     *
     * @param fileUrl 文件的完整 URL
     * @return 是否删除成功
     */
    @Override
    public boolean deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return false;
        }

        try {
            // 从 URL 提取文件路径
            String prefix = "/storage/v1/object/public/" + config.getStorage().getBucketName() + "/";
            int index = fileUrl.indexOf(prefix);
            if (index == -1) {
                log.warn("Invalid file URL format: {}", fileUrl);
                return false;
            }
            String filePath = fileUrl.substring(index + prefix.length());

            // 构建删除请求
            Request request = new Request.Builder()
                    .url(storageUrl + "/" + filePath)
                    .addHeader("apikey", config.getApiKey())
                    .addHeader("Authorization", "Bearer " + config.getApiKey())
                    .delete()
                    .build();

            // 执行删除
            try (Response response = httpClient.newCall(request).execute()) {
                if (response.isSuccessful()) {
                    log.info("File deleted successfully: {}", filePath);
                    return true;
                } else {
                    log.error("Delete failed: {}",
                            response.body() != null ? response.body().string() : "Unknown error");
                    return false;
                }
            }
        } catch (Exception e) {
            log.error("Error deleting file: {}", fileUrl, e);
            return false;
        }
    }

    /**
     * 验证上传文件
     *
     * @param file 要验证的文件
     * @throws IOException 验证失败时抛出异常
     */
    private void validateFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("文件不能为空");
        }

        // 验证文件大小
        if (file.getSize() > config.getStorage().getMaxFileSize()) {
            throw new IOException("文件大小超过限制（最大 " + config.getStorage().getMaxFileSize() / 1024 / 1024 + "MB）");
        }

        // 验证文件类型
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("只支持图片格式（JPG、PNG、GIF等）");
        }
    }
}