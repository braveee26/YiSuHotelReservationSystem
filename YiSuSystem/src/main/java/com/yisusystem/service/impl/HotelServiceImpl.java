package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.Hotel;
import com.yisusystem.mapper.HotelMapper;
import com.yisusystem.service.IHotelService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 存储酒店核心信息（关联商户，简化审核相关字段） 服务实现类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class HotelServiceImpl extends ServiceImpl<HotelMapper, Hotel> implements IHotelService {

}
