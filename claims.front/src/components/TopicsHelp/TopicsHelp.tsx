import React, {  useEffect, useState } from 'react';
import FetchAPI from '../Utils/FetchAPI';
import TopicsTable from './TopicsTable';
import ManualTable from './ManualTable';
import { topic } from '../../types';

interface JsonData {
  response: topic[]; // Array of Data
}


const TopicsHelp: React.FC=()=>{
  const [jsonData, setJsonData] = useState<JsonData | null>(null); // Initialize state to store fetched data
  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchAPI<topic[]>('TopicList');
      setJsonData(result); // Store fetched data in state

    };

    fetchData();
  }, []);
    return(
        <div className="bg-white p-8 rounded-lg shadow-lg w-fill border max-w-6xl mx-auto ">

      <div className="columns-2">
      <div className='break-after-column'>
      {jsonData ? (
        <TopicsTable data={jsonData.response}  />
      ) : (
        <p>Loading data...</p>
      )}
      </div>
      <ManualTable/>
      </div>

    </div>
    );
};
export default TopicsHelp


