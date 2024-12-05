import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import Popup from './Popup';
import FetchAPI from '../Utils/FetchAPI'
import { useUser } from '../Utils/UserContext';
import { claim } from '../../types';


interface JsonData {
  response: claim[]; // Array of Data
}

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [jsonData, setJsonData] = useState<JsonData | null>(null); // Initialize state to store fetched data
  const [selectedRow, setSelectedRow] = useState<claim | null>(null);
  const {coordinatorView} = useUser();

  const togglePopup = (rowData: claim | null = null) => {
    setSelectedRow(rowData);
    setIsOpen(!isOpen);
  };

  // Fetch data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchAPI<claim[]>('claims', coordinatorView ? 'coordinator' : 'mine');
      setJsonData(result); // Store fetched data in state
    };

    fetchData();
  }, [coordinatorView]);

  return (
    <div className='p-16'>
    <div className="bg-white px-16 rounded-lg  w-fit border mx-auto  shadow-[0_0_10px_rgba(0,0,0,0.3)] mb-4">
      {/* Only render DataTable if jsonData is not null */}
      {jsonData ? (
        <DataTable data={jsonData.response} togglePopup={togglePopup} />
      ) : (
        <div className="fixed inset-0 flex items-center  justify-center">
          <p>Loading data...</p>
                <div className="spinner-border animate-spin inline-block w-6 h-6 border-dashed border-4 border-blue-500 rounded-full" role="status">
                 
                </div>
              </div>
      )}

      {isOpen && selectedRow && (
        <Popup onClose={() => togglePopup(null)} selectedRow={selectedRow} />
      )}
    </div>
    </div>
  );
};

export default Dashboard;
