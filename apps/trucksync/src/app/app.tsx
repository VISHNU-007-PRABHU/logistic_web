import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiList,
  FiHome,
  FiTruck,
  FiCreditCard,
  FiStar,
  FiBarChart2,
} from 'react-icons/fi';
import { useAuth } from './AuthContext';

import TruckOwnerHome from './TruckOwnerHome';
import SignUpPage from './SignUpPage';
import BookingPage from './BookingPage';
import OwnerDashboard from './OwnerDashboard';
import RatingsSupportPage from './RatingsSupportPage';
import TripDetailsPage from './TripDetailsPage';
import TripHistoryPage from './TripHistoryPage';
import WelcomePage from './WelcomePage';
import UserProfilePage from './UserProfilePage';
import TruckOwnerHomePage from './TruckOwnerHomePage';
import AuthWrapper from './AuthWrapper';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider,useTheme } from './ThemeContext';
import ThemeEditor from './ThemeEditor';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuProps,ConfigProvider } from 'antd';
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd';
import TabsComponent from './tabs';
import CustomFlex from './CustomFlex';
import CustomFloaterButton from './CustomFloater';
import FindLoads from './book';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', '3', <UserOutlined />),
  getItem('Team', '4', <TeamOutlined />)
];

  const links = [
    { to: '/', label: 'Welcome', icon: <FiHome />, roles: ['admin', 'owner'] },
    { to: '/home', label: 'Profile', icon: <FiUser />, roles: ['admin', 'owner'] },
    { to: '/login', label: 'Sign Up', icon: <FiUser />, roles: ['admin', 'owner'] },
    { to: '/book', label: 'Booking', icon: <FiCreditCard />, roles: ['admin', 'owner'] },
    { to: '/payment-success', label: 'Trip Detail', icon: <FiList />, roles: ['admin', 'owner'] },
    { to: '/dashboard', label: 'Dashboard', icon: <FiBarChart2 />, roles: ['admin'] },
    { to: '/rating', label: 'Ratings', icon: <FiStar />, roles: ['admin', 'owner'] },
    { to: '/trip-history', label: 'Trip History', icon: <FiList />, roles: ['admin', 'owner'] },
    { to: '/ownerhome', label: 'Owner Home', icon: <FiTruck />, roles: ['owner'] },
    { to: '/ownerhomepage', label: 'Owner Homepage', icon: <FiTruck />, roles: ['owner'] },
  ];
const AppContent: React.FC = () => {
  const collapsed = true;
  const userRole = 'owner';
  const { themeConfig } = useTheme();


  return (
    <ConfigProvider theme={themeConfig}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={collapsed}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
      <Routes>
          <Route
            path="/"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <WelcomePage />
              </AuthWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <UserProfilePage />
              </AuthWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <SignUpPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/try"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <BookingPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/book"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <FindLoads />
              </AuthWrapper>
            }
          />
          </Routes>
      </Layout>
      <CustomFloaterButton />
      <ThemeEditor />
    </Layout>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;