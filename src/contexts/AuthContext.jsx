import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionStore } from '../utils/storage';

export const AuthContext = createContext();
export const AccountAdmin = {
  account: 'admin',
  password: 'admin',
}

const { set, get, isExits, remove } = SessionStore

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('User');
  const [wait, setWait] = useState(true);
  const navigate = useNavigate();
  // Save user info to session storage, check if user is authenticated
  useEffect(() => {
    if (isExits('ACCOUNT_ACCESS')) {
      const user = get('ACCOUNT_ACCESS');
      setIsAuthenticated(user.isAuthenticated);
      setUserRole(user.userRole);
    }
    setTimeout(() => {
      setWait(false);
    }, isExits('ACCOUNT_ACCESS') ? 1000 : 0);
  }, [])

  const signIn = (payload) => {
    if (payload.account === AccountAdmin.account && payload.password === AccountAdmin.password) {
      setIsAuthenticated(true);
      setUserRole('Admin');
      set('ACCOUNT_ACCESS', { isAuthenticated: true, userRole: 'Admin' });
      navigate('/admin');
    } else {
      alert('Account or password is incorrect');
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserRole('User');
    remove('ACCOUNT_ACCESS');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, signIn, signOut }}>
      {wait ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;