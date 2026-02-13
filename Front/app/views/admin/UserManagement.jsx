import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, User, Building2, Mail, Phone, MoreVertical, Shield, Ban, CheckCircle } from 'lucide-react';
import { Pagination, message } from 'antd';
import ConfirmModal from '../../components/merchant/ConfirmModal';
import { getAllUsers, updateUserStatus, getUserStatistics } from '../../api/base/userApi';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusConfirm, setStatusConfirm] = useState({
    isOpen: false,
    userId: '',
    currentStatus: '',
    username: '',
  });
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // 数据状态
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // 存储所有用户数据
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    merchants: 0,
    admins: 0,
    customers: 0
  });
  const [loading, setLoading] = useState(false);

  // 模糊搜索防抖
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // 前端模糊搜索
  const filteredUsers = useMemo(() => {
    if (!searchTerm && roleFilter === 'all') {
      return allUsers;
    }
    
    return allUsers.filter(user => {
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      if (!matchesRole) return false;
      
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchTerm)
      );
    });
  }, [allUsers, searchTerm, roleFilter]);

  // 获取用户统计数据
  const fetchStatistics = async () => {
    try {
      const res = await getUserStatistics();
      if (res.code === 200 && res.data) {
        setStatistics({
          totalUsers: res.data.totalUsers || 0,
          merchants: res.data.merchants || 0,
          admins: res.data.admins || 0,
          customers: res.data.customers || 0
        });
      }
    } catch (error) {
      console.error('获取统计失败:', error);
    }
  };

  // 获取所有用户数据（只在初始化时调用）
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      let roleParam = null;
      if (roleFilter !== 'all') {
        roleParam = roleFilter;
      }
      
      const res = await getAllUsers(roleParam);
      if (res.code === 200 && res.data) {
        const processedUsers = res.data.map(user => ({
          id: user.userId,
          username: user.userName,
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'customer',
          company: user.realName ? `${user.realName}(个人)` : '未设置',
          hotelCount: 0,
          status: user.isActive ? 'active' : 'inactive',
          registerDate: user.createTime ? user.createTime.split('T')[0] : ''
        }));
        
        setAllUsers(processedUsers);
      }
    } catch (error) {
      console.error('获取用户列表失败:', error);
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchStatistics();
    fetchAllUsers();
  }, []);

  // 角色筛选变化时重新获取数据
  useEffect(() => {
    fetchAllUsers();
  }, [roleFilter]);

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
        <CheckCircle className="w-3 h-3" />
        <span>正常</span>
      </span>
    ) : (
      <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
        <Ban className="w-3 h-3" />
        <span>禁用</span>
      </span>
    );
  };

  const getRoleBadge = (role) => {
    if (role === 'customer') {
      return (
        <span className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          <User className="w-3 h-3" />
          <span>客户</span>
        </span>
      );
    }
    else if(role === 'admin' ){
      return(
      <span className="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
        <Shield className="w-3 h-3"/>
        <span>管理员</span>
      </span>
      );
    }
    else {
      return (
      <span className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
        <Building2 className="w-3 h-3"/>
        <span>商户</span>
      </span>
      );
    }
  };

  const handleToggleStatus = (userId, currentStatus, username) => {
    setStatusConfirm({
      isOpen: true,
      userId,
      currentStatus,
      username,
    });
  };

  const confirmToggleStatus = async () => {
    try {
      setLoading(true);
      const newStatus = statusConfirm.currentStatus === 'active' ? false : true;
      const response = await updateUserStatus(statusConfirm.userId, newStatus);
      
      if (response.code === 200) {
        const action = statusConfirm.currentStatus === 'active' ? '禁用' : '启用';
        message.success(`用户 ${statusConfirm.username} 已${action}成功`);
        
        // 重新获取用户列表以更新状态
        await fetchAllUsers();
        await fetchStatistics();
      } else {
        message.error('操作失败：' + (response.msg || '未知错误'));
      }
    } catch (error) {
      console.error('更新用户状态失败:', error);
      message.error('操作失败，请稍后重试');
    } finally {
      setLoading(false);
      setStatusConfirm({
        isOpen: false,
        userId: '',
        currentStatus: '',
        username: '',
      });
    }
  };

  const cancelToggleStatus = () => {
    setStatusConfirm({
      isOpen: false,
      userId: '',
      currentStatus: '',
      username: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-semibold text-gray-800">{statistics.totalUsers}</span>
          </div>
          <div className="text-gray-600">总用户数</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-semibold text-gray-800">
              {statistics.merchants}
            </span>
          </div>
          <div className="text-gray-600">商户</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-semibold text-gray-800">
              {statistics.admins}
            </span>
          </div>
          <div className="text-gray-600">管理员</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-semibold text-gray-800">
              {statistics.customers}
            </span>
          </div>
          <div className="text-gray-600">客户</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索用户名、邮箱、电话或姓名..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex space-x-2 gap-2">
            {[
              { value: 'all', label: '全部' },
              { value: 'merchant', label: '商户' },
              { value: 'admin', label: '管理员' },
              { value: 'customer', label: '客户' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setRoleFilter(filter.value)}
                className={`btn-secondary ${
                  roleFilter === filter.value ? 'selected' : ''
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[200px]">用户信息</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[220px]">联系方式</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[200px]">企业/机构</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">角色</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[90px]">酒店数</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">注册时间</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                ).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 truncate max-w-[120px]" title={user.username}>{user.username}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="space-y-1">
                        <div className="flex items-center text-body">
                          <Mail className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" />
                          <span className="truncate max-w-[180px]" title={user.email}>{user.email || '未设置'}</span>
                        </div>
                        <div className="flex items-center text-body">
                          <Phone className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" />
                          <span>{user.phone || '未设置'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-body truncate max-w-[180px]" title={user.company}>{user.company}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-body font-medium">{user.hotelCount}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm text-gray-600">{user.registerDate}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status, user.username)}
                          className={user.status === 'active' ? 'btn-status-disable btn-sm' : 'btn-status-enable btn-sm'}
                          style={{ padding: '5px 6px' }}
                          title={user.status === 'active' ? '禁用用户' : '启用用户'}
                          disabled={loading}
                        >
                          {user.status === 'active' ? (
                            <>
                              <Ban className="w-3 h-3 inline mr-1" />
                              禁用
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 inline mr-1" />
                              启用
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 空状态 */}
          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-12">
              <User className="mx-auto w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无符合条件的用户</h3>
              <p className="text-gray-500">请调整筛选条件</p>
            </div>
          )}
          
          {/* 简约加载状态 */}
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-4 shadow-lg flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 text-sm">加载中...</span>
              </div>
            </div>
          )}
        </div>
        
        {/* 分页组件 */}
        {filteredUsers.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 flex flex-col items-center space-y-3">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredUsers.length}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`}
              pageSizeOptions={['10', '20', '30', '50']}
            />
          </div>
        )}
      </div>

      {/* Status Toggle Confirmation Modal */}
      <ConfirmModal
        isOpen={statusConfirm.isOpen}
        onClose={() => setStatusConfirm({ ...statusConfirm, isOpen: false })}
        onConfirm={confirmToggleStatus}
        title={statusConfirm.currentStatus === 'active' ? '确认禁用用户' : '确认启用用户'}
        message={
          statusConfirm.currentStatus === 'active'
            ? `确定要禁用用户「${statusConfirm.username}」吗？禁用后该用户将无法登录系统。`
            : `确定要启用用户「${statusConfirm.username}」吗？启用后该用户可以正常登录系统。`
        }
        confirmText={statusConfirm.currentStatus === 'active' ? '禁用' : '启用'}
        type={statusConfirm.currentStatus === 'active' ? 'danger' : 'info'}
      />
    </div>
  );
}