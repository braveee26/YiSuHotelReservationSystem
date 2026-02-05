import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { mockUsers } from '../../data/mockData';
import { Button, Form, Input, Select, Card, Typography, message, Space } from 'antd';
import { UserAddOutlined, HomeOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

export function RegisterView() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    const { username, password, confirmPassword, role } = values;

    if (!username || !password || !confirmPassword) {
      messageApi.error('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      messageApi.error('两次密码输入不一致');
      return;
    }

    setLoading(true);
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    if (mockUsers.some((u) => u.username === username)) {
      messageApi.error('用户名已存在');
      setLoading(false);
      return;
    }

    // 在实际应用中，这里应该调用API保存用户
    messageApi.success('注册成功，请登录');
    navigate('/login');
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
        top: '-40%',
        right: '-40%',
        width: '500px',
        height: '800px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        left: '-40%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
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
              background: 'linear-gradient(135deg, #52c41a 0%, #1976d2 100%)',
              margin: '0 auto 16px',
              color: 'white'
            }}>
              <UserAddOutlined style={{ fontSize: '32px' }} />
            </div>
            <Title level={3} style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>创建新账户</Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>加入易宿酒店管理系统</Text>
          </div>
        }
      >
        <div style={{ padding: '0 24px 24px' }}>
          <Form
            name="register_form"
            initialValues={{ role: 'merchant' }}
            onFinish={handleRegister}
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
                placeholder="请输入用户名" 
                size="large"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: '请选择角色!' }]}
              style={{ marginBottom: '16px' }}
            >
              <Select 
                size="large"
                style={{ borderRadius: '8px' }}
              >
                <Option value="merchant">商户</Option>
                <Option value="admin">管理员</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
              style={{ marginBottom: '16px' }}
            >
              <Input.Password 
                placeholder="请输入密码" 
                size="large"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirmPassword"
              dependencies={['password']}
              rules={[{
                required: true,
                message: '请确认密码!',
              }, ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致!'));
                },
              }),]}
              style={{ marginBottom: '24px' }}
            >
              <Input.Password 
                placeholder="请再次输入密码" 
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
                  background: 'linear-gradient(135deg, #52c41a 0%, #1976d2 100%)',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                注册
              </Button>
            </Form.Item>

            <Divider style={{ margin: '24px 0' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>快速访问</Text>
            </Divider>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Text>已有账户？ </Text>
              <Link to="/login" style={{ color: '#52c41a', fontWeight: '500' }}>立即登录</Link>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Text>或者直接体验：</Text>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <Button 
                type="default"
                size="middle" 
                block
                onClick={() => window.location.href = '/login'}
                style={{ 
                  borderRadius: '8px',
                  height: '36px',
                  borderColor: '#1890ff',
                  color: '#1890ff',
                  fontWeight: '500'
                }}
              >
                <LoginOutlined /> 返回登录
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}