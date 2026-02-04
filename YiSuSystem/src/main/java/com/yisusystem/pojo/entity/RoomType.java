package com.yisusystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 存储酒店房型核心信息（关联酒店，支持价格排序）
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("room_type")
public class RoomType implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 房型唯一 ID（自增）
     */
    @TableId(value = "room_id", type = IdType.AUTO)
    private Long roomId;

    /**
     * 关联 hotel.hotel_id（一个酒店多个房型）
     */
    @TableField("hotel_id")
    private Long hotelId;

    /**
     * 房型名称（如 “经典双床房”、“豪华大床房”）
     */
    @TableField("room_name")
    private String roomName;

    /**
     * 原价（必须字段，支持价格筛选 / 排序）
     */
    @TableField("price")
    private BigDecimal price;

    /**
     * 优惠价（可选，无优惠则为空）
     */
    @TableField("discount_price")
    private BigDecimal discountPrice;

    /**
     * 床型（如 “1.8m 大床”、“1.2m 双床”）
     */
    @TableField("bed_type")
    private String bedType;

    /**
     * 房间面积（如 “25.5㎡”）
     */
    @TableField("area")
    private BigDecimal area;

    /**
     * 库存数量（可选，用于展示剩余房量）
     */
    @TableField("stock")
    private Integer stock;

    /**
     * 是否含早
     */
    @TableField("include_breakfast")
    private String includeBreakfast;

    /**
     * 最大入住人数（如 2、3）
     */
    @TableField("max_people")
    private Boolean maxPeople;

    /**
     * 房型描述（如 “独立卫浴、免费 WiFi”）
     */
    @TableField("description")
    private String description;

    /**
     * 创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;

    /**
     * 修改时间
     */
    @TableField("update_time")
    private LocalDateTime updateTime;
}
