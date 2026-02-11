package com.yisusystem.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * @author liufuming
 */
@Data
public class UserLoginReq {
    /** 用户名 */
    @NotBlank
    private String userName;

    /** 密码 */
    @NotBlank
    private String password;
}
