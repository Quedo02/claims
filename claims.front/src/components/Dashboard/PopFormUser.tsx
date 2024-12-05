import React, {useState} from "react";

const PopFormUser: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
  };
  return (
    <div className="flex items-center justify-center p-3">
        <div className="max-w-lg w-full">
        <textarea
          placeholder="Type your comment here..."
          className="max-w-lg w-full p-4 bg-gray-200 rounded-md resize-none h-24 focus:outline-none"
        />
        
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mx-3">
        Submit a comment
      </button>
      
        </div>

      <div className="flex flex-col ml-4 space-y-2 ">
        <button className="px-4 py-2 text-white bg-red-300 rounded-md hover:bg-red-400">
          Refute
      </button>
      <label className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Choose a file
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
        multiple 
        accept='image/*,.pdf,.doc,.docx' 
      />
      </label>
      </div>
    </div>
  );
};

export default PopFormUser;
