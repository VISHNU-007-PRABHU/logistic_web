import React, { useState } from 'react';
import moment from 'moment';
import {
    Menu,
    theme,
    Card,
    Input,
    DatePicker,
    Select,
    Button,
    Row,
    Col,
    Typography,
    Space,
    Layout,
    Affix,
    Tabs,
    Divider
} from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    SearchOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    TruckOutlined,
    ArrowRightOutlined,
    ShoppingCartOutlined,
    CarOutlined
} from '@ant-design/icons';
import TruckCardList from './TruckCardList';
import CardList from './CardList';

const { Title, Text } = Typography;

const { RangePicker } = DatePicker;
const { Option } = Select;

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
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

export interface FilterState {
    pickupLocation: string | null;
    dropLocation: string | null;
    truckType: string | null;
    dateRange: [moment.Moment | null, moment.Moment | null] | null;
    currentLocation: string | null;
    availableTruckType: string | null;
    availableFrom: moment.Moment | null;
}

interface ListComponentProps {
    filters: FilterState;
    onFilterChange: (key: keyof FilterState, value: any) => void;
}

const FindLoads: React.FC = () => {
    const [activeTab, setActiveTab] = useState('findLoad');
    const [filters, setFilters] = useState<FilterState>({
        pickupLocation: null,
        dropLocation: null,
        truckType: null,
        dateRange: [null, null],
        currentLocation: null,
        availableTruckType: 'all',
        availableFrom: null,
    });
    const {
        token: { colorBgContainer, colorPrimary, colorBgLayout },
    } = theme.useToken();

    const handleFilterChange = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSearch = () => {
        // Trigger search with current filters
        console.log('Searching with filters:', filters);
    };

    const bannerStyle: React.CSSProperties = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV1fDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '0 20px 60px',
    };

    const filterCardStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '1200px',
        background: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        margin: '0 auto',
    };

    return (
        <div>
            {/* Banner Section */}
            <div style={bannerStyle}>
                <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
                    <Space size="middle">
                        <SearchOutlined style={{ fontSize: '32px' }} />
                        Find Online Load Booking in Nashik, Maharashtra
                    </Space>
                </Title>
                <Text style={{ fontSize: '18px', maxWidth: '800px' }}>
                    Connect with reliable transporters and shippers across India. Get the best rates for your cargo.
                </Text>
            </div>

            {/* Filter Card */}
            <div style={{ ...filterCardStyle, margin: '-40px auto 40px', position: 'relative', zIndex: 1 }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    type="card"
                    items={[
                        {
                            key: 'findLoad',
                            label: (
                                <span>
                                    <ShoppingCartOutlined />
                                    <span>Find Load</span>
                                </span>
                            ),
                            children: (
                                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                                    <Col span={24}>
                                        <Text strong style={{ fontSize: '16px' }}>Search Filters</Text>
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                            <EnvironmentOutlined /> Pickup Location
                                        </Text>
                                        <Select
                                            placeholder="Select pickup location"
                                            style={{ width: '100%' }}
                                            suffixIcon={<SearchOutlined />}
                                            value={filters.pickupLocation}
                                            onChange={(value) => handleFilterChange('pickupLocation', value)}
                                        >
                                            <Option value="nashik">Nashik, Maharashtra</Option>
                                            <Option value="mumbai">Mumbai, Maharashtra</Option>
                                            <Option value="pune">Pune, Maharashtra</Option>
                                            <Option value="delhi">Delhi</Option>
                                            <Option value="bangalore">Bangalore, Karnataka</Option>
                                        </Select>
                                    </Col>

                                    <Col xs={24} sm={12} md={6}>
                                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                            <EnvironmentOutlined /> Drop Location
                                        </Text>
                                        <Select
                                            placeholder="Select drop location"
                                            style={{ width: '100%' }}
                                            suffixIcon={<SearchOutlined />}
                                            value={filters.dropLocation}
                                            onChange={(value) => handleFilterChange('dropLocation', value)}
                                        >
                                            <Option value="delhi">Delhi</Option>
                                            <Option value="mumbai">Mumbai, Maharashtra</Option>
                                            <Option value="bangalore">Bangalore, Karnataka</Option>
                                            <Option value="hyderabad">Hyderabad, Telangana</Option>
                                            <Option value="chennai">Chennai, Tamil Nadu</Option>
                                        </Select>
                                    </Col>

                                    <Col xs={24} sm={12} md={4}>
                                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                            <CarOutlined /> Truck Type
                                        </Text>
                                        <Select
                                            placeholder="Select truck type"
                                            style={{ width: '100%' }}
                                            value={filters.truckType}
                                            onChange={(value) => handleFilterChange('truckType', value)}
                                        >
                                            <Option value="open">Open Body</Option>
                                            <Option value="closed">Closed Body</Option>
                                            <Option value="container">Container</Option>
                                            <Option value="trailer">Trailer</Option>
                                        </Select>
                                    </Col>

                                    <Col xs={24} sm={12} md={4}>
                                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                            <CalendarOutlined /> Loading Date
                                        </Text>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            placeholder="Select date"
                                            value={filters.dateRange?.[0]}
                                            onChange={(date) => handleFilterChange('dateRange', [date, filters.dateRange?.[1] || null])}
                                        />
                                    </Col>

                                    <Col xs={24} style={{ textAlign: 'right', marginTop: '8px' }}>
                                        <Button
                                            type="primary"
                                            icon={<SearchOutlined />}
                                            onClick={handleSearch}
                                            style={{ width: '120px' }}
                                        >
                                            Search Loads
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        },
                        {
                            key: 'findTruck',
                            label: (
                                <span>
                                    <TruckOutlined />
                                    <span>Find Truck</span>
                                </span>
                            ),
                            children: (
                                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                                    <Col span={24}>
                                        <Text strong style={{ fontSize: '16px' }}>Search Filters</Text>
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                            <EnvironmentOutlined /> Current Location
                                        </Text>
                                        <Select
                                            placeholder="Select current location"
                                            style={{ width: '100%' }}
                                            suffixIcon={<SearchOutlined />}
                                            value={filters.currentLocation}
                                            onChange={(value) => handleFilterChange('currentLocation', value)}
                                        >
                                            <Option value="mumbai">Mumbai, Maharashtra</Option>
                                            <Option value="pune">Pune, Maharashtra</Option>
                                            <Option value="delhi">Delhi</Option>
                                            <Option value="bangalore">Bangalore, Karnataka</Option>
                                            <Option value="hyderabad">Hyderabad, Telangana</Option>
                                        </Select>
                                    </Col>

                                    <Col xs={24} sm={12} md={6}>
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

                                    <Col xs={24} sm={12} md={6}>
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

                                    <Col xs={24} style={{ textAlign: 'right', marginTop: '8px' }}>
                                        <Button
                                            type="primary"
                                            icon={<SearchOutlined />}
                                            onClick={handleSearch}
                                            style={{ width: '120px' }}
                                        >
                                            Find Trucks
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        }
                    ]}
                />
            </div>

            <div style={{ ...filterCardStyle, margin: '40px auto 40px', position: 'relative', zIndex: 1 }}>

                {activeTab === 'findLoad' ? (
                    <>
                        <div style={{ padding: '10px 0 20px' }}>
                            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>Available Loads</Text>
                            <CardList
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ padding: '10px 0 20px' }}>
                            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>Available Trucks</Text>
                            <TruckCardList
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                    </>
                )}
                </div>
        </div>
    );
};

export default FindLoads;