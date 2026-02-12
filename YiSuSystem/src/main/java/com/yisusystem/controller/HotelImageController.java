package com.yisusystem.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yisusystem.common.Response;
import com.yisusystem.pojo.entity.HotelImage;
import com.yisusystem.service.IHotelImageService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 酒店图片控制器
 *
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/hotel-image")
public class HotelImageController {

    @Resource
    IHotelImageService hotelImageService;

    /**
     * 获取指定酒店的全部图片
     * <p>
     * 根据酒店 ID 查询该酒店关联的所有图片，并按排序字段升序排列。
     * </p>
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
}
