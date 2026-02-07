import React, { useState, useEffect } from 'react';
import { Upload, Save, MapPin, Building2, Star, Calendar, Globe } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import AreaSelector from './AreaSelector';

export default function HotelInfoTab({ hotelId, onSaveSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nameCn: '',
    nameEn: '',
    province: '',
    city: '',
    district: '',
    address: '',
    star: 3,
    openDate: '',
    description: '',
    nearbyAttractions: '',
    transportation: '',
    facilities: [],
    images: [],
  });

  useEffect(() => {
    if (hotelId) {
      // 模拟加载现有酒店数据
      setFormData({
        nameCn: '北京王府井大酒店',
        nameEn: 'Beijing Wangfujing Hotel',
        province: '北京市',
        city: '北京市',
        district: '东城区',
        address: '王府井大街100号',
        star: 5,
        openDate: '2020-01-15',
        description: '位于北京市中心的豪华酒店，毗邻王府井步行街',
        nearbyAttractions: '故宫、天安门广场、王府井步行街',
        transportation: '地铁1号线王府井站A口步行5分钟',
        facilities: ['免费WiFi', '健身房', '游泳池', '餐厅'],
        images: [],
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

  const confirmSave = () => {
    console.log('Saving hotel data:', formData);
    alert('酒店信息保存成功！');
    onSaveSuccess();
  };

  const facilityOptions = [
    '免费WiFi', '停车场', '健身房', '游泳池', '餐厅', '会议室',
    '商务中心', '洗衣服务', '接送服务', '儿童乐园', 'SPA', '酒吧'
  ];

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
                  value={formData.nameCn}
                  onChange={(e) => updateField('nameCn', e.target.value)}
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
                  value={formData.nameEn}
                  onChange={(e) => updateField('nameEn', e.target.value)}
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
                  value={formData.star}
                  onChange={(e) => updateField('star', parseInt(e.target.value))}
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
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
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
              <label className="text-sm text-gray-700 mb-2 block">交通信息</label>
              <textarea
                value={formData.transportation}
                onChange={(e) => updateField('transportation', e.target.value)}
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
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一步
          </button>
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              下一步
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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