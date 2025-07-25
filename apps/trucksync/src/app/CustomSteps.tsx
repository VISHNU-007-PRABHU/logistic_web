import React from 'react';
import { Steps } from 'antd';

const description = 'This is a description.';
const CustomSteps: React.FC = () => (
  <Steps
    direction="vertical"
    size="small"
    current={1}
    items={[
      { title: 'Finished', description },
      {
        title: 'In Progress',
        description,
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
);

export default CustomSteps;