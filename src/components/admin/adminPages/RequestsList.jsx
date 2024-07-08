
import React, { useState, useEffect } from "react";

const demoRequests = [
  {
    id: 1,
    name: "Evaluator A",
    linkedin: "https://linkedin.com/in/evaluatorA",
    experience: "5 years",
    price: "$5000",
    tags: ["Frontend Developer"],
    contact: "8454545454",
    role: "Frontend Developer",
    applicationDate: "2023-06-15T10:30:00Z",
    status: "Pending",
    skills: ["React", "JavaScript", "CSS"],
    additionalInfo: "3 years of experience in frontend development",
  },
  {
    id: 2,
    name: "Evaluator B",
    linkedin: "https://linkedin.com/in/evaluatorB",
    experience: "4 years",
    price: "$4000",
    tags: ["Backend Developer"],
    contact: "9454545454",
    role: "Backend Developer",
    applicationDate: "2023-06-14T14:45:00Z",
    status: "Under Review",
    skills: ["Node.js", "Express", "MongoDB"],
    additionalInfo: "Proficient in RESTful API design",
  },
  {
    id: 3,
    name: "Evaluator C",
    linkedin: "https://linkedin.com/in/evaluatorC",
    experience: "3 years",
    price: "$3000",
    tags: ["Flutter Developer"],
    contact: "7454545454",
    role: "Flutter Developer",
    applicationDate: "2023-06-13T09:15:00Z",
    status: "Pending",
    skills: ["Flutter", "Dart", "Mobile Development"],
    additionalInfo: "Experience with both iOS and Android development",
  }
  
];

const RequestItem = ({ request, onView }) => (
  <div className="bg-blue-50 p-5 rounded-lg shadow mb-4 ">
    <p className="text-sm text-gray-700 mb-2">
      {request.name} has applied for the project {request.name}
    </p>
    
    <div className="flex justify-between items-center">
      <button
        onClick={() => onView(request)}
        className="text-blue-500 font-medium text-sm hover:underline"
      >
        VIEW
      </button>
      <button className="text-gray-400 hover:text-gray-600">...</button>
    </div>
  </div>
);

const RequestsList = ({ onViewRequest }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setTimeout(() => {
      setRequests(demoRequests);
    }, 500);
  };

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Requests</h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {requests.map((request) => (
          <RequestItem
            key={request.id}
            request={request}
            onView={onViewRequest}
          />
        ))}
      </div>
    </div>
  );
};

export default RequestsList;
