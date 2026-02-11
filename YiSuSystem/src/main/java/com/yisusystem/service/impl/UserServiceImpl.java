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
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

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
        //设置电话
        user.setPhone(userDto.getPhone());
        user.setPassword(hashedPassword);
        user.setSalt(salt);
        LocalDateTime now = DateTimeUtil.now();
        user.setCreateTime(now);
        user.setUpdateTime(now);

        return this.userMapper.insert(user) > 0;
    }

    @Override
    public Response<String> login(UserLoginReq userLoginFormDTO) {
        User user = userMapper.getUserByUsername(userLoginFormDTO.getUserName());

        if (user == null || !EncryptUtil.verify(userLoginFormDTO.getPassword(), user.getSalt(), user.getPassword())) {
            return Response.error(HttpStatus.LoginError);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().name());
        claims.put("username", user.getUserName());
        String token = JwtUtil.generateToken(user.getUserId().toString(), claims);

        return Response.success("Bearer " + token);
    }

    @Override
    public UserInfoRes getCurrentUserInfo() {
        User user = SecurityUtil.getCurrentUser();
        UserInfoRes userInfoDTO = new UserInfoRes();

        if (user != null) {
            BeanUtils.copyProperties(user, userInfoDTO);
            userInfoDTO.setAvatarUrl(getAvatarUrl(user.getAvatar()));
            return userInfoDTO;
        } else {
            return null;
        }
    }

    private String getAvatarUrl(String avatarObjectKey) {
        // 暂时不实现头像上传功能，直接返回null
        return null;
    }

}
