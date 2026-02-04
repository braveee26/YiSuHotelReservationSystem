package com.yisusystem.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 存储所有角色用户信息（商户、管理员）
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Getter
@Setter
@TableName("user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户唯一 ID（自增）
     */
    @TableId(value = "user_id", type = IdType.AUTO)
    private Long userId;

    /**
     * 登录账号（不可重复）
     */
    @TableField("user_name")
    private String userName;

    /**
     * 加密后的密码
     */
    @TableField("password")
    private String password;

    /**
     * 盐值
     */
    @TableField("salt")
    private String salt;

    /**
     * 商户、管理员
     */
    @TableField("role")
    private String role;

    /**
     * 用户头像
     */
    @TableField("avatar")
    private String avatar;

    /**
     * 真实姓名（商户 / 管理员需实名）
     */
    @TableField("real_name")
    private String realName;

    /**
     * 手机号（登录 / 联系用）
     */
    @TableField("phone")
    private String phone;

    /**
     * 邮箱（可选）
     */
    @TableField("email")
    private String email;

    /**
     * 注册时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;

    /**
     * 修改时间
     */
    @TableField("update_time")
    private LocalDateTime updateTime;

    /**
     * 身份证号认证
     */
    @TableField("id_card")
    private String idCard;
}
