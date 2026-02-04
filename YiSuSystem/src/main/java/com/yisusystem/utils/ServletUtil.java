package com.yisusystem.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import com.yisusystem.common.Response;

import java.io.IOException;

/**
 * @author Nefelibeta
 */
public final class ServletUtil {
    /**
     * 向 Response 中写入数据
     *
     * @param response 响应
     * @param msg      消息
     */
    public static <T> void rewrite(HttpServletResponse response, Response<T> msg) {
        try {
            ObjectMapper objMapper = new ObjectMapper();
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json;charset=utf-8");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(objMapper.writeValueAsString(msg));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
