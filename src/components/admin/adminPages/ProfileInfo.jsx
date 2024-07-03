// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from '../../utils/axiosInstance';

// const ProfileInfo = () => {
//   const [profile, setProfile] = useState({
//     id: '',
//     name: '',
//     email: '',
//     linkedin_url: '',
//     yoe: '',
//     tags: ''
//   });
//   const [status, setStatus] = useState('');

//   const fetchProfileData = async () => {
//     try {
//       setStatus('Fetching profile...');
//       const response = await axiosInstance.post('users/completeProfile', {
//         is_fetch: 1,
//         evaluator_id: localStorage.getItem("user")
//       });

//       if (response.data.success) {
//         setProfile({
//           id: response.data.data.id,
//           name: response.data.data.name,
//           email: response.data.data.email,
//           linkedin_url: response.data.data.linkedin_url || 'Not provided',
//           yoe: response.data.data.yoe || 'Not provided',
//           tags: response.data.data.tags || 'Not provided'
//         });
//         setStatus('Profile fetched successfully!');
//       } else {
//         setStatus('Failed to fetch profile data.');
//       }
//     } catch (error) {
//       setStatus('Error fetching profile. Please try again.');
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   return (
//     <div className="p-4 border rounded shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-4">Profile Information</h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">Name:</label>
//         <p className="p-2 border rounded">{profile.name}</p>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Email:</label>
//         <p className="p-2 border rounded">{profile.email}</p>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">LinkedIn URL:</label>
//         <p className="p-2 border rounded">{profile.linkedin_url}</p>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Years of Experience:</label>
//         <p className="p-2 border rounded">{profile.yoe}</p>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700">Tags:</label>
//         <p className="p-2 border rounded">{profile.tags}</p>
//       </div>
//       {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
//     </div>
//   );
// };

// export default ProfileInfo;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ProfileInfo = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    linkedin_url: "",
    yoe: "",
    tags: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");

  const fetchProfileData = async () => {
    try {
      setStatus("Fetching profile...");
      const response = await axiosInstance.post("users/completeProfile", {
        is_fetch: 1,
        evaluator_id: localStorage.getItem("user"),
      });

      if (response.data.success) {
        setProfile({
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          linkedin_url: response.data.data.linkedin_url || "Not provided",
          yoe: response.data.data.yoe || "Not provided",
          tags: response.data.data.tags || "Not provided",
        });
        setStatus("Profile fetched successfully!");
      } else {
        setStatus("Failed to fetch profile data.");
      }
    } catch (error) {
      setStatus("Error fetching profile. Please try again.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setStatus("Saving changes...");
      const response = await axiosInstance.post("users/updateProfile", {
        ...profile,
        evaluator_id: localStorage.getItem("user"),
      });

      if (response.data.success) {
        setStatus("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setStatus("Failed to update profile.");
      }
    } catch (error) {
      setStatus("Error updating profile. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">LinkedIn URL:</label>
            <input
              type="text"
              name="linkedin_url"
              value={profile.linkedin_url}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Years of Experience:</label>
            <input
              type="text"
              name="yoe"
              value={profile.yoe}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags:</label>
            <input
              type="text"
              name="tags"
              value={profile.tags}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <p className="p-2 border rounded">{profile.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <p className="p-2 border rounded">{profile.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">LinkedIn URL:</label>
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {profile.linkedin_url}
            </a>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Years of Experience:</label>
            <p className="p-2 border rounded">{profile.yoe}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags:</label>
            <p className="p-2 border rounded">{profile.tags}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleEditToggle}
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ProfileInfo;
