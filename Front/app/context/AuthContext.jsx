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

  const login = (username, password) => {
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
    const testUser = TEST_USERS.find(user => user.username === username);
    if (testUser) {
      localStorage.setItem('currentUser', JSON.stringify(testUser));
      setUser(testUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
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