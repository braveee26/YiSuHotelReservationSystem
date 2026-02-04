package com.yisusystem.mapper;

import com.yisusystem.pojo.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 * 存储所有角色用户信息（商户、管理员） Mapper 接口
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
    /**
     * 批量查询用户
     */
    List<User> getUserByIds(List<Integer> ids);

    /**
     * 根据用户名查询用户
     */
    User getUserByUsername(String userName);

}
