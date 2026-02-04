package com.yisusystem.common;
import lombok.Data;

@Data
public class Response<T>  {
        /**
         * 响应码
         */
        private Integer code;

        /**
         * 描述信息
         */
        private String msg;

        /**
         * 返回的数据
         */
        private T data;

        /**
         * 响应成功
         *
         * @param data 响应数据
         * @return 响应对象
         */
        public static <T> Response<T> success(T data) {
            Response<T> result = new Response<>();
            result.setCode(HttpStatus.Success.getCode());
            result.setMsg(HttpStatus.Success.getMsg());
            result.setData(data);
            return result;
        }

        /**
         * 失败
         *
         * @param status HTTP 响应状态
         * @return 响应对象
         */
        public static <T> Response<T> error(HttpStatus status) {
            Response<T> result = new Response<>();
            result.setCode(status.getCode());
            result.setMsg(status.getMsg());
            return result;
        }

        /**
         * 失败
         *
         * @param code HTTP 响应状态码
         * @param msg HTTP 响应状态
         * @return 响应对象
         */
        public static <T> Response<T> error(Integer code, String msg) {
            Response<T> result = new Response<>();
            result.setCode(code);
            result.setMsg(msg);
            return result;
        }
}
