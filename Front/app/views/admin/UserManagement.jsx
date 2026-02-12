import React, { useState } from 'react';
import { Search, User, Building2, Mail, Phone, MoreVertical, Shield, Ban, CheckCircle } from 'lucide-react';
import { Pagination } from 'antd';
import ConfirmModal from '../../components/merchant/ConfirmModal';

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
  const [pageSize, setPageSize] = useState(10); // 用户管理每页显示10条数据

  // 模拟用户数据
  const users = [
    {
      id: '1',
      username: 'merchant_001',
      email: 'merchant001@yisu.com',
      phone: '13800138000',
      role: 'merchant',
      company: '北京易宿酒店管理有限公司',
      hotelCount: 5,
      status: 'active',
      registerDate: '2023-06-15',
    },
    {
      id: '2',
      username: 'merchant_002',
      email: 'merchant002@yisu.com',
      phone: '13800138001',
      role: 'merchant',
      company: '上海外滩酒店集团',
      hotelCount: 8,
      status: 'active',
      registerDate: '2023-08-20',
    },
    {
      id: '3',
      username: 'admin_001',
      email: 'admin001@yisu.com',
      phone: '13800138002',
      role: 'admin',
      company: '易宿平台',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-01-10',
    },
    {
      id: '4',
      username: 'merchant_003',
      email: 'merchant003@yisu.com',
      phone: '13800138003',
      role: 'merchant',
      company: '深圳商旅酒店有限公司',
      hotelCount: 3,
      status: 'inactive',
      registerDate: '2023-11-05',
    },
    // 添加更多用户数据用于分页测试
    {
      id: '5',
      username: 'merchant_004',
      email: 'merchant004@gzht.com',
      phone: '13800138004',
      role: 'merchant',
      company: '广州华天酒店集团',
      hotelCount: 12,
      status: 'active',
      registerDate: '2023-09-12',
    },
    {
      id: '6',
      username: 'merchant_005',
      email: 'merchant005@cdwh.com',
      phone: '13800138005',
      role: 'merchant',
      company: '成都文旅酒店管理有限公司',
      hotelCount: 7,
      status: 'active',
      registerDate: '2023-10-18',
    },
    {
      id: '7',
      username: 'admin_002',
      email: 'admin002@yisu.com',
      phone: '13800138006',
      role: 'admin',
      company: '易宿平台',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-02-20',
    },
    {
      id: '8',
      username: 'merchant_006',
      email: 'merchant006@xals.com',
      phone: '13800138007',
      role: 'merchant',
      company: '西安历史文化旅游发展有限公司',
      hotelCount: 4,
      status: 'inactive',
      registerDate: '2023-12-01',
    },
    {
      id: '9',
      username: 'merchant_007',
      email: 'merchant007@hzwl.com',
      phone: '13800138008',
      role: 'merchant',
      company: '杭州文旅集团',
      hotelCount: 9,
      status: 'active',
      registerDate: '2023-07-25',
    },
    {
      id: '10',
      username: 'merchant_008',
      email: 'merchant008@syhd.com',
      phone: '13800138009',
      role: 'merchant',
      company: '三亚海棠湾度假村有限公司',
      hotelCount: 15,
      status: 'active',
      registerDate: '2023-05-30',
    },
    {
      id: '11',
      username: 'admin_003',
      email: 'admin003@yisu.com',
      phone: '13800138010',
      role: 'admin',
      company: '易宿平台技术部',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-03-15',
    },
    {
      id: '12',
      username: 'merchant_009',
      email: 'merchant009@cqlb.com',
      phone: '13800138011',
      role: 'merchant',
      company: '重庆解放碑商业酒店集团',
      hotelCount: 6,
      status: 'inactive',
      registerDate: '2023-11-20',
    },
    {
      id: '13',
      username: 'merchant_010',
      email: 'merchant010@xmgl.com',
      phone: '13800138012',
      role: 'merchant',
      company: '厦门鼓浪屿旅游发展有限公司',
      hotelCount: 11,
      status: 'active',
      registerDate: '2023-08-05',
    },
    {
      id: '14',
      username: 'merchant_011',
      email: 'merchant011@qdhw.com',
      phone: '13800138013',
      role: 'merchant',
      company: '青岛海滨酒店管理集团',
      hotelCount: 8,
      status: 'active',
      registerDate: '2023-09-30',
    },
    {
      id: '15',
      username: 'admin_004',
      email: 'admin004@yisu.com',
      phone: '13800138014',
      role: 'admin',
      company: '易宿平台运营部',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-04-10',
    },
    // 客户用户数据
    {
      id: '16',
      username: 'customer_001',
      email: 'customer001@gmail.com',
      phone: '13900139001',
      role: 'customer',
      company: '个人用户',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-07-15',
    },
    {
      id: '17',
      username: 'customer_002',
      email: 'customer002@qq.com',
      phone: '13900139002',
      role: 'customer',
      company: '个人用户',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-08-22',
    },
    {
      id: '18',
      username: 'customer_003',
      email: 'customer003@163.com',
      phone: '13900139003',
      role: 'customer',
      company: '个人用户',
      hotelCount: 0,
      status: 'inactive',
      registerDate: '2023-10-05',
    },
    {
      id: '19',
      username: 'customer_004',
      email: 'customer004@hotmail.com',
      phone: '13900139004',
      role: 'customer',
      company: '个人用户',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-11-12',
    },
    {
      id: '20',
      username: 'customer_005',
      email: 'customer005@sina.com',
      phone: '13900139005',
      role: 'customer',
      company: '个人用户',
      hotelCount: 0,
      status: 'active',
      registerDate: '2023-12-03',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // 计算当前页显示的数据
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
    // 客户
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

  const confirmToggleStatus = () => {
    const action = statusConfirm.currentStatus === 'active' ? '禁用' : '启用';
    // 执行用户状态切换操作
    console.log(`用户 ${statusConfirm.username} 已${action}`);
    
    // 关闭确认弹窗
    setStatusConfirm({
      isOpen: false,
      userId: '',
      currentStatus: '',
      username: '',
    });
    
    // 这里可以添加实际的状态更新逻辑
    // 例如调用API更新用户状态
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
            <span className="text-2xl font-semibold text-gray-800">{users.length}</span>
          </div>
          <div className="text-gray-600">总用户数</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-semibold text-gray-800">
              {users.filter(u => u.role === 'merchant').length}
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
              {users.filter(u => u.role === 'admin').length}
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
              {users.filter(u => u.role === 'customer').length}
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索用户名、邮箱或企业..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        {/* 固定表头的表格容器 */}
        <div className="overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="w-full">
              {/* 固定表头 */}
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
              {/* 滚动的内容 */}
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
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
                          <span className="truncate max-w-[180px]" title={user.email}>{user.email}</span>
                        </div>
                        <div className="flex items-center text-body">
                          <Phone className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" />
                          <span>{user.phone}</span>
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
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="mx-auto w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无符合条件的用户</h3>
              <p className="text-gray-500">请调整筛选条件</p>
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
                // 筛选条件改变时重置到第一页
                if (page !== currentPage) {
                  setCurrentPage(1);
                }
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