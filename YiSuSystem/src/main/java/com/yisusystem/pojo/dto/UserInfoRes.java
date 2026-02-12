package com.yisusystem.pojo.dto;

import lombok.Data;
import com.yisusystem.pojo.entity.User;

import java.time.LocalDateTime;

/**
 * 用户信息展示 DTO（与当前 `User` 实体对齐）
 * @author liufuming
 */
@Data
public class UserInfoRes {
    /** 用户 ID */
    private Integer userId;

    /** 用户名 */
    private String userName;

    /** 真实姓名 */
    private String realName;

    /** 联系电话 */
    private String phone;

    /** 邮箱 */
    private String email;

    /** 创建时间 */
    private LocalDateTime createTime;

    /** 用户类型 / 角色 */
    private User.UserRoleEnum role;

    /** 用户头像路径 */
    private String avatar;

    /** 身份证号认证 */
    private String idCard;

    /** 修改时间 */
    private LocalDateTime updateTime;

    /** 是否激活 */
    private Boolean isActive;

}
