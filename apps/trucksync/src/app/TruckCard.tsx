import React from 'react';
import { EnvironmentOutlined, CarOutlined, ClockCircleOutlined, UserOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Card, Typography, Button, Avatar, Space, Tag, Divider } from 'antd';

const { Text: AntdText, Title } = Typography;

interface TruckCardProps {
  truckType?: string;
  truckNumber?: string;
  truckModel?: string;
  currentLocation?: string;
  lastUpdated?: string;
  capacity?: string;
  tyreCount?: string;
  length?: string;
  companyName?: string;
  companyType?: string;
  rating?: string;
}

const TruckCard: React.FC<TruckCardProps> = ({
  truckType = 'Open body, Truck',
  truckNumber = 'AP 31 TH 7498',
  truckModel = 'RE MAXIMA DIESEL BSIV',
  currentLocation = 'Chennai, TN',
  lastUpdated = '29 Jun, 9:34 PM',
  capacity = '10 Tonnes',
  tyreCount = '6 tyres',
  length = '20 feet',
  companyName = 'Lalitha Mini Transport',
  companyType = 'Truck Owner / Driver',
  rating = '3.3'
}) => {
  return (
    <Card
      style={{ width: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <Title level={4} style={{ margin: 0 }}>{truckType}</Title>
            <Button type="text" icon={<ShareAltOutlined />} />
          </div>
          
          <div style={{ marginBottom: 12 }}>
            <AntdText strong style={{ display: 'block', marginBottom: 4 }}>{truckNumber}</AntdText>
            <AntdText type="secondary">{truckModel}</AntdText>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <EnvironmentOutlined style={{ color: '#1890ff', marginRight: 8 }} />
              <div>
                <AntdText>Current Location:</AntdText>
                <div>
                  <AntdText strong>{currentLocation}</AntdText>
                </div>
              </div>
            </div>
            <AntdText type="secondary">
              <ClockCircleOutlined style={{ marginRight: 4 }} />
              Last updated: {lastUpdated}
            </AntdText>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Tag color="blue">{capacity}</Tag>
            <Tag>{tyreCount}</Tag>
            <Tag>{length}</Tag>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f9f9f9',
        padding: '12px 16px',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ backgroundColor: '#1890ff', marginRight: 8 }} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{companyName}</div>
            <AntdText type="secondary">{companyType}</AntdText>
          </div>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '2px 8px', 
            borderRadius: 4,
            marginLeft: 12,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
            color: '#faad14'
          }}>
            <span style={{ color: '#faad14', marginRight: 4 }}>★</span> {rating}
          </div>
        </div>
        <Button type="primary" shape="round">Bid Now</Button>
      </div>
    </Card>
  );
};

export default TruckCard;
