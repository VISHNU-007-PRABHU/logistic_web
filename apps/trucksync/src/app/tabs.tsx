import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs, Row, Col } from 'antd';
import VCLIST from './vcList';
import CustomSteps from './CustomSteps';
import GridList from './GRIDLIST';

const TabsComponent: React.FC = () => (
    <Tabs
        className='h-full'
        defaultActiveKey="2"
        items={[
            {
                key: 1,
                label: `Calender`,
                className:'h-full',
                children: (
                    <Row className='h-full'>
                        <Col span={18} push={6}>
                            <Row>
                                <GridList />
                            </Row>
                            <Row>
                                <Col>
                                    <CustomSteps />
                                </Col>
                                <Col>
                                    <CustomSteps />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6} pull={18}>
                            <VCLIST />
                        </Col>
                    </Row>
                ),
                icon: <AndroidOutlined />,
            },
            {
            key: 2,
            label: `Shipment`,
            className:'h-full',
                children: (
                <Row className='h-full'>
                    <Col span={18} push={6}>
                        <Row>
                            <GridList />
                        </Row>
                        <Row>
                            <Col>
                                <CustomSteps />
                            </Col>
                            <Col>
                                <CustomSteps />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} pull={18}>
                        <VCLIST />
                    </Col>
                </Row>
            ),
            icon: <AndroidOutlined />,
        }]
        }
    />
);

export default TabsComponent;