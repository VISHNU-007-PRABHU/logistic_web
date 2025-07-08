import React, { useState, useEffect } from 'react';
import '../global-font.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  BookOutlined,
  SearchOutlined,
  CarOutlined,
  UserOutlined,
  CrownOutlined,
  BellOutlined,
  PlusOutlined,
  BulbOutlined,
  BulbFilled,
  MessageOutlined
} from '@ant-design/icons'; 
import { 
  ConfigProvider,
  FloatButton,
  Input,
  Space,
  Dropdown,
  Drawer,
  Layout,
  Menu,
  Button
} from 'antd';
import { ThemeProvider } from './ThemeContext';
import ChatPanel from './ChatPanel';
import ChatPage from './ChatPage';
import TruckBiddingPage from './TruckBiddingPage'; 
const { Search } = Input;

import type { MenuProps } from 'antd';

import SignUpPage from './SignUpPage';
import BookingPage from './BookingPage';
import WelcomePage from './WelcomePage';
import UserProfilePage from './UserProfilePage';
import AuthWrapper from './AuthWrapper';
import 'leaflet/dist/leaflet.css';
import { useTheme } from './ThemeContext';
import ThemeEditor from './ThemeEditor';

import CustomFloaterButton from './CustomFloater';
import FindLoads from './book';
import BookFlow from './book-flow';
import TripHistoryPage from './TripHistoryPage';
import TruckOwnerHomePage from './TruckOwnerHomePage';
import TruckOwnerHome from './TruckOwnerHome';
import TripDetailsPage from './TripDetailsPage';
import RatingsSupportPage from './RatingsSupportPage';

const { Header, Sider } = Layout;

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
  getItem('Booking', '/booking', <BookOutlined />),
  getItem('Find Load', '/book', <SearchOutlined />),
  getItem('Find Truck', '/truck', <CarOutlined />),
  getItem('Profile', '/profile', <UserOutlined />),
  getItem('History', '/history', <BookOutlined />),
  getItem('Owner', '/owner', <BookOutlined />),
  getItem('Rating', '/rating', <BookOutlined />),
];

const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigateToChat = () => {
    navigate('/chat');
  };
  const userRole = 'owner';
  const { themeConfig, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle hover state for notification items
  const getNotificationItemStyle = (isRead: boolean) => ({
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: isRead ? 'white' : '#f9f9f9',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  } as React.CSSProperties);
  
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New booking request', time: '2 min ago', read: false },
    { id: 2, title: 'Payment received', time: '1 hour ago', read: true },
    { id: 3, title: 'Truck service reminder', time: '3 hours ago', read: false },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleThemeToggle = () => {
    toggleTheme();
  };
  
  const notificationMenu = (
    <div style={{ width: 300, padding: 0, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #f0f0f0', 
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <span>Notifications</span>
        <Button 
          type="text" 
          size="small" 
          icon={<MessageOutlined />} 
          onClick={(e) => {
            e.stopPropagation();
            navigateToChat();
          }}
        >
          Messages
        </Button>
      </div>
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              style={getNotificationItemStyle(notification.read)}
            >
              <div style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12
              }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: !notification.read ? '#1890ff' : 'transparent',
                  borderRadius: '50%',
                  marginTop: 6
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 500,
                    marginBottom: 4,
                    color: !notification.read ? '#000' : 'rgba(0,0,0,0.85)'
                  }}>
                    {notification.title}
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: 'rgba(0,0,0,0.45)'
                  }}>
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            padding: 24, 
            textAlign: 'center',
            color: 'rgba(0,0,0,0.45)'
          }}>
            No new notifications
          </div>
        )}
      </div>
      {notifications.length > 0 && (
        <div style={{ 
          padding: '8px 16px', 
          textAlign: 'center',
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#fafafa'
        }}>
          <Button type="link" size="small">View All Notifications</Button>
        </div>
      )}
    </div>
  );

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
    <ConfigProvider theme={{
      ...themeConfig,
      token: {
        ...themeConfig.token,
        fontFamily: 'Inter, Montserrat, Roboto, Arial, sans-serif',
        fontSize: 16,
        fontWeightStrong: 600,
        colorText: '#222',
        colorTextHeading: '#18181a',
      }
    }}>
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
        width={220}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 10,
          background: 'linear-gradient(135deg, #001529 80%, #1890ff 100%)',
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          boxShadow: '2px 0 12px rgba(24,144,255,0.08)',
          display: isMobile ? (collapsed ? 'none' : 'block') : 'block'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          height: 56,
          margin: '20px 0 20px 0',
          paddingLeft: collapsed ? 0 : 24,
          transition: 'all 0.2s',
        }}>
          <CrownOutlined style={{ fontSize: 32, color: '#ffd700', marginRight: collapsed ? 0 : 12, transition: 'margin 0.2s' }} />
          {!collapsed && (
            <span style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 1,
              fontFamily: 'Montserrat, Inter, sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}>
              TruckSync
            </span>
          )}
        </div>
        <Menu 
          theme="dark" 
          selectedKeys={[location.pathname]}
          mode="inline" 
          items={items} 
          onClick={({ key }) => navigate(key)}
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
          padding: '0 24px', 
          background: themeConfig.token?.colorBgContainer || '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          height: 64,
          borderBottom: `1px solid ${themeConfig.token?.colorBorderBg || '#f0f0f0'}`
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            flex: 1,
            maxWidth: 800,
            margin: '0 auto',
            width: '100%'
          }}>
            {isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleSidebar}
                style={{
                  fontSize: '18px',
                  width: 48,
                  height: 48,
                  marginRight: 8,
                  color: themeConfig.token?.colorText
                }}
              />
            )}
            
            <div style={{ 
              position: 'relative', 
              flex: 1,
              maxWidth: 600,
              margin: isMobile ? '0 8px' : '0 24px 0 16px'
            }}>
              <Search
                placeholder="Search for loads, trucks, or locations..."
                allowClear
                onSearch={value => console.log('Search:', value)}
                style={{ 
                  width: '100%',
                  borderRadius: 8,
                  backgroundColor: themeConfig.token?.colorBgContainer
                }}
                size="large"
                enterButton={
                  <Button 
                    type="primary" 
                    style={{ 
                      background: themeConfig.token?.colorPrimary,
                      borderColor: themeConfig.token?.colorPrimary
                    }}
                  >
                    <SearchOutlined />
                  </Button>
                }
              />
            </div>
            
            <Space size="middle" style={{ marginLeft: 'auto' }}>
              <Button 
                type="text" 
                icon={darkMode ? <BulbFilled /> : <BulbOutlined />} 
                onClick={handleThemeToggle}
                style={{ 
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
              
              <Dropdown 
                overlay={notificationMenu} 
                trigger={['click']} 
                placement="bottomRight"
                overlayStyle={{ marginTop: 10 }}
              >
                <Button 
                  type="text" 
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <BellOutlined style={{ fontSize: 18 }} />
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      width: 16,
                      height: 16,
                      fontSize: 10,
                      background: '#ff4d4f',
                      color: '#fff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #fff'
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </Dropdown>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => navigate('/book')}
                style={{ 
                  height: 40,
                  fontWeight: 500,
                  display: isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                New Booking
              </Button>
              
              {/* Mobile new booking button */}
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => navigate('/book')}
                style={{ 
                  width: 40,
                  height: 40,
                  display: !isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </Space>
          </div>
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
            path="/profile"
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
            path="/booking"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <BookingPage />
              </AuthWrapper>
            }
          />
             <Route
            path="/history"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TripHistoryPage role={userRole} />
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
           <Route
            path="/truck"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <FindLoads />
              </AuthWrapper>
            }
          />
          <Route
            path="/book-flow"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <BookFlow />
              </AuthWrapper>
            }
          />
          <Route
            path="/truck"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <WelcomePage />
              </AuthWrapper>
            }
          />
              <Route
            path="/trip/:id"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TripDetailsPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/owner"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TruckOwnerHome />
              </AuthWrapper>
            }
          />
           <Route
            path="/rating"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <RatingsSupportPage />
              </AuthWrapper>
            }
          />
          <Route 
            path="/chat" 
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <ChatPage />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/truck/bid/:id" 
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TruckBiddingPage />
              </AuthWrapper>
            } 
          />
        </Routes>
        </div>
      </Layout>
    </Layout>
    
    
    {/* <CustomFloaterButton /> */}
    <ThemeEditor />
  </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <AppContent />
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;