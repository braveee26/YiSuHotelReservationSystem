import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, Calendar, Save } from 'lucide-react';

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: 'admin@yisu.com',
    phone: '13800138888',
    department: '平台运营部',
    position: '高级审核专员',
    registrationDate: '2023-01-10',
  });

  // 只在客户端环境访问 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setFormData(prev => ({
            ...prev,
            username: user.username || ''
          }));
        } catch (error) {
          console.error('解析用户信息失败:', error);
        }
      }
    }
  }, []);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('个人信息更新成功！');
  };

  return (
    <div className="space-y-6">

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold">
            {formData.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{formData.username}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                <Shield className="w-3 h-3" />
                <span>管理员</span>
              </span>
              <span>•</span>
              <span className="font-medium">注册时间：{formData.registrationDate}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-subheading font-bold-important mb-2">
                <User className="w-4 h-4" />
                <span>用户名</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-subheading font-bold-important mb-2">
                <Mail className="w-4 h-4" />
                <span>邮箱</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-subheading font-bold-important mb-2">
                <Phone className="w-4 h-4" />
                <span>手机号</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-subheading font-bold-important mb-2">
                <Shield className="w-4 h-4" />
                <span>部门</span>
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => updateField('department', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-subheading font-bold-important mb-2">
                <User className="w-4 h-4" />
                <span>职位</span>
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => updateField('position', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-subheading font-bold-important mb-2">
                <Calendar className="w-4 h-4" />
                <span>注册日期</span>
              </label>
              <input
                type="text"
                value={formData.registrationDate}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2 shadow-md"
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">保存更改</span>
            </button>
          </div>
        </form>
      </div>

      {/* Work Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">工作统计</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">本月审核</div>
            <div className="text-3xl font-semibold text-gray-800">45</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">通过率</div>
            <div className="text-3xl font-semibold text-green-600">92%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">驳回数</div>
            <div className="text-3xl font-semibold text-red-600">8</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">待处理</div>
            <div className="text-3xl font-semibold text-yellow-600">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}