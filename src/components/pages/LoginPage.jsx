// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [role, setRole] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state && location.state.role) {
//       setRole(location.state.role);
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://bitroot-backend-nh9c.onrender.com/api/users/login",
//         {
//           email: formData.email,
//           password: formData.password,
//           is_admin: role === "admin" ? 1 : 0,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         const token = response.data.token;
//         const user = response.data.data.id;
//         const name = response.data.data.name;

//         // Store token in local storage
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", user);
//         localStorage.setItem("name", name);
//         toast(response.data.data.msg);
//         if (role === "admin") navigate("/adminDashboard");
//         const complete = response.data.data.is_profile_complete;
//         console.log("complete", complete);
//         if (complete && response.data.data.is_profile_complete === 1) {
//           // Redirect based on role
//           navigate(
//             role === "admin" ? "/adminDashboard" : "/evaluatorDashboard"
//           );
//         } else {
//           // Redirect to profile page
//           navigate("/profile");
//         }

//         // Redirect based on role or default path
//         // navigate(role === "admin" ? "/adminDashboard" : "/evaluatorDashboard");
//       } else {
//         // Handle login error
//       }
//     } catch (error) {
//       toast.error("Invalid Credentials !");
//       console.error("Login error:", error);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left side */}
//       <div className="w-1/2 bg-blue-200 p-12 flex flex-col justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             We are Bitroot
//             <br />
//             We design zero to one platform.
//             {/* <br />
//             Bitroot will
//             <br />
//             be your honey. */}
//           </h1>
//         </div>
//         <div>
//           <img src="logo.svg" alt="Bitroot" className="h-8" />
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="w-1/2 p-12 flex items-center justify-center">
//         <div className="w-full max-w-md">
//           <h2 className="text-2xl font-semibold mb-6">Sign-in as {role}</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-6 relative">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-2 top-8 cursor-pointer"
//               >
//                 {showPassword ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-gray-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-gray-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                     />
//                   </svg>
//                 )}
//               </span>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Login
//             </button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don't have an account?
//             <Link to="/" className="text-blue-600 hover:underline ml-1">
//               Signup Here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



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
  const navigate = useNavigate();

  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

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
            <Title level={2} className="text-gray-800">
              We are Bitroot
              <br />
              We design zero to one platform.
            </Title>
          </div>
          <img src="logo.svg" alt="Bitroot" className="h-8 " />
        </div>

        <div className="w-3/5 p-12 flex items-center justify-center bg-gray-100">
          <Card className="w-full max-w-2xl shadow-lg">
            <Title level={2} className="text-center mb-8 p-5">Sign-in as {role}</Title>
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