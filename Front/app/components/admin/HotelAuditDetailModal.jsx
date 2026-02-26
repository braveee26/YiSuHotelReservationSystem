import React, { useState, useEffect } from 'react';
import { XCircle, MapPin, Star, Calendar, Hotel, MessageSquare, CheckCircle, Image, Camera, Globe, Building2, Clock, Navigation } from 'lucide-react';
import ConfirmModal from '../merchant/ConfirmModal';
import { getImagesByHotelId } from '../../api/base/hotelImageApi';

export default function HotelAuditDetailModal({
  hotel,
  isOpen,
  onClose,
  rejectReason,
  onRejectReasonChange,
  onApprove,
  onReject,
  approveConfirm,
  setApproveConfirm
}) {
  const [rejectConfirm, setRejectConfirm] = useState({
    isOpen: false,
    hotelId: '',
    hotelName: '',
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  // 从后端加载酒店图片
  const [hotelImages, setHotelImages] = useState([]);

  useEffect(() => {
    if (isOpen && hotel?.id) {
      getImagesByHotelId(hotel.id).then(res => {
        if (res.code === 200 && res.data && res.data.length > 0) {
          setHotelImages(res.data.map(img => img.imageUrl));
        } else {
          setHotelImages([]);
        }
      }).catch(() => {
        setHotelImages([]);
      });
      setCurrentImageIndex(0);
    }
  }, [isOpen, hotel?.id]);

  if (!isOpen || !hotel) return null;

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

  const handleApproveClick = () => {
    setApproveConfirm({
      isOpen: true,
      hotelId: hotel.id,
      hotelName: hotel.hotelNameCn,
    });
  };

  const handleRejectClick = () => {
    if (!rejectReason.trim()) {
      alert('请填写驳回原因');
      return;
    }
    setRejectConfirm({
      isOpen: true,
      hotelId: hotel.id,
      hotelName: hotel.nameCn,
    });
  };

  const confirmApprove = () => {
    onApprove(approveConfirm.hotelId);
    setApproveConfirm({ isOpen: false, hotelId: '', hotelName: '' });
  };

  const confirmReject = () => {
    onReject(rejectConfirm.hotelId);
    setRejectConfirm({ isOpen: false, hotelId: '', hotelName: '' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
  };

  return (
    <>
      {/* Detail Modal */}
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-50 shadow-sm backdrop-blur-sm bg-white/95">
            <h3 className="text-xl font-semibold text-gray-800">酒店详情</h3>
            <button
              onClick={() => {
                onClose();
                onRejectReasonChange('');
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              {/* Header with gradient background */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-gray-800 truncate mb-1">{hotel.hotelNameCn}</h4>
                    <p className="text-sm text-gray-500 font-medium truncate">{hotel.hotelNameEn}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {getStatusBadge(hotel.status)}
                  </div>
                </div>
              </div>
              
              {/* Content with enhanced spacing and styling */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Address Card */}
                  <div className="group relative bg-gray-50/50 hover:bg-gray-50 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:shadow-md transition-all duration-200 border border-gray-200">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">酒店地址</div>
                        <div className="text-gray-800 font-medium truncate">{hotel.address}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Star Rating Card */}
                  <div className="group relative bg-gray-50/50 hover:bg-gray-50 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:shadow-md transition-all duration-200 border border-gray-200">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">酒店星级</div>
                        <div className="text-gray-800 font-medium">
                          <span className="text-amber-600 font-bold">{hotel.starLevel}</span> 星级酒店
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Open Date Card */}
                  <div className="group relative bg-gray-50/50 hover:bg-gray-50 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:shadow-md transition-all duration-200 border border-gray-200">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">开业时间</div>
                        <div className="text-gray-800 font-medium">{hotel.openDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Merchant Card */}
                  <div className="group relative bg-gray-50/50 hover:bg-gray-50 rounded-xl p-4 transition-all duration-200 border border-transparent hover:border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:shadow-md transition-all duration-200 border border-gray-200">
                        <Hotel className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">所属商户</div>
                        <div className="text-gray-800 font-medium truncate">{hotel.merchant}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery Section */}
            <div>
              <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                <Image className="w-5 h-5 mr-2" />
                酒店图片
              </h5>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                {/*大图展示，鼠标悬停左右侧，点击后可切换图片*/}
                 <div className="relative group z-10">
                  <img
                    src={hotelImages[currentImageIndex]}
                    alt={`图片 ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* 左侧切换区域 */}
                  <div 
                    className="absolute left-0 top-0 w-1/2 h-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-start pl-6"
                    onClick={prevImage}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg border border-white/30">
                      <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                  {/* 右侧切换区域 */}
                  <div 
                    className="absolute right-0 top-0 w-1/2 h-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-end pr-6"
                    onClick={nextImage}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg border border-white/30">
                      <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                   {/* 图片数量统计 */}
                   <div className="text-right mb-0 mr-10 text-sm text-gray-600 bg-gray-50">
                     {currentImageIndex + 1} / {hotelImages.length}
                   </div>
                {/* Thumbnail Strip */}
                <div className="flex space-x-2 p-3 bg-gray-50 mt-0">
                  {hotelImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`缩略图 ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Section - Unified Single Column Layout */}
            <div className="space-y-5">
              {/* 酒店简介卡片 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md card-hover-effect">
                <div className="px-5 py-4 bg-gradient-to-r from-orange-50  border-b border-gray-100">
                  <h5 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    酒店简介
                  </h5>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {hotel.description || '暂无酒店简介'}
                  </p>
                </div>
              </div>

              {/* 附近景点卡片 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md card-hover-effect">
                <div className="px-5 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                  <h5 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    附近景点
                  </h5>
                </div>
                <div className="p-4">
                  <div className="text-gray-600 leading-relaxed text-base">
                    {hotel.nearbyAttractions || '暂无相关信息'}
                  </div>
                </div>
              </div>

              {/* 交通信息卡片 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md card-hover-effect">
                <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-orange-50 border-b border-gray-100">
                  <h5 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    交通信息
                  </h5>
                </div>
                <div className="p-4">
                  <div className="text-gray-600 leading-relaxed text-base">
                    {hotel.trafficInfo || '暂无交通信息'}
                  </div>
                </div>
              </div>

              {/* 周边商场卡片 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md card-hover-effect">
                <div className="px-5 py-4 bg-gradient-to-r from-red-50 to-red-50 border-b border-gray-100">
                  <h5 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    周边商场
                  </h5>
                </div>
                <div className="p-4">
                  <div className="text-gray-600 leading-relaxed text-base">
                    {hotel.mallInfo || '暂无相关信息'}
                  </div>
                </div>
              </div>

              {/* 在线状态卡片 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md card-hover-effect">
                <div className="px-5 py-4 bg-gradient-to-r from-cyan-50   border-b border-gray-100">
                  <h5 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    在线状态
                  </h5>
                </div>
                <div className="p-5">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      hotel.onlineStatus === 'online' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <span className={`w-3 h-3 rounded-full mr-2 ${
                        hotel.onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      {hotel.onlineStatus === 'online' ? '上线中' : '已下线'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 时间信息卡片 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md card-hover-effect">
                <div className="px-5 py-4 bg-gradient-to-r from-gray-50 via-slate-50 to-zinc-50 border-b border-gray-100">
                  <h5 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    时间信息
                  </h5>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center text-gray-600 bg-gray-50 rounded-xl p-4">
                    <Clock className="w-5 h-5 mr-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1 font-semibold">录入时间</span>
                      <span className="font-medium text-gray-800">{hotel.createTime || '2026-02-01 10:00:00'}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 rounded-xl p-4">
                    <Clock className="w-5 h-5 mr-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1 font-semibold">修改时间</span>
                      <span className="font-medium text-gray-800">{hotel.updateTime || '2026-02-03 15:30:00'}</span>
                    </div>
                  </div>
                  {hotel.approveDate && (
                    <div className="flex items-center text-green-700 bg-green-50 rounded-xl p-4 border border-green-100">
                      <CheckCircle className="w-5 h-5 mr-4 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-green-600 uppercase tracking-wide block mb-1 font-semibold">审核通过</span>
                        <span className="font-medium">{hotel.approveDate}</span>
                      </div>
                    </div>
                  )}
                  {hotel.rejectDate && (
                    <div className="flex items-center text-red-700 bg-red-50 rounded-xl p-4 border border-red-100">
                      <XCircle className="w-5 h-5 mr-4 flex-shrink-0" />
                      <div>
                        <span className="text-xs text-red-600 uppercase tracking-wide block mb-1 font-semibold">审核驳回</span>
                        <span className="font-medium">{hotel.rejectDate}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reject Reason if exists */}
            {hotel.status === 'rejected' && hotel.rejectReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-800 mb-1">驳回原因</div>
                    <div className="text-sm text-red-700">{hotel.rejectReason}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Actions for pending status */}
            {hotel.status === 'auditing' && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">审核备注（驳回时必填）</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => onRejectReasonChange(e.target.value)}
                    placeholder="请输入驳回原因或审核备注..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex space-x-3 gap-4">
                  <button
                    onClick={handleApproveClick}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>审核通过</span>
                  </button>
                  <button
                    onClick={handleRejectClick}
                    className="btn-warning flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>驳回</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <XCircle className="w-8 h-8" />
            </button>
            <img 
              src={hotelImages[currentImageIndex]} 
              alt="酒店大图"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      <ConfirmModal
        isOpen={approveConfirm.isOpen}
        onClose={() => setApproveConfirm({ ...approveConfirm, isOpen: false })}
        onConfirm={confirmApprove}
        title="确认通过审核"
        message={`确定要通过「${approveConfirm.hotelName}」的审核吗？通过后商户可以上线该酒店。`}
        confirmText="通过审核"
        type="info"
      />

      {/* Reject Confirmation Modal */}
      <ConfirmModal
        isOpen={rejectConfirm.isOpen}
        onClose={() => setRejectConfirm({ ...rejectConfirm, isOpen: false })}
        onConfirm={confirmReject}
        title="确认驳回审核"
        message={`确定要驳回「${rejectConfirm.hotelName}」的审核申请吗？驳回后需要填写驳回原因：${rejectReason}`}
        confirmText="驳回审核"
        type="danger"
      />
    </>
  );
}