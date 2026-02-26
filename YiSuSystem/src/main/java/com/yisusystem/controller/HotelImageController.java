package com.yisusystem.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yisusystem.common.Response;
import com.yisusystem.pojo.entity.HotelImage;
import com.yisusystem.service.IHotelImageService;
import com.yisusystem.service.ISupabaseStorageService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 酒店图片管理 前端控制器
 * @order 3
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/hotel-image")
public class HotelImageController {

    @Resource
    IHotelImageService hotelImageService;

    @Resource
    ISupabaseStorageService storageService;

    /**
     * 获取指定酒店的全部图片
     *
     * @param hotelId 酒店 ID
     * @return 包含酒店图片列表的响应对象
     */
    @GetMapping("/list/{hotelId}")
    public Response<List<HotelImage>> listByHotelId(@PathVariable("hotelId") Long hotelId) {
        LambdaQueryWrapper<HotelImage> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HotelImage::getHotelId, hotelId)
                .orderByAsc(HotelImage::getSortOrder);
        List<HotelImage> images = hotelImageService.list(wrapper);
        return Response.success(images);
    }

    /**
     * 上传酒店图片
     *
     * @param hotelId   酒店 ID
     * @param file      图片文件
     * @param imageDesc 图片描述（可选）
     * @param sortOrder 排序序号（可选，默认为1）
     * @return 包含保存的图片信息的响应对象
     */
    @PostMapping("/upload/{hotelId}")
    public Response<HotelImage> uploadImage(
            @PathVariable("hotelId") Long hotelId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "imageDesc", required = false) String imageDesc,
            @RequestParam(value = "sortOrder", required = false, defaultValue = "1") Byte sortOrder) {
        try {
            // 上传文件到 Supabase Storage
            String imageUrl = storageService.uploadFile(file, "hotel");

            // 保存图片信息到数据库
            HotelImage hotelImage = new HotelImage();
            hotelImage.setHotelId(hotelId);
            hotelImage.setImageUrl(imageUrl);
            hotelImage.setImageDesc(imageDesc);
            hotelImage.setSortOrder(sortOrder);

            boolean saved = hotelImageService.save(hotelImage);
            if (saved) {
                return Response.success(hotelImage);
            }
            return Response.error(500, "保存图片信息失败");
        } catch (IOException e) {
            return Response.error(500, "图片上传失败: " + e.getMessage());
        }
    }

    /**
     * 批量保存酒店图片
     *
     * @param images 图片列表
     * @return 操作结果
     */
    @PostMapping("/batch")
    public Response<String> batchSave(@RequestBody List<HotelImage> images) {
        boolean saved = hotelImageService.saveBatch(images);
        if (saved) {
            return Response.success("批量保存成功");
        }
        return Response.error(500, "批量保存失败");
    }

    /**
     * 删除酒店图片
     *
     * @param imageId 图片 ID
     * @return 操作结果
     */
    @DeleteMapping("/{imageId}")
    public Response<String> deleteImage(@PathVariable("imageId") Long imageId) {
        // 获取图片信息
        HotelImage image = hotelImageService.getById(imageId);
        if (image == null) {
            return Response.error(404, "图片不存在");
        }

        // 从 Supabase Storage 删除文件
        storageService.deleteFile(image.getImageUrl());

        // 从数据库删除记录
        boolean removed = hotelImageService.removeById(imageId);
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
    public Response<String> batchUpdateSort(@RequestBody List<HotelImage> images) {
        boolean updated = hotelImageService.updateBatchById(images);
        if (updated) {
            return Response.success("更新排序成功");
        }
        return Response.error(500, "更新排序失败");
    }
}
