import Instance from './Instance';
import axios, { AxiosResponse } from 'axios';
import sanitizeHtml from 'sanitize-html';

interface FetchAPIResponse<T> {
  response: T; 
}

const FetchAPI = async <T>( 
  modelo: string,
  endpointType: string | null = null,
  id: string | number | null = null,
  api: string = 'api'
): Promise<FetchAPIResponse<T> | null> => {
  try {
    // Construct the dynamic URL based on the parameters
    let url = `/${api}/${modelo}`;

    // Add the appropriate endpoint type or id
    if (endpointType) {
      url += `/${endpointType}`;
    }  
    if (id) {
      url += `/${id}`;
    }

    // Make the request to the dynamically constructed URL using axios
    const response: AxiosResponse<FetchAPIResponse<T>> = await Instance.get(url, {
      withCredentials: true, // Include session cookie for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Data fetched successfully:', response.data);

    const sanitizedData = JSON.parse(sanitizeHtml(JSON.stringify(response.data)));
    return sanitizedData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 403) {
          // Handle unauthorized access, maybe redirect to login
          console.error('Unauthorized access');
        } else {
          console.error('Error:', error.response.status, error.response.data);
        }
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
      }
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up request:', (error as Error).message);
    }

    
    return null;
  }
};

export default FetchAPI;
