import React from 'react';
import { X, GitBranch, FileText, Tag, DollarSign } from 'lucide-react';

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {project.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold">Price Range:</span>
              <span className="ml-2">{project.lower_price} - {project.higher_price}</span>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Evaluator</h3>
              <p className="text-gray-600">{project.evaluator_name}</p>
            </div>
            
            {project.tags && (
              <div className="flex flex-wrap items-center">
                <Tag className="text-blue-500 mr-2" size={20} />
                {project.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {project.github_url && (
              <div className="flex items-center">
                <GitBranch className="text-gray-700 mr-2" size={20} />
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub Repository
                </a>
              </div>
            )}
            
            {project.guideline_url && (
              <div className="flex items-center">
                <FileText className="text-gray-700 mr-2" size={20} />
                <a href={project.guideline_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Project Guidelines
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;