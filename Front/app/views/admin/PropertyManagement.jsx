import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Tag, Star } from 'lucide-react';
import { Pagination } from 'antd';
import ConfirmModal from '../../components/merchant/ConfirmModal';

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState('cities');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    id: '',
    name: '',
  });
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // 设施管理每页显示8条数据

  // 模拟数据
  const cities = [
    { id: '1', name: '北京', provinceId: '110000', hotelCount: 156 },
    { id: '2', name: '上海', provinceId: '310000', hotelCount: 189 },
    { id: '3', name: '广州', provinceId: '440100', hotelCount: 143 },
    { id: '4', name: '深圳', provinceId: '440300', hotelCount: 167 },
    { id: '5', name: '杭州', provinceId: '330100', hotelCount: 98 },
  ];

  const starLevels = [
    { id: '1', level: 5, name: '五星级', description: '豪华酒店', count: 45 },
    { id: '2', level: 4, name: '四星级', description: '高档酒店', count: 128 },
    { id: '3', level: 3, name: '三星级', description: '舒适酒店', count: 256 },
    { id: '4', level: 2, name: '二星级', description: '经济酒店', count: 189 },
    { id: '5', level: 1, name: '一星级', description: '基础酒店', count: 67 },
  ];

  const facilities = [
    { id: '1', name: '免费WiFi', icon: '📶', usageCount: 456 },
    { id: '2', name: '停车场', icon: '🅿️', usageCount: 389 },
    { id: '3', name: '健身房', icon: '💪', usageCount: 234 },
    { id: '4', name: '游泳池', icon: '🏊', usageCount: 156 },
    { id: '5', name: '餐厅', icon: '🍽️', usageCount: 423 },
    { id: '6', name: '会议室', icon: '👥', usageCount: 267 },
    { id: '7', name: '商务中心', icon: '💼', usageCount: 198 },
    { id: '8', name: '洗衣服务', icon: '🧺', usageCount: 345 },
    // 添加更多设施用于分页测试
    { id: '9', name: '行李寄存', icon: '🧳', usageCount: 298 },
    { id: '10', name: '叫醒服务', icon: '⏰', usageCount: 187 },
    { id: '11', name: '接机服务', icon: '🚗', usageCount: 165 },
    { id: '12', name: '送机服务', icon: '🚕', usageCount: 143 },
    { id: '13', name: '儿童乐园', icon: '游乐场', usageCount: 212 },
    { id: '14', name: 'SPA按摩', icon: '💆', usageCount: 178 },
    { id: '15', name: '酒吧', icon: '🍸', usageCount: 256 },
    { id: '16', name: '棋牌室', icon: '🀄', usageCount: 98 },
    { id: '17', name: 'KTV', icon: '🎤', usageCount: 134 },
    { id: '18', name: '桑拿浴室', icon: '🧖', usageCount: 156 },
    { id: '19', name: '台球室', icon: '🎱', usageCount: 87 },
    { id: '20', name: '乒乓球室', icon: '🏓', usageCount: 76 },
    { id: '21', name: '网球场', icon: '🎾', usageCount: 65 },
    { id: '22', name: '篮球场', icon: '🏀', usageCount: 54 },
    { id: '23', name: '高尔夫练习场', icon: '🏌️', usageCount: 43 },
    { id: '24', name: '温泉', icon: '♨️', usageCount: 189 },
  ];

  const handleAdd = () => {
    if (!newItem.trim()) {
      alert('请输入内容');
      return;
    }
    alert(`添加成功：${newItem}`);
    setNewItem('');
    setShowAddModal(false);
  };

  const handleDelete = (id, name) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const confirmDelete = () => {
    alert(`已删除：${deleteConfirm.name}`);
    setDeleteConfirm({ isOpen: false, id: '', name: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">属性管理</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>添加{activeTab === 'cities' ? '城市' : activeTab === 'stars' ? '星级' : '设施'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'cities', label: '城市管理', icon: MapPin },
              { id: 'stars', label: '星级管理', icon: Star },
              { id: 'facilities', label: '设施管理', icon: Tag },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Cities Tab */}
          {activeTab === 'cities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-gray-800">{city.name}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(city.id, city.name)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>省份代码：{city.provinceId}</div>
                      <div>酒店数量：{city.hotelCount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stars Tab */}
          {activeTab === 'stars' && (
            <div className="space-y-3">
              {starLevels.map((star) => (
                <div
                  key={star.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[...Array(star.level)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{star.name}</div>
                      <div className="text-sm text-gray-600">{star.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      使用次数：<span className="font-medium text-gray-800">{star.count}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <div>
              {/* 固定高度的滚动容器 */}
              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {facilities.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((facility) => (
                    <div
                      key={facility.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{facility.icon}</span>
                          <span className="font-semibold text-gray-800 truncate max-w-[120px]" title={facility.name}>{facility.name}</span>
                        </div>
                        <div className="flex space-x-1">
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(facility.id, facility.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">使用：{facility.usageCount}次</div>
                    </div>
                  ))}
                </div>
              </div>
                
              {/* 分页组件 */}
              {facilities.length > pageSize && (
                <div className="border-t border-gray-200 pt-4 flex flex-col items-center space-y-3">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={facilities.length}
                    onChange={(page, size) => {
                      setCurrentPage(page);
                      setPageSize(size);
                    }}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`}
                    pageSizeOptions={['8', '16', '24', '32']}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              添加{activeTab === 'cities' ? '城市' : activeTab === 'stars' ? '星级' : '设施'}
            </h3>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`请输入${activeTab === 'cities' ? '城市名称' : activeTab === 'stars' ? '星级名称' : '设施名称'}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewItem('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="确认删除"
        message={`确定要删除「${deleteConfirm.name}」吗？删除后将无法恢复。`}
        confirmText="删除"
        type="danger"
      />
    </div>
  );
}