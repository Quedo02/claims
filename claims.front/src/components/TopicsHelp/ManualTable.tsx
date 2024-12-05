import React from 'react';

const manuals: string[] = [
  'How to add a Claim',
  'How to add a Topic',
  'How to assign a Claim',
  'How to update a Topic',
  'How to vote a Claim',
  'How to generate a Claim Report',
];

const ManualTable: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Manuals:</h1>
      <ul className="space-y-2">
        {manuals.map((manual: string, index: number) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
          >
            <span>{manual}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4h16M4 8h16M4 12h16M4 16h16M4 20h16"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualTable;

