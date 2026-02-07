import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Building2, Bed } from 'lucide-react';
import HotelInfoTab from './HotelInfoTab';
import RoomTypeTab from './RoomTypeTab';

export default function HotelDetail({ hotelId, onBack, initialTab = 'info' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [hotelName, setHotelName] = useState('');

  useEffect(() => {
    if (hotelId) {
      // 模拟加载酒店名称
      setHotelName('北京王府井大酒店');
    } else {
      setHotelName('新建酒店');
    }
  }, [hotelId]);

  // 当 initialTab 变化时更新 activeTab
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'info', label: '酒店信息', icon: Building2 },
    { id: 'rooms', label: '房型管理', icon: Bed, disabled: !hotelId },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{hotelName}</h2>
            {!hotelId && <p className="text-sm text-gray-500 mt-1">完成酒店信息后即可添加房型</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : tab.disabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                {tab.disabled && <span className="text-xs">(保存酒店后可用)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'info' && <HotelInfoTab hotelId={hotelId} onSaveSuccess={onBack} />}
          {activeTab === 'rooms' && hotelId && <RoomTypeTab hotelId={hotelId} />}
        </div>
      </div>
    </div>
  );
}