// import React, { useState } from 'react';
// import EvaluatorDetails from './EvaluatorDetails';

// const Request = ({ activePage }) => {
//   const [selectedEvaluator, setSelectedEvaluator] = useState(null);
//   const [approvedEvaluators, setApprovedEvaluators] = useState([]);
//   const [declinedEvaluators, setDeclinedEvaluators] = useState([]);

//   const evaluators = [
//     { id: 1, name: 'Evaluator A', role: 'Frontend Developer', linkedin: 'https://linkedin.com/in/evaluatorA', experience: '5 years', price: '$5000', tags: ['Frontend Developer'], contact: 'evaluatorA@example.com' },
//     { id: 2, name: 'Evaluator B', role: 'Backend Developer', linkedin: 'https://linkedin.com/in/evaluatorB', experience: '4 years', price: '$4500', tags: ['Backend Developer'], contact: 'evaluatorB@example.com' },
//     { id: 3, name: 'Evaluator C', role: 'Flutter Developer', linkedin: 'https://linkedin.com/in/evaluatorC', experience: '3 years', price: '$4000', tags: ['Flutter Developer'], contact: 'evaluatorC@example.com' },
//     { id: 4, name: 'Evaluator D', role: 'Frontend Developer', linkedin: 'https://linkedin.com/in/evaluatorD', experience: '6 years', price: '$5500', tags: ['Frontend Developer'], contact: 'evaluatorD@example.com' },
//   ];

//   const handleViewClick = (id) => {
//     const evaluator = evaluators.find(ev => ev.id === id);
//     setSelectedEvaluator(evaluator);
//   };

//   const handleBackClick = () => {
//     setSelectedEvaluator(null);
//   };

//   const handleApprove = (id) => {
//     const evaluator = evaluators.find(ev => ev.id === id);
//     setApprovedEvaluators([...approvedEvaluators, evaluator]);
//     setSelectedEvaluator(null);
//   };

//   const handleDecline = (id) => {
//     const evaluator = evaluators.find(ev => ev.id === id);
//     setDeclinedEvaluators([...declinedEvaluators, evaluator]);
//     setSelectedEvaluator(null);
//   };

//   return (
//     <div className="flex-1 p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-xl font-bold">HELLO, ADMIN</h2>
//         <input
//           type="text"
//           placeholder="Search"
//           className="border p-2 rounded w-1/3"
//         />
//       </div>
//       {selectedEvaluator ? (
//         <EvaluatorDetails evaluator={selectedEvaluator} onBack={handleBackClick} />
//       ) : (
//         <>
//           {activePage === 'createTask' && (
//             <div>
//               <form>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Project Name:</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="Enter project name"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Brief:</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="Placeholder"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Tags:</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="Placeholder"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Git Links:</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="Placeholder"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Guidelines:</label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="Placeholder"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700">Price Range:</label>
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       className="w-1/2 p-2 border rounded mr-2"
//                       placeholder="Placeholder"
//                     />
//                     <span className="mx-2">TO</span>
//                     <input
//                       type="text"
//                       className="w-1/2 p-2 border rounded"
//                       placeholder="Placeholder"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           )}
//           {activePage === 'requests' && (
//             <div>
//               {evaluators.filter(ev => !approvedEvaluators.includes(ev) && !declinedEvaluators.includes(ev)).map(evaluator => (
//                 <div key={evaluator.id} className="border p-4 mb-4 rounded bg-blue-100">
//                   <p>
//                     <strong>{evaluator.name}</strong> has applied for the role of <strong>{evaluator.role}</strong>.
//                   </p>
//                   <button
//                     onClick={() => handleViewClick(evaluator.id)}
//                     className="text-blue-500"
//                   >
//                     VIEW
//                   </button>
//                   <button
//                     onClick={() => handleApprove(evaluator.id)}
//                     className="ml-4 bg-green-500 text-white px-2 py-1 rounded"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleDecline(evaluator.id)}
//                     className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Decline
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//           {activePage === 'approved' && (
//             <div>
//               {approvedEvaluators.map(evaluator => (
//                 <div key={evaluator.id} className="border p-4 mb-4 rounded bg-green-100">
//                   <p>
//                     <strong>{evaluator.name}</strong> has been approved for the role of <strong>{evaluator.role}</strong>.
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//           {activePage === 'analytics' && <div>Analytics Page Content</div>}
//         </>
//       )}
//     </div>
//   );
// };

// export default Request;


import React, { useState } from 'react';
import EvaluatorDetails from './EvaluatorDetails';
import Analytics from './Analytics';

const Request = ({ activePage }) => {
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [approvedEvaluators, setApprovedEvaluators] = useState([]);
  const [declinedEvaluators, setDeclinedEvaluators] = useState([]);

  const evaluators = [
    { id: 1, name: 'Evaluator A', role: 'Frontend Developer', linkedin: 'https://linkedin.com/in/evaluatorA', experience: '5 years', price: '$5000', tags: ['Frontend Developer'], contact: 'evaluatorA@example.com' },
    { id: 2, name: 'Evaluator B', role: 'Backend Developer', linkedin: 'https://linkedin.com/in/evaluatorB', experience: '4 years', price: '$4500', tags: ['Backend Developer'], contact: 'evaluatorB@example.com' },
    { id: 3, name: 'Evaluator C', role: 'Flutter Developer', linkedin: 'https://linkedin.com/in/evaluatorC', experience: '3 years', price: '$4000', tags: ['Flutter Developer'], contact: 'evaluatorC@example.com' },
    { id: 4, name: 'Evaluator D', role: 'Frontend Developer', linkedin: 'https://linkedin.com/in/evaluatorD', experience: '6 years', price: '$5500', tags: ['Frontend Developer'], contact: 'evaluatorD@example.com' },
  ];

  const handleViewClick = (id) => {
    const evaluator = evaluators.find(ev => ev.id === id);
    setSelectedEvaluator(evaluator);
  };

  const handleBackClick = () => {
    setSelectedEvaluator(null);
  };

  const handleApprove = (id) => {
    const evaluator = evaluators.find(ev => ev.id === id);
    setApprovedEvaluators([...approvedEvaluators, evaluator]);
    setSelectedEvaluator(null);
  };

  const handleDecline = (id) => {
    const evaluator = evaluators.find(ev => ev.id === id);
    setDeclinedEvaluators([...declinedEvaluators, evaluator]);
    setSelectedEvaluator(null);
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">HELLO, ADMIN</h2>
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded w-1/3"
        />
      </div>
      {selectedEvaluator ? (
        <EvaluatorDetails evaluator={selectedEvaluator} onBack={handleBackClick} />
      ) : (
        <>
          {activePage === 'createTask' && (
            <div>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Project Name:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Enter project name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Brief:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Placeholder"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Tags:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Placeholder"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Git Links:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Placeholder"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Guidelines:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Placeholder"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price Range:</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="w-1/2 p-2 border rounded mr-2"
                      placeholder="Placeholder"
                    />
                    <span className="mx-2">TO</span>
                    <input
                      type="text"
                      className="w-1/2 p-2 border rounded"
                      placeholder="Placeholder"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {activePage === 'requests' && (
            <div>
              {evaluators.filter(ev => !approvedEvaluators.includes(ev) && !declinedEvaluators.includes(ev)).map(evaluator => (
                <div key={evaluator.id} className="border p-4 mb-4 rounded bg-blue-100">
                  <p>
                    <strong>{evaluator.name}</strong> has applied for the role of <strong>{evaluator.role}</strong>.
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
          {activePage === 'approved' && (
            <div>
              {approvedEvaluators.map(evaluator => (
                <div key={evaluator.id} className="border p-4 mb-4 rounded bg-green-100">
                  <p>
                    <strong>{evaluator.name}</strong> has been approved for the role of <strong>{evaluator.role}</strong>.
                  </p>
                </div>
              ))}
            </div>
          )}
          {activePage === 'analytics' && <Analytics />}
        </>
      )}
    </div>
  );
};

export default Request;

