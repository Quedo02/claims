import React, { FC, MouseEvent , useState} from 'react';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  success: boolean;
}

const PopUpClaim:  FC<ConfirmationModalProps> = ({ isOpen, onClose, onSubmit}) => {
  if (!isOpen) return null;
  const [state,setState] = useState("default")
  const handleSubmit = async () => {
    setState("loading");
    try {
      await onSubmit(); 
      setState("success");
    } catch (error) {
      // Handle error, maybe set an error state
      setState("error");
    }
  };

  // Prevent click events from propagating to the overlay
  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
 

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
        onClick={stopPropagation}
      >
                
       { (state==="default")&&(
        <div>
       
       <div className="flex justify-center mb-4">
          <FaQuestionCircle className="text-blue-500 text-6xl" />
        </div>

       
        <h2 className="text-xl font-semibold text-center mb-6">
          Are you sure you want to submit?
        </h2>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transitions"
          >
            Submit
          </button>
          </div>
          
        </div>
      )}

        {(state==="loading")&&(
          <div>
          <div className="flex justify-center mb-4">
           <div className="spinner-border animate-spin inline-block w-10 h-10 border-dashed border-4 border-blue-500 rounded-full" role="status">
          </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-6">
         Loading
        </h2>
        </div>
        )}

        {(state==="success")&&(
          <div>
          <div className="flex justify-center mb-4">
           <FaCheckCircle className="text-blue-500 text-6xl" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-6">
         Success
        </h2>
        <div className="flex justify-center space-x-4">
        <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            OK
          </button>
          </div>
        </div>
        )}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PopUpClaim;
