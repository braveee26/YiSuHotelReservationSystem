package com.yisusystem.controller;

import com.yisusystem.common.Response;
import com.yisusystem.pojo.entity.HotelAttribute;
import com.yisusystem.service.IHotelAttributeService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 酒店属性（设施）管理 前端控制器
 * @order 6
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/hotel-attribute")
public class HotelAttributeController {

    @Resource
    IHotelAttributeService hotelAttributeService;

    /**
     * 获取全部设施/属性列表
     * @return 包含设施/属性列表的响应对象
     */
    @GetMapping("/list")
    public Response<List<HotelAttribute>> listAll() {
        List<HotelAttribute> attributes = hotelAttributeService.list();
        return Response.success(attributes);
    }

    /**
     * 新建设施/属性
     * @param attribute 设施/属性实体对象，包含名称、图标等信息
     * @return 包含创建成功的设施/属性对象的响应结果
     */
    @PostMapping
    public Response<HotelAttribute> createAttribute(@RequestBody HotelAttribute attribute) {
        boolean saved = hotelAttributeService.save(attribute);
        if (saved) {
            return Response.success(attribute);
        }
        return Response.error(500, "创建属性失败");
    }

    /**
     * 编辑设施/属性
     * @param id        设施/属性 ID
     * @param attribute 包含更新信息的设施/属性实体对象
     * @return 包含更新后的设施/属性对象的响应结果
     */
    @PutMapping("/{id}")
    public Response<HotelAttribute> updateAttribute(@PathVariable("id") Long id,
            @RequestBody HotelAttribute attribute) {
        attribute.setAttrId(id);
        boolean updated = hotelAttributeService.updateById(attribute);
        if (updated) {
            return Response.success(attribute);
        }
        return Response.error(404, "属性不存在或更新失败");
    }

    /**
     * 根据 ID 删除指定的设施/属性。
     * @param id 设施/属性 ID
     * @return 删除操作的响应结果
     */
    @DeleteMapping("/{id}")
    public Response<String> deleteAttribute(@PathVariable("id") Long id) {
        boolean removed = hotelAttributeService.removeById(id);
        if (removed) {
            return Response.success("删除成功");
        }
        return Response.error(404, "属性不存在或删除失败");
    }
}
