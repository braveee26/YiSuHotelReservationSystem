package com.yisusystem.service.impl;

import com.yisusystem.common.HttpStatus;
import com.yisusystem.common.Response;
import com.yisusystem.pojo.dto.UserInfoRes;
import com.yisusystem.pojo.dto.UserLoginReq;
import com.yisusystem.pojo.dto.UserRegisterReq;
import com.yisusystem.pojo.entity.User;
import com.yisusystem.mapper.UserMapper;
import com.yisusystem.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yisusystem.utils.DateTimeUtil;
import com.yisusystem.utils.EncryptUtil;
import com.yisusystem.utils.JwtUtil;
import com.yisusystem.utils.SecurityUtil;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
    @Resource
    private UserMapper userMapper;
//    @Resource
//    private UserConvert userConvert;
//    @Resource
//    private MinioStorageService minioStorageService;

    @Override
    public User getUserById(Integer id) {
        return this.userMapper.selectById(id);
    }

    @Override
    public Boolean registerUser(UserRegisterReq userDto) {
        User user = new User();
        BeanUtils.copyProperties(userDto, user);

        // 设置默认头像
        if (user.getAvatar() == null || user.getAvatar().isEmpty()) {
            user.setAvatar("/static/images/default-avatar.png");
        }
        
        if (userMapper.getUserByUsername(userDto.getUserName()) != null) {
            return false;
        }

        String salt = EncryptUtil.generateSalt();
        String hashedPassword = EncryptUtil.hash(userDto.getPassword(), salt);
        
        // 设置需要特殊处理的字段
        user.setPassword(hashedPassword);
        user.setSalt(salt);
        LocalDateTime now = DateTimeUtil.now();
        user.setCreateTime(now);
        user.setUpdateTime(now);

        return this.userMapper.insert(user) > 0;
    }

    @Override
    public Response<String> login(UserLoginReq userLoginFormDTO) {
        User user;
        try {
            user = userMapper.getUserByUsername(userLoginFormDTO.getUserName());
        } catch (Exception e) {
            log.error("数据库连接失败，详细错误信息：", e);
            
            // 根据异常类型提供更具体的错误信息
            String errorMessage;
            if (e.getMessage().contains("UnknownHostException")) {
                errorMessage = "无法连接到数据库服务器，请检查网络连接和数据库地址配置";
                log.error("数据库主机名解析失败: {}", e.getMessage());
            } else if (e.getMessage().contains("Connection refused")) {
                errorMessage = "数据库连接被拒绝，请检查数据库服务是否正在运行";
                log.error("数据库连接被拒绝: {}", e.getMessage());
            } else if (e.getMessage().contains("password authentication failed")) {
                errorMessage = "数据库认证失败，请检查用户名和密码配置";
                log.error("数据库认证失败: {}", e.getMessage());
            } else if (e.getMessage().contains("database") && e.getMessage().contains("does not exist")) {
                errorMessage = "指定的数据库不存在，请检查数据库名称配置";
                log.error("数据库不存在: {}", e.getMessage());
            } else {
                errorMessage = "系统暂时不可用，请稍后再试（错误代码：DB_CONN_ERROR）";
            }
            
            return Response.error(500, errorMessage);
        }

        if (user == null || !EncryptUtil.verify(userLoginFormDTO.getPassword(), user.getSalt(), user.getPassword())) {
            return Response.error(HttpStatus.LoginError);
        }

        // 检查账户是否激活
        if (!user.getIsActive()) {
            return Response.error(401, "账户已被禁用，请联系管理员");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("username", user.getUserName());
        claims.put("isActive", user.getIsActive()); // 将激活状态加入JWT claims
        String token = JwtUtil.generateToken(user.getUserId().toString(), claims);

        return Response.success("Bearer " + token);
    }

    @Override
    public UserInfoRes getCurrentUserInfo() {
        User user = SecurityUtil.getCurrentUser();
        UserInfoRes userInfoDTO = new UserInfoRes();

        if (user != null) {
            BeanUtils.copyProperties(user, userInfoDTO);
            // avatar字段已经通过BeanUtils自动复制
            // 如果需要特殊处理头像URL，可以在这里添加逻辑
            return userInfoDTO;
        } else {
            return null;
        }
    }

    @Override
    public java.util.List<User> getAllUsers(User.UserRoleEnum role) {
        com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<User> queryWrapper = 
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<User>()
                        .orderByDesc("create_time");
        
        if (role != null) {
            queryWrapper.eq("role", role);
        }
        
        return this.list(queryWrapper);
    }

    @Override
    public Boolean updateUserStatus(Integer id, Boolean isActive) {
        User user = this.getById(id);
        if (user == null) {
            return false;
        }
        user.setIsActive(isActive);
        user.setUpdateTime(java.time.LocalDateTime.now());
        return this.updateById(user);
    }

    @Override
    public java.util.Map<String, Object> getUserStatistics() {
        long totalUsers = this.count();
        long activeUsers = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<User>()
                .eq("is_active", true));
        long merchants = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<User>()
                .eq("role", User.UserRoleEnum.merchant));
        long admins = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<User>()
                .eq("role", User.UserRoleEnum.admin));
        long customers = this.count(new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<User>()
                .eq("role", User.UserRoleEnum.customer));

        java.util.Map<String, Object> stats = new java.util.LinkedHashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("activeUsers", activeUsers);
        stats.put("merchants", merchants);
        stats.put("admins", admins);
        stats.put("customers", customers);
        
        return stats;
    }

}
