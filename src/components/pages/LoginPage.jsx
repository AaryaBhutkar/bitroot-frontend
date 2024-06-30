// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [role, setRole] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state && location.state.role) {
//       setRole(location.state.role);
//       console.log("Role:", location.state.role);
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

//     // Mock API call
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/users/login",
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
//         // If login successful, redirect based on role

//         navigate(role === "admin" ? "/adminDashboard" : "/evaluatorDashboard");
//       } else {
//         // Handle login error
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left side */}
//       <div className="w-1/2 bg-blue-200 p-12 flex flex-col justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Need webdesign
//             <br />
//             for your business?
//             <br />
//             Design Spacee will
//             <br />
//             help you.
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
//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
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
import axiosInstance from "../utils/axiosInstance";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: formData.email,
          password: formData.password,
          is_admin: role === "admin" ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const token = response.data.token;
        const user = response.data.data.id;

        // Store token in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user",user);

        // Redirect based on role or default path
        navigate(role === "admin" ? "/adminDashboard" : "/evaluatorDashboard");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side */}
      <div className="w-1/2 bg-blue-200 p-12 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Need webdesign
            <br />
            for your business?
            <br />
            Design Spacee will
            <br />
            help you.
          </h1>
        </div>
        <div>
          <img src="logo.svg" alt="Bitroot" className="h-8" />
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Sign-in as {role}</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <Link to="/" className="text-blue-600 hover:underline ml-1">
              Signup Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
