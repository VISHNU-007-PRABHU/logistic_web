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
    Divider,
    Grid,
    Drawer
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
    ShoppingCartOutlined,
    CarOutlined
} from '@ant-design/icons';
import TruckCardList from './TruckCardList';
import CardList from './CardList';
import truckImage from '../assets/truck.webp';

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
    const {
        token: { colorBgContainer, colorPrimary, colorBgLayout },
    } = theme.useToken();
    const screens = Grid.useBreakpoint();

    const handleFilterChange = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSearch = () => {
        // Trigger search with current filters
        console.log('Searching with filters:', filters);
        if (screens.xs) {
            setDrawerVisible(false);
        }
    };

    const bannerStyle: React.CSSProperties = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${truckImage})`,
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
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    };

    const renderFilters = () => (
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
                        <div style={{ padding: '24px' }}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Text strong style={{ fontSize: '16px' }}>Search Filters</Text>
                                </Col>
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

                                <Col xs={24} style={{ textAlign: 'right', marginTop: '8px' }}>
                                    <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        onClick={handleSearch}
                                        style={{ width: '120px' }}
                                    >
                                        Find Loads
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )
                },
                {
                    key: 'findTruck',
                    label: (
                        <span>
                            <CarOutlined />
                            <span>Find Truck</span>
                        </span>
                    ),
                    children: (
                        <div style={{ padding: '24px' }}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Text strong style={{ fontSize: '16px' }}>Search Filters</Text>
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                        <EnvironmentOutlined /> Current Location
                                    </Text>
                                    <Input
                                        placeholder="Enter city or location"
                                        value={filters.currentLocation || ''}
                                        onChange={(e) => handleFilterChange('currentLocation', e.target.value)}
                                    />
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
                        </div>
                    )
                }
            ]}
        />
    );

    return (
        <div>
            {/* Banner Section */}
            {!(screens.xs) && (
            <div style={bannerStyle}>
                <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
                    <Space size="middle">
                        <SearchOutlined style={{ fontSize: '32px' }} />
                        Find Online Load Booking in Nashik, Maharashtra
                    </Space>
                </Title>
                <Text style={{ fontSize: '18px', maxWidth: '800px', textAlign: 'center' }}>
                    Connect with reliable transporters and shippers across India. Get the best rates for your cargo.
                </Text>
            </div>
            )}

            {/* Filters and Content */}
            <div style={{ width: '100%', maxWidth: '1200px', margin: screens.xs ? '0' : '-40px auto 40px', position: 'relative', zIndex: 1 }}>
                {!screens.xs && (
                    <div style={{ ...filterCardStyle, marginBottom: '24px' }}>
                        {renderFilters()}
                    </div>
                )}

                <div style={filterCardStyle}>
                    {activeTab === 'findLoad' ? (
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Text strong style={{ fontSize: '16px', padding: screens.xs ? '16px 16px 0' : '24px 24px 0' }}>Available Loads</Text>
                            <CardList
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </Space>
                    ) : (
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Text strong style={{ fontSize: '16px', padding: screens.xs ? '16px 16px 0' : '24px 24px 0' }}>Available Trucks</Text>
                            <TruckCardList
                                filters={filters}
                                onFilterChange={handleFilterChange}
                            />
                        </Space>
                    )}
                </div>
            </div>

            {/* Mobile Affixed Button and Drawer */}
            {screens.xs && (
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

export default FindLoads;