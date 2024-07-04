import React, { useState } from 'react';

const ProjectItem = ({ project, onView, onComplete, onAccept, onDeny, isAssigned }) => (
  <div className="bg-blue-100 p-4 rounded-lg mb-2">
    <div className="flex justify-between items-center">
      <span className="text-gray-800">
        Evaluator A you have applied for {project.title}.
        {project.isAnonymous && (
          <span className="ml-2 bg-yellow-300 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
            Anonymous
          </span>
        )}
      </span>
      <div className="space-x-2">
        <button
          onClick={() => onView(project.id)}
          className="px-3 py-1 bg-white text-blue-500 rounded border border-blue-500 hover:bg-blue-100"
        >
          View
        </button>
        {isAssigned ? (
          <>
            <button
              onClick={() => onAccept(project.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Accept
            </button>
            <button
              onClick={() => onDeny(project.id)}
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Deny
            </button>
          </>
        ) : (
          <button
            onClick={() => onComplete(project.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  </div>
);

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState('IN PROGRESS');

  const handleView = (id) => console.log(`Viewing project ${id}`);
  const handleComplete = (id) => console.log(`Completing project ${id}`);
  const handleAccept = (id) => console.log(`Accepting project ${id}`);
  const handleDeny = (id) => console.log(`Denying project ${id}`);

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'IN PROGRESS'
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100 text-blue-500'
          }`}
          onClick={() => setActiveTab('IN PROGRESS')}
        >
          IN PROGRESS
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'ASSIGNED'
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100 text-blue-500'
          }`}
          onClick={() => setActiveTab('ASSIGNED')}
        >
          ASSIGNED
        </button>
      </div>
      <div>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onView={handleView}
            onComplete={handleComplete}
            onAccept={handleAccept}
            onDeny={handleDeny}
            isAssigned={activeTab === 'ASSIGNED'}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;