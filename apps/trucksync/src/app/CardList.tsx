import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Space, Card, message, Tag, Skeleton, Grid } from 'antd';
import './CardList.css';
import { 
    EnvironmentOutlined, 
    CarOutlined, 
    CheckCircleOutlined, 
    InfoCircleOutlined, 
    ClockCircleOutlined
} from '@ant-design/icons';
import { FilterState } from './book';
import CustomCard from './CustomCard';



export interface LoadItem {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  distance: string;
  truckType: string;
  tyreCount: string;
  length: string;
  capacity: string;
  loadingTime: string;
  companyName: string;
  companyType: string;
  price: string;
  priceInfo: string;
  isInclusive: boolean;
  rating?: string;
  isVerified?: boolean;
}

interface CardListProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
}

const PAGE_SIZE = 9;


const CardList: React.FC<CardListProps> = ({ filters, onFilterChange }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<LoadItem[]>([]);
    const screens = Grid.useBreakpoint();
    const isMobile = !screens.md;

    // Removed duplicate handleLoadMore function

    // Generate mock data on component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setData(generateMockLoads(PAGE_SIZE * 2));
            setLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    // Mock data generation
    const generateMockLoads = (count: number): LoadItem[] => {
        const locations = [
            { city: 'Ambernath', state: 'Maharashtra', address: 'Additional M.I.D.C' },
            { city: 'Bengaluru', state: 'Karnataka', address: 'Nagavara' },
            { city: 'Pune', state: 'Maharashtra', address: 'Hinjewadi' },
            { city: 'Mumbai', state: 'Maharashtra', address: 'Andheri East' },
            { city: 'Delhi', state: 'Delhi', address: 'Gurugram' }
        ];
        return Array.from({ length: count }, (_, i) => {
            const from = locations[Math.floor(Math.random() * locations.length)];
            const to = locations.filter(loc => loc.city !== from.city)[Math.floor(Math.random() * (locations.length - 1))];
            const distance = Math.floor(Math.random() * 1000) + 100;
            const price = Math.floor(distance * 50) + 10000;
            
            return {
                id: `load-${page}-${i}`,
                pickupLocation: `${from.address}, ${from.city}, ${from.state}, India`,
                dropLocation: `${to.address}, ${to.city}, ${to.state}, India`,
                distance: `${distance} km`,
                truckType: 'LCV • Closed body',
                tyreCount: '4 tyres',
                length: '20 feet',
                capacity: 'Tray (6 Tonnes)',
                loadingTime: 'Loading Today at 11:00 PM',
                companyName: 'S M Logistics',
                companyType: 'Shipper',
                rating: (Math.random() * 1 + 4).toFixed(1),
                isVerified: Math.random() > 0.3,
                price: `₹${price.toLocaleString()}`,
                priceInfo: '50% Advance • ₹6.1 / tonne-km',
                isInclusive: true
            };
        });
    };

    const fetchLoads = useCallback(async () => {
        setLoading(true);
        try {
            // Simulate API call with filters
            await new Promise(resolve => setTimeout(resolve, 500));
            const newLoads = generateMockLoads(PAGE_SIZE);
            
            setData(prev => page === 1 ? newLoads : [...prev, ...newLoads]);
            setPage(prev => prev + 1);
        } catch (error) {
            message.error('Failed to fetch loads');
        } finally {
            setLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        // Reset to first page when filters change
        setPage(1);
        fetchLoads();
    }, [filters]);

    const handleLoadMore = useCallback(() => {
        if (!loading) {
            fetchLoads();
        }
    }, [loading, fetchLoads]);

    const filteredData = useMemo(() => {
        // Filter data based on active filters
        return data.filter(item => {
            const matchesPickup = !filters.pickupLocation || 
                item.pickupLocation.toLowerCase().includes(filters.pickupLocation.toLowerCase());
            const matchesDrop = !filters.dropLocation || 
                item.dropLocation.toLowerCase().includes(filters.dropLocation.toLowerCase());
            const matchesTruck = !filters.truckType || 
                item.truckType.toLowerCase().includes(filters.truckType.toLowerCase());
            return matchesPickup && matchesDrop && matchesTruck;
        });
    }, [data, filters]);

    // No results state
    if (!loading && filteredData.length === 0) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: isMobile ? '20px 16px' : '40px 20px',
                margin: isMobile ? '16px' : '24px',
                borderRadius: '12px',
                background: '#fafafa',
                border: '1px dashed #d9d9d9'
            }}>
                <EnvironmentOutlined style={{ 
                    fontSize: isMobile ? 36 : 48, 
                    color: '#d9d9d9', 
                    marginBottom: isMobile ? 12 : 16 
                }} />
                <Typography.Title level={isMobile ? 5 : 4} style={{ marginBottom: isMobile ? 8 : 12 }}>
                    No loads found
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: isMobile ? 14 : 15 }}>
                    Try adjusting your filters to see more results
                </Typography.Text>
                {Object.values(filters).some(Boolean) && (
                    <Button 
                        type="link" 
                        onClick={() => onFilterChange('reset' as any, null)}
                        style={{ marginTop: 16 }}
                    >
                        Clear all filters
                    </Button>
                )}
            </div>
        );
    }

    const renderSkeletons = () => (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: isMobile ? '12px' : '16px',
            padding: isMobile ? '8px 4px' : '16px 8px' 
        }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                    <Skeleton active />
                </Card>
            ))}
        </div>
    );

    if (loading && page === 1) {
        return renderSkeletons();
    }


    return (
        <div style={{ padding: isMobile ? '0 8px' : '0 12px' }}>
            {(filters.pickupLocation || filters.dropLocation || filters.truckType) && (
                <div 
                    className="filter-tags-container"
                    style={{ 
                        marginBottom: 16, 
                        padding: isMobile ? '8px 4px' : '8px 0',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                    <Space size={isMobile ? 8 : 12}>
                        {filters.pickupLocation && (
                            <Tag 
                                closable 
                                onClose={() => onFilterChange('pickupLocation', null)}
                                style={{
                                    background: '#f0f7ff',
                                    color: '#1890ff',
                                    borderColor: '#91d5ff',
                                    borderRadius: '12px',
                                    padding: '2px 12px',
                                    margin: 0,
                                    fontSize: isMobile ? '13px' : '14px'
                                }}
                            >
                                🚚 From: {filters.pickupLocation}
                            </Tag>
                        )}
                        {filters.dropLocation && (
                            <Tag 
                                closable 
                                onClose={() => onFilterChange('dropLocation', null)}
                                style={{
                                    background: '#f6ffed',
                                    color: '#52c41a',
                                    borderColor: '#b7eb8f',
                                    borderRadius: '12px',
                                    padding: '2px 12px',
                                    margin: 0,
                                    fontSize: isMobile ? '13px' : '14px'
                                }}
                            >
                                🏁 To: {filters.dropLocation}
                            </Tag>
                        )}
                        {filters.truckType && (
                            <Tag 
                                closable 
                                onClose={() => onFilterChange('truckType', null)}
                                style={{
                                    background: '#fff7e6',
                                    color: '#fa8c16',
                                    borderColor: '#ffd591',
                                    borderRadius: '12px',
                                    padding: '2px 12px',
                                    margin: 0,
                                    fontSize: isMobile ? '13px' : '14px'
                                }}
                            >
                                🚛 {filters.truckType}
                            </Tag>
                        )}
                    </Space>
                </div>
            )}
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: isMobile ? '12px' : '16px',
                padding: isMobile ? '8px 4px' : '16px 8px',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {filteredData.map((item) => (
                    <div 
                        key={item.id}
                        style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.3s ease',
                            ...(isMobile ? {} : {
                                ':hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                                }
                            } as React.CSSProperties)
                        }}
                    >
                        <CustomCard.Container>
                        <div style={{ 
                            padding: isMobile ? '12px' : '16px' 
                        }}>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    paddingLeft: 24
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        bottom: 4,
                                        width: 2,
                                        background: '#1890ff',
                                        borderRadius: 2
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            left: -4,
                                            top: 0,
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            background: '#1890ff',
                                            border: '2px solid #fff',
                                            boxShadow: '0 0 0 1px #1890ff'
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            left: -4,
                                            bottom: 0,
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            background: '#52c41a',
                                            border: '2px solid #fff',
                                            boxShadow: '0 0 0 1px #52c41a'
                                        }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ 
                                            fontWeight: 500, 
                                            fontSize: isMobile ? '14px' : '15px',
                                            color: '#262626',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginBottom: 8
                                        }}>
                                            {item.pickupLocation}
                                        </div>
                                        <div style={{ 
                                            fontWeight: 500, 
                                            fontSize: isMobile ? '14px' : '15px',
                                            color: '#262626',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {item.dropLocation}
                                        </div>
                                        <div style={{ 
                                            marginTop: 8,
                                            color: '#8c8c8c',
                                            fontSize: isMobile ? '12px' : '13px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <EnvironmentOutlined style={{ marginRight: 4, fontSize: isMobile ? '11px' : '12px' }} />
                                            {item.distance}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <CustomCard.Divider />
                            
                            <CustomCard.Details 
                                items={[
                                    { 
                                        label: 'Distance', 
                                        value: item.distance,
                                        icon: <EnvironmentOutlined style={{ color: '#1890ff' }} />
                                    },
                                    { 
                                        label: 'Truck Type', 
                                        value: item.truckType,
                                        icon: <CarOutlined style={{ color: '#722ed1' }} />
                                    },
                                    { 
                                        label: 'Specs', 
                                        value: (
                                            <span>
                                                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 4 }} />
                                                {item.tyreCount} • {item.length}
                                            </span>
                                        )
                                    },
                                    { 
                                        label: 'Capacity', 
                                        value: item.capacity,
                                        icon: <InfoCircleOutlined style={{ color: '#faad14' }} />
                                    },
                                    { 
                                        label: 'Loading', 
                                        value: item.loadingTime,
                                        icon: <ClockCircleOutlined style={{ color: '#13c2c2' }} />
                                    }
                                ]}
                                direction="vertical"
                            />
                            
                            <CustomCard.Divider />
                            
                            <CustomCard.Header 
                                companyName={item.companyName}
                                companyType={item.companyType}
                                rating={item.rating}
                                isVerified={item.isVerified}
                            />
                            
                            <CustomCard.Footer 
                                price={item.price}
                                priceInfo={item.priceInfo}
                                buttonText="Book Now"
                                onButtonClick={() => navigate('/book-flow')}
                            />
                        </div>
                        </CustomCard.Container>
                    </div>
                ))}
            </div>

            {!loading && filteredData.length >= PAGE_SIZE && (
                <div style={{ 
                    textAlign: 'center', 
                    margin: isMobile ? '16px 0 24px' : '24px 0 32px',
                    padding: '0 8px'
                }}>
                    <Button 
                        onClick={handleLoadMore} 
                        loading={loading}
                        type="primary"
                        style={{
                            minWidth: isMobile ? '140px' : '160px',
                            height: isMobile ? '40px' : '44px',
                            fontSize: isMobile ? '15px' : '16px',
                            fontWeight: 500,
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)'
                        }}
                    >
                        Load More Loads
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CardList;