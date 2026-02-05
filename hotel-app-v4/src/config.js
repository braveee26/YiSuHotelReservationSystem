import { Capacitor } from '@capacitor/core';

/**
 * 获取当前环境的 API Base URL
 * 运行时智能判断：Capacitor native app 使用 10.0.2.2，其他使用 localhost
 */
export const getBaseUrl = () => {
  // 1. 判断是否在原生平台 (Android 或 iOS App via Capacitor)
  if (Capacitor.isNativePlatform()) {
    // 安卓模拟器需要用 10.0.2.2 访问宿主机
    // 如果是真机调试，可能需要改成局域网 IP: 'http://192.168.0.102:3000/api'
    return 'http://10.0.2.2:3000/api';
  }

  // 2. 微信小程序端 (WeChat Mini Program)
  if (process.env.TARO_ENV === 'weapp') {
    // 开发者工具用 localhost，真机需要改成局域网 IP
    return 'http://localhost:3000/api';
  }

  // 3. H5 浏览器环境
  return 'http://localhost:3000/api';
};

export const BASE_URL = getBaseUrl();
