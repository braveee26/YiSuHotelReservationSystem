import React, { useState } from 'react';
import { Eye, EyeOff, Hotel, Check } from 'lucide-react';

export default function RegisterView() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'merchant',
    companyName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 验证表单
    if (!formData.username || !formData.password || !formData.email || !formData.phone) {
      setError('请填写所有必填项');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少6位');
      return;
    }

    // 模拟注册成功
    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">注册成功！</h2>
            <p className="text-gray-600">正在跳转到登录页面...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Hotel className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">注册易宿账号</h1>
            <p className="text-gray-500">请选择您的角色并填写注册信息</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-3">选择角色 *</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'merchant')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.role === 'merchant'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium text-gray-800 mb-1">商户</div>
                    <div className="text-xs text-gray-600">管理酒店信息和房型</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData('role', 'admin')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.role === 'admin'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium text-gray-800 mb-1">管理员</div>
                    <div className="text-xs text-gray-600">审核酒店和管理用户</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">用户名 *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => updateFormData('username', e.target.value)}
                  placeholder="请输入用户名"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {formData.role === 'merchant' ? '企业名称' : '姓名'}
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder={formData.role === 'merchant' ? '请输入企业名称' : '请输入姓名'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">邮箱 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="请输入邮箱"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">手机号 *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="请输入手机号"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">密码 *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    placeholder="至少6位密码"
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

              <div>
                <label className="block text-sm text-gray-700 mb-2">确认密码 *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    placeholder="再次输入密码"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
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
              注册
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              已有账号？
              <button
                onClick={() => window.location.href = '/login'}
                className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
              >
                立即登录
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}