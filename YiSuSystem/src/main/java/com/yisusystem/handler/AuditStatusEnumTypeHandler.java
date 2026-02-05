package com.yisusystem.handler;

import com.yisusystem.pojo.entity.Hotel.AuditStatusEnum;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

/**
 * PostgreSQL枚举类型处理器 - 审核状态
 * 处理AuditStatusEnum与数据库ENUM类型的映射
 * @author liufuming
 */
public class AuditStatusEnumTypeHandler extends BaseTypeHandler<AuditStatusEnum> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, AuditStatusEnum parameter, JdbcType jdbcType) throws SQLException {
        ps.setObject(i, parameter.name(), Types.OTHER);
    }

    @Override
    public AuditStatusEnum getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String value = rs.getString(columnName);
        return value != null ? AuditStatusEnum.valueOf(value) : null;
    }

    @Override
    public AuditStatusEnum getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String value = rs.getString(columnIndex);
        return value != null ? AuditStatusEnum.valueOf(value) : null;
    }

    @Override
    public AuditStatusEnum getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String value = cs.getString(columnIndex);
        return value != null ? AuditStatusEnum.valueOf(value) : null;
    }
}