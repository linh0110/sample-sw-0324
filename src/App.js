import React, { Suspense, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import { ThemeProviderCharka } from './contexts/ThemeContext';
import GuestLayout from './layouts/layoutGuest';
import AppRoutes from './routes/App/AppRoutes';
import guestPages from './routes/Guest/guestPage';


const { ForgetPassword, SignIn } = guestPages;

const App = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  return isAuthenticated ? (
    <Routes>
      <Route path="*" element={<AppRoutes userRole={userRole} />} />
    </Routes>
  ) : (
    <GuestLayout>
        <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
        </Suspense>
    </GuestLayout>
  );
}


const AppWithContext = () => {
  return (
    <ThemeProviderCharka>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProviderCharka>

  );
};

export default AppWithContext;
