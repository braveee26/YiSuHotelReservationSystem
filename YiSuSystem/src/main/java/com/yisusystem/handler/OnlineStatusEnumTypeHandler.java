package com.yisusystem.handler;

import com.yisusystem.pojo.entity.Hotel.OnlineStatusEnum;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

/**
 * PostgreSQL枚举类型处理器 - 在线状态
 * 处理OnlineStatusEnum与数据库ENUM类型的映射
 * @author liufuming
 */
public class OnlineStatusEnumTypeHandler extends BaseTypeHandler<OnlineStatusEnum> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, OnlineStatusEnum parameter, JdbcType jdbcType) throws SQLException {
        ps.setObject(i, parameter.name(), Types.OTHER);
    }

    @Override
    public OnlineStatusEnum getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String value = rs.getString(columnName);
        return value != null ? OnlineStatusEnum.valueOf(value) : null;
    }

    @Override
    public OnlineStatusEnum getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String value = rs.getString(columnIndex);
        return value != null ? OnlineStatusEnum.valueOf(value) : null;
    }

    @Override
    public OnlineStatusEnum getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String value = cs.getString(columnIndex);
        return value != null ? OnlineStatusEnum.valueOf(value) : null;
    }
}