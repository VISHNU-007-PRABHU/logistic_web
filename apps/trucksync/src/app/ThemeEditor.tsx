// src/app/ThemeEditor.tsx
import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Space, ColorPicker } from 'antd';
import { useTheme } from './ThemeContext';

const ThemeEditor: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { themeConfig, updateTheme, resetTheme } = useTheme();
  const [form] = Form.useForm();
  const [color, setColor] = useState(themeConfig.token?.colorPrimary || '#1677ff');

  const showDrawer = () => {
    const currentColor = themeConfig.token?.colorPrimary || '#1677ff';
    setColor(currentColor);
    form.setFieldsValue({
      primaryColor: currentColor,
      borderRadius: themeConfig.token?.borderRadius || 6,
    });
    setOpen(true);
  };

  const handleColorChange = (newColor: any) => {
    const hexColor = typeof newColor === 'string' ? newColor : newColor.toHexString();
    setColor(hexColor);
    form.setFieldsValue({ primaryColor: hexColor });
  };

  // Set initial form values when the component mounts
  React.useEffect(() => {
    if (open) {
      form.setFieldsValue({
        primaryColor: themeConfig.token?.colorPrimary || '#1677ff',
        borderRadius: themeConfig.token?.borderRadius || 6,
      });
    }
  }, [open, form]);

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    try {
      // Ensure we have a valid hex color
      const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      const primaryColor = colorRegex.test(values.primaryColor) 
        ? values.primaryColor 
        : '#1677ff';
  
      updateTheme({
        token: {
          colorPrimary: primaryColor,
          borderRadius: Number(values.borderRadius) || 6,
        },
      });
      onClose();
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  return (
    <>
      <Button 
        type="primary" 
        onClick={showDrawer} 
        style={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24, 
          zIndex: 1000,
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        🎨
      </Button>
      <Drawer
        title="Theme Settings"
        placement="right"
        onClose={onClose}
        open={open}
        width={350}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item 
            name="primaryColor" 
            label="Primary Color"
            rules={[
              { 
                required: true, 
                message: 'Please select a color!' 
              }
            ]}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ColorPicker
                value={color}
                onChange={handleColorChange}
                onChangeComplete={handleColorChange}
                presets={[{
                  label: 'Recommended',
                  colors: [
                    '#1677ff', // Default blue
                    '#52c41a', // Green
                    '#faad14', // Gold
                    '#f5222d', // Red
                    '#722ed1', // Purple
                    '#13c2c2', // Cyan
                    '#eb2f96', // Magenta
                    '#fa8c16'  // Orange
                  ],
                }]}
                showText
                style={{ verticalAlign: 'middle' }}
              />
              <Input 
                placeholder="#1677ff" 
                value={color}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setColor(newColor);
                  form.setFieldsValue({ primaryColor: newColor });
                }}
                style={{ flex: 1 }}
                prefix={
                  <div style={{ 
                    width: 16, 
                    height: 16, 
                    backgroundColor: color,
                    borderRadius: 4,
                    marginRight: 8
                  }} />
                }
              />
            </div>
          </Form.Item>
          <Form.Item 
            name="borderRadius" 
            label="Border Radius"
            rules={[{ 
              required: true, 
              message: 'Please input border radius!',
              type: 'number',
              min: 0,
              max: 20
            }]}
          >
            <Input type="number" min={0} max={20} />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
            <Button 
              onClick={() => {
                resetTheme();
                form.resetFields();
              }}
            >
              Reset to Default
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};

export default ThemeEditor;