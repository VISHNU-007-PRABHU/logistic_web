import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ChatPanel from './ChatPanel';

const { Header, Content } = Layout;
const { Title } = Typography;

const ChatPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1
      }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          style={{ marginRight: 16 }}
        />
        <Title level={4} style={{ margin: 0 }}>Messages</Title>
      </Header>
      <Content style={{
        margin: 0,
        padding: 0,
        background: '#fff',
        height: 'calc(100vh - 64px)'
      }}>
        <ChatPanel fullPage={true} />
      </Content>
    </Layout>
  );
};

export default ChatPage;
