import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// 预设的测试账户数据
const TEST_USERS = [
  {
    id: 1,
    username: 'admin1',
    password: '123456',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    username: 'merchant1',
    password: '123456',
    role: 'merchant',
    name: 'Merchant User'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 初始化用户状态 - 只在客户端执行
  useState(() => {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        try {
          setUser(JSON.parse(currentUser));
        } catch (error) {
          console.error('解析当前用户失败:', error);
          localStorage.removeItem('currentUser');
        }
      }
    }
  });

  const login = (username, password) => {
    // 只在客户端环境操作 localStorage
    if (typeof window === 'undefined') return false;
    
    // 检查本地存储中的用户数据
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 合并本地用户和测试用户
    const allUsers = [...storedUsers, ...TEST_USERS];
    
    const foundUser = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // 快速登录方法，接受用户名直接登录
  const quickLogin = (username) => {
    // 只在客户端环境操作 localStorage
    if (typeof window === 'undefined') return false;
    
    const testUser = TEST_USERS.find(user => user.username === username);
    if (testUser) {
      localStorage.setItem('currentUser', JSON.stringify(testUser));
      setUser(testUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    // 只在客户端环境操作 localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    setUser(null);
  };

  const value = {
    user,
    login,
    quickLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}