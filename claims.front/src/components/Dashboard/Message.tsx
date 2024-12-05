import React from 'react';

interface MessageProps {
  name: string;
  coordinator: boolean;
  result: string;
  status: string;
  message: string;
}

const Message: React.FC<MessageProps> = ({
  result,
  status,
  message,
  name,
  coordinator,
}) => {
  return (
    <div className="flex flex-col items-start max-w-sm mb-4">
      <div
        className={`${
          coordinator ? 'bg-blue-200' : 'bg-yellow-200'
        } rounded-t-lg px-4 py-2 w-full flex justify-between items-center`}
      >
        <div className="flex items-center">
          <span className="text-gray-800 font-semibold">{name}</span>
          <span className="text-gray-600 text-sm ml-2">{result}</span>
        </div>
        <span className="text-gray-600 text-sm">{status}</span>
      </div>
      <div className="bg-gray-100 rounded-b-lg px-4 py-3 w-full">
        <p className="text-gray-900">{message}</p>
      </div>
    </div>
  );
};

export default Message;
