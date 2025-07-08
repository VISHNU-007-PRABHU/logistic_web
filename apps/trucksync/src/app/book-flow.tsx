import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Typography, Tag, Avatar, Space, Button, Checkbox, Divider, List, Steps, Rate, Tooltip, Modal, Result, notification } from 'antd';
import { CheckCircleFilled, EnvironmentOutlined, GiftOutlined, ThunderboltFilled, UserOutlined, ClockCircleOutlined, ArrowRightOutlined, PhoneOutlined, CreditCardOutlined, InfoCircleOutlined } from '@ant-design/icons';

declare global {
    interface Window { Razorpay: any; }
}
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

const { Title, Text } = Typography;
const { Step } = Steps;

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
    <Row align="middle" style={{ width: '100%' }}>
        <Col span={1} style={{ textAlign: 'center' }}>{icon}</Col>
        <Col span={10}><Text strong>{label}</Text></Col>
        <Col span={12}><Text>{value}</Text></Col>
    </Row>
);

const RouteMap: React.FC = () => {
    const pickupPosition: [number, number] = [19.0760, 72.8777]; // Mumbai
    const dropoffPosition: [number, number] = [28.7041, 77.1025]; // Delhi
    const polyline: [number, number][] = [pickupPosition, dropoffPosition];

    return (
        <MapContainer center={[23.8901, 78.9629]} zoom={5} style={{ height: '250px', width: '100%', borderRadius: '8px' }} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={pickupPosition}></Marker>
            <Marker position={dropoffPosition}></Marker>
            <Polyline positions={polyline} color="blue" />
        </MapContainer>
    );
};

const LoadDetailsCard: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showContactModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Card bordered={false} style={{ borderRadius: '12px' }}>
                <Title level={4} style={{ marginTop: 0 }}>Load Details</Title>
                <Divider />
                <RouteMap />
                <Divider />
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                    <DetailItem 
                        icon={<EnvironmentOutlined style={{ color: '#1890ff' }} />} 
                        label="From" 
                        value="Mumbai, Maharashtra" 
                    />
                    <DetailItem 
                        icon={<EnvironmentOutlined style={{ color: '#52c41a' }} />} 
                        label="To" 
                        value="Delhi, Delhi" 
                    />
                    <DetailItem 
                        icon={<ArrowRightOutlined />} 
                        label="Distance" 
                        value="1400 km" 
                    />
                    <DetailItem 
                        icon={<ClockCircleOutlined />} 
                        label="Est. Travel Time" 
                        value="48h" 
                    />
                    <DetailItem 
                        icon={<ThunderboltFilled />} 
                        label="Vehicle" 
                        value="TATA ACE, Open Body, 12 Tyres" 
                    />
                    <DetailItem 
                        icon={<UserOutlined />} 
                        label="Material" 
                        value={<span>Industrial Goods, 5000kg <Tag color="blue">Full Truck Load</Tag></span>} 
                    />
                </Space>
                <Divider />
                <Title level={5}>Shipper Details</Title>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space align="center" size="large">
                        <Avatar size={48} icon={<UserOutlined />} />
                        <div>
                            <Text strong>Transporter Demo</Text>
                            <Tag icon={<CheckCircleFilled />} color="success" style={{ marginLeft: 8 }}>Verified</Tag>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                                <Rate disabled defaultValue={4.5} allowHalf style={{ fontSize: 16 }} />
                                <Text type="secondary" style={{ marginLeft: 8 }}>(120 Reviews)</Text>
                            </div>
                        </div>
                    </Space>
                    <Button icon={<PhoneOutlined />} onClick={showContactModal}>Contact Shipper</Button>
                </div>
            </Card>
            <Modal title="Contact Shipper" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}>Close</Button>,
                <Button key="submit" type="primary" href="tel:+911234567890">Call Now</Button>,
            ]}>
                <p><Text strong>Phone:</Text> +91 12345 67890</p>
                <p><Text strong>Email:</Text> contact@transporterdemo.com</p>
            </Modal>
        </>
    );
};



const BookingConfirmationCard: React.FC<{ onBookingConfirmed: () => void; isConfirmed: boolean }> = ({ onBookingConfirmed, isConfirmed }) => {
    const navigate = useNavigate();
    

    const handleCancel = () => {
        navigate('/book'); // Navigate to the home page or another appropriate route
    };

    const handlePayment = () => {
        // Simulate a successful payment for UI flow demonstration
        onBookingConfirmed();
        notification.success({
            message: 'Payment Successful',
            description: 'Your booking has been confirmed.',
        });
    };

    const priceData = [
        { label: 'Base Fare', value: '₹18,000' },
        { label: 'Taxes (GST)', value: '₹900' },
        { label: 'Platform Fee', value: '₹600' },
        { label: 'Total Amount', value: '₹19,500', isTotal: true },
    ];

    return (
        <Card bordered={false} style={{ borderRadius: '12px' }}>
            <Title level={4} style={{ marginTop: 0 }}>Booking Summary</Title>
            <Divider />
            <List
                dataSource={priceData}
                renderItem={(item) => (
                    <List.Item style={{ borderBottom: item.isTotal ? '2px solid #1890ff' : 'none', padding: '8px 0' }}>
                        <Text strong={item.isTotal}>{item.label}</Text>
                        <Text strong={item.isTotal}>{item.value}</Text>
                    </List.Item>
                )}
            />
            <Divider />
            <Checkbox defaultChecked>I will provide a Bilty</Checkbox>
            <div style={{ background: '#e6f7ff', padding: '12px', borderRadius: 8, margin: '24px 0' }}>
                <Text style={{ color: '#1890ff' }}><GiftOutlined /> Use up to 400 coins for an instant discount!</Text>
            </div>
            <div style={{ marginBottom: 24 }}>
                <Text strong>We Accept:</Text>
                <Space align="center" style={{ marginLeft: 12 }}>
                    <Tooltip title="Credit/Debit Card"><CreditCardOutlined style={{ fontSize: 24 }} /></Tooltip>
                    <Tag style={{ padding: '4px 8px', border: '1px solid #d9d9d9' }}>UPI</Tag>
                    <Tag style={{ padding: '4px 8px', border: '1px solid #d9d9d9' }}>Net Banking</Tag>
                </Space>
            </div>
            {isConfirmed ? (
                <Result
                    status="success"
                    title="Booking Confirmed!"
                    subTitle="Your load has been successfully booked. You will receive a confirmation email shortly."
                />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button block size="large" onClick={handleCancel}>Cancel</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" block size="large" style={{ background: '#52c41a', borderColor: '#52c41a' }} onClick={handlePayment}>
                                Pay Deposit: ₹780
                            </Button>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            <InfoCircleOutlined style={{ marginRight: 4 }} />
                            By booking, you agree to our <a href="#">Terms & Cancellation Policy</a>.
                        </Text>
                    </div>
                </>
            )}
        </Card>
    );
};

const BookFlow: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleBookingConfirmed = () => {
        setCurrentStep(2);
    };

    return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
        <Card style={{ marginBottom: 24, borderRadius: 12 }}>
            <Steps current={currentStep}>
                <Step title="Load Selection" description="Find the best load for you." />
                <Step title="Booking Details" description="Confirm details and payment." />
                <Step title="Confirmation" description="Your booking is confirmed." />
            </Steps>
        </Card>
        <Row gutter={[{ xs: 8, sm: 16, md: 24 }, { xs: 8, sm: 16, md: 24 }]}>
            <Col xs={24} lg={14}>
                <LoadDetailsCard />
            </Col>
            <Col xs={24} lg={10}>
                <BookingConfirmationCard 
                        onBookingConfirmed={handleBookingConfirmed} 
                        isConfirmed={currentStep === 2} 
                    />
            </Col>
        </Row>
    </div>
    );
};

export default BookFlow;
