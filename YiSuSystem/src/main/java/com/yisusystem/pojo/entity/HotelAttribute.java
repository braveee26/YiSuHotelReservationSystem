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
 * 存储酒店可选属性（支持前端筛选标签）
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("hotel_attribute")
public class HotelAttribute implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 属性唯一 ID（自增）
     */
    @TableId(value = "attr_id", type = IdType.AUTO)
    private Long attrId;

    /**
     * 属性名称（如 “亲子友好”、“免费停车场”、“豪华装修”）
     */
    @TableField("attr_name")
    private String attrName;

    /**
     * 属性描述（可选）
     */
    @TableField("attr_desc")
    private String attrDesc;
}
