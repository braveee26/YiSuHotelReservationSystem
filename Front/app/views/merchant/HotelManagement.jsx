import React, { useState } from 'react';
import { Search, Plus, MapPin, Star, Calendar, Edit2, Hotel, AlertCircle, ToggleLeft, ToggleRight, X, Send, BedDouble, Info } from 'lucide-react';
import ConfirmModal from '../../components/merchant/ConfirmModal';

export default function HotelManagement({ onView, onCreate, onRoomTypeSettings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [auditStatusFilter, setAuditStatusFilter] = useState('all');
  const [onlineStatusFilter, setOnlineStatusFilter] = useState('all');
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState('');
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    hotelId: '',
    action: 'online',
    hotelName: '',
  });

  const [auditConfirmModal, setAuditConfirmModal] = useState({
    isOpen: false,
    hotelId: '',
    hotelName: '',
  });

  // 模拟酒店数据
  const [hotels, setHotels] = useState([
    {
      id: '1',
      nameCn: '北京王府井大酒店',
      nameEn: 'Beijing Wangfujing Hotel',
      address: '北京市东城区王府井大街',
      star: 5,
      openDate: '2020-01-15',
      auditStatus: 'approved',
      isOnline: true,
      rejectReason: '',
      photo: 'https://images.unsplash.com/photo-1720540244592-b4124532b318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc3MDE0ODUzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      services: ['免费WiFi', '早餐', '停车场', '健身房', '游泳池'],
    },
    {
      id: '2',
      nameCn: '上海外滩精品酒店',
      nameEn: 'Shanghai Bund Boutique Hotel',
      address: '上海市黄浦区中山东一路',
      star: 4,
      openDate: '2019-06-20',
      auditStatus: 'approved',
      isOnline: false,
      rejectReason: '',
      photo: 'https://images.unsplash.com/photo-1762417422532-7bdaaf7d457a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcwMTgwODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      services: ['免费WiFi', '早餐', '咖啡厅'],
    },
    {
      id: '3',
      nameCn: '杭州西湖度假酒店',
      nameEn: 'Hangzhou West Lake Resort',
      address: '浙江省杭州市西湖区',
      star: 5,
      openDate: '2021-03-10',
      auditStatus: 'pending',
      isOnline: false,
      rejectReason: '',
      photo: 'https://images.unsplash.com/photo-1729717949948-56b52db111dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBob3RlbCUyMHBvb2x8ZW58MXx8fHwxNzcwMTE1NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      services: ['免费WiFi', '早餐', '停车场', '游泳池', '餐厅', '健身房'],
    },
    {
      id: '4',
      nameCn: '深圳湾商务酒店',
      nameEn: 'Shenzhen Bay Business Hotel',
      address: '广东省深圳市南山区',
      star: 4,
      openDate: '2022-08-05',
      auditStatus: 'rejected',
      isOnline: false,
      rejectReason: '酒店资质信息不完整，请补充营业执照和卫生许可证扫描件。酒店图片需要至少上传5张清晰的实景照片。',
      photo: 'https://images.unsplash.com/photo-1546034746-25df3092cc5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhvdGVsJTIwcm9vbXxlbnwxfHx8fDE3NzAxNTM5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      services: ['免费WiFi', '停车场', '餐厅'],
    },
    {
      id: '5',
      nameCn: '成都宽窄巷子酒店',
      nameEn: 'Chengdu Kuanzhai Alley Hotel',
      address: '四川省成都市青羊区',
      star: 4,
      openDate: '2023-12-20',
      auditStatus: 'not_submitted',
      isOnline: false,
      rejectReason: '',
      photo: '', // 没有照片，显示默认图标
      services: ['免费WiFi', '早餐'],
    },
  ]);

  const getAuditStatusBadge = (status) => {
    switch (status) {
      case 'not_submitted':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            未审核
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            已通过
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            审核中
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            未通过
          </span>
        );
      default:
        return null;
    }
  };

  const handleToggleOnline = (hotelId) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel || hotel.auditStatus !== 'approved') return;

    setConfirmModal({
      isOpen: true,
      hotelId,
      action: hotel.isOnline ? 'offline' : 'online',
      hotelName: hotel.nameCn,
    });
  };

  const confirmToggleOnline = () => {
    setHotels(hotels.map(hotel => {
      if (hotel.id === confirmModal.hotelId && hotel.auditStatus === 'approved') {
        return { ...hotel, isOnline: !hotel.isOnline };
      }
      return hotel;
    }));
  };

  const showRejectReason = (reason) => {
    setSelectedRejectReason(reason);
    setShowRejectReasonModal(true);
  };

  const handleSubmitAudit = (hotelId) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;

    setAuditConfirmModal({
      isOpen: true,
      hotelId,
      hotelName: hotel.nameCn,
    });
  };

  const confirmSubmitAudit = () => {
    setHotels(hotels.map(hotel => {
      if (hotel.id === auditConfirmModal.hotelId) {
        return { ...hotel, auditStatus: 'pending', rejectReason: '' };
      }
      return hotel;
    }));
    setAuditConfirmModal({ isOpen: false, hotelId: '', hotelName: '' });
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.nameCn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuditStatus = auditStatusFilter === 'all' || hotel.auditStatus === auditStatusFilter;
    const matchesOnlineStatus = onlineStatusFilter === 'all' || (onlineStatusFilter === 'online' ? hotel.isOnline : !hotel.isOnline);
    return matchesSearch && matchesAuditStatus && matchesOnlineStatus;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Filters - Fixed Search Bar */}
      <div className="flex-shrink-0 bg-white rounded-xl p-4 shadow-md border border-gray-200 mb-3">
        <div className="space-y-2.5">
          {/* Search + Create Button */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索酒店名称..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Create Button */}
            <button
              onClick={onCreate}
              className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md text-sm font-medium flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>新建酒店</span>
            </button>
          </div>

          {/* Audit Status Filter */}
          <div className="flex items-center space-x-2.5">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">审核状态：</label>
            <div className="flex space-x-1.5">
              {[
                { value: 'all', label: '全部' },
                { value: 'not_submitted', label: '未审核' },
                { value: 'pending', label: '审核中' },
                { value: 'approved', label: '已通过' },
                { value: 'rejected', label: '未通过' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setAuditStatusFilter(filter.value)}
                  className={`px-2.5 py-1 rounded-lg transition-colors text-xs ${
                    auditStatusFilter === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Online Status Filter */}
          <div className="flex items-center space-x-2.5">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">上线状态：</label>
            <div className="flex space-x-1.5">
              {[
                { value: 'all', label: '全部' },
                { value: 'online', label: '已上线' },
                { value: 'offline', label: '未上线' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setOnlineStatusFilter(filter.value)}
                  className={`px-2.5 py-1 rounded-lg transition-colors text-xs ${
                    onlineStatusFilter === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotels List - Scrollable Container */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-3 pb-2">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-300">
              <div className="flex h-44">
                {/* Image */}
                <div className="w-52 h-full flex-shrink-0 relative overflow-hidden group">
                  {hotel.photo ? (
                    <>
                      <img 
                        src={hotel.photo} 
                        alt={hotel.nameCn} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-blue-50 to-purple-50 flex items-center justify-center">
                      <Hotel className="w-14 h-14 text-blue-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex">
                  {/* Left: Hotel Info + Services */}
                  <div className="flex-1 pr-5 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{hotel.nameCn}</h3>
                        <p className="text-sm text-gray-500 truncate">{hotel.nameEn}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{hotel.address}</span>
                      </div>
                      {/* Service Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {hotel.services.map((service, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-md text-xs font-medium"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Star and Date - 放在底部 */}
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-700 font-medium">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span>{hotel.star}星级</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                        <span>{hotel.openDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Status Column */}
                  <div className="flex flex-col space-y-2.5 pr-5 min-w-[200px]">
                    {/* Audit Status */}
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="text-sm text-gray-600 font-medium">审核状态</div>
                        {(hotel.auditStatus === 'not_submitted' || hotel.auditStatus === 'rejected') && (
                          <button
                            onClick={() => handleSubmitAudit(hotel.id)}
                            className="flex items-center space-x-1 px-2 py-0.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm hover:shadow-md text-xs font-medium"
                          >
                            <Send className="w-3 h-3" />
                            <span>发起</span>
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getAuditStatusBadge(hotel.auditStatus)}
                        
                        {hotel.auditStatus === 'rejected' && (
                          <button
                            onClick={() => showRejectReason(hotel.rejectReason)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="查看驳回原因"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Online Status */}
                    <div>
                      <div className="text-sm text-gray-600 font-medium mb-2">上线状态</div>
                      {hotel.auditStatus === 'approved' ? (
                        <button
                          onClick={() => handleToggleOnline(hotel.id)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            hotel.isOnline
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {hotel.isOnline ? (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              <span>已上线</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              <span>未上线</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-sm">
                          待审核
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions - 两个按钮 */}
                  <div className="flex flex-col justify-center space-y-2.5">
                    <button
                      onClick={() => onRoomTypeSettings(hotel.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      <BedDouble className="w-4 h-4" />
                      <span>设置房型</span>
                    </button>
                    <button
                      onClick={() => onView(hotel.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      <Info className="w-4 h-4" />
                      <span>查看信息</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredHotels.length === 0 && (
        <div className="bg-white rounded-xl p-16 text-center border border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Hotel className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无酒店数据</h3>
          <p className="text-gray-500 mb-6">开始添加您的第一家酒店</p>
          <button
            onClick={onCreate}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>新建酒店</span>
          </button>
        </div>
      )}

      {/* Reject Reason Modal */}
      {showRejectReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">驳回原因</h3>
              <button
                onClick={() => setShowRejectReasonModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800 leading-relaxed">{selectedRejectReason}</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 提示：请根据驳回原因修改酒店信息后重新提交审核
                </p>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowRejectReasonModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Online Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmToggleOnline}
        title={confirmModal.action === 'online' ? '确认上线酒店' : '确认下线酒店'}
        message={
          confirmModal.action === 'online'
            ? `确定要上线「${confirmModal.hotelName}」吗？上线后用户将可以在平台上看到并预订此酒店。`
            : `确定要下线「${confirmModal.hotelName}」吗？下线后用户将无法在平台上看到此酒店。`
        }
        confirmText={confirmModal.action === 'online' ? '确认上线' : '确认下线'}
        type={confirmModal.action === 'online' ? 'info' : 'warning'}
      />

      {/* Submit Audit Confirm Modal */}
      <ConfirmModal
        isOpen={auditConfirmModal.isOpen}
        onClose={() => setAuditConfirmModal({ ...auditConfirmModal, isOpen: false })}
        onConfirm={confirmSubmitAudit}
        title="确认提交审核"
        message={`确定要提交「${auditConfirmModal.hotelName}」的审核吗？提交后酒店状态将变为审核中。`}
        confirmText="确认提交"
        type="info"
      />
    </div>
  );
}