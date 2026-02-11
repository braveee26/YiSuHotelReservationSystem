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
 * 存储房型详情图（支持多图展示）
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("room_image")
public class RoomImage implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 图片唯一 ID（自增）
     */
    @TableId(value = "image_id", type = IdType.AUTO)
    private Long imageId;

    /**
     * 关联 room_type.room_id（一个房型多个图片）
     */
    @TableField("room_id")
    private Long roomId;

    /**
     * 图片 URL（建议云存储，如 OSS）
     */
    @TableField("image_url")
    private String imageUrl;

    /**
     * 排序序号（1 = 第一张，控制展示顺序）
     */
    @TableField("sort_order")
    private Byte sortOrder;

    /**
     * 图片描述（如 “房间全景”、“床品细节”）
     */
    @TableField("image_desc")
    private String imageDesc;
}
