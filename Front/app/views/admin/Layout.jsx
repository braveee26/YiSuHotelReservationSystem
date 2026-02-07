import React, { useState } from 'react';
import { Shield, Home, CheckSquare, Settings, Users, User, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import HotelAudit from './HotelAudit';
import PropertyManagement from './PropertyManagement';
import UserManagement from './UserManagement';
import Profile from './Profile';

export default function AdminLayout({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState({});

  // 只在客户端环境访问 localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('解析用户信息失败:', error);
          setCurrentUser({});
        }
      }
    }
  }, []);

  const menuItems = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'audit', icon: CheckSquare, label: '酒店审核' },
    { id: 'property', icon: Settings, label: '属性管理' },
    { id: 'users', icon: Users, label: '用户管理' },
    { id: 'profile', icon: User, label: '个人中心' },
  ];

  const renderBreadcrumb = () => {
    const breadcrumbs = [{ label: '管理员后台' }];
    
    if (currentPage === 'home') breadcrumbs.push({ label: '首页' });
    if (currentPage === 'audit') breadcrumbs.push({ label: '酒店审核' });
    if (currentPage === 'property') breadcrumbs.push({ label: '属性管理' });
    if (currentPage === 'users') breadcrumbs.push({ label: '用户管理' });
    if (currentPage === 'profile') breadcrumbs.push({ label: '个人中心' });

    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <span>/</span>}
            <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}>
              {crumb.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-2">欢迎回来，{currentUser.username}</h2>
              <p className="text-indigo-100">管理平台数据，审核酒店信息</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-800">8</span>
                </div>
                <div className="text-gray-600">待审核</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-800">156</span>
                </div>
                <div className="text-gray-600">已通过</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-800">12</span>
                </div>
                <div className="text-gray-600">已驳回</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-800">89</span>
                </div>
                <div className="text-gray-600">商户总数</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">快速操作</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setCurrentPage('audit')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
                >
                  <div className="font-medium text-gray-800 mb-1">审核酒店</div>
                  <div className="text-sm text-gray-600">查看待审核的酒店信息</div>
                </button>
                <button
                  onClick={() => setCurrentPage('property')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
                >
                  <div className="font-medium text-gray-800 mb-1">属性管理</div>
                  <div className="text-sm text-gray-600">管理城市和酒店属性</div>
                </button>
                <button
                  onClick={() => setCurrentPage('users')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left"
                >
                  <div className="font-medium text-gray-800 mb-1">用户管理</div>
                  <div className="text-sm text-gray-600">管理商户和用户信息</div>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">最近动态</h3>
              <div className="space-y-3">
                {[
                  { action: '新酒店待审核', hotel: '北京王府井大酒店', time: '5分钟前', type: 'pending' },
                  { action: '审核通过', hotel: '上海外滩精品酒店', time: '1小时前', type: 'approved' },
                  { action: '审核驳回', hotel: '深圳湾商务酒店', time: '2小时前', type: 'rejected' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'pending' ? 'bg-gray-400' :
                        activity.type === 'approved' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="text-sm text-gray-800">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.hotel}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'audit':
        return <HotelAudit />;
      case 'property':
        return <PropertyManagement />;
      case 'users':
        return <UserManagement />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800">易宿管理端</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                currentPage === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>退出登录</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
          {renderBreadcrumb()}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">{currentUser.username}</div>
              <div className="text-xs text-gray-500">管理员</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}