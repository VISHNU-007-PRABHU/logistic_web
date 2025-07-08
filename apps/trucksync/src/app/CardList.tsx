import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Space, Card, message, Tag, Skeleton } from 'antd';
import { 
    EnvironmentOutlined, 
    CarOutlined, 
    ClockCircleOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { FilterState } from './book';
import CustomCard from './CustomCard';

const { Title } = Typography;

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
const COLUMNS = 3;

const CardList: React.FC<CardListProps> = ({ filters, onFilterChange }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<LoadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

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

    const handleLoadMore = () => {
        if (!loading) {
            fetchLoads();
        }
    };

    // Filter data based on active filters
    const filteredData = useMemo(() => {
        return data.filter(item => {
            // Example filtering logic - adapt as needed
            if (filters.pickupLocation && !item.pickupLocation.toLowerCase().includes(filters.pickupLocation.toLowerCase())) {
                return false;
            }
            if (filters.dropLocation && !item.dropLocation.toLowerCase().includes(filters.dropLocation.toLowerCase())) {
                return false;
            }
            return true;
        });
    }, [data, filters]);

    if (loading && page === 1) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gap: '16px' }}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index}>
                        <Skeleton active />
                    </Card>
                ))}
            </div>
        );
    }

    // No results state
    if (filteredData.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Title level={4}>No loads found</Title>
                <p>Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '0 20px' }}>
            <div style={{ marginBottom: 16 }}>
                <Space wrap>
                    {filters.pickupLocation && (
                        <Tag closable onClose={() => onFilterChange('pickupLocation', null)}>
                            From: {filters.pickupLocation}
                        </Tag>
                    )}
                    {filters.dropLocation && (
                        <Tag closable onClose={() => onFilterChange('dropLocation', null)}>
                            To: {filters.dropLocation}
                        </Tag>
                    )}
                    {filters.truckType && (
                        <Tag closable onClose={() => onFilterChange('truckType', null)}>
                            Truck: {filters.truckType}
                        </Tag>
                    )}
                </Space>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`, gap: '16px', padding: '16px' }}>
                {filteredData.map((item) => (
                    <CustomCard.Container key={item.id}>
                        <div style={{ padding: '16px' }}>
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 8 }}>
                                    <EnvironmentOutlined style={{ color: '#52c41a', marginRight: 8, marginTop: 4 }} />
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{item.pickupLocation}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                                            <div style={{ width: 12, height: 12, borderLeft: '2px solid #d9d9d9', borderBottom: '2px solid #d9d9d9', marginRight: 8, marginLeft: 4 }} />
                                            <ArrowRightOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
                                        </div>
                                        <div style={{ fontWeight: 500 }}>{item.dropLocation}</div>
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
                ))}
            </div>

            {!loading && filteredData.length >= PAGE_SIZE && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <Button onClick={handleLoadMore} loading={loading}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CardList;