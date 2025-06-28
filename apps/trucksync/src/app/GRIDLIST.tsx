import React from 'react';
import { Card, List } from 'antd';

const data = [
  {
    title: 'Total pieces',
    value: '^ 2% more',
  },
  {
    title: 'Shipped',
  },
  {
    title: 'Delivered',
  },
  {
    title: 'Left',
  },
];

const GridList: React.FC = () => (
  <List
    className='h-full'
    grid={{ gutter: 1, column: 4 }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
);

export default GridList;