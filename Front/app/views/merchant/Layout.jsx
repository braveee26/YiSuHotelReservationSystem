import React, { useState, useEffect } from 'react';
import { Hotel, Home, User, ChevronLeft, ChevronRight, LogOut, Menu, Plus, TrendingUp, Clock } from 'lucide-react';
import HotelManagement from './HotelManagement';
import HotelDetail from '../../components/merchant/HotelDetail';
import Profile from './Profile';

export default function MerchantLayout({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  // 只在客户端环境访问 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('解析用户信息失败:', error);
        }
      }
    }
  }, []);

  const handleViewHotel = (hotelId) => {
    setSelectedHotelId(hotelId);
    setCurrentPage('hotel-detail');
  };

  const handleCreateHotel = () => {
    setSelectedHotelId(null);
    setCurrentPage('hotel-detail');
  };

  const handleRoomTypeSettings = (hotelId) => {
    setSelectedHotelId(hotelId);
    setCurrentPage('room-types');
  };

  const handleBackToHotels = () => {
    setCurrentPage('hotels');
    setSelectedHotelId(null);
  };

  const menuItems = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'hotels', icon: Hotel, label: '酒店管理' },
    { id: 'profile', icon: User, label: '个人中心' },
  ];

  const renderBreadcrumb = () => {
    const breadcrumbs = [{ label: '商户后台' }];
    
    if (currentPage === 'home') breadcrumbs.push({ label: '首页' });
    if (currentPage === 'hotels') breadcrumbs.push({ label: '酒店管理' });
    if (currentPage === 'hotel-detail') {
      breadcrumbs.push({ label: '酒店管理' });
      breadcrumbs.push({ label: selectedHotelId ? '酒店详情' : '新建酒店' });
    }
    if (currentPage === 'room-types') {
      breadcrumbs.push({ label: '酒店管理' });
      breadcrumbs.push({ label: selectedHotelId ? '房型设置' : '新建酒店' });
    }
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
            {/* Welcome Banner - 美化版 */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute right-24 bottom-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">欢迎回来，{currentUser.username}</h2>
                <p className="text-blue-100 text-lg">开始管理您的酒店信息，提升客户体验</p>
              </div>
            </div>

            {/* Stats Cards - 美化版 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Hotel className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">12</div>
                <div className="text-sm text-gray-600 mb-2">酒店总数</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>较上月 +2</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Menu className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">48</div>
                <div className="text-sm text-gray-600 mb-2">房型总数</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>较上月 +5</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">3</div>
                <div className="text-sm text-gray-600 mb-2">待审核</div>
                <div className="flex items-center text-xs text-orange-600">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>需要处理</span>
                </div>
              </div>
            </div>

            {/* Quick Actions - 美化版 */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-1 h-7 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-gray-800">快速操作</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <button
                  onClick={handleCreateHotel}
                  className="group relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 hover:shadow-xl transition-all text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xl font-bold text-gray-800 mb-2">新建酒店</div>
                      <div className="text-sm text-gray-600 leading-relaxed">录入新的酒店信息，快速上线运营</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentPage('hotels')}
                  className="group relative bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-xl transition-all text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Hotel className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xl font-bold text-gray-800 mb-2">管理酒店</div>
                      <div className="text-sm text-gray-600 leading-relaxed">查看和编辑酒店及房型信息</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'hotels':
        return <HotelManagement onView={handleViewHotel} onCreate={handleCreateHotel} onRoomTypeSettings={handleRoomTypeSettings} />;
      case 'hotel-detail':
        return <HotelDetail hotelId={selectedHotelId} onBack={handleBackToHotels} initialTab="info" />;
      case 'room-types':
        return <HotelDetail hotelId={selectedHotelId} onBack={handleBackToHotels} initialTab="rooms" />;
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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800">易宿商户端</span>
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
                  ? 'bg-blue-50 text-blue-600'
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
              <div className="text-xs text-gray-500">商户</div>
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