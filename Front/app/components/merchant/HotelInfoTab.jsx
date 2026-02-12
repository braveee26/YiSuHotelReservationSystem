import React, { useState, useEffect } from 'react';
import { Upload, Save, MapPin, Building2, Star, Calendar, Globe } from 'lucide-react';
import { message } from 'antd';
import ConfirmModal from './ConfirmModal';
import AreaSelector from './AreaSelector';
import { getHotelById, createHotel, updateHotel } from '../../api/base/hotelApi';
import { getAllAttributes } from '../../api/base/hotelAttributeApi';

export default function HotelInfoTab({ hotelId, onSaveSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    hotelNameCn: '',
    hotelNameEn: '',
    province: '',
    city: '',
    district: '',
    detailAddress: '',
    starLevel: 3,
    openDate: '',
    description: '',
    nearbyAttractions: '',
    trafficInfo: '',
    mallInfo: '',
    facilities: [],
    images: [],
  });

  useEffect(() => {
    if (hotelId) {
      getHotelById(hotelId).then(res => {
        if (res.code === 200 && res.data) {
          const h = res.data;
          setFormData({
            hotelNameCn: h.hotelNameCn || '',
            hotelNameEn: h.hotelNameEn || '',
            province: h.province || '',
            city: h.city || '',
            district: h.district || '',
            detailAddress: h.detailAddress || '',
            starLevel: h.starLevel ? (typeof h.starLevel === 'object' ? h.starLevel.value : h.starLevel) : 3,
            openDate: h.openDate || '',
            description: h.description || '',
            nearbyAttractions: h.nearbyAttractions || '',
            trafficInfo: h.trafficInfo || '',
            mallInfo: h.mallInfo || '',
            facilities: [],
            images: [],
          });
        } else {
          message.error(res.msg || '获取酒店信息失败');
        }
      }).catch(() => {
        message.error('获取酒店信息失败');
      });
    }
  }, [hotelId]);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleFacility = (facility) => {
    if (formData.facilities.includes(facility)) {
      updateField('facilities', formData.facilities.filter((f) => f !== facility));
    } else {
      updateField('facilities', [...formData.facilities, facility]);
    }
  };

  const handleSubmit = () => {
    setShowSaveConfirm(true);
  };

  const confirmSave = async () => {
    try {
      const payload = {
        hotelNameCn: formData.hotelNameCn,
        hotelNameEn: formData.hotelNameEn,
        province: formData.province,
        city: formData.city,
        district: formData.district,
        detailAddress: formData.detailAddress,
        starLevel: formData.starLevel,
        openDate: formData.openDate,
        description: formData.description,
        nearbyAttractions: formData.nearbyAttractions,
        trafficInfo: formData.trafficInfo,
        mallInfo: formData.mallInfo,
      };
      let res;
      if (hotelId) {
        res = await updateHotel(hotelId, payload);
      } else {
        res = await createHotel(payload);
      }
      if (res.code === 200) {
        message.success('酒店信息保存成功！');
        onSaveSuccess();
      } else {
        message.error(res.msg || '保存失败');
      }
    } catch (err) {
      message.error('保存失败，请检查网络连接');
    }
    setShowSaveConfirm(false);
  };

  const [facilityOptions, setFacilityOptions] = useState([]);

  useEffect(() => {
    getAllAttributes().then(res => {
      if (res.code === 200 && res.data) {
        setFacilityOptions(res.data.map(attr => attr.attrName));
      }
    }).catch(() => {
      console.error('获取设施列表失败');
    });
  }, []);

  const steps = [
    { number: 1, title: '基本信息' },
    { number: 2, title: '位置信息' },
    { number: 3, title: '设施服务' },
  ];

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setCurrentStep(step.number)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all cursor-pointer ${
                  currentStep >= step.number
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {step.number}
              </button>
              <span
                className={`font-medium ${
                  currentStep >= step.number ? 'text-gray-800' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-6 h-1 bg-gray-200 rounded">
                <div
                  className={`h-full rounded transition-all ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ width: currentStep > step.number ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">基本信息</h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>酒店中文名称 *</span>
                </label>
                <input
                  type="text"
                  value={formData.hotelNameCn}
                  onChange={(e) => updateField('hotelNameCn', e.target.value)}
                  placeholder="请输入酒店中文名称"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
                  <Globe className="w-4 h-4" />
                  <span>酒店英文名称</span>
                </label>
                <input
                  type="text"
                  value={formData.hotelNameEn}
                  onChange={(e) => updateField('hotelNameEn', e.target.value)}
                  placeholder="请输入酒店英文名称"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
                  <Star className="w-4 h-4" />
                  <span>星级 *</span>
                </label>
                <select
                  value={formData.starLevel}
                  onChange={(e) => updateField('starLevel', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star}星级
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>开业时间 *</span>
                </label>
                <input
                  type="date"
                  value={formData.openDate}
                  onChange={(e) => updateField('openDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">酒店简介</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="请输入酒店简介..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">酒店图片</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">点击或拖拽上传图片</p>
                <p className="text-sm text-gray-400">支持 JPG、PNG 格式，最多上传10张</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">位置信息</h3>

            <AreaSelector
              province={formData.province}
              city={formData.city}
              district={formData.district}
              onChange={(province, city, district) => {
                setFormData({ ...formData, province, city, district });
              }}
            />

            <div>
              <label className="text-sm text-gray-700 mb-2 block">详细地址 *</label>
              <input
                type="text"
                value={formData.detailAddress}
                onChange={(e) => updateField('detailAddress', e.target.value)}
                placeholder="请输入详细地址"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">周边景点</label>
              <textarea
                value={formData.nearbyAttractions}
                onChange={(e) => updateField('nearbyAttractions', e.target.value)}
                placeholder="例如：故宫、天安门广场..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">周边商场</label>
              <textarea
                value={formData.mallInfo}
                onChange={(e) => updateField('mallInfo', e.target.value)}
                placeholder="例如：北京apm购物中心,王府中环..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">交通信息</label>
              <textarea
                value={formData.trafficInfo}
                onChange={(e) => updateField('trafficInfo', e.target.value)}
                placeholder="例如：地铁1号线王府井站A口步行5分钟..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">设施服务</h3>

            <div>
              <label className="text-sm text-gray-700 mb-3 block">选择酒店设施</label>
              <div className="grid grid-cols-3 gap-3">
                {facilityOptions.map((facility) => (
                  <button
                    key={facility}
                    type="button"
                    onClick={() => toggleFacility(facility)}
                    className={`px-4 py-3 border-2 rounded-lg transition-all ${
                      formData.facilities.includes(facility)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {facility}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 提示：完善的设施信息可以帮助用户更好地了解您的酒店，提升预订转化率
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一步
          </button>
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className="btn-primary"
            >
              下一步
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-success flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>保存酒店信息</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Confirmation Modal */}
      <ConfirmModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={confirmSave}
        title="确认保存"
        message={hotelId ? '确定要保存对酒店信息的修改吗？' : '确定要保存并提交酒店信息吗？保存后将提交审核。'}
        confirmText="保存"
        type="info"
      />
    </div>
  );
}