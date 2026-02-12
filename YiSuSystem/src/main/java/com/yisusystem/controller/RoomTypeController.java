package com.yisusystem.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yisusystem.common.Response;
import com.yisusystem.pojo.entity.RoomType;
import com.yisusystem.service.IRoomTypeService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 酒店房型控制器
 *
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/room-type")
public class RoomTypeController {

    @Resource
    IRoomTypeService roomTypeService;

    /**
     * 获取指定酒店的全部房型
     * <p>
     * 根据酒店 ID 查询该酒店下的所有房型列表。
     * </p>
     *
     * @param hotelId 酒店 ID
     * @return 包含房型列表的响应对象
     */
    @GetMapping("/list/{hotelId}")
    public Response<List<RoomType>> listByHotelId(@PathVariable("hotelId") Long hotelId) {
        LambdaQueryWrapper<RoomType> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(RoomType::getHotelId, hotelId)
                .orderByAsc(RoomType::getRoomId);
        List<RoomType> rooms = roomTypeService.list(wrapper);
        return Response.success(rooms);
    }

    /**
     * 新建房型
     * <p>
     * 为指定酒店创建一个新的房型。
     * </p>
     *
     * @param roomType 房型实体对象，包含名称、价格、库存等信息
     * @return 包含创建成功的房型对象的响应结果
     */
    @PostMapping
    public Response<RoomType> createRoom(@RequestBody RoomType roomType) {
        roomType.setCreateTime(LocalDateTime.now());
        // roomType.setUpdateTime(LocalDateTime.now());
        boolean saved = roomTypeService.save(roomType);
        if (saved) {
            return Response.success(roomType);
        }
        return Response.error(500, "创建房型失败");
    }

    /**
     * 编辑房型
     * <p>
     * 更新已有房型的信息。
     * </p>
     *
     * @param id       房型 ID
     * @param roomType 包含更新信息的房型实体对象
     * @return 包含更新后的房型对象的响应结果
     */
    @PutMapping("/{id}")
    public Response<RoomType> updateRoom(@PathVariable("id") Long id, @RequestBody RoomType roomType) {
        roomType.setRoomId(id);
        // roomType.setUpdateTime(LocalDateTime.now());
        boolean updated = roomTypeService.updateById(roomType);
        if (updated) {
            return Response.success(roomType);
        }
        return Response.error(404, "房型不存在或更新失败");
    }

    /**
     * 删除房型
     * <p>
     * 根据 ID 删除指定的房型。
     * </p>
     *
     * @param id 房型 ID
     * @return 删除操作的响应结果
     */
    @DeleteMapping("/{id}")
    public Response<String> deleteRoom(@PathVariable("id") Long id) {
        boolean removed = roomTypeService.removeById(id);
        if (removed) {
            return Response.success("删除成功");
        }
        return Response.error(404, "房型不存在或删除失败");
    }
}
