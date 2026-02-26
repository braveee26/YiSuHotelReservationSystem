import React, { useState, useEffect } from 'react';
import { Search, Eye, CheckCircle, XCircle, Hotel, MapPin, Star, Calendar, MessageSquare, Filter, Settings } from 'lucide-react';
import { Pagination, message } from 'antd';
import HotelAuditDetailModal from '../../components/admin/HotelAuditDetailModal';
import AreaSelector from '../../components/merchant/AreaSelector';
import FacilityManagementModal from '../../components/admin/FacilityManagementModal';
import { getAllHotelsForAdmin, adminAuditHotel } from '../../api/base/hotelApi';

export default function HotelAudit() {
  const [searchTerm, setSearchTerm] = useState('');
  // 移除重复的状态筛选，只保留详细审核状态
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 添加商户信息映射
  const [merchants, setMerchants] = useState({});

  const [approveConfirm, setApproveConfirm] = useState({
    isOpen: false,
    hotelId: '',
    hotelName: '',
  });

  // 新增筛选状态
  const [areaFilter, setAreaFilter] = useState({
    province: '',
    city: '',
    district: ''
  });
  const [starFilters, setStarFilters] = useState([]); // 改为数组支持多选
  const [onlineStatusFilters, setOnlineStatusFilters] = useState([]); // 改为数组支持多选
  const [auditStatusFilters, setAuditStatusFilters] = useState([]); // 改为数组支持多选
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false); // 控制详细筛选面板
  const [showFacilityModal, setShowFacilityModal] = useState(false); // 控制设施管理模态框
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // 每页显示8条数据
  
  // 获取商户信息（模拟数据）
  const fetchMerchants = () => {
    // 模拟商户数据
    const mockMerchants = {
      1: '上海锦江国际集团',
      2: '北京首旅如家',
      3: '华住酒店集团',
      4: '亚朵酒店集团',
      5: '桔子水晶酒店',
      6: '全季酒店',
      7: '汉庭酒店',
      8: '维也纳酒店',
      9: '7天酒店',
      10: '如家酒店'
    };
    setMerchants(mockMerchants);
  };
  
  // 获取酒店列表
  const fetchHotels = async () => {
    setLoading(true);
    try {
      // 构造筛选参数
      const params = {};
      
      // 地区筛选
      if (areaFilter.province) params.province = areaFilter.province;
      if (areaFilter.city) params.city = areaFilter.city;
      if (areaFilter.district) params.district = areaFilter.district;
      
      // 星级筛选（如果有且只有一个选择）
      if (starFilters.length === 1) {
        params.starLevel = starFilters[0];
      }
      
      // 审核状态筛选（如果有且只有一个选择）
      if (auditStatusFilters.length === 1) {
        params.auditStatus = auditStatusFilters[0];
      }
      
      // 上线状态筛选（如果有且只有一个选择）
      if (onlineStatusFilters.length === 1) {
        params.onlineStatus = onlineStatusFilters[0];
      }
      
      const response = await getAllHotelsForAdmin(params);
      
      if (response.code === 200) {
        // 处理酒店数据，添加商户信息
        const processedHotels = response.data.map(hotel => ({
          ...hotel,
          id: hotel.hotelId,
          merchant: merchants[hotel.merchantId] || `商户${hotel.merchantId}`,
          address: hotel.detailAddress,
          submitDate: hotel.createTime ? new Date(hotel.createTime).toLocaleDateString() : '-',
          status: hotel.auditStatus
        }));
        
        setHotels(processedHotels);
      } else {
        message.error(response.msg || '获取酒店列表失败');
      }
    } catch (error) {
      console.error('获取酒店列表失败:', error);
      message.error('获取酒店列表失败');
    } finally {
      setLoading(false);
    }
  };
  
  // 组件挂载时获取数据
  useEffect(() => {
    fetchMerchants();
    fetchHotels();
  }, []);
  
  // 筛选条件变化时重新获取数据
  useEffect(() => {
    if (hotels.length > 0) { // 避免首次加载时重复请求
      fetchHotels();
    }
  }, [areaFilter, starFilters, auditStatusFilters, onlineStatusFilters]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">待审核</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">已通过</span>;
      case 'auditing':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">审核中</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">已驳回</span>;
      default:
        return null;
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    // 搜索过滤
    const matchesSearch =
      hotel.hotelNameCn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.hotelNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 状态过滤（使用详细审核状态）
    const matchesStatus = auditStatusFilters.length === 0 || auditStatusFilters.includes(hotel.auditStatus);
    
    // 地区过滤
    const matchesArea = (!areaFilter.province || hotel.province.includes(areaFilter.province)) &&
                       (!areaFilter.city || hotel.city.includes(areaFilter.city)) &&
                       (!areaFilter.district || hotel.district.includes(areaFilter.district));
    
    // 星级过滤（多选）
    const matchesStar = starFilters.length === 0 || starFilters.includes(hotel.starLevel.toString());
    
    // 上线状态过滤（多选）
    const matchesOnlineStatus = onlineStatusFilters.length === 0 || onlineStatusFilters.includes(hotel.onlineStatus);
    
    // 审核状态过滤（多选）
    const matchesAuditStatus = auditStatusFilters.length === 0 || auditStatusFilters.includes(hotel.auditStatus);
    
    return matchesSearch && matchesStatus && matchesArea && matchesStar && matchesOnlineStatus && matchesAuditStatus;
  });

  // 计算当前页显示的数据
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleApprove = async (hotelId) => {
    try {
      const response = await adminAuditHotel(hotelId, 'approved', '审核通过');
      if (response.code === 200) {
        message.success('酒店审核通过！');
        setSelectedHotel(null);
        fetchHotels(); // 重新获取数据
      } else {
        message.error(response.msg || '审核失败');
      }
    } catch (error) {
      console.error('审核失败:', error);
      message.error('审核失败');
    }
  };

  const handleReject = async (hotelId) => {
    if (!rejectReason.trim()) {
      message.warning('请填写驳回原因');
      return;
    }
    
    try {
      const response = await adminAuditHotel(hotelId, 'rejected', rejectReason);
      if (response.code === 200) {
        message.success('酒店审核已驳回');
        setSelectedHotel(null);
        setRejectReason('');
        fetchHotels(); // 重新获取数据
      } else {
        message.error(response.msg || '驳回失败');
      }
    } catch (error) {
      console.error('驳回失败:', error);
      message.error('驳回失败');
    }
  };

  const handleAreaChange = (province, city, district) => {
    setAreaFilter({ province, city, district });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setAreaFilter({ province: '', city: '', district: '' });
    setStarFilters([]);
    setOnlineStatusFilters([]);
    setAuditStatusFilters([]);
    // 重置后重新获取数据
    setTimeout(() => fetchHotels(), 0);
  };

  // 处理多选框变化
  const handleStarToggle = (star) => {
    setStarFilters(prev => 
      prev.includes(star) 
        ? prev.filter(s => s !== star)
        : [...prev, star]
    );
  };

  const handleOnlineStatusToggle = (status) => {
    setOnlineStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleAuditStatusToggle = (status) => {
    setAuditStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Search and Audit Status Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* 搜索框 */}
          <div className="flex-1 min-w-[280px]">
            <label className="block text-subheading font-bold-important mb-2">关键词搜索</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索酒店名称或商户..."
                className="w-full pl-10 pr-6 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* 审核状态 */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-subheading font-bold-important mb-2">审核状态</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { value: 'pending', label: '待提交' },
                { value: 'auditing', label: '审核中' },
                { value: 'approved', label: '审核通过' },
                { value: 'rejected', label: '审核驳回' }
              ].map(status => (
                <button
                  key={status.value}
                  onClick={() => handleAuditStatusToggle(status.value)}
                  className={`btn-secondary btn-sm ${
                    auditStatusFilters.includes(status.value) ? 'selected' : ''
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* 右侧按钮组 */}
          <div className="flex items-center gap-2">
            {/* 详细筛选按钮 */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`btn-secondary btn-sm flex items-center space-x-1.5 ${showAdvancedFilters ? 'selected' : ''}`}
            >
              <Filter className="w-4 h-4" />
              <span>详细筛选</span>
              <span className="text-xs opacity-75">({
                [areaFilter.province, areaFilter.city, areaFilter.district].filter(Boolean).length +
                starFilters.length +
                onlineStatusFilters.length
              })</span>
            </button>
            
            {/* 设施管理按钮 */}
            <button
              onClick={() => setShowFacilityModal(true)}
              className="btn-primary btn-sm flex items-center space-x-1.5"
            >
              <Settings className="w-4 h-4" />
              <span>设施管理</span>
            </button>
          </div>
        </div>
        
        {/* Record Count */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
          <span className="text-body font-medium">
            共找到 {filteredHotels.length} 条记录
          </span>
        </div>
      </div>

      {/* Advanced Filters Panel (Collapsible) */}
      {showAdvancedFilters && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="space-y-6">
            {/* 地区筛选 */}
            <div>
              <label className="block text-subheading font-bold-important mb-3">地理位置筛选</label>
              <AreaSelector
                province={areaFilter.province}
                city={areaFilter.city}
                district={areaFilter.district}
                onChange={handleAreaChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 星级筛选 */}
              <div>
                <label className="block text-subheading font-bold-important mb-3">酒店星级</label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleStarToggle(star.toString())}
                      className={`btn-secondary ${
                        starFilters.includes(star.toString()) ? 'selected' : ''
                      }`}
                    >
                      {star}星
                    </button>
                  ))}
                </div>
              </div>

              {/* 上线状态 */}
              <div>
                <label className="block text-subheading font-bold-important mb-3">上线状态</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'online', label: '已上线' },
                    { value: 'offline', label: '未上线' }
                  ].map(status => (
                    <button
                      key={status.value}
                      onClick={() => handleOnlineStatusToggle(status.value)}
                      className={`btn-secondary ${
                        onlineStatusFilters.includes(status.value) ? 'selected' : ''
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 重置按钮 */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={resetFilters}
                className="btn-secondary"
              >
                重置筛选条件
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hotels Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* 固定表头的表格容器 */}
        <div className="overflow-hidden">
          <div className="overflow-y-auto" style={{ maxHeight: '560px' }}>
            <table className="w-full">
              {/* 固定表头 */}
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[220px]">酒店信息</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[160px]">商户</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[90px]">星级</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">地区</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">提交时间</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">审核状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[130px]">上线状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[125px]">操作</th>
                </tr>
              </thead>
              {/* 滚动的内容 */}
              <tbody className="divide-y divide-gray-200">
                {paginatedHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 align-top">
                      <div>
                        <div className="font-bold text-gray-800">{hotel.hotelNameCn}</div>
                        <div className="text-body text-gray-500">{hotel.hotelNameEn}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{hotel.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm text-gray-800 truncate max-w-[150px]" title={hotel.merchant}>{hotel.merchant}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center text-sm text-gray-800">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {hotel.starLevel}星
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-body text-gray-600 truncate max-w-[120px]" title={`${hotel.province} ${hotel.city}`}>
                        {hotel.province} {hotel.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-body">{hotel.submitDate}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      {getStatusBadge(hotel.status)}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        hotel.onlineStatus === 'online' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {hotel.onlineStatus === 'online' ? '已上线' : '未上线'}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <button
                        onClick={() => setSelectedHotel(hotel)}
                        className="btn-view btn-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查看</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 空状态 */}
          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <Hotel className="mx-auto w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无符合条件的酒店</h3>
              <p className="text-gray-500 mb-4">请调整筛选条件或重置所有筛选</p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
        
        {/* 分页组件 */}
        {filteredHotels.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 flex flex-col items-center space-y-3">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredHotels.length}
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

      {/* Hotel Detail Modal */}
      <HotelAuditDetailModal
        hotel={selectedHotel}
        isOpen={!!selectedHotel}
        onClose={() => setSelectedHotel(null)}
        rejectReason={rejectReason}
        onRejectReasonChange={setRejectReason}
        onApprove={handleApprove}
        onReject={handleReject}
        approveConfirm={approveConfirm}
        setApproveConfirm={setApproveConfirm}
      />
      
      {/* Facility Management Modal */}
      <FacilityManagementModal
        isOpen={showFacilityModal}
        onClose={() => setShowFacilityModal(false)}
      />
    </div>
  );
}