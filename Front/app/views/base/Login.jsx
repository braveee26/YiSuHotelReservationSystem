import React, { useState } from 'react';
import { Eye, EyeOff, Hotel } from 'lucide-react';

export default function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    // 模拟登录逻辑：根据用户名前缀判断角色
    const role = username.startsWith('admin') ? 'admin' : 'merchant';
    
    // 保存用户信息到本地存储
    localStorage.setItem('currentUser', JSON.stringify({ username, role }));
    
    // 根据角色跳转到对应页面
    if (role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/merchant';
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              登录
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
            <p>• 商户账号：使用任意用户名（非admin开头）</p>
            <p>• 管理员账号：使用 admin 开头的用户名</p>
          </div>
        </div>
      </div>
    </div>
  );
}