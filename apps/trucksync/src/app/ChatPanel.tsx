import React, { useState } from 'react';
import { Avatar, Button, Input, List, Typography, Card, Space, Divider } from 'antd';
import { 
  SearchOutlined, 
  SendOutlined, 
  MoreOutlined, 
  MessageOutlined, 
  PaperClipOutlined,
  SmileOutlined,
  MenuOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Text } = Typography;
const { Search } = Input;

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

interface Chat {
  id: number;
  user: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

interface ChatPanelProps {
  onClose?: () => void;
  fullPage?: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose, fullPage = false }) => {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  
  // Mock data for chats
  const [chats] = useState<Chat[]>([
    {
      id: 1,
      user: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'Hey, how are you doing?',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      online: true
    },
    {
      id: 2,
      user: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      lastMessage: 'The package has been delivered',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      online: false
    },
    {
      id: 3,
      user: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      lastMessage: 'Let me check the schedule',
      lastMessageTime: 'Yesterday',
      unreadCount: 5,
      online: true
    }
  ]);

  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, sender: 'John Doe', content: 'Hey there!', time: '10:30 AM', isMe: false },
      { id: 2, sender: 'You', content: 'Hi! How are you?', time: '10:31 AM', isMe: true },
      { id: 3, sender: 'John Doe', content: 'I\'m good, thanks for asking!', time: '10:32 AM', isMe: false }
    ],
    2: [
      { id: 1, sender: 'Jane Smith', content: 'Your package is on the way', time: '9:15 AM', isMe: false },
      { id: 2, sender: 'You', content: 'Great, when will it arrive?', time: '9:16 AM', isMe: true },
      { id: 3, sender: 'Jane Smith', content: 'It should be there by 2 PM today', time: '9:20 AM', isMe: false },
      { id: 4, sender: 'Jane Smith', content: 'The package has been delivered', time: '1:45 PM', isMe: false }
    ],
    3: [
      { id: 1, sender: 'Mike Johnson', content: 'Do you have time for a meeting tomorrow?', time: '2:30 PM', isMe: false },
      { id: 2, sender: 'You', content: 'What time works for you?', time: '2:35 PM', isMe: true },
      { id: 3, sender: 'Mike Johnson', content: 'Let me check the schedule', time: '2:40 PM', isMe: false }
    ]
  });

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));

    setMessage('');
  };

  const chatPanelStyle: React.CSSProperties = fullPage 
    ? {
        display: 'flex',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 0,
        boxShadow: 'none',
        width: '100%'
      }
    : {
        display: 'flex',
        height: '600px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      };

  const chatListStyle: React.CSSProperties = fullPage 
    ? {
        width: '350px',
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }
    : {
        width: '300px',
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      };

  const chatAreaStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden'
  };

  return (
    <div style={chatPanelStyle}>
      {/* Chat List */}
      <div style={chatListStyle}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Text strong style={{ fontSize: '16px' }}>Messages</Text>
            <Button type="text" icon={<MessageOutlined />} onClick={onClose} />
          </div>
          <Search placeholder="Search messages" allowClear />
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={chats}
            renderItem={chat => (
              <List.Item
                onClick={() => setActiveChat(chat.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: activeChat === chat.id ? '#f5f5f5' : 'transparent',
                  padding: '12px 16px'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ position: 'relative' }}>
                      <Avatar src={chat.avatar} />
                      {chat.online && (
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#52c41a',
                          borderRadius: '50%',
                          border: '2px solid #fff'
                        }} />
                      )}
                    </div>
                  }
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>{chat.user}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>{chat.lastMessageTime}</Text>
                    </div>
                  }
                  description={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text ellipsis style={{ maxWidth: '180px' }}>{chat.lastMessage}</Text>
                      {chat.unreadCount > 0 && (
                        <span style={{
                          backgroundColor: '#1890ff',
                          color: '#fff',
                          borderRadius: '10px',
                          padding: '0 6px',
                          fontSize: '12px',
                          height: '20px',
                          lineHeight: '20px',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}>
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Chat Area */}
      <div style={chatAreaStyle}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={chats.find(c => c.id === activeChat)?.avatar} />
                <div style={{ marginLeft: '12px' }}>
                  <div style={{ fontWeight: 500 }}>{chats.find(c => c.id === activeChat)?.user}</div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {chats.find(c => c.id === activeChat)?.online ? 'Online' : 'Offline'}
                  </Text>
                </div>
              </div>
              <Button type="text" icon={<MoreOutlined />} />
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundImage: 'linear-gradient(rgba(245, 245, 245, 0.8), rgba(245, 245, 245, 0.8))',
              backgroundSize: 'cover'
            }}>
              {messages[activeChat]?.map((msg, index) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.isMe ? 'flex-end' : 'flex-start',
                    marginBottom: index === messages[activeChat].length - 1 ? 0 : '16px'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '8px 12px',
                      borderRadius: msg.isMe 
                        ? '12px 12px 0 12px' 
                        : '12px 12px 12px 0',
                      backgroundColor: msg.isMe ? '#1890ff' : '#f0f0f0',
                      color: msg.isMe ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                    }}
                  >
                    {msg.content}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                    {msg.time}
                  </Text>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="text" icon={<PaperClipOutlined />} />
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder="Type a message..."
                  style={{ flex: 1, margin: '0 8px' }}
                />
                <Button type="text" icon={<SmileOutlined />} />
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                />
              </div>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '24px',
            color: 'rgba(0, 0, 0, 0.45)'
          }}>
            <MessageOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
            <Text style={{ fontSize: '16px', marginBottom: '8px' }}>Select a chat to start messaging</Text>
            <Text type="secondary">Or start a new conversation</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
