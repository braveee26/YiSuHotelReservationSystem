package com.yisusystem.handler;

import com.yisusystem.pojo.entity.User.UserRoleEnum;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

/**
 * PostgreSQL枚举类型处理器
 * 处理UserRoleEnum与数据库ENUM类型的映射
 * @author liufuming
 */
public class UserRoleEnumTypeHandler extends BaseTypeHandler<UserRoleEnum> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, UserRoleEnum parameter, JdbcType jdbcType) throws SQLException {
        // 对于PostgreSQL的ENUM类型，需要使用Types.OTHER
        ps.setObject(i, parameter.name(), Types.OTHER);
    }

    @Override
    public UserRoleEnum getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String value = rs.getString(columnName);
        return value != null ? UserRoleEnum.valueOf(value) : null;
    }

    @Override
    public UserRoleEnum getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String value = rs.getString(columnIndex);
        return value != null ? UserRoleEnum.valueOf(value) : null;
    }

    @Override
    public UserRoleEnum getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String value = cs.getString(columnIndex);
        return value != null ? UserRoleEnum.valueOf(value) : null;
    }
}