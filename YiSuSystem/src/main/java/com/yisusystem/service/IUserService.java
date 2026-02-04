package com.yisusystem.service;

import com.yisusystem.common.Response;
import com.yisusystem.pojo.dto.UserInfoRes;
import com.yisusystem.pojo.dto.UserLoginReq;
import com.yisusystem.pojo.dto.UserRegisterReq;
import com.yisusystem.pojo.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 存储所有角色用户信息（商户、管理员） 服务类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
public interface IUserService extends IService<User> {
    /**
     * 通过用户 ID 获取用户信息
     *
     * @param id 用户 ID
     * @return 用户信息实体
     */
    User getUserById(Integer id);

    /**
     * 注册新用户
     *
     * @param userRegisterReq 用户验证实体
     * @return 注册后的用户实体
     */
    Boolean registerUser(UserRegisterReq userRegisterReq);

    /**
     * 用户登录
     *
     * @param userLoginReq 用户登录信息
     * @return 登录结果，包含JWT令牌或错误信息
     */
    Response<String> login(UserLoginReq userLoginReq);

    /**
     * 获取当前登录用户的信息
     *
     * @return 当前用户信息
     */
    UserInfoRes getCurrentUserInfo();
}
