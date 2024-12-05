import { Switch } from '@headlessui/react';
import React, { useState, ChangeEvent, FormEvent, useEffect, useRef} from "react";
import FetchAPI from '../Utils/FetchAPI';
import NewClaimAPI from './NewClaimAPI';
import fileUpload from './fileUpload';
import { useUser } from '../Utils/UserContext';

import { topic, ClaimForm, member} from '../../types';
import DeleteCalaim from './DeleteClaim';
import PopUpClaim from './PopUpClaim';
interface JsonData {
  response: topic[]; // Array of Data
}

interface JsonData2 {
  response: member[]; // Array of Data
}

interface fileinput {
  fileList:FileList;
  claimId:string;
}




function NewClaim() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const whosent = useUser().name;
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [jsonData2, setJsonData2] = useState<JsonData2 | null>(null);
  const [fileList, setFileList] = useState<FileList>({} as FileList)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess]= useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);;
  useEffect(() => {
    const fetchData = async () => {
      
        const result = await FetchAPI<topic[]>('TopicList');
        setJsonData(result);
        const result2 = await FetchAPI<member[]>('mapp','all');
        setJsonData2(result2);
      
    };
    setClaimData((prev) => ({ ...prev, whosent: whosent }));
    fetchData();
  }, [whosent]);
  

  const [claimData, setClaimData] = useState<ClaimForm>({
    id_topic: '',
    affected: '',
    rel_ticket: '',
    date: '',
    time: '',
    description: '',
    internal: true,
    whosent: '',
  });
  
  const [enabled, setEnabled] = useState(false);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(e.target.files);
    }
  };

const handleReset=()=>{
  //e.preventDefault();
  setClaimData({
    id_topic: '',
    affected: '',
    rel_ticket: '',
    date: '',
    time: '',
    description: '',
    internal: true,
    whosent: '',
  });
    if (formRef.current) {
      formRef.current.reset();
    }
  };


  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClaimData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid =
    claimData.id_topic &&
    claimData.date &&
    claimData.time &&
    claimData.description &&
    fileList.length > 0;
    if(!isFormValid)
    {
      console.log("empty form")
      setErrorMessage("Fill all the missing required fields")
      return
    }
    else{
      setIsModalOpen(true);
    }
  };

  const handleComfirmation= async() =>{
        console.log("i am here")
      try {
        const response1 = await NewClaimAPI(claimData);
        console.log(response1);
      
        if (response1.success) {
          
          const input: fileinput = { fileList, claimId:response1.response };
          const response2 = await fileUpload(input);
          console.log(response2);
      
          if (response2.success) {
            setSuccess(true)
            handleReset()
          } else {
            
            console.error("File upload failed:", response2.errorMessage || "Unknown error");
          }
        } else {
          console.error("Claim creation failed:", response1.response || "Unknown error");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        //DeleteClaim(claimData)
      }
    };   

  return (
    <div className="max-w-4xl mx-auto p-8">
     
      <h1 className="text-5xl font-bold mb-4 text-center p-4">New Claim</h1>
      {errorMessage && (
          <div className="inline-flex justify-between border-l-4 border-red-400 text-red-700 px-4 py-3 my-2" role="alert">
            <span className="block sm:inline pl-2">{errorMessage}</span>
          </div>
        )}
      <form 
      onSubmit={handleSubmit}
      onReset={handleReset}
      ref ={formRef}
      className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded p-8 mb-4"
      >

      <p className="text-red-700 pb-2">* Required fields</p>
        <div className=' grid gap-4 grid-cols-2'>
        <div className="mb-4 flex items-center">
          <span className="text-red-700">*</span>
          <label htmlFor="id_topic" className="text-gray-700 text-sm font-bold mb-2 mr-4 text-nowrap">
            Claim Topic:
          </label>
          <select name="id_topic" id="id_topic" onChange={handleChange} value={claimData.id_topic} className="border rounded-lg p-3 w-full">
            <option value="">Select Topic</option>
            {jsonData?.response.map((option) => (
            <option key={option.id_topic} value={option.id_topic}>
              {option.topic}
            </option>
          ))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="affected" className="text-gray-700 text-sm font-bold mb-2">
            Team Member (OPTIONAL):
          </label>
          <select name="affected" id="affected" onChange={handleChange} value={claimData.affected} className="border rounded-lg p-3 w-full">
            <option>Select Team Member</option>
            {jsonData2?.response.map((option) => (
            <option key={option.emp_name} value={option.emp_name}>
              {option.emp_name}
              </option>
          ))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
        <span className="text-red-700">*</span>
          <label htmlFor="date" className="text-gray-700 text-sm font-bold mb-2">
            Date of the Claim:
          </label>
          <input type="date" name="date" id="date" onChange={handleChange} value={claimData.date} className="border rounded-lg p-3 w-full" multiple/>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="rel_ticket" className="text-gray-700 text-sm font-bold mb-2">
            Related Ticket (OPTIONAL):
          </label>
          <input type ="text"name="rel_ticket" id="rel_ticket" onChange={handleChange} value={claimData.rel_ticket} className="border rounded-lg p-3 w-full"/>
        </div>

        <div className="mb-4 flex items-center">
        <span className="text-red-700">*</span>
          <label htmlFor="time" className="text-gray-700 text-sm font-bold mb-2">
            Time of the Claim (CET):
          </label>
          <input type="time" name="time" id="time" onChange={handleChange} value={claimData.time} className="border rounded-lg p-3 w-full" />
        </div>

        <div className="mb-4 flex items-center">
          <span className="text-red-700">*</span>
          <label htmlFor="file" className="text-gray-700 text-sm font-bold mb-2 pr-2">
            Evidence:
          </label>
          <input type="file" name="file" id="file" className="border rounded-lg p-3 w-full"onChange={handleFiles} multiple 
          accept='image/*,.pdf,.doc,.docx' 
          />
        </div>

        <div className="flex flex-row justify-between toggle">
    
          <label htmlFor="internal" className="text-gray-700 text-sm font-bold mr-2">
        <span className="text-red-700">*</span>
            Internal or External?:
          </label>

          <Switch
            name="internal"
            id="internal"
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <span className="text-sm">{enabled ? 'Internal' : 'External'}</span>
        </div>

        <div className="mb-4 flex items-center col-span-2">
        <span className="text-red-700">*</span>  
          <label htmlFor="description" className="text-gray-700 text-sm font-bold mb-2 pr-2">
            Description:
          </label>
          <textarea name="description" id="description" onChange={handleChange} value={claimData.description} rows={4} className="border rounded-lg p-3 w-full"></textarea>
        </div>
        <div>
          <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-red-200"
          href="/home">
            Cancel
          </a>
        </div>

        <div className="flex justify-end space-x-4 col-span-1">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200" type="submit"
          //disabled={!claimData.topic.length || !claimData.date.length || !claimData.time.length || !claimData.description.length||!fileList.files.length}
          >
            Submit
          </button>
          <button type="reset" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reset
          </button>
        </div>
        <PopUpClaim 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleComfirmation}
        success={success}
        />
      </div>
      </form>
    </div>
  );
}

export default NewClaim;
