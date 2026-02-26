package com.yisusystem.config;

import lombok.Getter;

/**
 * 白名单配置类
 * 
 * @author liufuming
 */
public class WhiteListConfig {
    @Getter
    private static final String[] WHITE_LIST = new String[] {
            "/user/login",
            "/user/register",
            "/doc/**"
    };
}
