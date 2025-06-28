import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const CustomFloaterButton: React.FC = () => (
  <>
    <FloatButton.Group shape="circle">
      <FloatButton badge={{ count: 12 }} icon={<QuestionCircleOutlined />} />
      <FloatButton badge={{ count: 123, overflowCount: 999 }} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  </>
);

export default CustomFloaterButton;