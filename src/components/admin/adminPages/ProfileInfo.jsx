import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const ProfileInfo = () => {
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    linkedin_url: '',
    yoe: '',
    tags: ''
  });
  const [status, setStatus] = useState('');

  const fetchProfileData = async () => {
    try {
      setStatus('Fetching profile...');
      const response = await axiosInstance.post('users/completeProfile', {
        is_fetch: 1,
        evaluator_id: localStorage.getItem("user")
      });
      
      if (response.data.success) {
        setProfile({
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          linkedin_url: response.data.data.linkedin_url || 'Not provided',
          yoe: response.data.data.yoe || 'Not provided',
          tags: response.data.data.tags || 'Not provided'
        });
        setStatus('Profile fetched successfully!');
      } else {
        setStatus('Failed to fetch profile data.');
      }
    } catch (error) {
      setStatus('Error fetching profile. Please try again.');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700">ID:</label>
        <p className="p-2 border rounded">{profile.id}</p>
      </div>
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
        <p className="p-2 border rounded">{profile.linkedin_url}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Years of Experience:</label>
        <p className="p-2 border rounded">{profile.yoe}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tags:</label>
        <p className="p-2 border rounded">{profile.tags}</p>
      </div>
      {/* <button 
        onClick={fetchProfileData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Profile
      </button> */}
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ProfileInfo;