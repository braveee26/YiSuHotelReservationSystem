import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button, Form, Input, Card, Typography, message, Divider, Space, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, HomeOutlined, EyeTwoTone, EyeInvisibleOutlined, LoginOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export function LoginView() {
  const navigate = useNavigate();
  const { login, quickLogin } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    const { username, password } = values;

    if (!username || !password) {
      messageApi.error('请输入用户名和密码');
      return;
    }

    setLoading(true);
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = login(username, password);
    if (success) {
      messageApi.success('登录成功');
      // 根据角色跳转
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/merchant');
      }
    } else {
      messageApi.error('用户名或密码错误');
    }
    setLoading(false);
  };

  // 快速登录处理函数
  const handleQuickLogin = async (username) => {
    setLoading(true);
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = quickLogin(username);
    if (success) {
      messageApi.success(`${username} 登录成功`);
      // 根据角色跳转
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/merchant');
      }
    } else {
      messageApi.error('快速登录失败');
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景装饰元素 */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '400px',
        height: '800px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-30%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        zIndex: 0
      }} />
      
      {contextHolder}
      <Card 
        style={{ 
          width: 420,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        hoverable
        bordered={false}
        title={
          <div style={{ textAlign: 'center', padding: '24px 24px 0 24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              margin: '0 auto 16px',
              color: 'white'
            }}>
              <HomeOutlined style={{ fontSize: '32px' }} />
            </div>
            <Title level={3} style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>易宿酒店管理系统</Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>欢迎回来，请登录您的账户</Text>
          </div>
        }
      >
        <div style={{ padding: '0 24px 24px' }}>
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
              style={{ marginBottom: '16px' }}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#667eea' }} />} 
                placeholder="请输入用户名" 
                size="large"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
              style={{ marginBottom: '24px' }}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#667eea' }} />} 
                placeholder="请输入密码" 
                size="large"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                block
                loading={loading}
                style={{ 
                  borderRadius: '8px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                登录
              </Button>
            </Form.Item>

            <Divider style={{ margin: '24px 0' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>快速登录演示</Text>
            </Divider>

            <Row gutter={12} justify="center">
              <Col span={12}>
                <Button 
                  type="default"
                  size="large" 
                  block
                  onClick={() => handleQuickLogin('admin1')}
                  loading={loading}
                  style={{ 
                    borderRadius: '8px',
                    height: '40px',
                    borderColor: '#52c41a',
                    color: '#52c41a',
                    fontWeight: '500'
                  }}
                >
                  <LoginOutlined /> 管理员
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  type="default"
                  size="large" 
                  block
                  onClick={() => handleQuickLogin('merchant1')}
                  loading={loading}
                  style={{ 
                    borderRadius: '8px',
                    height: '40px',
                    borderColor: '#1890ff',
                    color: '#1890ff',
                    fontWeight: '500'
                  }}
                >
                  <LoginOutlined /> 商户
                </Button>
              </Col>
            </Row>

            <Divider style={{ margin: '24px 0' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>其他操作</Text>
            </Divider>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Text>还没有账户？ </Text>
              <Link to="/register" style={{ color: '#667eea', fontWeight: '500' }}>立即注册</Link>
            </div>

            <Divider style={{ margin: '16px 0' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>测试账号</Text>
            </Divider>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', lineHeight: 1.5 }}>
                <strong>商户：</strong> merchant1 / 123456
              </Text>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', lineHeight: 1.5 }}>
                <strong>管理员：</strong> admin1 / 123456
              </Text>
            </Space>
          </Form>
        </div>
      </Card>
    </div>
  );
}