import React from "react";

const EvaluatorDetails = ({ evaluator, onBack }) => {
  // const evaluator = {
  //   name: "Evaluator A",
  //   linkedin: "https://linkedin.com/in/evaluatorA",
  //   experience: "5 years",
  //   price: "$5000",
  //   tags: ["Frontend Developer"],
  //   contact: "8454545454",
  // };
  return (
    <div className="flex-1 p-8">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
        Back
      </button>
      <h2 className="text-xl font-bold mb-4">Evaluator Details</h2>
      <div className="p-4 bg-white rounded shadow-md">
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">Name:</label>
          <p className="text-gray-900 border rounded p-2">{evaluator.name}</p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">LinkedIn:</label>
          <p>
            <a
              href={evaluator.linkedin}
              className="text-blue-500 hover:underline border rounded p-2 block"
            >
              {evaluator.linkedin}
            </a>
          </p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">
            Years of Experience:
          </label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.experience}
          </p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">
            Price Quotation:
          </label>
          <p className="text-gray-900 border rounded p-2">{evaluator.price}</p>
        </div>
        <div className="mb-4 border-b pb-4">
          <label className="block text-gray-700 font-semibold">Tags:</label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.tags.join(", ")}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">
            Contact Info:
          </label>
          <p className="text-gray-900 border rounded p-2">
            {evaluator.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorDetails;
