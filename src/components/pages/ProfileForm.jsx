import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    contact: "",
    linkedin_url: "",
    yoe: "",
    tags: [],
  });
  const [errors, setErrors] = useState({});
  const [availableTags, setAvailableTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axiosInstance.post('users/getTags', {});
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setAvailableTags(response.data.data);
      } else {
        console.error('Invalid tag data received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleTagChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !formData.tags.includes(selectedValue) && formData.tags.length < 6) {
      setFormData(prevData => ({
        ...prevData,
        tags: [...prevData.tags, selectedValue]
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.yoe === "" || isNaN(formData.yoe)) {
      newErrors.yoe = "Years of Experience is required and must be a number.";
      isValid = false;
    } else {
      const yoeValue = parseInt(formData.yoe, 10);
      if (yoeValue < 0 || yoeValue > 50) {
        newErrors.yoe = "Years of Experience must be between 0 and 50.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post("users/completeProfile", {
        user_id: localStorage.getItem("user"),
        contact: formData.contact,
        linkedin_url: formData.linkedin_url,
        yoe: parseInt(formData.yoe, 10),
        tags: formData.tags,
        is_fetch: 0,
      });

      const data = response.data;

      if (data.success) {
        navigate("/evaluatorDashboard");
      } else {
        console.error("Form submission failed:", data.msg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-700">
              Contact Number:
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange}
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="linkedin_url" className="block mb-2 text-sm font-medium text-gray-700">
              LinkedIn:
            </label>
            <input
              type="text"
              id="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="yoe" className="block mb-2 text-sm font-medium text-gray-700">
              Years of Experience:
            </label>
            <input
              type="number"
              id="yoe"
              value={formData.yoe}
              onChange={handleInputChange}
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.yoe && <p className="mt-1 text-sm text-red-600">{errors.yoe}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-700">
              Tags (Select up to 6):
            </label>
            <select
              id="tags"
              value=""
              onChange={handleTagChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a tag</option>
              {availableTags.map(tag => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected tags:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;