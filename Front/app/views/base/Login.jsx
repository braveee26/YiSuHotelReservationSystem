import React, { useState } from 'react';
import { Eye, EyeOff, Hotel } from 'lucide-react';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { login } from '../../api/base/userApi';
import { useUserStore } from '../../store/useUserStore';

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: storeLogin } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      message.error('请输入用户名和密码');
      setLoading(false);
      return;
    }

    try {
      console.log('尝试登录:', { username, password }); // 调试信息
      
      // 调用后端登录API
      const response = await login({
        userName: username,
        password: password
      });

      console.log('登录响应:', response); // 调试信息

      if (response.code === 200) {
        // 登录成功，解析JWT token获取用户信息
        const token = response.data;
        console.log('获取到token:', token); // 调试信息
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('JWT payload:', payload); // 调试信息
        
        const userRole = payload.role;
        const userUsername = payload.username;
        
        // 保存用户信息到状态管理
        const userInfo = {
          username: userUsername,
          role: userRole.toLowerCase()
        };
        
        console.log('保存用户信息:', userInfo); // 调试信息
        storeLogin(userInfo, token);
        
        message.success('登录成功');
        
        // 根据角色跳转到对应页面
        if (userRole.toLowerCase() === 'admin') {
          console.log('跳转到管理员页面'); // 调试信息
          navigate('/admin');
        } else {
          console.log('跳转到商户页面'); // 调试信息
          navigate('/merchant');
        }
      } else {
        message.error(response.msg || '登录失败');
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error(error.response?.data?.msg || '登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Hotel className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">易宿酒店管理平台</h1>
            <p className="text-gray-500">欢迎回来，请登录您的账号</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>



            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              还没有账号？
              <button
                onClick={() => window.location.href = '/register'}
                className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
              >
                立即注册
              </button>
            </p>
          </div>

          {/* Demo Hint */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p className="font-medium mb-1">测试账号提示：</p>
            <p>• 请使用已在系统中注册的账号进行登录</p>
            <p>• 如无账号，请先进行注册</p>
          </div>
        </div>
      </div>
    </div>
  );
}