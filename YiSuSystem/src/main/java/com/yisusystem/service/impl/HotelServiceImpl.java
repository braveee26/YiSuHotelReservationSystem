package com.yisusystem.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yisusystem.pojo.entity.Hotel;
import com.yisusystem.mapper.HotelMapper;
import com.yisusystem.service.IHotelService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 存储酒店核心信息（关联商户，简化审核相关字段） 服务实现类
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class HotelServiceImpl extends ServiceImpl<HotelMapper, Hotel> implements IHotelService {

    @Override
    public List<Hotel> getPendingHotels(Hotel.AuditStatusEnum auditStatus) {
        com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel> queryWrapper =
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                        .ne("audit_status", Hotel.AuditStatusEnum.approved)
                        .orderByDesc("create_time");

        if (auditStatus != null) {
            queryWrapper.eq("audit_status", auditStatus);
        }

        return this.list(queryWrapper);
    }

    @Override
    public Boolean auditHotel(Long id, Hotel.AuditStatusEnum auditStatus, String auditInfo) {
        Hotel hotel = this.getById(id);
        if (hotel == null) {
            return false;
        }

        hotel.setAuditStatus(auditStatus);
        hotel.setAuditInfo(auditInfo != null ? auditInfo : "");
        hotel.setUpdateTime(java.time.LocalDateTime.now());

        return this.updateById(hotel);
    }

    @Override
    public Map<String, Object> getHotelStatistics() {
        long totalHotels = this.count();
        long approvedHotels = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                .eq("audit_status", Hotel.AuditStatusEnum.approved));
        long pendingHotels = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                .eq("audit_status", Hotel.AuditStatusEnum.pending));
        long auditingHotels = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                .eq("audit_status", Hotel.AuditStatusEnum.auditing));
        long rejectedHotels = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                .eq("audit_status", Hotel.AuditStatusEnum.rejected));
        long onlineHotels = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<Hotel>()
                .eq("online_status", Hotel.OnlineStatusEnum.online));

        Map<String, Object> stats = new java.util.LinkedHashMap<>();
        stats.put("totalHotels", totalHotels);
        stats.put("approvedHotels", approvedHotels);
        stats.put("pendingHotels", pendingHotels);
        stats.put("auditingHotels", auditingHotels);
        stats.put("rejectedHotels", rejectedHotels);
        stats.put("onlineHotels", onlineHotels);

        return stats;
    }

    @Override
    public List<Hotel> getAllHotelsForAdmin(String province, String city, String district,
                                            Hotel.StarLevelEnum starLevel, Hotel.AuditStatusEnum auditStatus,
                                            Hotel.OnlineStatusEnum onlineStatus) {
        QueryWrapper<Hotel> queryWrapper = new QueryWrapper<>();

        // 添加筛选条件
        if (province != null && !province.isEmpty()) {
            queryWrapper.like("province", province);
        }
        if (city != null && !city.isEmpty()) {
            queryWrapper.like("city", city);
        }
        if (district != null && !district.isEmpty()) {
            queryWrapper.like("district", district);
        }
        if (starLevel != null) {
            queryWrapper.eq("star_level", starLevel);
        }
        if (auditStatus != null) {
            queryWrapper.eq("audit_status", auditStatus);
        }
        if (onlineStatus != null) {
            queryWrapper.eq("online_status", onlineStatus);
        }

        queryWrapper.orderByDesc("create_time");
        return this.list(queryWrapper);
    }
    /**
     * 管理员分状态获取所有酒店统计数据
     */
    @Override
    public Map<String, Long> getAllHotelStatistics(){
        Map<String, Long> statistics = new java.util.HashMap<>();
        
        // 统计各种审核状态的数量
        QueryWrapper<Hotel> wrapper = new QueryWrapper<>();
        wrapper.select("audit_status", "COUNT(*) as count")
               .groupBy("audit_status");
        
        List<Map<String, Object>> results = this.listMaps(wrapper);
        
        // 初始化所有状态为0
        statistics.put("pending", 0L);
        statistics.put("rejected", 0L);
        statistics.put("auditing", 0L);
        statistics.put("approved", 0L);
        
        // 填充实际统计数据
        for (Map<String, Object> result : results) {
            String auditStatus = (String) result.get("audit_status");
            Long count = ((Number) result.get("count")).longValue();
            statistics.put(auditStatus, count);
        }
        
        return statistics;
    }
}
