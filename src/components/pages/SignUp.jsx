// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl">
//         <div className="w-1/2 p-8 bg-blue-200 flex flex-col items-center justify-center space-between">
//           <h2 className="text-2xl font-bold mb-4">We are Bitroot</h2>
//           <p className="text-lg">We design zero to hero platforms</p>
//           <div className="mt-8">
//             <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
//           </div>
//         </div>
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
//           <form>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//             />
//             <Link
//               to="/role"
//               type="submit"
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
//             >
//               Sign Up
//             </Link>
//           </form>
//           <div className="text-center mt-4">
//             <p>
//               Already have an account?{" "}
//               <Link to="/role" className="text-blue-500">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/signup",
        formData
      );
      

      // Handle success message or redirect if needed
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error message or display to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl">
        <div className="w-1/2 p-8 bg-blue-200 flex flex-col items-center justify-center space-between">
          <h2 className="text-2xl font-bold mb-4">We are Bitroot</h2>
          <p className="text-lg">We design zero to hero platforms</p>
          <div className="mt-8">
            <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/role" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
