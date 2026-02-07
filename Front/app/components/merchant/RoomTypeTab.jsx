import React, { useState } from 'react';
import { Plus, Edit, Trash2, Bed, Users, DollarSign, Image, X, Save, Tag, Coffee, Maximize, AlignLeft, Search, Filter } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

export default function RoomTypeTab({ hotelId }) {
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    roomId: '',
    roomName: '',
  });
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [formData, setFormData] = useState({
    roomName: '',
    price: 0,
    bedType: '',
    area: 0,
    stock: 0,
    includeBreakfast: false,
    maxPeople: 2,
    description: '',
  });

  // 搜索和筛选状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterBreakfast, setFilterBreakfast] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [areaRange, setAreaRange] = useState('all');
  const [peopleFilter, setPeopleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // 模拟房型数据（根据数据库表结构）
  const [rooms, setRooms] = useState([
    {
      id: '1',
      roomName: '豪华大床房',
      price: 688,
      bedType: '1.8m 大床',
      area: 35.5,
      stock: 15,
      includeBreakfast: true,
      maxPeople: 2,
      description: '独立卫浴、免费WiFi、55寸智能电视、迷你吧、保险箱',
    },
    {
      id: '2',
      roomName: '行政套房',
      price: 1288,
      bedType: '2.0m 大床 + 1.2m 单床',
      area: 65.0,
      stock: 8,
      includeBreakfast: true,
      maxPeople: 3,
      description: '独立客厅、双卫浴、免费WiFi、65寸智能电视、迷你吧、保险箱、胶囊咖啡机、独立书桌',
    },
    {
      id: '3',
      roomName: '标准双床房',
      price: 488,
      bedType: '1.2m 双床',
      area: 28.0,
      stock: 22,
      includeBreakfast: false,
      maxPeople: 2,
      description: '独立卫浴、免费WiFi、43寸智能电视',
    },
    {
      id: '4',
      roomName: '经典单人房',
      price: 368,
      bedType: '1.5m 大床',
      area: 22.5,
      stock: 10,
      includeBreakfast: false,
      maxPeople: 1,
      description: '独立卫浴、免费WiFi、43寸智能电视、办公桌',
    },
    {
      id: '5',
      roomName: '蜜月套房',
      price: 1588,
      bedType: '2.0m 圆床',
      area: 55.0,
      stock: 3,
      includeBreakfast: true,
      maxPeople: 2,
      description: '浪漫布置、独立客厅、按摩浴缸、免费WiFi、65寸智能电视、迷你吧、香槟、鲜花',
    },
  ]);

  const handleAdd = () => {
    setEditingRoom(null);
    setFormData({
      roomName: '',
      price: 0,
      bedType: '',
      area: 0,
      stock: 0,
      includeBreakfast: false,
      maxPeople: 2,
      description: '',
    });
    setShowModal(true);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData(room);
    setShowModal(true);
  };

  const handleDelete = (id, roomName) => {
    setDeleteConfirm({ isOpen: true, roomId: id, roomName: roomName });
  };

  const handleSubmit = () => {
    if (!formData.roomName || !formData.price || !formData.bedType || !formData.area) {
      alert('请填写必填项');
      return;
    }
    setSaveConfirm(true);
  };

  const confirmSave = () => {
    if (editingRoom) {
      // 编辑
      setRooms(rooms.map(r => r.id === editingRoom.id ? { ...r, ...formData } : r));
    } else {
      // 新增
      const newRoom = {
        id: Date.now().toString(),
        ...formData,
      };
      setRooms([...rooms, newRoom]);
    }
    setShowModal(false);
  };

  const confirmDelete = () => {
    setRooms(rooms.filter(r => r.id !== deleteConfirm.roomId));
    setDeleteConfirm({ isOpen: false, roomId: '', roomName: '' });
    alert('房型已删除');
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 筛选和排序逻辑
  const getFilteredRooms = () => {
    let filtered = [...rooms];

    // 搜索过滤
    if (searchKeyword.trim()) {
      filtered = filtered.filter(room =>
        room.roomName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        room.bedType.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // 早餐筛选
    if (filterBreakfast !== 'all') {
      filtered = filtered.filter(room =>
        filterBreakfast === 'yes' ? room.includeBreakfast : !room.includeBreakfast
      );
    }

    // 价格筛选
    if (priceRange !== 'all') {
      filtered = filtered.filter(room => {
        if (priceRange === '0-300') return room.price < 300;
        if (priceRange === '300-600') return room.price >= 300 && room.price < 600;
        if (priceRange === '600-1000') return room.price >= 600 && room.price < 1000;
        if (priceRange === '1000+') return room.price >= 1000;
        return true;
      });
    }

    // 面积筛选
    if (areaRange !== 'all') {
      filtered = filtered.filter(room => {
        if (areaRange === '0-25') return room.area < 25;
        if (areaRange === '25-40') return room.area >= 25 && room.area < 40;
        if (areaRange === '40-60') return room.area >= 40 && room.area < 60;
        if (areaRange === '60+') return room.area >= 60;
        return true;
      });
    }

    // 人数筛选
    if (peopleFilter !== 'all') {
      filtered = filtered.filter(room => {
        if (peopleFilter === '1') return room.maxPeople === 1;
        if (peopleFilter === '2') return room.maxPeople === 2;
        if (peopleFilter === '3+') return room.maxPeople >= 3;
        return true;
      });
    }

    // 排序
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'area-desc') {
      filtered.sort((a, b) => b.area - a.area);
    }

    return filtered;
  };

  const filteredRooms = getFilteredRooms();

  return (
    <div className="flex flex-col h-[calc(100vh-260px)]">
      {/* Search and Filter Bar - Fixed */}
      <div className="flex-shrink-0 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm mb-3">
        <div className="space-y-3">
          {/* First Row: Search + Add Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜索房型名称、床型、描述..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">添加房型</span>
            </button>
          </div>

          {/* Second Row: Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">价格：</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                <option value="all">全部</option>
                <option value="0-300">¥300以下</option>
                <option value="300-600">¥300-600</option>
                <option value="600-1000">¥600-1000</option>
                <option value="1000+">¥1000以上</option>
              </select>
            </div>

            {/* Area Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">面积：</label>
              <select
                value={areaRange}
                onChange={(e) => setAreaRange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                <option value="all">全部</option>
                <option value="0-25">25m²以下</option>
                <option value="25-40">25-40m²</option>
                <option value="40-60">40-60m²</option>
                <option value="60+">60m²以上</option>
              </select>
            </div>

            {/* People Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">入住人数：</label>
              <select
                value={peopleFilter}
                onChange={(e) => setPeopleFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                <option value="all">全部</option>
                <option value="1">1人</option>
                <option value="2">2人</option>
                <option value="3+">3人及以上</option>
              </select>
            </div>

            {/* Breakfast Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">早餐：</label>
              <select
                value={filterBreakfast}
                onChange={(e) => setFilterBreakfast(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                <option value="all">全部</option>
                <option value="yes">含早餐</option>
                <option value="no">不含早餐</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">排序：</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
              >
                <option value="default">默认</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
                <option value="area-desc">面积从大到小</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
            共找到 <span className="font-semibold text-gray-800">{filteredRooms.length}</span> 个房型
          </div>
        </div>
      </div>

      {/* Rooms List - Scrollable Container */}
      <div className="flex-1 overflow-y-auto pr-1">
        {filteredRooms.length > 0 ? (
          <div className="space-y-3 pb-2">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300"
              >
                <div className="flex">
                  {/* Left: Room Image */}
                  <div className="w-64 h-44 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-purple-50">
                    <div className="w-full h-full flex items-center justify-center">
                      <Bed className="w-20 h-20 text-blue-300" />
                    </div>
                    {room.includeBreakfast && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs font-medium shadow-md">
                          <Coffee className="w-3.5 h-3.5" />
                          <span>含早餐</span>
                        </span>
                      </div>
                    )}
                    {room.stock <= 5 && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg text-center shadow-md">
                          仅剩 {room.stock} 间
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Room Info + Actions */}
                  <div className="flex-1 p-5 flex flex-col">
                    {/* Title and Price */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-2">
                          <h4 className="text-xl font-bold text-gray-800">{room.roomName}</h4>
                          <div className="text-2xl font-bold text-green-600 whitespace-nowrap">¥{room.price}</div>
                        </div>
                        <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          room.stock > 5 
                            ? 'bg-green-100 text-green-700' 
                            : room.stock > 0 
                            ? 'bg-orange-100 text-orange-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            room.stock > 5 
                              ? 'bg-green-500' 
                              : room.stock > 0 
                              ? 'bg-orange-500' 
                              : 'bg-red-500'
                          }`}></div>
                          <span>{room.stock > 5 ? `充足 (${room.stock}间)` : room.stock > 0 ? `紧张 (${room.stock}间)` : '售罄'}</span>
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(room)}
                          className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          <span>编辑</span>
                        </button>
                        <button
                          onClick={() => handleDelete(room.id, room.roomName)}
                          className="flex items-center space-x-1.5 px-4 py-2 bg-white border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>删除</span>
                        </button>
                      </div>
                    </div>

                    {/* Room Details Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500">床型</div>
                          <div className="text-sm font-semibold text-gray-800 truncate">{room.bedType}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Maximize className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500">面积</div>
                          <div className="text-sm font-semibold text-gray-800">{room.area}m²</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500">入住人数</div>
                          <div className="text-sm font-semibold text-gray-800">{room.maxPeople}人</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {room.description && (
                      <div className="flex items-start space-x-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <AlignLeft className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 leading-relaxed">{room.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bed className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {searchKeyword || filterBreakfast !== 'all' || priceRange !== 'all' || areaRange !== 'all' || peopleFilter !== 'all' 
                ? '未找到匹配的房型' 
                : '暂无房型数据'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchKeyword || filterBreakfast !== 'all' || priceRange !== 'all' || areaRange !== 'all' || peopleFilter !== 'all'
                ? '请尝试调整搜索条件' 
                : '开始添加房型，完善您的酒店信息'}
            </p>
            {!searchKeyword && filterBreakfast === 'all' && priceRange === 'all' && areaRange === 'all' && peopleFilter === 'all' && (
              <button
                onClick={handleAdd}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>添加第一个房型</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col" style={{ maxHeight: '90vh' }}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 flex items-center justify-between rounded-t-2xl flex-shrink-0">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingRoom ? '编辑房型' : '添加新房型'}
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  {editingRoom ? '修改房型详细信息' : '填写房型详细信息，完善酒店配置'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1">
              <div className="space-y-7">
                {/* 基本信息 */}
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-100 flex items-center">
                    <div className="w-1.5 h-5 bg-blue-600 rounded-full mr-3"></div>
                    基本信息
                  </h4>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        房型名称 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.roomName}
                        onChange={(e) => updateField('roomName', e.target.value)}
                        placeholder="例如：豪华大床房、行政套房"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        价格/晚 (元) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => updateField('price', Number(e.target.value))}
                        placeholder="请输入价格"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        面积 (m²) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.area || ''}
                        onChange={(e) => updateField('area', Number(e.target.value))}
                        placeholder="例如：35.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        库存数量 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.stock || ''}
                        onChange={(e) => updateField('stock', Number(e.target.value))}
                        placeholder="可用房间数"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        最多入住人数 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.maxPeople || ''}
                        onChange={(e) => updateField('maxPeople', Number(e.target.value))}
                        placeholder="2"
                        min="1"
                        max="10"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 床型信息 */}
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-100 flex items-center">
                    <div className="w-1.5 h-5 bg-green-600 rounded-full mr-3"></div>
                    床型信息
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      床型配置 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.bedType}
                      onChange={(e) => updateField('bedType', e.target.value)}
                      placeholder="例如：1.8m 大床"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">💡 示例：1.2m 双床、2.0m 大床</p>
                  </div>
                </div>

                {/* 房间特性 */}
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-orange-100 flex items-center">
                    <div className="w-1.5 h-5 bg-orange-600 rounded-full mr-3"></div>
                    房间特性
                  </h4>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.includeBreakfast}
                        onChange={(e) => updateField('includeBreakfast', e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <Coffee className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">含早餐</span>
                    </label>
                  </div>
                </div>

                {/* 房型描述 */}
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-purple-100 flex items-center">
                    <div className="w-1.5 h-5 bg-purple-600 rounded-full mr-3"></div>
                    房型描述
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      详细描述
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      placeholder="例如：独立卫浴、免费WiFi、55寸智能电视、迷你吧、保险箱..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">💡 详细的房型描述可以提升用户预订意愿</p>
                  </div>
                </div>

                {/* 房型图片 */}
                <div>
                  <h4 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-cyan-100 flex items-center">
                    <div className="w-1.5 h-5 bg-cyan-600 rounded-full mr-3"></div>
                    房型图片
                  </h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Image className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-700 font-medium mb-1">点击或拖拽上传房型图片</p>
                    <p className="text-sm text-gray-500">支持 JPG、PNG 格式，建议尺寸 1200x800，最多上传 5 张</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5 flex space-x-4 border-t border-gray-200 rounded-b-2xl flex-shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-white hover:border-gray-400 transition-all"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <Save className="w-5 h-5" />
                <span>{editingRoom ? '保存更改' : '添加房型'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={confirmDelete}
        title="确认删除"
        message={`确定要删除房型「${deleteConfirm.roomName}」吗？此操作不可恢复。`}
        confirmText="删除"
        type="danger"
      />

      {/* Save Confirmation Modal */}
      <ConfirmModal
        isOpen={saveConfirm}
        onClose={() => setSaveConfirm(false)}
        onConfirm={confirmSave}
        title={editingRoom ? '确认保存' : '确认添加'}
        message={editingRoom ? '确定要保存对房型信息的修改吗？' : '确定要添加此房型吗？'}
        confirmText={editingRoom ? '保存' : '添加'}
        type="info"
      />
    </div>
  );
}