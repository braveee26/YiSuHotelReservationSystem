import { Card, Layout, Menu, Avatar, Space, Typography, Statistic, Row, Col, Table } from 'antd';
import { UserOutlined, DashboardOutlined, ShopOutlined, TransactionOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export function MerchantCenter() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: '仪表板',
        },
        {
            key: 'rooms',
            icon: <ShopOutlined />,
            label: '房间管理',
        },
        {
            key: 'bookings',
            icon: <TransactionOutlined />,
            label: '预订管理',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: handleLogout
        },
    ];

    // 示例数据
    const bookingColumns = [
        {
            title: '预订编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '客户姓名',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: '入住日期',
            dataIndex: 'checkin',
            key: 'checkin',
        },
        {
            title: '退房日期',
            dataIndex: 'checkout',
            key: 'checkout',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <span style={{ color: text === '已确认' ? '#52c41a' : '#ff4d4f' }}>{text}</span>,
        },
    ];

    const bookingData = [
        {
            key: '1',
            id: 'B001',
            customer: '张三',
            checkin: '2024-01-15',
            checkout: '2024-01-18',
            status: '已确认',
        },
        {
            key: '2',
            id: 'B002',
            customer: '李四',
            checkin: '2024-01-20',
            checkout: '2024-01-25',
            status: '待确认',
        },
        {
            key: '3',
            id: 'B003',
            customer: '王五',
            checkin: '2024-02-01',
            checkout: '2024-02-05',
            status: '已确认',
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider breakpoint="lg" collapsedWidth="0">
                <div style={{ 
                    color: 'white', 
                    height: 64, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}>
                    商户系统
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    defaultSelectedKeys={['dashboard']}
                    onClick={({ key }) => {
                        if (key === 'dashboard') {
                            // 仪表板操作
                        } else if (key === 'rooms') {
                            // 房间管理操作
                        } else if (key === 'bookings') {
                            // 预订管理操作
                        } else if (key === 'settings') {
                            // 个人设置操作
                        }
                    }}
                />
            </Sider>
            <Layout>
                <Header style={{ 
                    padding: '0 24px', 
                    background: '#fff', 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Title level={3} style={{ margin: 0, color: '#2c3e50' }}>商户控制台</Title>
                    <Space align="center">
                        <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#52c41a' }} />
                        <div>
                            <Text strong>{user?.name || user?.username || '商户'}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>商户角色</Text>
                        </div>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px' }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="总预订数"
                                        value={128}
                                        suffix="次"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="今日收入"
                                        value={15860}
                                        precision={2}
                                        suffix="元"
                                        valueStyle={{ color: '#3f8600' }}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="入住率"
                                        value={85}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="客户满意度"
                                        value={4.8}
                                        suffix="/5.0"
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginTop: 16 }}>
                            <Col span={24}>
                                <Card title="近期预订">
                                    <Table 
                                        columns={bookingColumns} 
                                        dataSource={bookingData} 
                                        pagination={{ pageSize: 5 }}
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 16 }}>
                            <Col span={24}>
                                <Card title="欢迎使用易宿酒店管理系统">
                                    <Space direction="vertical" size="middle">
                                        <Text>您好，<strong>{user?.name || user?.username || '商户'}</strong></Text>
                                        <Text>这里是商户控制台，您可以管理您的房间、处理预订、查看财务状况等。</Text>
                                        
                                        <div style={{ marginTop: '24px' }}>
                                            <Title level={4}>主要功能</Title>
                                            <ul>
                                                <li>房间管理：添加、编辑和管理您的房间信息</li>
                                                <li>预订管理：查看和处理客户的预订请求</li>
                                                <li>财务统计：查看收入和支出情况</li>
                                                <li>客户管理：维护客户信息和偏好</li>
                                            </ul>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}