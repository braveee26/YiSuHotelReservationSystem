package com.yisusystem.service.impl;

import com.yisusystem.pojo.entity.HotelAttribute;
import com.yisusystem.mapper.HotelAttributeMapper;
import com.yisusystem.service.IHotelAttributeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * 存储酒店可选属性（支持前端筛选标签） 服务实现类
 *
 * @author liufuming
 * @since 2026-02-04
 */
@Service
public class HotelAttributeServiceImpl extends ServiceImpl<HotelAttributeMapper, HotelAttribute> implements IHotelAttributeService {

    @Override
    public Boolean createHotelAttribute(String attributeName, String attributeType) {
        HotelAttribute attribute = new HotelAttribute();
        attribute.setAttrName(attributeName);
        attribute.setAttrDesc(attributeType);
        return this.save(attribute);
    }

    @Override
    public Boolean updateHotelAttribute(Long id, String attributeName, String attributeType) {
        HotelAttribute attribute = this.getById(id);
        if (attribute == null) {
            return false;
        }
        attribute.setAttrName(attributeName);
        attribute.setAttrDesc(attributeType);
        return this.updateById(attribute);
    }

    @Override
    public Boolean deleteHotelAttribute(Long id) {
        return this.removeById(id);
    }

}
