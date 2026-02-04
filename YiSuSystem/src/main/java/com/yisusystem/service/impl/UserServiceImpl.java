package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.User;
import com.yisusystem.mapper.UserMapper;
import com.yisusystem.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 存储所有角色用户信息（商户、管理员） 服务实现类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
