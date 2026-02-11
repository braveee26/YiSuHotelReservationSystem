import React, { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Hotel, MapPin, Star, Calendar, MessageSquare, Filter, Settings } from 'lucide-react';
import { Pagination } from 'antd';
import HotelAuditDetailModal from '../../components/admin/HotelAuditDetailModal';
import AreaSelector from '../../components/merchant/AreaSelector';
import FacilityManagementModal from '../../components/admin/FacilityManagementModal';

export default function HotelAudit() {
  const [searchTerm, setSearchTerm] = useState('');
  // 移除重复的状态筛选，只保留详细审核状态
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
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

  // 模拟酒店数据（根据数据库表结构）
  const hotels = [
    {
      id: '1',
      hotelNameCn: '北京王府井大酒店',
      hotelNameEn: 'Beijing Wangfujing Hotel',
      merchant: '北京易宿酒店管理有限公司',
      address: '北京市东城区王府井大街100号',
      province: '北京市',
      city: '北京市',
      district: '东城区',
      detailAddress: '王府井大街100号',
      starLevel: 5,
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
      hotelNameCn: '上海外滩精品酒店',
      hotelNameEn: 'Shanghai Bund Boutique Hotel',
      merchant: '上海外滩酒店集团',
      address: '上海市黄浦区中山东一路200号',
      province: '上海市',
      city: '上海市',
      district: '黄浦区',
      detailAddress: '中山东一路200号',
      starLevel: 4,
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
      hotelNameCn: '深圳湾商务酒店',
      hotelNameEn: 'Shenzhen Bay Business Hotel',
      merchant: '深圳商旅酒店有限公司',
      address: '广东省深圳市南山区深圳湾路',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detailAddress: '深圳湾路88号',
      starLevel: 4,
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
    // 添加更多酒店数据用于分页测试
    {
      id: '4',
      hotelNameCn: '广州白云国际机场酒店',
      hotelNameEn: 'Guangzhou Baiyun Airport Hotel',
      merchant: '广州机场酒店管理有限公司',
      address: '广东省广州市白云区机场路123号',
      province: '广东省',
      city: '广州市',
      district: '白云区',
      detailAddress: '机场路123号',
      starLevel: 4,
      openDate: '2021-03-10',
      status: 'approved',
      auditStatus: 'approved',
      onlineStatus: 'online',
      submitDate: '2026-02-05',
      approveDate: '2026-02-05',
      createTime: '2026-02-01 09:00:00',
      updateTime: '2026-02-05 11:20:00',
      description: '紧邻广州白云国际机场，为旅客提供便捷舒适的住宿服务。酒店设有多种房型，24小时前台服务，免费机场接送。',
      nearbyAttractions: '白云山风景区,陈家祠,沙面岛',
      trafficInfo: '地铁3号线机场南站步行5分钟，距市中心30公里',
      mallInfo: '白云万达广场,凯德广场,太阳城购物中心',
      auditInfo: '机场合作酒店，资质齐全'
    },
    {
      id: '5',
      hotelNameCn: '成都宽窄巷子精品酒店',
      hotelNameEn: 'Chengdu Kuanzhai Alley Boutique Hotel',
      merchant: '成都文化旅游发展集团',
      address: '四川省成都市青羊区宽窄巷子456号',
      province: '四川省',
      city: '成都市',
      district: '青羊区',
      detailAddress: '宽窄巷子456号',
      starLevel: 5,
      openDate: '2020-11-20',
      status: 'pending',
      auditStatus: 'auditing',
      onlineStatus: 'offline',
      submitDate: '2026-02-06',
      createTime: '2026-02-02 14:30:00',
      updateTime: '2026-02-06 09:15:00',
      description: '位于成都著名的历史文化街区宽窄巷子，融合川西民居建筑风格与现代设计理念，让客人体验地道的成都慢生活。',
      nearbyAttractions: '宽窄巷子,锦里古街,武侯祠,杜甫草堂',
      trafficInfo: '地铁4号线宽窄巷子站A出口步行3分钟',
      mallInfo: 'IFS国际金融中心,太古里,春熙路步行街',
      auditInfo: ''
    },
    {
      id: '6',
      hotelNameCn: '西安大雁塔文化酒店',
      hotelNameEn: 'Xi\'an Big Wild Goose Pagoda Cultural Hotel',
      merchant: '西安大唐文化旅游有限公司',
      address: '陕西省西安市雁塔区大雁塔南广场789号',
      province: '陕西省',
      city: '西安市',
      district: '雁塔区',
      detailAddress: '大雁塔南广场789号',
      starLevel: 4,
      openDate: '2019-08-15',
      status: 'approved',
      auditStatus: 'approved',
      onlineStatus: 'online',
      submitDate: '2026-01-28',
      approveDate: '2026-02-01',
      createTime: '2026-01-20 16:45:00',
      updateTime: '2026-02-01 10:30:00',
      description: '毗邻世界文化遗产大雁塔，酒店设计融入盛唐文化元素，为客人提供独特的文化体验和优质的服务。',
      nearbyAttractions: '大雁塔,大唐芙蓉园,陕西历史博物馆,曲江池遗址公园',
      trafficInfo: '地铁3号线大雁塔站B出口步行8分钟',
      mallInfo: '赛格国际购物中心,曲江书城,银泰城',
      auditInfo: '文物保护区域合作酒店'
    },
    {
      id: '7',
      hotelNameCn: '杭州西湖国宾馆',
      hotelNameEn: 'Hangzhou West Lake State Guesthouse',
      merchant: '杭州西湖国宾馆管理有限公司',
      address: '浙江省杭州市西湖区南山路333号',
      province: '浙江省',
      city: '杭州市',
      district: '西湖区',
      detailAddress: '南山路333号',
      starLevel: 5,
      openDate: '2018-05-18',
      status: 'rejected',
      auditStatus: 'rejected',
      onlineStatus: 'offline',
      submitDate: '2026-01-30',
      rejectDate: '2026-02-03',
      createTime: '2026-01-25 13:20:00',
      updateTime: '2026-02-03 14:45:00',
      rejectReason: '酒店消防安全设施不符合国家标准，需整改后重新申请。',
      description: '坐落于西湖风景区核心区域，依山傍水，环境优美。曾接待过多位国家领导人，具有深厚的历史底蕴。',
      nearbyAttractions: '西湖十景,雷峰塔,灵隐寺,苏堤春晓',
      trafficInfo: '公交K7路南山路站下车即到，距杭州东站25公里',
      mallInfo: '湖滨银泰in77,武林广场,钱江新城万象城',
      auditInfo: '消防设施需升级'
    },
    {
      id: '8',
      hotelNameCn: '三亚海棠湾度假酒店',
      hotelNameEn: 'Sanya Haitang Bay Resort Hotel',
      merchant: '三亚海棠湾国际度假村有限公司',
      address: '海南省三亚市海棠区海棠湾路666号',
      province: '海南省',
      city: '三亚市',
      district: '海棠区',
      detailAddress: '海棠湾路666号',
      starLevel: 5,
      openDate: '2022-12-01',
      status: 'approved',
      auditStatus: 'approved',
      onlineStatus: 'online',
      submitDate: '2026-02-04',
      approveDate: '2026-02-04',
      createTime: '2026-01-28 11:10:00',
      updateTime: '2026-02-04 15:30:00',
      description: '面朝海棠湾一线海景，拥有私人沙滩和丰富的水上娱乐设施。酒店提供全方位的度假服务，是家庭出游的理想选择。',
      nearbyAttractions: '蜈支洲岛,亚龙湾,天涯海角,南山文化旅游区',
      trafficInfo: '三亚凤凰国际机场车程30分钟，高铁三亚站车程40分钟',
      mallInfo: '海棠湾免税购物中心,鲁能三亚湾商街',
      auditInfo: '海滨度假资质认证通过'
    },
    {
      id: '9',
      hotelNameCn: '重庆解放碑商务酒店',
      hotelNameEn: 'Chongqing Jiefangbei Business Hotel',
      merchant: '重庆渝中商业酒店集团',
      address: '重庆市渝中区解放碑步行街888号',
      province: '重庆市',
      city: '重庆市',
      district: '渝中区',
      detailAddress: '解放碑步行街888号',
      starLevel: 4,
      openDate: '2021-07-12',
      status: 'pending',
      auditStatus: 'auditing',
      onlineStatus: 'offline',
      submitDate: '2026-02-07',
      createTime: '2026-02-03 09:45:00',
      updateTime: '2026-02-07 13:20:00',
      description: '位于重庆核心商圈解放碑，交通便利，购物方便。酒店设计现代时尚，配备智能化客房设施。',
      nearbyAttractions: '解放碑,洪崖洞,长江索道,朝天门码头',
      trafficInfo: '轻轨1号线小什字站步行5分钟，距重庆北站20公里',
      mallInfo: '解放碑购物广场,大都会广场,协信星光时代',
      auditInfo: ''
    },
    {
      id: '10',
      hotelNameCn: '厦门鼓浪屿海景酒店',
      hotelNameEn: 'Xiamen Gulangyu Seaview Hotel',
      merchant: '厦门鼓浪屿旅游发展有限公司',
      address: '福建省厦门市思明区鼓浪屿龙头路999号',
      province: '福建省',
      city: '厦门市',
      district: '思明区',
      detailAddress: '鼓浪屿龙头路999号',
      starLevel: 4,
      openDate: '2020-04-25',
      status: 'approved',
      auditStatus: 'approved',
      onlineStatus: 'online',
      submitDate: '2026-01-29',
      approveDate: '2026-02-02',
      createTime: '2026-01-22 15:30:00',
      updateTime: '2026-02-02 11:15:00',
      description: '坐落在世界文化遗产鼓浪屿上，推窗即见碧海蓝天。酒店保留了闽南传统建筑特色，让客人感受海岛悠闲时光。',
      nearbyAttractions: '鼓浪屿,日光岩,菽庄花园,钢琴博物馆',
      trafficInfo: '轮渡厦门码头至鼓浪屿约20分钟',
      mallInfo: '鼓浪屿商业街,鹿礁路特色店铺',
      auditInfo: '文化遗产保护区特许经营'
    },
    {
      id: '11',
      hotelNameCn: '青岛五四广场海景酒店',
      hotelNameEn: 'Qingdao May Fourth Square Seaview Hotel',
      merchant: '青岛海滨酒店管理集团',
      address: '山东省青岛市市南区香港中路555号',
      province: '山东省',
      city: '青岛市',
      district: '市南区',
      detailAddress: '香港中路555号',
      starLevel: 5,
      openDate: '2022-03-08',
      status: 'rejected',
      auditStatus: 'rejected',
      onlineStatus: 'offline',
      submitDate: '2026-01-31',
      rejectDate: '2026-02-04',
      createTime: '2026-01-26 10:15:00',
      updateTime: '2026-02-04 16:30:00',
      rejectReason: '环保评估未达标，靠近海岸线建设需加强环境保护措施。',
      description: '位于青岛地标五四广场旁，一线海景尽收眼底。酒店设计现代简约，提供高品质的海滨度假体验。',
      nearbyAttractions: '五四广场,栈桥,八大关,崂山风景区',
      trafficInfo: '地铁3号线五四广场站直达，距流亭国际机场35公里',
      mallInfo: '海信广场,万象城,海天 Mall',
      auditInfo: '需补充环保评估报告'
    },
    {
      id: '12',
      hotelNameCn: '大连星海湾海景度假村',
      hotelNameEn: 'Dalian Xinghai Bay Seaview Resort',
      merchant: '大连星海湾旅游度假开发公司',
      address: '辽宁省大连市沙河口区星海湾广场111号',
      province: '辽宁省',
      city: '大连市',
      district: '沙河口区',
      detailAddress: '星海湾广场111号',
      starLevel: 4,
      openDate: '2019-10-30',
      status: 'approved',
      auditStatus: 'approved',
      onlineStatus: 'online',
      submitDate: '2026-02-01',
      approveDate: '2026-02-03',
      createTime: '2026-01-27 12:40:00',
      updateTime: '2026-02-03 09:50:00',
      description: '坐拥星海湾绝佳海景，拥有超大的观景平台和完善的康体设施。是商务会议和休闲度假的完美结合。',
      nearbyAttractions: '星海湾广场,老虎滩海洋公园,滨海路,森林动物园',
      trafficInfo: '地铁1号线星海广场站步行10分钟，距周水子国际机场15公里',
      mallInfo: '百年汇购物中心,柏威年广场',
      auditInfo: '海滨旅游资质认证通过'
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

  const handleAreaChange = (province, city, district) => {
    setAreaFilter({ province, city, district });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setAreaFilter({ province: '', city: '', district: '' });
    setStarFilters([]);
    setOnlineStatusFilters([]);
    setAuditStatusFilters([]);
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[110px]">审核状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[110px]">上线状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 min-w-[90px]">操作</th>
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