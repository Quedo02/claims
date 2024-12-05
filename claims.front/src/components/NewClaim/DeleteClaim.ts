import Instance from "../Utils/Instance";
import { ClaimForm } from "../../types";


interface Response {
    success: boolean;
    errorMessage?: string; // Only present on failure
  }
  


const DeleteCalaim = async (body:ClaimForm): Promise<Response> => {
    try {
      const response = await Instance.delete(
        '/api/claim/'
      );
      const data = response.data;
      console.log(data);
  
      if (data.code === 201) {
        
        return { success: true};
      } else {
        return { success: false, errorMessage: data.response };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, errorMessage: 'An error occurred'};
    }
  };
  

export default DeleteCalaim;


