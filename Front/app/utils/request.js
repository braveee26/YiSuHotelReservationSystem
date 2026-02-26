import axios from "axios";
import { message } from "antd";
import { useUserStore } from "../store/useUserStore";

// 根据环境设置API基础URL
// 生产环境 API 地址（Render 部署的 Java 后端）
const apiBaseUrl = import.meta.env.VITE_API_TARGET || "https://yisu-java-api.onrender.com";

const service = axios.create({
  baseURL: apiBaseUrl,
  timeout: 300000,
});

const mockService = axios.create({
  baseURL: "/",
  timeout: 300000,
});

// 请求拦截器, 预处理 前端向后端的请求
service.interceptors.request.use(
  (config) => {
    const storeToken = useUserStore.getState().token;

    // 如果存在 token，则在请求头中添加, 提交用户登录状态
    if (!config.skipInterceptor && storeToken) {
      // 将 Token 加到 Authorization 中
      config.headers["Authorization"] = `${storeToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Request Error:", error); // 添加日志
    // 请求错误处理
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器, 预处理后端给前端返回数据
service.interceptors.response.use(
  // 后端成功返回, 判断返回状态
  (response) => {
    if (response.status === 200) {
      // 直接返回 response.data，让调用方根据 code 判断成功或失败
      return response.data;
    } else {
      console.error("请求错误详情:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers,
      });
      message.error("请求错误");
      console.error("request.js Error: ", response.data?.msg || "未知错误");
      return Promise.reject(
        response.data || { code: response.status, msg: "请求错误" }
      );
    }
  },
  // 后端未返回, 判断为后端无法连接
  (error) => {
    console.error("响应错误详情:", {
      message: error.message,
      stack: error.stack,
      config: error.config,
      response: error.response,
    });

    // 如果有响应数据，提取错误信息
    if (error.response?.data) {
      const errorData = error.response.data;
      const errorMsg = errorData?.msg || errorData?.message || "请求失败";
      console.error("request.js Error: ", errorMsg);
      // 不在这里显示 message，让调用方处理
    } else {
      message.error("后端连接失败");
      console.error("request.js Error: ", error);
    }

    return Promise.reject(error);
  }
);

export { service, mockService };
