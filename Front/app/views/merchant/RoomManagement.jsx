import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Bed, Users, DollarSign, Image, Loader2 } from 'lucide-react';
import { getHotelsByMerchantId } from '../../api/base/hotelApi';
import { getRoomsByHotelId } from '../../api/base/roomTypeApi';
import { useUserStore } from '../../store/useUserStore';
import { message } from 'antd';

export default function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((s) => s.user);

  // 加载商户所有酒店的房型
  useEffect(() => {
    const merchantId = user?.userId || user?.user_id;
    if (!merchantId) return;

    setLoading(true);
    getHotelsByMerchantId(merchantId)
      .then(async (res) => {
        if (res.code === 200 && res.data) {
          const hotels = res.data;
          // 对每个酒店并行获取房型
          const roomPromises = hotels.map((hotel) =>
            getRoomsByHotelId(hotel.hotelId || hotel.id)
              .then((roomRes) => {
                if (roomRes.code === 200 && roomRes.data) {
                  return roomRes.data.map((room) => ({
                    ...room,
                    hotel_name: hotel.hotelNameCn || hotel.hotel_name_cn || '',
                  }));
                }
                return [];
              })
              .catch(() => [])
          );
          const allRooms = (await Promise.all(roomPromises)).flat();
          setRooms(allRooms);
        } else {
          message.error(res.msg || '获取酒店列表失败');
        }
      })
      .catch(() => message.error('获取房型数据失败'))
      .finally(() => setLoading(false));
  }, [user]);

  const filteredRooms = rooms.filter((room) => {
    const roomName = room.roomName || room.room_name || '';
    const hotelName = room.hotel_name || '';
    return (
      roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotelName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      {/* Rooms Table */}
      {!loading && (
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
              {filteredRooms.map((room) => {
                const roomName = room.roomName || room.room_name || '';
                const price = room.price ?? room.basePrice ?? '-';
                const size = room.roomSize || room.size || '-';
                const capacity = room.maxPeople || room.capacity || '-';
                const total = room.totalRooms || room.total || '-';
                const available = room.availableRooms || room.available || '-';

                return (
                <tr key={room.roomTypeId || room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">{room.hotel_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-800">{roomName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{price}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{size}m²</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{capacity}人</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-800">{total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${Number(available) > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                      {available}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {!loading && filteredRooms.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <Bed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无房型数据</p>
        </div>
      )}
    </div>
  );
}