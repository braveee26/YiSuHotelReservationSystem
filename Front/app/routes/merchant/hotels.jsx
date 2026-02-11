import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HotelManagement from "../../views/merchant/HotelManagement.jsx";

export default function MerchantHotels() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        // 只在客户端环境访问 localStorage
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    setCurrentUser(user);
                    if (!user.username || user.role !== 'merchant') {
                        navigate('/login');
                        return;
                    }
                } catch (error) {
                    console.error('解析用户信息失败:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        }
    }, [navigate]);

    const handleViewHotel = (hotelId) => {
        // 处理查看酒店逻辑
        console.log('查看酒店:', hotelId);
    };

    const handleCreateHotel = () => {
        // 处理创建酒店逻辑
        console.log('创建酒店');
    };

    const handleRoomTypeSettings = (hotelId) => {
        // 处理房型设置逻辑
        console.log('房型设置:', hotelId);
    };

    return <HotelManagement />;
}