import React from 'react';
import { Form, Input, Button } from 'antd';

const SignupForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      name="signup"
      className="signup-form"
      onFinish={onFinish}
      scrollToFirstError
    >

      {/* username */}
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please enter your username',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Username"/>
      </Form.Item>

      {/* email */}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'Invalid E-mail format',
          },
          {
            required: true,
            message: 'Please enter your E-mail',
          },
        ]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>

      {/* password */}
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Password"/>
      </Form.Item>

      {/* button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="signup-form-button">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;