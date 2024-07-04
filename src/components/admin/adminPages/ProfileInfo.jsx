// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";

// const ProfileInfo = () => {
//   const [profile, setProfile] = useState({
//     id: "",
//     name: "",
//     email: "",
//     linkedin_url: "",
//     yoe: "",
//     tags: [],
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [status, setStatus] = useState("");

//   const fetchProfileData = async () => {
//     try {
//       setStatus("Fetching profile...");
//       const response = await axiosInstance.post("users/completeProfile", {
//         is_fetch: 1,
//         evaluator_id: localStorage.getItem("user"),
//       });

//       if (response.data.success) {
//         console.log(response.data.data);
//         setProfile({
//           id: response.data.data.id,
//           name: response.data.data.name,
//           email: response.data.data.email,
//           linkedin_url: response.data.data.linkedin_url || "Not provided",
//           yoe: response.data.data.yoe || "Not provided",
//           tags: response.data.data.tags || [],
//         });
//         setStatus("Profile fetched successfully!");
//       } else {
//         setStatus("Failed to fetch profile data.");
//       }
//     } catch (error) {
//       setStatus("Error fetching profile. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const handleEditToggle = () => setIsEditing(!isEditing);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveChanges = async () => {
//     try {
//       setStatus("Saving changes...");
//       const response = await axiosInstance.post("users/completeProfile", {
//         ...profile,
//         evaluator_id: localStorage.getItem("user"),
//       });

//       if (response.data.success) {
//         setStatus("Profile updated successfully!");
//         setIsEditing(false);
//       } else {
//         setStatus("Failed to update profile.");
//       }
//     } catch (error) {
//       setStatus("Error updating profile. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   const renderField = (label, name, type = "text") => (
//     <div className="mb-6">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label}:
//       </label>
//       {isEditing ? (
//         <input
//           type={type}
//           name={name}
//           value={profile[name]}
//           onChange={handleInputChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//       ) : (
//         <p className="px-4 py-3 bg-gray-100 rounded-md break-words">
//           {profile[name]}
//         </p>
//       )}
//     </div>
//   );

//   const renderTags = (tags) => (
//     <div className="flex flex-wrap items-center">
//       {tags.map((tag, index) => (
//         <span
//           key={index}
//           className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
//         >
//           {tag}
//         </span>
//       ))}
//     </div>
//   );

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800">
//         Profile Information
//       </h2>

//       {renderField("Name", "name")}
//       {renderField("Email", "email", "email")}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           LinkedIn URL:
//         </label>
//         {isEditing ? (
//           <input
//             type="text"
//             name="linkedin_url"
//             value={profile.linkedin_url}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         ) : (
//           <a
//             href={profile.linkedin_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block px-4 py-3 bg-gray-100 rounded-md text-blue-600 hover:underline break-words"
//           >
//             {profile.linkedin_url}
//           </a>
//         )}
//       </div>
//       {renderField("Years of Experience", "yoe")}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Tags:
//         </label>
//         {isEditing ? (
//           <input
//             type="text"
//             name="tags"
//             value={profile.tags}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         ) : (
//           renderTags(profile.tags)
//         )}
//       </div>

//       <div className="mt-8 flex justify-end space-x-4">
//         {isEditing ? (
//           <>
//             <button
//               className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               onClick={handleEditToggle}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </button>
//           </>
//         ) : (
//           <button
//             className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             onClick={handleEditToggle}
//           >
//             Edit
//           </button>
//         )}
//       </div>

//       {status && (
//         <p className="mt-6 text-sm text-center font-medium text-gray-600 bg-gray-100 py-3 rounded-md">
//           {status}
//         </p>
//       )}
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
    tags: [],
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
        console.log(response.data.data);
        setProfile({
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          linkedin_url: response.data.data.linkedin_url || "Not provided",
          yoe: response.data.data.yoe || "Not provided",
          tags: response.data.data.tags || [],
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

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setStatus("Saving changes...");
      const response = await axiosInstance.post("users/completeProfile", {
        user_id: localStorage.getItem("user"),
        ...profile,
        yoe: parseInt(profile.yoe, 10),
        tags: JSON.stringify(profile.tags), // Convert tags array to JSON string
        is_fetch: 0,
      });

      const data = await response.data;

      if (data.success) {
        setStatus("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setStatus("Failed to update profile.");
        console.error("Form submission failed:", data.message);
      }
    } catch (error) {
      setStatus("Error updating profile. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  const renderField = (label, name, type = "text") => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}:
      </label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={profile[name]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <p className="px-4 py-3 bg-gray-100 rounded-md break-words">
          {profile[name]}
        </p>
      )}
    </div>
  );

  const renderTags = (tags) => (
    <div className="flex flex-wrap items-center">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Profile Information
      </h2>

      {renderField("Name", "name")}
      {renderField("Email", "email", "email")}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn URL:
        </label>
        {isEditing ? (
          <input
            type="text"
            name="linkedin_url"
            value={profile.linkedin_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 bg-gray-100 rounded-md text-blue-600 hover:underline break-words"
          >
            {profile.linkedin_url}
          </a>
        )}
      </div>
      {renderField("Years of Experience", "yoe")}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags:
        </label>
        {isEditing ? (
          <input
            type="text"
            name="tags"
            value={profile.tags.join(", ")} // Join tags array into a comma-separated string
            onChange={(e) => handleInputChange({
              target: {
                name: "tags",
                value: e.target.value.split(",").map(tag => tag.trim()) // Split input string back into an array
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          renderTags(profile.tags)
        )}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleEditToggle}
          >
            Edit
          </button>
        )}
      </div>

      {status && (
        <p className="mt-6 text-sm text-center font-medium text-gray-600 bg-gray-100 py-3 rounded-md">
          {status}
        </p>
      )}
    </div>
  );
};

export default ProfileInfo;
