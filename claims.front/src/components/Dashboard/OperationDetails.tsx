import React, {useState} from 'react';
import { claim } from '../../types';
import image1 from '../../data/1.png';
import image2 from '../../data/2.png';
import {FaFile} from "react-icons/fa"

interface OperationDetailsProps {
  data: claim[];
}

const OperationDetails: React.FC<OperationDetailsProps> = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const columns = [
    { Header: 'Affected', accessor: 'Affected' },
    { Header: 'Date', accessor: 'Date' },
    { Header: 'Time', accessor: 'Time' },
    { Header: 'Status', accessor: 'Status' },
    { Header: 'Ticket', accessor: 'Ticket' },
    { Header: 'Topic', accessor: 'Topic' },
  ];
  const columns2 = [
    { Header: 'Description', accessor: 'Description' },
  {Header: 'Evidence', accessor:'Evidence', Cell: () => (
    <button
          onClick={() => {
            // Assuming each row has an image URL in the 'imageUrl' property
            const imageUrl = "../../data/1.PNG";
            setSelectedImage(image1);
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaFile />
        </button>
  ) }];

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="py-4 px-6 text-sm text-gray-900"
                >
                  {column.accessor === 'Date'
                    ? (row[column.accessor as keyof claim] as string).split(' ')[0]
                    : column.accessor === 'Time'
                    ? (row['Date'] as string).split(' ')[1]
                    : row[column.accessor as keyof claim]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns2.map((column) => (
              <th
                key={column.accessor}
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns2.map((column) => (
                <td
                  key={column.accessor}
                  className="py-4 px-6 text-sm text-gray-900"
                >
                  {column.Cell ? column.Cell() : row[column.accessor as keyof claim]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setSelectedImage(null)}>
          <div className="relative bg-white rounded inline-block mx-auto w-3/4 p-4">
        <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-0 right-0 mt-2 mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
        &times;
        </button>
        <img src={selectedImage} alt="Evidence" className="max-w-full h-auto" />
</div>

        </div>
      )}
    </div>
  );
};

export default OperationDetails;
