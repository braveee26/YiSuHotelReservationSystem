package com.yisusystem.service;

import com.yisusystem.pojo.entity.Hotel;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 存储酒店核心信息（关联商户，简化审核相关字段） 服务类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
public interface IHotelService extends IService<Hotel> {

    /**
     * 管理员获取待审核的酒店列表
     *
     * @param auditStatus 审核状态过滤（可选）
     * @return 酒店列表
     */
    List<Hotel> getPendingHotels(Hotel.AuditStatusEnum auditStatus);

    /**
     * 管理员审核酒店
     *
     * @param id 酒店ID
     * @param auditStatus 审核状态
     * @param auditInfo 审核备注信息
     * @return 审核结果
     */
    Boolean auditHotel(Long id, Hotel.AuditStatusEnum auditStatus, String auditInfo);

    /**
     * 获取平台酒店统计数据
     *
     * @return 包含各类酒店统计的Map
     */
    Map<String, Object> getHotelStatistics();

    /**
     * 管理员获取所有酒店列表（支持多条件筛选）
     */
    List<Hotel> getAllHotelsForAdmin(String province, String city, String district, Hotel.StarLevelEnum starLevel, Hotel.AuditStatusEnum auditStatus, Hotel.OnlineStatusEnum onlineStatus);

    /**
     * 管理员分状态获取所有酒店统计数据
     */
    Map<String, Long> getAllHotelStatistics();
}
