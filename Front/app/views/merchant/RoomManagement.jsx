import React, { useState } from 'react';
import { Search, Plus, Edit, Bed, Users, DollarSign, Image } from 'lucide-react';

export default function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟房型数据
  const rooms = [
    {
      id: '1',
      hotel_name: '北京王府井大酒店',
      room_name: '豪华大床房',
      price: 680,
      capacity: 2,
      size: 35,
      total: 20,
      available: 15,
    },
    {
      id: '2',
      hotel_name: '北京王府井大酒店',
      room_name: '行政套房',
      price: 1280,
      capacity: 3,
      size: 60,
      total: 10,
      available: 8,
    },
    {
      id: '3',
      hotel_name: '上海外滩精品酒店',
      room_name: '标准双床房',
      price: 480,
      capacity: 2,
      size: 28,
      total: 30,
      available: 22,
    },
    {
      id: '4',
      hotel_name: '上海外滩精品酒店',
      room_name: '江景套房',
      price: 1680,
      capacity: 4,
      size: 80,
      total: 5,
      available: 3,
    },
  ];

  const filteredRooms = rooms.filter((room) =>
    room.room_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.hotel_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">房型管理</h2>
        <button className="btn-primary flex items-center space-x-2 shadow-md">
          <Plus className="w-5 h-5" />
          <span>新建房型</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索房型或酒店名称..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">酒店名称</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">房型</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">价格</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">面积</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">入住人数</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">房间数量</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">可用数量</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">{room.hotel_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-800">{room.room_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{room.price}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{room.size}m²</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity}人</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">{room.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${room.available > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {room.available}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="btn-outline btn-sm p-1.5 text-blue-600 hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn-outline btn-sm p-1.5 text-gray-600 hover:bg-gray-100">
                        <Image className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <Bed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无房型数据</p>
        </div>
      )}
    </div>
  );
}