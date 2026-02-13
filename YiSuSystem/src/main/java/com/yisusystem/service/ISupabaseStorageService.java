package com.yisusystem.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Supabase Storage 文件上传服务接口
 *
 * @author liufuming
 * @since 2026-02-12
 */
public interface ISupabaseStorageService {

    /**
     * 上传文件到 Supabase Storage
     *
     * @param file   要上传的文件
     * @param folder 存储文件夹（如 "hotel" 或 "room"）
     * @return 文件的公开访问 URL
     * @throws IOException 上传失败时抛出异常
     */
    String uploadFile(MultipartFile file, String folder) throws IOException;

    /**
     * 从 Supabase Storage 删除文件
     *
     * @param fileUrl 文件的完整 URL
     * @return 是否删除成功
     */
    boolean deleteFile(String fileUrl);
}