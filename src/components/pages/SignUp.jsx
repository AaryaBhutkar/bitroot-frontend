import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d).{6,}$/;
    return re.test(String(password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    let formIsValid = true;
    let newErrors = {};

    if (!name) {
      formIsValid = false;
      newErrors.name = "Name is required";
    }
    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      formIsValid = false;
      newErrors.email =
        "Invalid email format. Please use a valid Gmail address.";
    }
    if (!password) {
      formIsValid = false;
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      formIsValid = false;
      newErrors.password =
        "Password must be at least 6 characters long and contain a number";
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://bitroot-backend-nh9c.onrender.com/api/users/signup",
        formData
      );
      toast(response.data.data[0].msg);
      console.log("Success:", response.data);
      // Redirect to "/role" on successful signup
      navigate("/role");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl">
        <div className="w-1/2 p-8 bg-blue-200 flex flex-col items-center justify-center space-between">
          <h2 className="text-2xl font-bold mb-4">We are Bitroot</h2>
          <p className="text-lg">We design zero to one platforms</p>
          <div className="mt-8">
            <img src="logo.svg" alt="Bitroot Logo" className="w-24" />
          </div>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Sign-Up As Evaluator</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 mb-1 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 mb-4">{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder="Gmail"
              className="w-full p-2 mb-1 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 mb-4">{errors.email}</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-2 mb-1 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 mb-4">{errors.password}</p>
            )}
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
