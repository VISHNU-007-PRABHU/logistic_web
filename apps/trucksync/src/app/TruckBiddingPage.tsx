import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Input, Form, Typography, Row, Col, Divider, Descriptions, message } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TruckDetails {
  id: string;
  truckNumber: string;
  capacity: string;
  type: string;
  driverName: string;
  phone: string;
  currentLocation: string;
  ratePerKm: number;
  availableFrom: string;
}

// Mock data - in a real app, this would come from an API
const mockTruckData: TruckDetails = {
  id: 'TRK123',
  truckNumber: 'KA01AB1234',
  capacity: '20 Tons',
  type: 'Container',
  driverName: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  currentLocation: 'Bangalore, KA',
  ratePerKm: 45,
  availableFrom: '2023-07-10',
};

const TruckBiddingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bidPlaced, setBidPlaced] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Bid submitted:', { ...values, truckId: id });
      setBidPlaced(true);
      message.success('Your bid has been placed successfully!');
    } catch (error) {
      message.error('Failed to place bid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (bidPlaced) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          style={{ marginBottom: '16px' }}
        >
          Back to Trucks
        </Button>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a', marginBottom: '24px' }} />
            <Title level={3}>Bid Placed Successfully!</Title>
            <Text type="secondary">
              Your bid has been placed successfully. The truck owner will contact you shortly.
            </Text>
            <div style={{ marginTop: '24px' }}>
              <Button type="primary" onClick={() => navigate('/truck')}>
                Back to Available Trucks
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate(-1)}
        style={{ marginBottom: '16px' }}
      >
        Back to Trucks
      </Button>
      
      <Title level={2}>Place Your Bid</Title>
      <Text type="secondary">Fill in the details to place your bid for this truck</Text>
      <Divider />
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Truck Details" style={{ marginBottom: '24px' }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Truck Number">{mockTruckData.truckNumber}</Descriptions.Item>
              <Descriptions.Item label="Type">{mockTruckData.type}</Descriptions.Item>
              <Descriptions.Item label="Capacity">{mockTruckData.capacity}</Descriptions.Item>
              <Descriptions.Item label="Current Location">{mockTruckData.currentLocation}</Descriptions.Item>
              <Descriptions.Item label="Available From">{mockTruckData.availableFrom}</Descriptions.Item>
              <Descriptions.Item label="Rate per KM">₹{mockTruckData.ratePerKm}/km</Descriptions.Item>
              <Descriptions.Item label="Driver">
                <div>
                  <div>{mockTruckData.driverName}</div>
                  <Text type="secondary">{mockTruckData.phone}</Text>
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card title="Bid Information">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                rate: mockTruckData.ratePerKm,
                advance: 0,
                notes: ''
              }}
            >
              <Form.Item
                name="rate"
                label="Your Rate per KM (₹)"
                rules={[{ required: true, message: 'Please enter your rate per KM' }]}
              >
                <Input type="number" addonAfter="₹/km" />
              </Form.Item>
              
              <Form.Item
                name="advance"
                label="Advance Payment (₹)"
                rules={[{ required: true, message: 'Please enter advance amount' }]}
              >
                <Input type="number" addonAfter="₹" />
              </Form.Item>
              
              <Form.Item
                name="notes"
                label="Additional Notes"
              >
                <Input.TextArea rows={4} placeholder="Any special requirements or notes for the truck owner..." />
              </Form.Item>
              
              <div style={{ textAlign: 'right' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  size="large"
                >
                  Place Bid
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TruckBiddingPage;
