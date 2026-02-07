import React, { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Hotel, MapPin, Star, Calendar, MessageSquare } from 'lucide-react';
import HotelAuditDetailModal from '../../components/admin/HotelAuditDetailModal';

export default function HotelAudit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [approveConfirm, setApproveConfirm] = useState({
    isOpen: false,
    hotelId: '',
    hotelName: '',
  });

  // 模拟酒店数据（根据数据库表结构）
  const hotels = [
    {
      id: '1',
      nameCn: '北京王府井大酒店',
      nameEn: 'Beijing Wangfujing Hotel',
      merchant: '北京易宿酒店管理有限公司',
      address: '北京市东城区王府井大街100号',
      province: '北京市',
      city: '北京市',
      district: '东城区',
      detailAddress: '王府井大街100号',
      star: 5,
      openDate: '2020-01-15',
      status: 'pending',
      auditStatus: 'auditing',
      onlineStatus: 'offline',
      submitDate: '2026-02-03',
      createTime: '2026-02-01 10:00:00',
      updateTime: '2026-02-03 15:30:00',
      description: '位于北京市中心的豪华五星级酒店，毗邻王府井步行街，地理位置优越。酒店拥有各类客房300余间，配备完善的会议设施和餐饮服务。',
      nearbyAttractions: '故宫博物院,天安门广场,王府井步行街,景山公园',
      trafficInfo: '地铁1号线王府井站A出口步行5分钟，距北京首都国际机场28公里',
      mallInfo: '北京apm购物中心,王府中环,东方新天地',
      auditInfo: ''
    },
    {
      id: '2',
      nameCn: '上海外滩精品酒店',
      nameEn: 'Shanghai Bund Boutique Hotel',
      merchant: '上海外滩酒店集团',
      address: '上海市黄浦区中山东一路200号',
      province: '上海市',
      city: '上海市',
      district: '黄浦区',
      detailAddress: '中山东一路200号',
      star: 4,
      openDate: '2019-06-20',
      status: 'approved',
      auditStatus: 'approved',
      onlineStatus: 'online',
      submitDate: '2026-02-02',
      approveDate: '2026-02-02',
      createTime: '2026-01-28 09:15:00',
      updateTime: '2026-02-02 14:20:00',
      description: '外滩江景精品酒店，坐拥黄浦江一线江景，尽享都市繁华与宁静的完美结合。酒店设计融合现代与古典元素，提供高品质的住宿体验。',
      nearbyAttractions: '外滩,南京路步行街,豫园,上海博物馆,东方明珠塔',
      trafficInfo: '地铁10号线豫园站步行8分钟，距上海浦东国际机场35公里',
      mallInfo: '南京东路步行街,来福士广场,世茂广场',
      auditInfo: '资质齐全，符合上线标准'
    },
    {
      id: '3',
      nameCn: '深圳湾商务酒店',
      nameEn: 'Shenzhen Bay Business Hotel',
      merchant: '深圳商旅酒店有限公司',
      address: '广东省深圳市南山区深圳湾路',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detailAddress: '深圳湾路88号',
      star: 4,
      openDate: '2022-08-05',
      status: 'rejected',
      auditStatus: 'rejected',
      onlineStatus: 'offline',
      submitDate: '2026-02-01',
      rejectDate: '2026-02-02',
      createTime: '2026-01-25 11:30:00',
      updateTime: '2026-02-02 16:45:00',
      rejectReason: '酒店资质信息不完整，请补充营业执照和卫生许可证。酒店图片需要至少上传5张清晰的实景照片，当前只有3张。',
      description: '深圳湾畔高端商务酒店，面向深圳湾体育中心，是商务出行和休闲度假的理想选择。酒店拥有现代化的会议设施和健身中心。',
      nearbyAttractions: '深圳湾公园,深圳湾体育中心,海岸城购物中心',
      trafficInfo: '地铁2号线登良站B出口步行10分钟，距深圳宝安国际机场25公里',
      mallInfo: '海岸城购物中心,保利文化广场,天利中央广场',
      auditInfo: '资质材料不全，需补充相关证件'
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">已通过</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">审核中</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">已驳回</span>;
      default:
        return null;
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.nameCn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || hotel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (hotelId) => {
    console.log('Approving hotel:', hotelId);
    alert('酒店审核通过！');
    setSelectedHotel(null);
  };

  const handleReject = (hotelId) => {
    if (!rejectReason.trim()) {
      alert('请填写驳回原因');
      return;
    }
    console.log('Rejecting hotel:', hotelId, 'Reason:', rejectReason);
    alert('酒店审核已驳回');
    setSelectedHotel(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">酒店审核</h2>
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
                placeholder="搜索酒店名称或商户..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            {[
              { value: 'all', label: '全部', count: hotels.length },
              { value: 'pending', label: '待审核', count: hotels.filter(h => h.status === 'pending').length },
              { value: 'approved', label: '已通过', count: hotels.filter(h => h.status === 'approved').length },
              { value: 'rejected', label: '已驳回', count: hotels.filter(h => h.status === 'rejected').length },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === filter.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">酒店信息</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">商户</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">星级</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">提交时间</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">审核状态</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-800">{hotel.nameCn}</div>
                      <div className="text-sm text-gray-500">{hotel.nameEn}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {hotel.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">{hotel.merchant}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-800">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {hotel.star}星
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{hotel.submitDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(hotel.status)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      className="flex items-center space-x-1 px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
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
    </div>
  );
}