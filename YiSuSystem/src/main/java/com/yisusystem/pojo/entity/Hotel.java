package com.yisusystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 存储酒店核心信息（关联商户，简化审核相关字段）
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("hotel")
public class Hotel implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 酒店唯一 ID（自增）
     */
    @TableId(value = "hotel_id", type = IdType.AUTO)
    private Long hotelId;

    /**
     * 关联 user.user_id（仅角色 = merchant 的商户）
     */
    @TableField("merchant_id")
    private Long merchantId;

    /**
     * 酒店中文名（必须字段）
     */
    @TableField("hotel_name_cn")
    private String hotelNameCn;

    /**
     * 酒店英文名（必须字段）
     */
    @TableField("hotel_name_en")
    private String hotelNameEn;

    /**
     * 省份（如：上海）（支持筛选）
     */
    @TableField("province")
    private String province;

    /**
     * 城市（核心筛选字段，如：上海）
     */
    @TableField("city")
    private String city;

    /**
     * 区域（如：浦东新区）
     */
    @TableField("district")
    private String district;

    /**
     * 详细地址（必须字段）
     */
    @TableField("detail_address")
    private String detailAddress;

    /**
     * 星级：1 = 一星～5 = 五星（核心筛选字段）
     */
    @TableField("star_level")
    private String starLevel;

    /**
     * 开业时间（必须字段）
     */
    @TableField("open_date")
    private LocalDate openDate;

    /**
     * 酒店简介（可选）
     */
    @TableField("description")
    private String description;

    /**
     * 附近景点（逗号分隔，如 “东方明珠，外滩”）
     */
    @TableField("nearby_attractions")
    private String nearbyAttractions;

    /**
     * 交通信息（如 “距浦东机场 10km”）
     */
    @TableField("traffic_info")
    private String trafficInfo;

    /**
     * 周边商场（如 “陆家嘴正大广场”）
     */
    @TableField("mall_info")
    private String mallInfo;

    /**
     * （商户可操作，下线可恢复）
     */
    @TableField("online_status")
    private String onlineStatus;

    /**
     * 审核状态
     */
    @TableField("audit_status")
    private String auditStatus;

    /**
     * 审核备注信息：不通过的审核要附加信息
     */
    @TableField("audit_info")
    private String auditInfo;

    /**
     * 录入时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;

    /**
     * 修改时间
     */
    @TableField("update_time")
    private LocalDateTime updateTime;
}
