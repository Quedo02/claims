import React, {useEffect,useState} from 'react';
import OperationDetails from './OperationDetails';
import MessageLog from './MessageLog';
import FetchAPI from '../Utils/FetchAPI';
import { claim, tracingclaim} from '../../types';
import PopForm from './PopForm';
import { useUser } from '../Utils/UserContext';
import PopFormUser from './PopFormUser';

interface PopupProps {
  onClose: () => void;
  selectedRow: claim;
}

interface JsonData {
  response: tracingclaim[]; // Array of Data
}

const Popup: React.FC<PopupProps> = ({onClose, selectedRow }) => {
  const {coordinatorView} =useUser();


  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchAPI<tracingclaim[]>('tracing', 'tracingclaim', selectedRow.ID);
      setJsonData(result); // Store fetched data in state
    };

    fetchData();
  }, []);

  return (
    <div
  className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
  onClick={onClose}
>
  <div
    className="relative mx-auto p-5 border w-4/5 max-h-screen shadow-lg rounded-md bg-white flex flex-col"
    onClick={stopPropagation}
  >
    <button
      onClick={onClose}
      className="absolute top-0 right-0 mt-2 mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
    >
      X
    </button>
    <div className="flex-1 flex flex-col justify-between overflow-hidden">
      <OperationDetails data={[selectedRow]} />
      <MessageLog
        rowData={selectedRow}
        tracingData={jsonData?.response || []}
      />
    </div>
    {coordinatorView?
    (
      <PopForm data={[selectedRow]}/>
    ):
    (
      <PopFormUser />
    )
    }
  </div>
</div>
  
  );
};

export default Popup;
