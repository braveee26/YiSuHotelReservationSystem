package com.yisusystem.common;

import lombok.Getter;

/**
 * @author 刘馥铭
 */

@Getter
public enum HttpStatus {
    Success(200, "成功"),
    BadRequest(400, "错误请求"),
    RegisterError(401, "用户名已注册, 注册失败"),
    LoginError(401, "用户名或密码错误，登录失败"),
    ExpiredToken(401, "令牌过期或错误，请重新登录"),
    NotLoginForbidden(401, "未登录，禁止访问"),
    NotStepUpVerified(401, "未通过二次验证，禁止访问"),
    DenyForbidden(403, "权限不足，禁止访问"),
    UserNotFound(404, "用户不存在"),
    MethodNotAllowed(405, "不支持的请求方法"),
    Error(500, "未知异常"),
    ServerError(500, "服务器内部错误"),

    NotAllowFileType(400, "不允许的文件类型上传"),
    FileUploadError(500, "文件上传失败");

    /**
     * 客户端错误状态码
     */
    private final Integer code;

    /**
     * 状态码对应的含义
     */
    private final String msg;

    HttpStatus(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
