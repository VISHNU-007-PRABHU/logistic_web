import React from 'react';
import { Avatar, Button, Flex, Typography } from 'antd';
import type { FlexProps } from 'antd';
import { BiLeftArrow } from 'react-icons/bi';

const { Title } = Typography;

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 100,
};

const justifyOptions = [
    'space-between',
    'space-around',
    'flex-start',
    'center',
    'flex-end',
    'space-evenly',
];

const alignOptions = ['center', 'flex-start', 'flex-end'];

const CustomFlex: React.FC = () => {
    const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0]);
    const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0]);
    return (
        <Flex gap="middle" align="start" vertical>
            <Flex style={boxStyle} justify={justify} align={alignItems}>
            <Flex style={boxStyle} justify={"flex-start"} align={alignItems}>
                <BiLeftArrow /> 
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                <Title level={2}>Samsung Galaxy Watch 5</Title>
                </Flex>
            <Button type="primary">Disassembly</Button>
            </Flex>
        </Flex>
    );
};

export default CustomFlex;