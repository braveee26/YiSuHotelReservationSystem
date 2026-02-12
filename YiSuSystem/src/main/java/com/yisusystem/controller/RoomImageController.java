package com.yisusystem.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yisusystem.common.Response;
import com.yisusystem.pojo.entity.RoomImage;
import com.yisusystem.service.IRoomImageService;
import com.yisusystem.service.SupabaseStorageService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * <p>
 * 存储房型详情图（支持多图展示） 前端控制器
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/room-image")
public class RoomImageController {

    @Resource
    IRoomImageService roomImageService;

    @Resource
    SupabaseStorageService storageService;

    /**
     * 获取指定房型的全部图片
     *
     * @param roomId 房型 ID
     * @return 包含房型图片列表的响应对象
     */
    @GetMapping("/list/{roomId}")
    public Response<List<RoomImage>> listByRoomId(@PathVariable("roomId") Long roomId) {
        LambdaQueryWrapper<RoomImage> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(RoomImage::getRoomId, roomId)
                .orderByAsc(RoomImage::getSortOrder);
        List<RoomImage> images = roomImageService.list(wrapper);
        return Response.success(images);
    }

    /**
     * 上传房型图片
     *
     * @param roomId    房型 ID
     * @param file      图片文件
     * @param imageDesc 图片描述（可选）
     * @param sortOrder 排序序号（可选，默认为1）
     * @return 包含保存的图片信息的响应对象
     */
    @PostMapping("/upload/{roomId}")
    public Response<RoomImage> uploadImage(
            @PathVariable("roomId") Long roomId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "imageDesc", required = false) String imageDesc,
            @RequestParam(value = "sortOrder", required = false, defaultValue = "1") Byte sortOrder) {
        try {
            // 上传文件到 Supabase Storage
            String imageUrl = storageService.uploadFile(file, "room");

            // 保存图片信息到数据库
            RoomImage roomImage = new RoomImage();
            roomImage.setRoomId(roomId);
            roomImage.setImageUrl(imageUrl);
            roomImage.setImageDesc(imageDesc);
            roomImage.setSortOrder(sortOrder);

            boolean saved = roomImageService.save(roomImage);
            if (saved) {
                return Response.success(roomImage);
            }
            return Response.error(500, "保存图片信息失败");
        } catch (IOException e) {
            return Response.error(500, "图片上传失败: " + e.getMessage());
        }
    }

    /**
     * 批量保存房型图片
     *
     * @param images 图片列表
     * @return 操作结果
     */
    @PostMapping("/batch")
    public Response<String> batchSave(@RequestBody List<RoomImage> images) {
        boolean saved = roomImageService.saveBatch(images);
        if (saved) {
            return Response.success("批量保存成功");
        }
        return Response.error(500, "批量保存失败");
    }

    /**
     * 删除房型图片
     *
     * @param imageId 图片 ID
     * @return 操作结果
     */
    @DeleteMapping("/{imageId}")
    public Response<String> deleteImage(@PathVariable("imageId") Long imageId) {
        // 获取图片信息
        RoomImage image = roomImageService.getById(imageId);
        if (image == null) {
            return Response.error(404, "图片不存在");
        }

        // 从 Supabase Storage 删除文件
        storageService.deleteFile(image.getImageUrl());

        // 从数据库删除记录
        boolean removed = roomImageService.removeById(imageId);
        if (removed) {
            return Response.success("删除成功");
        }
        return Response.error(500, "删除失败");
    }

    /**
     * 批量更新图片排序
     *
     * @param images 包含 imageId 和 sortOrder 的图片列表
     * @return 操作结果
     */
    @PutMapping("/batch/sort")
    public Response<String> batchUpdateSort(@RequestBody List<RoomImage> images) {
        boolean updated = roomImageService.updateBatchById(images);
        if (updated) {
            return Response.success("更新排序成功");
        }
        return Response.error(500, "更新排序失败");
    }
}
