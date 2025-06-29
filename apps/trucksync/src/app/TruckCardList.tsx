import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Card, Space, Tag, Typography, Avatar, Badge } from 'antd';
import { 
    EnvironmentOutlined, 
    CarOutlined, 
    StarFilled,
    ClockCircleOutlined
} from '@ant-design/icons';
import { FilterState } from './book';

const { Text, Title } = Typography;

interface TruckItem {
    id: string;
    truckType: string;
    truckNumber: string;
    currentLocation: string;
    capacity: string;
    availableFrom: string;
    companyName: string;
    rating: number;
    isVerified: boolean;
}

interface TruckCardListProps {
    filters: FilterState;
    onFilterChange: (key: keyof FilterState, value: any) => void;
}

const PAGE_SIZE = 9;

const TruckCardList: React.FC<TruckCardListProps> = ({ filters, onFilterChange }) => {
    const [data, setData] = useState<TruckItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    // Mock data generation
    const generateMockTrucks = (count: number): TruckItem[] => {
        const truckTypes = ['Open Body', 'Container', 'Trailer', 'Flatbed'];
        const locations = ['Nashik', 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad'];
        
        return Array.from({ length: count }, (_, i) => ({
            id: `truck-${page}-${i}`,
            truckType: truckTypes[Math.floor(Math.random() * truckTypes.length)],
            truckNumber: `MH${Math.floor(10 + Math.random() * 89)}AB${Math.floor(1000 + Math.random() * 9000)}`,
            currentLocation: locations[Math.floor(Math.random() * locations.length)],
            capacity: `${Math.floor(10 + Math.random() * 30)} tons`,
            availableFrom: `Available in ${Math.floor(Math.random() * 24)} hours`,
            companyName: `Transporter ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
            rating: Number((Math.random() * 3 + 2).toFixed(1)),
            isVerified: Math.random() > 0.3
        }));
    };

    const fetchTrucks = useCallback(async () => {
        setLoading(true);
        try {
            // Simulate API call with filters
            await new Promise(resolve => setTimeout(resolve, 500));
            const newTrucks = generateMockTrucks(PAGE_SIZE);
            
            setData(prev => page === 1 ? newTrucks : [...prev, ...newTrucks]);
            setPage(prev => prev + 1);
        } catch (error) {
            message.error('Failed to fetch trucks');
        } finally {
            setLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        // Reset to first page when filters change
        setPage(1);
        fetchTrucks();
    }, [filters]);

    const handleLoadMore = () => {
        if (!loading) {
            fetchTrucks();
        }
    };

    // Filter data based on active filters
    const filteredData = useMemo(() => {
        return data.filter(item => {
            if (filters.truckType && item.truckType !== filters.truckType) return false;
            // Add more filter conditions as needed
            return true;
        });
    }, [data, filters]);

    // Loading state
    if (loading && data.length === 0) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', padding: '16px' }}>
                {Array(6).fill(0).map((_, i) => (
                    <Card key={i} style={{ width: '100%' }} loading={true} />
                ))}
            </div>
        );
    }

    // No results state
    if (filteredData.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Title level={4}>No trucks found</Title>
                <p>Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '0 20px' }}>
            <div style={{ marginBottom: 16 }}>
                <Space wrap>
                    {filters.truckType && (
                        <Tag closable onClose={() => onFilterChange('truckType', null)}>
                            Truck Type: {filters.truckType}
                        </Tag>
                    )}
                </Space>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {filteredData.map((item) => (
                    <Card 
                        key={item.id}
                        hoverable
                        style={{ width: '100%' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div>
                                <Text strong style={{ fontSize: '16px' }}>{item.truckType}</Text>
                                <div style={{ color: '#666' }}>{item.truckNumber}</div>
                            </div>
                            {item.isVerified && (
                                <Badge.Ribbon text="Verified" color="green" />
                            )}
                        </div>
                        
                        <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 16 }}>
                            <div>
                                <EnvironmentOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                                <Text>{item.currentLocation}</Text>
                            </div>
                            <div>
                                <CarOutlined style={{ marginRight: 8 }} />
                                <Text>{item.capacity}</Text>
                            </div>
                            <div>
                                <ClockCircleOutlined style={{ marginRight: 8 }} />
                                <Text>{item.availableFrom}</Text>
                            </div>
                        </Space>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                            <Space>
                                <Avatar size="small">{item.companyName.charAt(0)}</Avatar>
                                <Text>{item.companyName}</Text>
                                <StarFilled style={{ color: '#faad14' }} />
                                <Text>{item.rating}</Text>
                            </Space>
                            <Button type="primary" size="small">
                                Contact
                            </Button>
                        </div>
                    </Card>
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

export default TruckCardList;