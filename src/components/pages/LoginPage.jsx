import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { message, Form, Input, Button, Typography, Layout, Card } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.role) {
      setRole(location.state.role);
    }else{
      setRole(localStorage.getItem("role"));
    }
  }, [location.state]);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://bitroot-backend-nh9c.onrender.com/api/users/login",
        {
          email: values.email,
          password: values.password,
          is_admin: role === "admin" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const { token, data } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", data.id);
        localStorage.setItem("name", data.name);

        message.success(data.msg);

        if (data.is_profile_complete === 1) {
          navigate(role === "admin" ? "/adminDashboard" : "/evaluatorDashboard");
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      message.error("Invalid Credentials!");
      console.error("Login error:", error);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Content className="flex">
        <div className="w-2/5 bg-blue-50 p-12 flex flex-col justify-between">
          <div>
            <Title level={1} className="text-gray-800">
              We are Bitroot
              <br />
              We design zero to one platform.
            </Title>
          </div>
          <img src="logo.svg" alt="Bitroot" className="h-8" />
        </div>

        <div className="w-3/5 p-12 flex items-center justify-center bg-gray-100">
          <Card className="w-full max-w-2xl shadow-lg">
            <Title level={3} className="text-center mb-8 p-5">Sign-in as {role}</Title>
            <Form form={form} onFinish={handleLogin} layout="vertical" size="large">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg">
                  Login
                </Button>
              </Form.Item>
            </Form>
            <Paragraph className="text-center mt-4 text-base">
              Don't have an account?
              <Link to="/" className="text-blue-600 hover:underline ml-2 font-medium">
                Signup Here
              </Link>
            </Paragraph>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;