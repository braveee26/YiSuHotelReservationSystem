import { Card, Layout, Menu, Avatar, Space, Typography } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export function AdminCenter() {
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
            key: 'users',
            icon: <TeamOutlined />,
            label: '用户管理',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '系统设置',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: handleLogout
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
                    管理系统
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    defaultSelectedKeys={['dashboard']}
                    onClick={({ key }) => {
                        if (key === 'dashboard') {
                            // 仪表板操作
                        } else if (key === 'users') {
                            // 用户管理操作
                        } else if (key === 'settings') {
                            // 系统设置操作
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
                    <Title level={3} style={{ margin: 0, color: '#2c3e50' }}>管理员控制台</Title>
                    <Space align="center">
                        <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                        <div>
                            <Text strong>{user?.name || user?.username || '管理员'}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>管理员角色</Text>
                        </div>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: '8px' }}>
                        <Card title="欢迎使用易宿酒店管理系统" style={{ borderRadius: '8px' }}>
                            <Space direction="vertical" size="middle">
                                <Text>您好，<strong>{user?.name || user?.username || '管理员'}</strong></Text>
                                <Text>这里是管理员控制台，您可以管理用户、配置系统设置等。</Text>
                                
                                <div style={{ marginTop: '24px' }}>
                                    <Title level={4}>系统功能</Title>
                                    <ul>
                                        <li>用户管理：查看和管理所有用户信息</li>
                                        <li>权限控制：配置不同用户的访问权限</li>
                                        <li>系统监控：实时监控系统运行状态</li>
                                        <li>数据统计：查看业务数据报表</li>
                                    </ul>
                                </div>
                            </Space>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}