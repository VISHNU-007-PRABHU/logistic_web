import React, { useState } from 'react';
import moment from 'moment';
import {
    Card,
    Input,
    DatePicker,
    Select,
    Button,
    Row,
    Col,
    Typography,
    Space,
    Grid,
    Drawer,
    Affix,
    Tabs
} from 'antd';
import {
    SearchOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    TruckOutlined,
    ShoppingCartOutlined,
    CarOutlined
} from '@ant-design/icons';
import TruckCardList from './TruckCardList';
import CardList from './CardList';
import truckImage from '../assets/truck.webp';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export interface FilterState {
    pickupLocation: string | null;
    dropLocation: string | null;
    truckType: string | null;
    dateRange: [moment.Moment | null, moment.Moment | null] | null;
    currentLocation: string | null;
    availableTruckType: string | null;
    availableFrom: moment.Moment | null;
}

interface FindProps {
    mode: 'findLoad' | 'findTruck';
}

const Find: React.FC<FindProps> = ({ mode }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        pickupLocation: null,
        dropLocation: null,
        truckType: null,
        dateRange: [null, null],
        currentLocation: null,
        availableTruckType: 'all',
        availableFrom: null,
    });
    const screens = Grid.useBreakpoint();

    const handleFilterChange = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSearch = () => {
        // Trigger search with current filters
        if (screens.xs) setDrawerVisible(false);
    };

    const filterCardStyle: React.CSSProperties = {
        width: '100%',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.10)',
        marginBottom: 24,
    };

    const bannerStyle: React.CSSProperties = {
        background: `linear-gradient(120deg, #1890ff 60%, #e6f7ff 100%)`,
        backgroundImage: `url(${truckImage}), linear-gradient(120deg, #1890ff 60%, #e6f7ff 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: 'white',
        textAlign: 'left',
        padding: '32px 32px 32px 48px',
        borderRadius: 16,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden'
    };

    const renderFilters = () => (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Text strong style={{ fontSize: '16px' }}>Search Filters</Text>
                </Col>
                {mode === 'findLoad' ? (
                    <>
                        <Col xs={24} sm={12} md={6}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <EnvironmentOutlined /> Pickup Location
                            </Text>
                            <Input
                                placeholder="Enter city or location"
                                value={filters.pickupLocation || ''}
                                onChange={(e) => handleFilterChange('pickupLocation', e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <EnvironmentOutlined /> Drop Location
                            </Text>
                            <Input
                                placeholder="Enter city or location"
                                value={filters.dropLocation || ''}
                                onChange={(e) => handleFilterChange('dropLocation', e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <TruckOutlined /> Truck Type
                            </Text>
                            <Select
                                placeholder="Select truck type"
                                style={{ width: '100%' }}
                                value={filters.truckType || 'all'}
                                onChange={(value) => handleFilterChange('truckType', value)}
                            >
                                <Option value="all">All Types</Option>
                                <Option value="open">Open Body</Option>
                                <Option value="closed">Closed Body</Option>
                                <Option value="container">Container</Option>
                                <Option value="trailer">Trailer</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <CalendarOutlined /> Date
                            </Text>
                            <RangePicker
                                style={{ width: '100%' }}
                                value={filters.dateRange}
                                onChange={(dates) => handleFilterChange('dateRange', dates)}
                            />
                        </Col>
                    </>
                ) : (
                    <>
                        <Col xs={24} sm={12} md={8}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <EnvironmentOutlined /> Current Location
                            </Text>
                            <Input
                                placeholder="Enter city or location"
                                value={filters.currentLocation || ''}
                                onChange={(e) => handleFilterChange('currentLocation', e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <CarOutlined /> Truck Type
                            </Text>
                            <Select
                                placeholder="Select truck type"
                                style={{ width: '100%' }}
                                value={filters.availableTruckType}
                                onChange={(value) => handleFilterChange('availableTruckType', value)}
                            >
                                <Option value="all">All Types</Option>
                                <Option value="open">Open Body</Option>
                                <Option value="closed">Closed Body</Option>
                                <Option value="container">Container</Option>
                                <Option value="trailer">Trailer</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                <CalendarOutlined /> Available From
                            </Text>
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="Select available date"
                                value={filters.availableFrom}
                                onChange={(date) => handleFilterChange('availableFrom', date)}
                            />
                        </Col>
                    </>
                )}
                <Col xs={24} style={{ textAlign: 'right', marginTop: '8px' }}>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearch}
                        style={{ width: '140px', fontWeight: 600 }}
                    >
                        {mode === 'findLoad' ? 'Find Loads' : 'Find Trucks'}
                    </Button>
                </Col>
            </Row>
        </div>
    );

    return (
        <div style={{ background: '#f4f8fb', minHeight: '100vh', padding: '32px 0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={bannerStyle}>
                    <Title level={2} style={{ color: '#fff', marginBottom: 8 }}>
                        <Space size="middle">
                            {mode === 'findLoad' ? <ShoppingCartOutlined /> : <CarOutlined />}
                            {mode === 'findLoad'
                                ? 'Find Online Load Booking'
                                : 'Find Available Trucks'}
                        </Space>
                    </Title>
                    <Text style={{ fontSize: 18, color: '#fff', opacity: 0.95 }}>
                        {mode === 'findLoad'
                            ? 'Connect with reliable transporters and shippers across India. Get the best rates for your cargo.'
                            : 'Browse trucks available for your route and requirements. Book instantly or contact the owner.'}
                    </Text>
                </div>
                <Card style={filterCardStyle}>
                    {renderFilters()}
                </Card>
                <Card style={{ ...filterCardStyle, marginBottom: 0 }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Text strong style={{ fontSize: '16px', padding: '24px 24px 0' }}>
                            {mode === 'findLoad' ? 'Available Loads' : 'Available Trucks'}
                        </Text>
                        {mode === 'findLoad' ? (
                            <CardList filters={filters} onFilterChange={handleFilterChange} />
                        ) : (
                            <TruckCardList filters={filters} onFilterChange={handleFilterChange} />
                        )}
                    </Space>
                </Card>
            </div>
            {/* Mobile Affixed Button and Drawer */}
            {Grid.useBreakpoint().xs && (
                <>
                    <Affix offsetBottom={0} style={{ zIndex: 10 }}>
                        <div style={{ padding: '16px', textAlign: 'center', background: 'white', boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Button type="primary" onClick={() => setDrawerVisible(true)} block>
                                <SearchOutlined /> Show Filters
                            </Button>
                        </div>
                    </Affix>
                    <Drawer
                        title="Filters"
                        placement="bottom"
                        onClose={() => setDrawerVisible(false)}
                        open={drawerVisible}
                        height="auto"
                        bodyStyle={{ padding: 0 }}
                        zIndex={20}
                    >
                        {renderFilters()}
                    </Drawer>
                </>
            )}
        </div>
    );
};

export default Find;