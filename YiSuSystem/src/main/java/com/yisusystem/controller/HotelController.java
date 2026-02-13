package com.yisusystem.controller;

import com.yisusystem.common.Response;
import com.yisusystem.pojo.entity.Hotel;
import com.yisusystem.service.IHotelService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 酒店核心信息管理 前端控制器
 * @order 2
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/hotel")
public class HotelController {

    @Resource
    IHotelService hotelService;

    /**
     * 根据 ID 获取酒店详情
     *
     * @param id 酒店 ID
     * @return 酒店详情
     */
    @GetMapping("/{id}")
    public Response<Hotel> getHotelById(@PathVariable("id") Long id) {
        Hotel hotel = hotelService.getById(id);
        if (hotel == null) {
            return Response.error(404, "酒店不存在");
        }
        return Response.success(hotel);
    }

    /**
     * 新建酒店
     * @param hotel 酒店实体对象，包含酒店名称、地址、描述等基本信息
     * @return 包含创建成功的酒店对象的响应结果
     */
    @PostMapping
    public Response<Hotel> createHotel(@RequestBody Hotel hotel) {
        // 获取当前登录用户
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        if (principal instanceof com.yisusystem.common.MyUserDetail) {
            com.yisusystem.common.MyUserDetail userDetail = (com.yisusystem.common.MyUserDetail) principal;
            hotel.setMerchantId(userDetail.getUser().getUserId().longValue());
        }

        hotel.setCreateTime(LocalDateTime.now());
        // hotel.setUpdateTime(LocalDateTime.now()); // update_time removed from DB
        boolean saved = hotelService.save(hotel);
        if (saved) {
            return Response.success(hotel);
        }
        return Response.error(500, "创建酒店失败");
    }

    /**
     * 编辑酒店信息
     * @param id    酒店 ID
     * @param hotel 酒店信息
     * @return 更新结果
     */
    @PutMapping("/{id}")
    public Response<Hotel> updateHotel(@PathVariable("id") Long id, @RequestBody Hotel hotel) {
        hotel.setHotelId(id);
        hotel.setUpdateTime(LocalDateTime.now());
        boolean updated = hotelService.updateById(hotel);
        if (updated) {
            return Response.success(hotel);
        }
        return Response.error(404, "酒店不存在或更新失败");
    }

    /**
     * 根据商户 ID 获取其所有酒店列表
     * @param merchantId 商户 ID
     * @return 酒店列表
     */
    @GetMapping("/merchant/{merchantId}")
    public Response<java.util.List<Hotel>> getHotelsByMerchantId(@PathVariable("merchantId") Long merchantId) {
        java.util.List<Hotel> hotels = hotelService.list(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                        .eq("merchant_id", merchantId)
                        .orderByDesc("create_time"));
        return Response.success(hotels);
    }

    /**
     * 切换酒店上/下线状态
     * @param id 酒店 ID
     * @return 操作结果
     */
    @PutMapping("/{id}/online-status")
    public Response<Hotel> toggleOnlineStatus(@PathVariable("id") Long id) {
        Hotel hotel = hotelService.getById(id);
        if (hotel == null) {
            return Response.error(404, "酒店不存在");
        }
        if (hotel.getAuditStatus() != Hotel.AuditStatusEnum.approved) {
            return Response.error(400, "酒店未通过审核，无法切换上线状态");
        }
        hotel.setOnlineStatus(
                hotel.getOnlineStatus() == Hotel.OnlineStatusEnum.online
                        ? Hotel.OnlineStatusEnum.offline
                        : Hotel.OnlineStatusEnum.online);
        hotel.setUpdateTime(LocalDateTime.now());
        hotelService.updateById(hotel);
        return Response.success(hotel);
    }

    /**
     * 商户提交酒店审核
     * @param id 酒店 ID
     * @return 操作结果
     */
    @PutMapping("/{id}/submit-audit")
    public Response<Hotel> submitAudit(@PathVariable("id") Long id) {
        Hotel hotel = hotelService.getById(id);
        if (hotel == null) {
            return Response.error(404, "酒店不存在");
        }
        Hotel.AuditStatusEnum status = hotel.getAuditStatus();
        if (status != Hotel.AuditStatusEnum.pending && status != Hotel.AuditStatusEnum.rejected) {
            return Response.error(400, "当前审核状态不允许提交");
        }
        hotel.setAuditStatus(Hotel.AuditStatusEnum.auditing);
        hotel.setAuditInfo("");
        hotel.setUpdateTime(LocalDateTime.now());
        hotelService.updateById(hotel);
        return Response.success(hotel);
    }

    @Resource
    com.yisusystem.service.IRoomTypeService roomTypeService;

    /**
     * 获取商户酒店统计数据
     *
     * @param merchantId 商户 ID
     * @return 包含各项统计数据的 Map，Key 为统计项名称，Value 为数量
     */
    @GetMapping("/merchant/{merchantId}/stats")
    public Response<java.util.Map<String, Long>> getMerchantStats(@PathVariable("merchantId") Long merchantId) {
        com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel> baseQuery = new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                .eq("merchant_id", merchantId);

        long total = hotelService.count(baseQuery);

        long approved = hotelService.count(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                        .eq("merchant_id", merchantId)
                        .eq("audit_status", Hotel.AuditStatusEnum.approved));

        long auditing = hotelService.count(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                        .eq("merchant_id", merchantId)
                        .eq("audit_status", Hotel.AuditStatusEnum.auditing));

        long pending = hotelService.count(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                        .eq("merchant_id", merchantId)
                        .in("audit_status", Hotel.AuditStatusEnum.pending, Hotel.AuditStatusEnum.rejected));

        long online = hotelService.count(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                        .eq("merchant_id", merchantId)
                        .eq("online_status", Hotel.OnlineStatusEnum.online));

        // 统计该商户下的房型总数
        long roomTypeCount = roomTypeService.count(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<com.yisusystem.pojo.entity.RoomType>()
                        .inSql("hotel_id", "SELECT hotel_id FROM hotel WHERE merchant_id = " + merchantId));

        java.util.Map<String, Long> stats = new java.util.LinkedHashMap<>();
        stats.put("total", total);
        stats.put("approved", approved);
        stats.put("auditing", auditing);
        stats.put("pending", pending);
        stats.put("online", online);
        stats.put("roomTypeCount", roomTypeCount);
        return Response.success(stats);
    }

    /**
     * 管理员获取所有酒店列表（支持筛选）
     */
    @GetMapping("/admin/hotel-list")
    public Response<List<Hotel>> getAllHotelsForAdmin(
            @RequestParam(required = false) String province,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) Hotel.StarLevelEnum starLevel,
            @RequestParam(required = false) Hotel.AuditStatusEnum auditStatus,
            @RequestParam(required = false) Hotel.OnlineStatusEnum onlineStatus
    ) {
        // 调用服务层方法
        List<Hotel> hotels = hotelService.getAllHotelsForAdmin(province, city, district, starLevel, auditStatus, onlineStatus);
        return Response.success(hotels);
    }

    /**
     * 管理员审核酒店
     */
    @PutMapping("/admin/{id}/audit")
    public Response<Boolean> adminAuditHotel(
            @PathVariable("id") Long id,
            @RequestParam Hotel.AuditStatusEnum auditStatus,
            @RequestParam(required = false) String auditInfo
    ) {
        Boolean result = hotelService.auditHotel(id, auditStatus, auditInfo);
        if (result) {
            return Response.success(true);
        }
        return Response.error(500, "审核失败");
    }

    /**
     * 管理员分状态获取所有酒店统计数据
     */
    @GetMapping("/admin/hotel-stats")
    public Response<Map<String, Long>> getHotelStatsForAdmin() {
        Map<String, Long> stats = hotelService.getAllHotelStatistics();
        return Response.success(stats);
    }
}
