import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card, Row, Col, Typography, Calendar, Badge, Button, Space, Modal, Input, Affix, Drawer } from 'antd';
import CustomFlex from './CustomFlex';
import TabsComponent from './tabs';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

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

const bookings = [
  {
    date: '2024-06-10',
    title: 'Load from Nashik to Pune',
    status: 'success',
    details: 'Open body truck, 10 tons, 9:00 AM'
  },
  {
    date: '2024-06-12',
    title: 'Truck available in Mumbai',
    status: 'processing',
    details: 'Closed body, 5 tons, 2:00 PM'
  }
];

function getListData(value: any) {
  const dateStr = value.format('YYYY-MM-DD');
  return bookings.filter(b => b.date === dateStr).map(b => ({
    type: b.status,
    content: b.title
  }));
}

const BookingPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modal, setModal] = useState<{visible: boolean, booking?: any}>({visible: false});
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item, idx) => (
          <li key={idx}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value: any) => {
    const dateStr = value.format('YYYY-MM-DD');
    const booking = bookings.find(b => b.date === dateStr);
    if (booking) {
      setModal({ visible: true, booking });
    }
  };

  // Example filter UI (customize as needed)
  const renderFilters = () => (
    <Row gutter={[12, 12]} align="middle">
      <Col xs={24} sm={8}>
        <Input placeholder="Search by location" />
      </Col>
      <Col xs={24} sm={8}>
        <Input placeholder="Search by truck type" />
      </Col>
      <Col xs={24} sm={8}>
        <Button type="primary" block>
          Search
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <CustomFlex />
      <TabsComponent />
      {/* Bottom bar for filters */}
      <Affix offsetBottom={0} style={{ zIndex: 100 }}>
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid #eee',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            type="primary"
            onClick={() => setFilterDrawerOpen(true)}
            style={{ width: 180, fontWeight: 600 }}
          >
            Show Search Filters
          </Button>
        </div>
      </Affix>
      <Drawer
        title="Search Filters"
        placement="bottom"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        height={180}
        bodyStyle={{ padding: 16 }}
      >
        {renderFilters()}
      </Drawer>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, paddingBottom: 100 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Card title={<Title level={4}>Booking Calendar</Title>} variant="outlined">
              <Calendar
                cellRender={dateCellRender}
                onSelect={onSelect}
                style={{ background: '#fff', borderRadius: 8 }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              title={<Title level={5}>Upcoming Bookings</Title>}
              variant="outlined"
              style={{ marginBottom: 24 }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {bookings.map((b, idx) => (
                  <Card
                    key={idx}
                    type="inner"
                    title={b.title}
                    extra={<Badge status={b.status as any} />}
                    variant="outlined"
                    style={{ marginBottom: 8 }}
                  >
                    <Text type="secondary">{b.details}</Text>
                    <br />
                    <Text strong>Date: {b.date}</Text>
                  </Card>
                ))}
              </Space>
            </Card>
            <Button type="primary" block>
              + New Booking
            </Button>
          </Col>
        </Row>
        <Modal
          open={modal.visible}
          title={modal.booking?.title}
          onCancel={() => setModal({ visible: false })}
          footer={[
            <Button key="close" onClick={() => setModal({ visible: false })}>
              Close
            </Button>
          ]}
        >
          <p><b>Status:</b> <Badge status={modal.booking?.status as any} /> </p>
          <p><b>Details:</b> {modal.booking?.details}</p>
          <p><b>Date:</b> {modal.booking?.date}</p>
        </Modal>
      </div>
    </>
  );
};

export default BookingPage;