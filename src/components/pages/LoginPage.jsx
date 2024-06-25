import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side */}
      <div className="w-1/2 bg-blue-50 p-12 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Need webdesign<br />
            for your business?<br />
            Design Spacee will<br />
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
          <h2 className="text-2xl font-semibold mb-6">Sign-in</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Link to="/role"
              type="submit"
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </Link>
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
