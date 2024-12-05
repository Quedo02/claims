import React,{useState, useEffect} from "react";
import {member, claim}  from '../../types';
import FetchAPI from '../Utils/FetchAPI';
import CreateComment from './CreateComment';
import { useUser } from '../Utils/UserContext';
import UpdateClaim from "./UpdateClaim";

interface JsonData2 {
  response: member[]; // Array of Data
}

interface PopFormProps {
  data: claim[];
}
const PopForm: React.FC<PopFormProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [jsonData2, setJsonData2] = useState<JsonData2 | null>(null);
  const [affected, setAffected] = useState<string>('');
  const [comment, setComment] = useState('');
  const name = useUser().name;
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const fetchData = async () => {
      
        const result2 = await FetchAPI<member[]>('mapp','all');
        setJsonData2(result2);
      
    };
    fetchData();
  }, []);

  const handleCreateComment = async () => {
    const props = {
      managerComment: "%"+name+"%"+comment,
      affectedComment: "",
      idClaim: data[0].ID,
      tracing: "Initial tracing",
      result: "Under investigation",
      points: data[0].Points,
    };

    const response = await CreateComment(props);

    if (response.success) {
      console.log("Comment and tracing created successfully:", response.response);
    } else {
      console.error("Error creating comment or tracing:", response.response);
    }
  };

  const handleReasign = async ()=>{
    if(affected.length>0){
    const props= {
      id:data[0].ID,
      affected:affected,}
    const response = await UpdateClaim(props);
    if (response.success) {
      console.log("Reasigned successfully:", response.response);
    } else {
      console.error("Error reasigning:", response.response);
    }
    setIsOpen(false);
    }
  }
  return (
    <div className="flex items-center justify-center p-3">
        <div className="max-w-lg w-full">
        <textarea
          placeholder="Type your comment here..."
          className="max-w-lg w-full p-4 bg-gray-200 rounded-md resize-none h-24 focus:outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 justify-self-start"
      onClick={handleCreateComment}>
        Submit a comment
      </button>
      </div>
       
        <div className="flex flex-col ml-4 space-y-2">
          <button className="px-4 py-2 text-gray-700 bg-yellow-300 rounded-md hover:bg-yellow-500"
          onClick={()=>{setIsOpen(true)}}>
            Reassign
          </button>
          <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700">
            Reject
          </button>
          <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700">
            Accept
          </button>
        </div>
        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => {setIsOpen(false);
          setAffected('');
        }}>
          <div className="relative bg-white rounded inline-block mx-auto w-3/4 p-12"
          onClick={stopPropagation}>
        <button
        onClick={() => {setIsOpen(false);
          setAffected('');
        }}
        className="absolute top-0 right-0 mt-2 mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
        &times;
        </button>
        <div className="mb-4 flex items-center">
          <label htmlFor="affected" className="text-gray-700 text-sm font-bold mb-2">
            Team Member :
          </label>
          <select name="affected" id="affected"  className="border rounded-lg p-3 w-full" onChange={e=>setAffected( e.target.value)}>
            <option>Select Team Member</option>
            {jsonData2?.response.map((option) => (
            <option key={option.emp_name} value={option.emp_name}>
              {option.emp_name}
              </option>
          ))}
          </select>
        </div>
        <div className="flex justify-end">
<button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-300 self-end"
onClick={handleReasign}>
            Accept
          </button>
          </div>
</div>
        </div>
      )}
    </div>
  );
};

export default PopForm;
