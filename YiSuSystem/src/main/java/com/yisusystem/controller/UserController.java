package com.yisusystem.controller;

import com.yisusystem.common.HttpStatus;
import com.yisusystem.common.Response;
import com.yisusystem.pojo.dto.UserInfoRes;
import com.yisusystem.pojo.dto.UserLoginReq;
import com.yisusystem.pojo.dto.UserRegisterReq;
import com.yisusystem.pojo.entity.User;
import com.yisusystem.service.IUserService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

/**
 * 存储所有角色用户信息（商户、管理员） 前端控制器
 * 
 * @order 1
 *
 * @author liufuming
 * @since 2026-02-04
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    IUserService userService;

    /**
     * 根据 ID 获取用户信息
     * <p>
     * 获取指定用户的详细信息，包括用户名、角色等。
     * </p>
     * 
     * @param id 用户 ID
     * @return 包含用户详细信息的响应对象
     */
    @GetMapping("/getUser")
    public Response<User> getUser(@RequestParam("id") Integer id) {
        return Response.success(userService.getUserById(id));
    }

    /**
     * 获取当前登录用户信息
     * <p>
     * 从 SecurityContext 中获取当前认证用户的详细信息。
     * </p>
     * 
     * @return 包含当前登录用户信息的响应对象
     */
    @GetMapping("/currentInfo")
    public Response<UserInfoRes> getCurrentUserInfo() {
        return Response.success(userService.getCurrentUserInfo());
    }

    /**
     * 用户注册
     * <p>
     * 注册新用户，支持商户和普通用户注册。
     * </p>
     *
     * @param userRegisterReq 用户注册请求对象，包含用户名、密码、角色等信息
     * @return 注册结果消息
     */
    @PostMapping("/register")
    public Response<String> register(@RequestBody @Valid UserRegisterReq userRegisterReq) {
        boolean isRegistered = userService.registerUser(userRegisterReq);
        if (isRegistered) {
            return Response.success("注册成功");
        } else {
            return Response.error(HttpStatus.RegisterError);
        }
    }

    /**
     * 用户登录
     * <p>
     * 用户凭证校验，校验通过后返回 JWT 令牌。
     * </p>
     * 
     * @param userLoginReq 用户登录请求对象，包含用户名和密码
     * @return 包含 JWT 令牌的响应结果
     */
    @PostMapping("/login")
    public Response<String> login(@RequestBody UserLoginReq userLoginReq) {
        return userService.login(userLoginReq);
    }

}
