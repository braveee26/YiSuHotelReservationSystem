package com.yisusystem.handler;

import com.yisusystem.pojo.entity.Hotel;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * StarLevelEnum 类型处理器
 * 用于处理 PostgreSQL ENUM 类型与 Java 枚举的映射
 * 
 * @author liufuming
 * @since 2026-02-04
 */
@MappedTypes(Hotel.StarLevelEnum.class)
@MappedJdbcTypes(JdbcType.VARCHAR)
public class StarLevelEnumTypeHandler extends BaseTypeHandler<Hotel.StarLevelEnum> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Hotel.StarLevelEnum parameter, JdbcType jdbcType)
            throws SQLException {
        ps.setObject(i, String.valueOf(parameter.getValue()), java.sql.Types.OTHER);
    }

    @Override
    public Hotel.StarLevelEnum getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String value = rs.getString(columnName);
        return parseEnumValue(value);
    }

    @Override
    public Hotel.StarLevelEnum getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String value = rs.getString(columnIndex);
        return parseEnumValue(value);
    }

    @Override
    public Hotel.StarLevelEnum getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String value = cs.getString(columnIndex);
        return parseEnumValue(value);
    }

    /**
     * 解析数据库返回的枚举值
     * 支持数字字符串形式（如 "1", "2"）和枚举名称形式（如 "ONE", "TWO"）
     */
    private Hotel.StarLevelEnum parseEnumValue(String value) {
        if (value == null) {
            return null;
        }

        try {
            // 首先尝试按枚举名称解析
            return Hotel.StarLevelEnum.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            // 如果按名称解析失败，尝试按数值解析
            try {
                int numericValue = Integer.parseInt(value);
                switch (numericValue) {
                    case 1:
                        return Hotel.StarLevelEnum.ONE;
                    case 2:
                        return Hotel.StarLevelEnum.TWO;
                    case 3:
                        return Hotel.StarLevelEnum.THREE;
                    case 4:
                        return Hotel.StarLevelEnum.FOUR;
                    case 5:
                        return Hotel.StarLevelEnum.FIVE;
                    default:
                        return null;
                }
            } catch (NumberFormatException ex) {
                return null;
            }
        }
    }
}