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
 * 解决酒店与属性的多对多关系
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("hotel_attr_relation")
public class HotelAttrRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 关联 ID（自增）
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 关联 hotel.hotel_id
     */
    @TableField("hotel_id")
    private Long hotelId;

    /**
     * 关联 hotel_attribute.attr_id
     */
    @TableField("attr_id")
    private Long attrId;
}
