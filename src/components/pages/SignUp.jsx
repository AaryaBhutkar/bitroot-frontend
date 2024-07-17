import React from 'react';
import { Form, Input, Button, Card, Typography, Layout, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, ArrowRightOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        'https://bitroot-backend-nh9c.onrender.com/api/users/signup',
        values
      );
      toast(response.data.data[0].msg);
      localStorage.setItem("role", "evaluator")
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <Layout className="min-h-screen">
      <Content className="flex flex-col md:flex-row">
        <div className="hidden md:flex w-2/5 bg-blue-50 p-12 flex-col justify-between">
          <div>
            <Title level={1} className="text-gray-800">
              We are Bitroot
              <br />
              We design zero to one platform.
            </Title>
          </div>
          <div className="mt-auto">
            <img src="logo.svg" alt="Bitroot" className="h-8" />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-12 flex items-center justify-center bg-gray-100 min-h-screen md:min-h-0">
          <Card className="w-full max-w-2xl shadow-lg">
            <Title level={3} className="text-center mb-8 p-5">Sign-Up As Evaluator</Title>
            <Form form={form} name="signup" onFinish={onFinish} layout="vertical" size="large">
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />} 
                  placeholder="Name" 
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email address!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="text-gray-400" />} 
                  placeholder="Email" 
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters long!' },
                  { pattern: /\d/, message: 'Password must contain at least one number!' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined className="text-gray-400" />} 
                  placeholder="Password" 
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item
                name="agreeTerms"
                valuePropName="checked"
                rules={[
                  { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree to the terms and conditions') },
                ]}
              >
                <Checkbox className="mb-2">
                  I Agree to the{' '}
                  <Link to="/TnC" className="text-blue-500 inline-flex items-center">
                    Terms and Conditions
                    {/* <ArrowRightOutlined className="ml-1" /> */}
                  </Link>
                  {' and '}
                  <Link to="/Pp" className="text-blue-500 inline-flex items-center">
                    Privacy Policy
                    {/* <ArrowRightOutlined className="ml-1" /> */}
                  </Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <Paragraph className="text-center mt-4 text-base">
              Already have an account?{' '}
              <Link to="/role" className="text-blue-600 hover:underline ml-2 font-medium">
                Login Here
              </Link>
            </Paragraph>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default SignUp;