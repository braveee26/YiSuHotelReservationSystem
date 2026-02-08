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
     * 根据用户 ID 获取用户信息
     * @param id 用户 ID
     * @return 用户信息
     * @apiNote 获取指定 ID 的用户详细信息
     */
    @GetMapping("/getUser")
    public Response<User> getUser(@RequestParam("id") Integer id) {
        return Response.success(userService.getUserById(id));
    }
    /**
     * 获取当前登录用户信息
     * @return 当前用户信息
     * @apiNote 获取当前登录用户的详细信息
     */
    @GetMapping("/currentInfo")
    public Response<UserInfoRes> getCurrentUserInfo() {
        return Response.success(userService.getCurrentUserInfo());
    }

    /**
     * 用户注册
     *
     * @param userRegisterReq 用户注册信息
     * @return 注册结果
     * @apiNote 用户注册接口，返回注册成功或失败信息
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
     * @param userLoginReq 用户登录信息
     * @return 登录结果
     * @apiNote 用户登录接口，返回JWT令牌
     */
    @PostMapping("/login")
    public Response<String> login(@RequestBody UserLoginReq userLoginReq) {
        return userService.login(userLoginReq);
    }

}
