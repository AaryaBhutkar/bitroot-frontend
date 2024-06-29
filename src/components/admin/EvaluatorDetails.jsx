import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";

const EvaluatorDetails = ({ evaluatorId, onBack }) => {
  const [evaluator, setEvaluator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluatorDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:3001/api/users/completeProfile", {
        is_fetch: 1,
        evaluator_id:localStorage.getItem("user")
        });
        console.log("gbghjfgvdc",response);
        if (response.data.success) {
          setEvaluator(response.data.data);
        } else {
          setError("Failed to fetch evaluator details");
        }
      } catch (error) {
        setError("An error occurred while fetching evaluator details");
        console.error("Error fetching evaluator details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluatorDetails();
  }, [evaluatorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!evaluator) return null;

  return (
    <div className="flex-1 p-8">
      <button
        onClick={onBack}
        className="mb-4 text-white-500 hover:underline border rounded p-2 bg-blue-300"
      >
        <ArrowLeftOutlined />
        Back
      </button>
      <h2 className="text-xl font-bold mb-4">Evaluator Details</h2>
      <div className="p-4 bg-white rounded shadow-md">
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">Name:</label>
          <p className="text-gray-900 border rounded p-2">{evaluator.name}</p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">Email:</label>
          <p className="text-gray-900 border rounded p-2">{evaluator.email}</p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">LinkedIn:</label>
          <p>
            <a
              href={evaluator.linkedin_url}
              className="text-blue-500 hover:underline border rounded p-2 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {evaluator.linkedin_url}
            </a>
          </p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">
            Years of Experience:
          </label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.yoe}
          </p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">
            Price Range:
          </label>
          <p className="text-gray-900 border rounded p-2">
            ${evaluator.lower_price} - ${evaluator.higher_price}
          </p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">Tags:</label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.tags}
          </p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">
            Contact Info:
          </label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.contact}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">
            Task Name:
          </label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.task_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorDetails;