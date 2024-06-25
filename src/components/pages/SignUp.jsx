import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl">
        <div className="w-1/2 p-8 bg-blue-100 flex flex-col items-center justify-center space-between">
          <h2 className="text-2xl font-bold mb-4">We are Bitroot</h2>
          <p className="text-lg">We design zero to hero platforms</p>
          <div className="mt-8">
            <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <Link to="/login" type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
              Sign Up
            </Link>
          </form>
          <div className="text-center mt-4">
            <p>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent default form submission behavior

//     // Simulate successful signup (replace with real authentication logic)
//     const isAuthenticated = true; // Replace with your actual authentication check

//     if (isAuthenticated) {
//       // Redirect to Login page after successful signup (consider user experience)
//       window.location.href = "/signin"; // Optional: Replace with Link component for cleaner navigation
//     } else {
//       // Handle signup errors (optional)
//       console.error("Signup failed");
//     }
//   };

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl">
//         <div className="w-1/2 p-8 bg-blue-100 flex flex-col items-center justify-center space-between">
//           <h2 className="text-2xl font-bold mb-4">We are Bitroot</h2>
//           <p className="text-lg">We design zero to hero platforms</p>
//           <div className="mt-8">
//             <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
//           </div>
//         </div>
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//               onChange={handleChange}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               className="w-full p-2 mb-4 border border-gray-300 rounded-md"
//               onChange={handleChange}
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
//               onClick={() => {
//                 // Simulate successful signup (replace with real authentication logic)
//                 const isAuthenticated = true; // Replace with your actual authentication check

//                 if (isAuthenticated) {
//                   window.location.href = "/signin"; // Optional: Replace with Link component for cleaner navigation
//                 }
//               }}
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="text-center mt-4">
//             <Link to="/signin">Already have an account? Login</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
