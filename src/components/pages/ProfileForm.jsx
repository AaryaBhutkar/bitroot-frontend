import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileForm = () => {
  const [tags, setTags] = useState([
    "Frontend Developer",
    "Backend Developer",
    "Flutter",
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="linkedin"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              LinkedIn:
            </label>
            <input
              type="text"
              id="linkedin"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="experience"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Years of Experience:
            </label>
            <input
              type="number"
              id="experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tags:
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gray-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Link to="/dashboard"
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
