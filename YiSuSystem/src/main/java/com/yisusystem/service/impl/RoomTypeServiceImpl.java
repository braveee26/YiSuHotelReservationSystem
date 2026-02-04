package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.RoomType;
import com.yisusystem.mapper.RoomTypeMapper;
import com.yisusystem.service.IRoomTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 存储酒店房型核心信息（关联酒店，支持价格排序） 服务实现类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class RoomTypeServiceImpl extends ServiceImpl<RoomTypeMapper, RoomType> implements IRoomTypeService {

}
