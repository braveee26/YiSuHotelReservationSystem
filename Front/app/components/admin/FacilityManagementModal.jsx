import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Save, Tag } from 'lucide-react';
import { Pagination } from 'antd';
import ConfirmModal from '../../components/merchant/ConfirmModal';

export default function FacilityManagementModal({ isOpen, onClose }) {
  const [facilities, setFacilities] = useState([
    { id: 1, name: '免费WiFi', description: '提供免费无线网络服务' },
    { id: 2, name: '免费停车场', description: '提供免费停车服务' },
    { id: 3, name: '健身房', description: '配备完善的健身设施' },
    { id: 4, name: '游泳池', description: '室内外游泳池设施' },
    { id: 5, name: '餐厅', description: '酒店内设有多家餐厅' },
    { id: 6, name: '会议室', description: '提供商务会议场地' },
    { id: 7, name: '洗衣服务', description: '提供洗衣和干洗服务' },
    { id: 8, name: '行李寄存', description: '提供行李寄存服务' },
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [newFacility, setNewFacility] = useState({ name: '', description: '' });
  const [editData, setEditData] = useState({ name: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    facilityId: '',
    facilityName: '',
  });
  
  const [addConfirm, setAddConfirm] = useState({
    isOpen: false,
    facilityName: '',
    facilityDescription: '',
  });
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // 每页显示8条数据

  // 添加新设施 - 触发确认
  const handleAddFacility = () => {
    if (!newFacility.name.trim()) {
      alert('请输入设施名称');
      return;
    }
    
    setAddConfirm({
      isOpen: true,
      facilityName: newFacility.name.trim(),
      facilityDescription: newFacility.description.trim()
    });
  };
  
  // 确认添加设施
  const confirmAddFacility = () => {
    const facility = {
      id: Date.now(),
      name: addConfirm.facilityName,
      description: addConfirm.facilityDescription
    };
    
    setFacilities([...facilities, facility]);
    setNewFacility({ name: '', description: '' });
    setAddConfirm({
      isOpen: false,
      facilityName: '',
      facilityDescription: ''
    });
  };
  
  // 取消添加设施
  const cancelAddFacility = () => {
    setAddConfirm({
      isOpen: false,
      facilityName: '',
      facilityDescription: ''
    });
  };

  // 开始编辑
  const handleEditStart = (facility) => {
    setEditingId(facility.id);
    setEditData({
      name: facility.name,
      description: facility.description
    });
  };

  // 保存编辑
  const handleEditSave = () => {
    if (!editData.name.trim()) {
      alert('请输入设施名称');
      return;
    }
    
    setFacilities(facilities.map(facility => 
      facility.id === editingId 
        ? { ...facility, name: editData.name.trim(), description: editData.description.trim() }
        : facility
    ));
    
    setEditingId(null);
    setEditData({ name: '', description: '' });
  };

  // 取消编辑
  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ name: '', description: '' });
  };

  // 删除设施确认
  const handleDeleteClick = (facilityId, facilityName) => {
    setDeleteConfirm({
      isOpen: true,
      facilityId,
      facilityName,
    });
  };

  // 确认删除
  const confirmDelete = () => {
    setFacilities(facilities.filter(facility => facility.id !== deleteConfirm.facilityId));
    setDeleteConfirm({
      isOpen: false,
      facilityId: '',
      facilityName: '',
    });
  };

  // 取消删除
  const cancelDelete = () => {
    setDeleteConfirm({
      isOpen: false,
      facilityId: '',
      facilityName: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">设施管理</h2>
              <p className="text-sm text-gray-600">管理酒店可选设施标签</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add New Facility Form */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">添加新设施</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">设施名称 *</label>
                <input
                  type="text"
                  value={newFacility.name}
                  onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                  placeholder="请输入设施名称"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">设施描述</label>
                <input
                  type="text"
                  value={newFacility.description}
                  onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                  placeholder="请输入设施描述（可选）"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddFacility}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>添加设施</span>
              </button>
            </div>
          </div>

          {/* Facilities List */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">现有设施 ({facilities.length})</h3>
            
            {/* 计算当前页显示的数据 */}
            {(() => {
              const paginatedFacilities = facilities.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              );
              
              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {paginatedFacilities.map((facility) => (
                      <div key={facility.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        {editingId === facility.id ? (
                          // Edit Mode
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">设施名称 *</label>
                              <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => setEditData({...editData, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">设施描述</label>
                              <input
                                type="text"
                                value={editData.description}
                                onChange={(e) => setEditData({...editData, description: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={handleEditSave}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                              >
                                <Save className="w-4 h-4" />
                                <span>保存</span>
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                              >
                                <X className="w-4 h-4" />
                                <span>取消</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Tag className="w-4 h-4 text-indigo-500" />
                                <span className="font-medium text-gray-800">{facility.name}</span>
                              </div>
                              {facility.description && (
                                <p className="text-sm text-gray-600 ml-6">{facility.description}</p>
                              )}
                            </div>
                            <div className="flex space-x-1 ml-4">
                              <button
                                onClick={() => handleEditStart(facility)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(facility.id, facility.name)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
                </>
              );
            })()}
            
            {facilities.length === 0 && (
              <div className="text-center py-12">
                <Tag className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无设施</h3>
                <p className="text-gray-500">请添加第一个设施标签</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="text-sm text-gray-600">
            共 {facilities.length} 个设施标签
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="删除设施"
        message={`确定要删除设施 "${deleteConfirm.facilityName}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        type="danger"
      />
      
      {/* Add Facility Confirmation Modal */}
      <ConfirmModal
        isOpen={addConfirm.isOpen}
        onClose={cancelAddFacility}
        onConfirm={confirmAddFacility}
        title="添加设施"
        message={`确定要添加设施 "${addConfirm.facilityName}" 吗？`}
        confirmText="添加"
        cancelText="取消"
        type="info"
      />
    </div>
  );
}