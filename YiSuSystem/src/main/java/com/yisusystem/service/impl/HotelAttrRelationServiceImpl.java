package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.HotelAttrRelation;
import com.yisusystem.mapper.HotelAttrRelationMapper;
import com.yisusystem.service.IHotelAttrRelationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 解决酒店与属性的多对多关系 服务实现类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class HotelAttrRelationServiceImpl extends ServiceImpl<HotelAttrRelationMapper, HotelAttrRelation> implements IHotelAttrRelationService {

}
