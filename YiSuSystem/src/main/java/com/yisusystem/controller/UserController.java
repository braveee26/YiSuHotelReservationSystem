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
 * @order 1
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
     * @param id 用户 ID
     * @return 包含用户详细信息的响应对象
     */
    @GetMapping("/getUser")
    public Response<User> getUser(@RequestParam("id") Integer id) {
        return Response.success(userService.getUserById(id));
    }

    /**
     * 获取当前登录用户信息
     * 
     * @return 包含当前登录用户信息的响应对象
     */
    @GetMapping("/currentInfo")
    public Response<UserInfoRes> getCurrentUserInfo() {
        return Response.success(userService.getCurrentUserInfo());
    }

    /**
     * 用户注册
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
     * 
     * @param userLoginReq 用户登录请求对象，包含用户名和密码
     * @return 包含 JWT 令牌的响应结果
     */
    @PostMapping("/login")
    public Response<String> login(@RequestBody UserLoginReq userLoginReq) {
        return userService.login(userLoginReq);
    }

    // ==================== 管理员专用接口 ====================

    /**
     * 【管理员接口】获取所有用户列表
     * 支持按角色过滤用户
     * 
     * @param role 用户角色过滤参数（可选）
     * @return 用户列表响应
     */
    @GetMapping("/admin/all")
    public Response<java.util.List<User>> getAllUsers(
            @RequestParam(required = false) User.UserRoleEnum role) {
        java.util.List<User> users = userService.getAllUsers(role);
        return Response.success(users);
    }

    /**
     * 【管理员接口】更新用户状态（启用/禁用）
     * 
     * @param id 用户ID
     * @param isActive 是否激活状态
     * @return 更新后的用户信息
     */
    @PutMapping("/admin/{id}/status")
    public Response<User> updateUserStatus(
            @PathVariable("id") Integer id,
            @RequestParam Boolean isActive) {
        boolean result = userService.updateUserStatus(id, isActive);
        if (result) {
            User updatedUser = userService.getById(id);
            return Response.success(updatedUser);
        } else {
            return Response.error(404, "用户不存在或更新失败");
        }
    }

    /**
     * 【管理员接口】获取平台用户统计数据
     * 包括总用户数、各角色用户数等
     * 
     * @return 用户统计数据
     */
    @GetMapping("/admin/statistics")
    public Response<java.util.Map<String, Object>> getUserStatistics() {
        java.util.Map<String, Object> statistics = userService.getUserStatistics();
        return Response.success(statistics);
    }

}
