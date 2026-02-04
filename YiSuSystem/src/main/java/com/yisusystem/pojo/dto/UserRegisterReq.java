package com.yisusystem.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import com.yisusystem.pojo.entity.User;

/**
 * 用户注册 DTO（与当前 `User` 实体对齐）
 * @author liufuming
 */
@Data
public class UserRegisterReq {
    /** 用户名 */
    @NotBlank
    private String userName;

    /** 密码 */
    @NotBlank
    private String password;

    /** 电子邮箱 */
    @NotBlank
    private String phone;

    /** 用户角色/类型 */
    @NotNull(message = "role 不能为空")
    private User.UserRoleEnum role;
}
