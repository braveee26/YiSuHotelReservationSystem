package com.yisusystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 存储酒店详情页轮播图（Banner）
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("hotel_image")
public class HotelImage implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 图片唯一 ID（自增）
     */
    @TableId(value = "image_id", type = IdType.AUTO)
    private Long imageId;

    /**
     * 关联 hotel.hotel_id
     */
    @TableField("hotel_id")
    private Long hotelId;

    /**
     * 图片 URL（建议云存储）
     */
    @TableField("image_url")
    private String imageUrl;

    /**
     * 排序序号（1 = 第一张，控制轮播顺序）
     */
    @TableField("sort_order")
    private Byte sortOrder;

    /**
     * 图片描述（如 “酒店大堂”）
     */
    @TableField("image_desc")
    private String imageDesc;
}
