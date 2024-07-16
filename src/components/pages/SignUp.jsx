// import React from 'react';
// import { Form, Input, Button, Card, Typography, Layout, Checkbox } from 'antd';
// import { UserOutlined, MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const { Content } = Layout;
// const { Title, Text } = Typography;

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.post(
//         'https://bitroot-backend-nh9c.onrender.com/api/users/signup',
//         values
//       );
//       toast(response.data.data[0].msg);
//       navigate('/role');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Signup failed. Please try again.');
//     }
//   };

//   return (
//     <Layout className="min-h-screen bg-gray-100">
//       <Content className="flex items-center justify-center">
//         <Card className="w-3/4 max-w-4xl">
//           <div className="flex">
//             <div className="w-1/2 p-8 bg-blue-50 flex flex-col items-center justify-center">
//               <Title level={2}>We are Bitroot</Title>
//               <Text className="text-lg mb-8">We design zero to one platforms</Text>
//               <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
//             </div>
//             <div className="w-1/2 p-8">
//               <Title level={3}>Sign-Up As Evaluator</Title>
//               <Form form={form} name="signup" onFinish={onFinish} layout="vertical" size="large">
//                 <Form.Item
//                   name="name"
//                   rules={[{ required: true, message: 'Please input your name!' }]}
//                 >
//                   <Input 
//                     prefix={<UserOutlined className="text-gray-400" />} 
//                     placeholder="Name" 
//                     className="h-12 text-lg"
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   name="email"
//                   rules={[
//                     { required: true, message: 'Please input your email!' },
//                     { type: 'email', message: 'Please enter a valid email address!' }
//                   ]}
//                 >
//                   <Input 
//                     prefix={<MailOutlined className="text-gray-400" />} 
//                     placeholder="Email" 
//                     className="h-12 text-lg"
//                   />
//                 </Form.Item>
//                 <Form.Item
//                   name="password"
//                   rules={[
//                     { required: true, message: 'Please input your password!' },
//                     { min: 6, message: 'Password must be at least 6 characters long!' },
//                     { pattern: /\d/, message: 'Password must contain at least one number!' }
//                   ]}
//                 >
//                   <Input.Password 
//                     prefix={<LockOutlined className="text-gray-400" />} 
//                     placeholder="Password" 
//                     className="h-12 text-lg"
//                   />
//                 </Form.Item>
//                 <Form.Item
//                 name="agreeTerms"
//                 valuePropName="checked"
//                 rules={[
//                   { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree to the terms and conditions') },
//                 ]}
//               >
//                 <div className="flex items-center">
//                   <Checkbox className="mb-5 mr-2" />
//                   <span className="text-sm">
//                     I Agree to the{' '}
//                     <Link to="/TnC" className="text-blue-500 inline-flex items-center">
//                       Terms and Conditions, Privacy Policy
//                       <ArrowRightOutlined className="ml-1" />
//                     </Link>
//                   </span>
//                 </div>
//               </Form.Item>

//                 <Form.Item>
//                   <Button type="primary" htmlType="submit" className="w-full h-12 text-lg">
//                     Sign Up
//                   </Button>
//                 </Form.Item>
//               </Form>
//               <div className="text-center mt-4">
//                 <Text>
//                   Already have an account?{' '}
//                   <Link to="/role" className="text-blue-500">
//                     Login
//                   </Link>
//                 </Text>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </Content>
//     </Layout>
//   );
// };

// export default SignUp;


import React from 'react';
import { Form, Input, Button, Card, Typography, Layout, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Content } = Layout;
const { Title, Text } = Typography;

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
    <Layout className="min-h-screen bg-gray-100">
      <Content className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md md:max-w-4xl">
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:flex md:w-1/2 p-8 bg-blue-50 flex-col items-center justify-center">
              <Title level={2}>We are Bitroot</Title>
              <Text className="text-lg mb-8">We design zero to one platforms</Text>
              <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <Title level={3}>Sign-Up As Evaluator</Title>
              <Form form={form} name="signup" onFinish={onFinish} layout="vertical" size="large">
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="Name" 
                    className="h-12 text-lg"
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
                    className="h-12 text-lg"
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
                    className="h-12 text-lg"
                  />
                </Form.Item>
                <Form.Item
                  name="agreeTerms"
                  valuePropName="checked"
                  rules={[
                    { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree to the terms and conditions') },
                  ]}
                >
                  <div className="flex items-center">
                    <Checkbox className="mb-5 mr-2" />
                    <span className="text-sm">
                      I Agree to the{' '}
                      <Link to="/TnC" className="text-blue-500 inline-flex items-center">
                        Terms and Conditions
                        <ArrowRightOutlined className="ml-1" />
                      </Link>
                      <Link to="/Pp" className="text-blue-500 inline-flex items-center">
                        Privacy Policy
                        <ArrowRightOutlined className="ml-1" />
                      </Link>
                    </span>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full h-12 text-lg">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
              <div className="text-center mt-4">
                <Text>
                  Already have an account?{' '}
                  <Link to="/role" className="text-blue-500">
                    Login
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default SignUp;