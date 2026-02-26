import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Building2, Calendar, Save, Camera, Shield, CreditCard, CheckCircle, Award, XCircle, TrendingUp, Loader } from 'lucide-react';
import ConfirmModal from '../../components/merchant/ConfirmModal';
import { getCurrentUserInfo } from '../../api/base/userApi';
import { useUserStore } from '../../store/useUserStore';
import { message } from 'antd';

export default function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const { updateUserInfo } = useUserStore();

  // 模拟从数据库获取的用户数据
  const [userData, setUserData] = useState({
    user_id: '',
    user_name: '',
    role: 'admin',
    avatar: '',
    real_name: '',
    phone: '',
    email: '',
    id_card: '',
    department: '平台运营部', // 写死部门
    position: '高级审核专员', // 写死职位
    create_time: '',
    update_time: '',
  });

  // 获取当前用户信息
  const fetchCurrentUserInfo = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserInfo();
      
      if (response && response.code === 200) {
        const userInfo = response.data;
        
        // 更新用户数据（部门和职位使用写死的值）
        setUserData({
          user_id: userInfo.userId || '',
          user_name: userInfo.userName || '',
          role: userInfo.role?.toLowerCase() || 'admin',
          avatar: userInfo.avatar || '',
          real_name: userInfo.realName || '',
          phone: userInfo.phone || '',
          email: userInfo.email || '',
          id_card: userInfo.idCard || '',
          department: '平台运营部', // 固定部门
          position: '高级审核专员', // 固定职位
          create_time: userInfo.createTime || '',
          update_time: userInfo.updateTime || '',
        });
        
        // 更新全局用户状态
        updateUserInfo({
          username: userInfo.userName,
          role: userInfo.role?.toLowerCase(),
          userId: userInfo.userId,
          realName: userInfo.realName,
          avatar: userInfo.avatar
        });
        
      } else {
        message.error(response?.msg || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      message.error('获取用户信息失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 只在客户端环境访问 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
        } catch (error) {
          console.error('解析用户信息失败:', error);
        }
      }
    }
    
    // 获取当前用户信息
    fetchCurrentUserInfo();
  }, []);

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  const updateField = (field, value) => {
    // 部门和职位不允许修改
    if (field === 'department' || field === 'position') {
      return;
    }
    setUserData({ ...userData, [field]: value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSaveConfirm(true);
  };

  const confirmSave = () => {
    console.log('Saving user data:', userData);
    if (avatarPreview) {
      setUserData({ ...userData, avatar: avatarPreview });
    }
    message.success('个人信息更新成功！');
    setShowSaveConfirm(false);
  };

  const getRoleName = (role) => {
    return role === 'merchant' ? '商户' : '管理员';
  };

  const getRoleColor = (role) => {
    return role === 'merchant' ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600';
  };

  const getRoleBadgeColor = (role) => {
    return role === 'merchant' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  // 加载状态显示
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">正在加载用户信息...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 rounded-2xl p-8 shadow-lg">
        <div className="relative z-10 flex items-center space-x-6">
          {/* Avatar with upload */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-4xl font-semibold">
                  {userData.real_name?.charAt(0) || userData.user_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all transform group-hover:scale-110"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-white">
            <h2 className="text-3xl font-bold mb-2">{userData.real_name}</h2>
            <div className="flex items-center space-x-3 mb-3">
              <span className={`px-3 py-1 ${getRoleBadgeColor(userData.role)} bg-opacity-90 rounded-full text-sm font-medium`}>
                {getRoleName(userData.role)}
              </span>
              <span className="text-purple-100">•</span>
              <span className="text-purple-100">账号：{userData.user_name}</span>
              <span className="text-purple-100">•</span>
              <span className="text-purple-100">ID：{userData.user_id}</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-100">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">注册时间：{userData.create_time}</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information Card */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <User className="w-5 h-5 mr-2 text-purple-600" />
            基本信息
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>真实姓名 *</span>
                </label>
                <input
                  type="text"
                  value={userData.real_name}
                  onChange={(e) => updateField('real_name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>用户名</span>
                </label>
                <input
                  type="text"
                  value={userData.user_name}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>手机号 *</span>
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>邮箱</span>
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span>部门 *</span>
                </label>
                <input
                  type="text"
                  value={userData.department}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <Award className="w-4 h-4 text-gray-500" />
                  <span>职位 *</span>
                </label>
                <input
                  type="text"
                  value={userData.position}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2 shadow-md"
              >
                <Save className="w-5 h-5" />
                <span>保存更改</span>
              </button>
            </div>
          </form>
        </div>

        {/* Authentication & Security Card */}
        <div className="space-y-6">
          {/* ID Card Verification */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              实名认证
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">已实名认证</div>
                    <div className="text-xs text-gray-500 mt-0.5">认证时间：{userData.create_time.split(' ')[0]}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 font-medium">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span>身份证号 *</span>
                </label>
                <input
                  type="text"
                  value={userData.id_card}
                  onChange={(e) => updateField('id_card', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="请输入18位身份证号码"
                />
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              账号信息
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">用户ID</span>
                <span className="font-medium text-gray-800">{userData.user_id}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">注册时间</span>
                <span className="font-medium text-gray-800">
                  {userData.create_time ? new Date(userData.create_time).toLocaleDateString('zh-CN') : '暂无'}
                </span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">最后更新</span>
                <span className="font-medium text-gray-800">
                  {userData.update_time ? new Date(userData.update_time).toLocaleDateString('zh-CN') : '暂无'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Statistics */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-600" />
          工作统计
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-700 mb-1">45</div>
            <div className="text-sm text-blue-600 font-medium">本月审核</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1">92%</div>
            <div className="text-sm text-green-600 font-medium">通过率</div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-700 mb-1">8</div>
            <div className="text-sm text-red-600 font-medium">驳回数</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border border-yellow-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-yellow-700 mb-1">12</div>
            <div className="text-sm text-yellow-600 font-medium">待处理</div>
          </div>
        </div>
      </div>

      {/* Save Confirmation Modal */}
      <ConfirmModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={confirmSave}
        title="确认保存"
        message="确定要保存对个人信息的修改吗？"
        confirmText="保存"
        type="info"
      />
    </div>
  );
}