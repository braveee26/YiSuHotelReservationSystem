package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.HotelAttribute;
import com.yisusystem.mapper.HotelAttributeMapper;
import com.yisusystem.service.IHotelAttributeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 存储酒店可选属性（支持前端筛选标签） 服务实现类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class HotelAttributeServiceImpl extends ServiceImpl<HotelAttributeMapper, HotelAttribute> implements IHotelAttributeService {

}
