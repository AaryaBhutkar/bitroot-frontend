import React, { useState } from "react";
import EvaluatorDetails from "./EvaluatorDetails";
import Analytics from "./Analytics";
import CreateTaskForm from "./adminPages/CreateTaskForm";

const Request = ({ activePage }) => {
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [approvedEvaluators, setApprovedEvaluators] = useState([]);
  const [declinedEvaluators, setDeclinedEvaluators] = useState([]);

  const evaluators = [
    {
      id: 1,
      name: "Evaluator A",
      role: "Frontend Developer",
      linkedin: "https://linkedin.com/in/evaluatorA",
      experience: "5 years",
      price: "$5000",
      tags: ["Frontend Developer"],
      contact: "evaluatorA@example.com",
    },
    {
      id: 2,
      name: "Evaluator B",
      role: "Backend Developer",
      linkedin: "https://linkedin.com/in/evaluatorB",
      experience: "4 years",
      price: "$4500",
      tags: ["Backend Developer"],
      contact: "evaluatorB@example.com",
    },
    {
      id: 3,
      name: "Evaluator C",
      role: "Flutter Developer",
      linkedin: "https://linkedin.com/in/evaluatorC",
      experience: "3 years",
      price: "$4000",
      tags: ["Flutter Developer"],
      contact: "evaluatorC@example.com",
    },
  ];

  const handleViewClick = (id) => {
    const evaluator = evaluators.find((ev) => ev.id === id);
    setSelectedEvaluator(evaluator);
  };

  const handleBackClick = () => {
    setSelectedEvaluator(null);
  };

  const handleApprove = (id) => {
    const evaluator = evaluators.find((ev) => ev.id === id);
    setApprovedEvaluators([...approvedEvaluators, evaluator]);
    setSelectedEvaluator(null);
  };

  const handleDecline = (id) => {
    const evaluator = evaluators.find((ev) => ev.id === id);
    setDeclinedEvaluators([...declinedEvaluators, evaluator]);
    setSelectedEvaluator(null);
  };

  return (
    <div className=" p-8">
      {selectedEvaluator ? (
        <EvaluatorDetails
          evaluator={selectedEvaluator}
          onBack={handleBackClick}
        />
      ) : (
        <>
          {activePage === "createTask" && <CreateTaskForm />}
          {activePage === "requests" && (
            <div>
              {evaluators
                .filter(
                  (ev) =>
                    !approvedEvaluators.includes(ev) &&
                    !declinedEvaluators.includes(ev)
                )
                .map((evaluator) => (
                  <div
                    key={evaluator.id}
                    className="border p-4 mb-4 rounded bg-blue-200"
                  >
                    <p>
                      <strong>{evaluator.name}</strong> has applied for the role
                      of <strong>{evaluator.role}</strong>.
                    </p>
                    <button
                      onClick={() => handleViewClick(evaluator.id)}
                      className="text-blue-500"
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => handleApprove(evaluator.id)}
                      className="ml-4 bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(evaluator.id)}
                      className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Decline
                    </button>
                  </div>
                ))}
            </div>
          )}
          {activePage === "analytics" && <Analytics />}
        </>
      )}
    </div>
  );
};

export default Request;
