import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  HomeOutlined,
  StarOutlined,
  CreditCardOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useAuth } from './AuthContext';
import type { MenuProps } from 'antd';
import { 
  ConfigProvider, 
  Layout, 
  Menu, 
  Button, 
  Breadcrumb, 
  Flex, 
  theme 
} from 'antd';

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
import { ThemeProvider, useTheme } from './ThemeContext';
import ThemeEditor from './ThemeEditor';
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
    { to: '/', label: 'Welcome', icon: <HomeOutlined />, roles: ['admin', 'owner'] },
    { to: '/home', label: 'Profile', icon: <UserOutlined />, roles: ['admin', 'owner'] },
    { to: '/login', label: 'Sign Up', icon: <UserOutlined />, roles: ['admin', 'owner'] },
    { to: '/book', label: 'Booking', icon: <CreditCardOutlined />, roles: ['admin', 'owner'] },
    { to: '/payment-success', label: 'Trip Detail', icon: <FileOutlined />, roles: ['admin', 'owner'] },
    { to: '/dashboard', label: 'Dashboard', icon: <BarChartOutlined />, roles: ['admin'] },
    { to: '/rating', label: 'Ratings', icon: <StarOutlined />, roles: ['admin', 'owner'] },
    { to: '/trip-history', label: 'Trip History', icon: <FileOutlined />, roles: ['admin', 'owner'] },
    { to: '/ownerhome', label: 'Owner Home', icon: <TruckOutlined />, roles: ['owner'] },
    { to: '/ownerhomepage', label: 'Owner Homepage', icon: <TruckOutlined />, roles: ['owner'] },
  ];
const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userRole = 'owner';
  const { themeConfig } = useTheme();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };


  return (
    <ConfigProvider theme={themeConfig}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsed={collapsed}
        collapsible
        breakpoint="md"
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          setCollapsed(broken);
        }}
        trigger={null}
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 10,
          display: isMobile ? (collapsed ? 'none' : 'block') : 'block'
        }}
      >
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          items={items} 
          style={{ padding: isMobile ? '0 8px' : '0' }}
        />
      </Sider>
      {isMobile && !collapsed && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 200,
            zIndex: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
      <Layout style={{ 
        marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
        transition: 'margin-left 0.2s'
      }}>
        <Header style={{ 
          padding: 0, 
          background: themeConfig.token?.colorBgContainer || '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: isMobile ? '16px' : '24px',
          boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
        }}>
          {isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          )}
        </Header>
        <div style={{ padding: isMobile ? '16px' : '24px' }}>
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
        </div>
      </Layout>
    </Layout>
    <CustomFloaterButton />
    <ThemeEditor />
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