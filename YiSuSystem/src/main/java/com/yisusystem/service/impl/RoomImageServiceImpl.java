package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.RoomImage;
import com.yisusystem.mapper.RoomImageMapper;
import com.yisusystem.service.IRoomImageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 存储房型详情图（支持多图展示） 服务实现类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class RoomImageServiceImpl extends ServiceImpl<RoomImageMapper, RoomImage> implements IRoomImageService {

}
