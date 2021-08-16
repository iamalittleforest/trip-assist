import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="login"
      className="login-form"
      onFinish={onFinish}
    >
      {/* email */}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your E-mail',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>

      {/* password */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {/* button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">Signup</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;