import React, { useEffect, useState } from 'react';
import Message from './Message';
import { claim, tracing, comment, tracingclaim } from '../../types';

interface MessageLogProps {
  rowData: claim;
  tracingData: tracingclaim[];
}

interface MessageData {
  name: string;
  coordinator: boolean;
  result: string;
  status: string;
  message: string;
}
interface JsonData {
  response: MessageData[]; // Array of Data
}




const MessageLog: React.FC<MessageLogProps> = ({ rowData, tracingData }) => {
  //const [messages, setMessages] = useState<JsonData | null>(null);


  return (
    <div className='overflow-y-auto border border-gray-300 p-2 rounded'>
      {tracingData&& tracingData.map((message, index) => (
        <Message
          key={index}
          name={message.tracing}
          coordinator={message.manager_comment.length>0}
          result={message.result}
          status={message.tracing}
          message={message.manager_comment.length?message.manager_comment:message.affected_comment}
        />
      ))}
    </div>
  );
};

export default MessageLog;
