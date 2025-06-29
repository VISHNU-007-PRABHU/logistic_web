import React, { ReactNode } from 'react';
import { Card, Typography, Divider, Button, Avatar, Space, Tag, ConfigProvider } from 'antd';

const { Text: AntdText, Title } = Typography;

// Base Card Component
const CardContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Card
    style={{ width: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
    styles={{
      body: { padding: 0 }
    }}
  >
    {children}
  </Card>
);

// Header Component
const CardHeader: React.FC<{ 
  companyName: string; 
  companyType: string; 
  rating?: string;
  isVerified?: boolean;
}> = ({ companyName, companyType, rating, isVerified = false }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar style={{ backgroundColor: '#1890ff', marginRight: 8 }} />
        <div>
          <div style={{ fontWeight: 500 }}>{companyName}</div>
          <AntdText type="secondary">{companyType}</AntdText>
        </div>
      </div>
      {rating && (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '4px 8px', 
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
          color: '#faad14'
        }}>
          <span style={{ color: '#faad14', marginRight: 4 }}>★</span> {rating}
        </div>
      )}
    </div>
    {isVerified && (
      <div style={{ 
        fontSize: 12, 
        color: '#52c41a',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 40
      }}>
        <span style={{ marginRight: 4 }}>✓</span> Posted by GST/Business verified user
      </div>
    )}
  </div>
);

// Location Component
const CardLocation: React.FC<{ 
  pickupLocation: string; 
  dropLocation: string;
  showTimeline?: boolean;
}> = ({ pickupLocation, dropLocation, showTimeline = true }) => {
  if (showTimeline) {
    return (
      <ConfigProvider
        theme={{
          components: {
            Timeline: {
              itemPaddingBottom: 20
            },
          },
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ 
                width: 24, 
                height: 24, 
                borderRadius: '50%', 
                backgroundColor: '#ff4d4f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                color: 'white',
                fontSize: 12
              }}>
                A
              </div>
              <AntdText ellipsis={{ tooltip: pickupLocation }} style={{ margin: 0 }}>
                {pickupLocation}
              </AntdText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: 24, 
                height: 24, 
                borderRadius: '50%', 
                backgroundColor: '#52c41a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                color: 'white',
                fontSize: 12
              }}>
                B
              </div>
              <AntdText ellipsis={{ tooltip: dropLocation }} style={{ margin: 0 }}>
                {dropLocation}
              </AntdText>
            </div>
          </Space>
        </div>
      </ConfigProvider>
    );
  }
  
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 4, height: 20, backgroundColor: '#1890ff', borderRadius: 2 }} />
        <AntdText type="secondary">{pickupLocation}</AntdText>
      </div>
    </div>
  );
};

// Details Component
const CardDetails: React.FC<{ 
  items: Array<{ label: string; value: ReactNode; icon?: ReactNode }>;
  direction?: 'horizontal' | 'vertical';
}> = ({ items, direction = 'horizontal' }) => (
  <div style={{ display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: 8 }}>
    {items.map((item, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {item.icon && React.cloneElement(item.icon, { style: { marginRight: 4 } })}
        <AntdText type="secondary">
          {item.label && <AntdText strong>{item.label}: </AntdText>}
          {item.value}
        </AntdText>
      </div>
    ))}
  </div>
);

// Tags Component
const CardTags: React.FC<{ 
  tags: Array<{ text: string; icon?: ReactNode; color?: string }>;
}> = ({ tags }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
    {tags.map((tag, index) => (
      <Tag key={index} {...tag}>
        {tag.icon && React.cloneElement(tag.icon, { style: { marginRight: 4 } })}
        <AntdText>{tag.text}</AntdText>
      </Tag>
    ))}
  </div>
);

// Footer Component
const CardFooter: React.FC<{ 
  price: string;
  priceInfo?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}> = ({ price, priceInfo, buttonText = 'Bid Now', onButtonClick }) => (
  <div style={{
    background: '#f9f9f9',
    padding: '12px 16px',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <Title level={4} style={{ margin: 0 }}>{price}</Title>
      {priceInfo && (
        <>
          <AntdText type="secondary">{priceInfo}</AntdText>
          <div><AntdText type="secondary" style={{ fontSize: 12 }}>Inclusive of all charges</AntdText></div>
        </>
      )}
    </div>
    <Button shape="round" type="primary" size="large" onClick={onButtonClick}>
      {buttonText}
    </Button>
  </div>
);

// Export all components under a single namespace
export const CustomCard = {
  Container: CardContainer,
  Header: CardHeader,
  Location: CardLocation,
  Details: CardDetails,
  Tags: CardTags,
  Footer: CardFooter,
  Divider: () => <Divider style={{ margin: '12px 0' }} />
};

export default CustomCard;