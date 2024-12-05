import Instance from "../Utils/Instance";
import { ClaimForm } from "../../types";


interface Response {
    success: boolean;
    response: string;
  }
  


const NewClaimAPI = async (body:ClaimForm): Promise<Response> => {
    try {
      const response = await Instance.post(
        '/api/claim',
        {
          affected: body.affected,
          title: body.id_topic,
          description: body.description,
          date: `${body.date} ${body.time}`, // Ensure date formatting
          status: 0,
          calification: 7,
          rootcause: body.id_topic,
          fit: 0,
          fia: 0,
          fim: 0,
          rel_ticket: body.rel_ticket,
          id_tracing: null,
          whosent: body.whosent,
          IDquestion: "test",
          comments_list: "test",
          comments_list_user: "test",
          id_topic: 1,
          //internal: body.internal,
        },
      );
      const data = response.data;
      console.log(body);
      console.log(data);
  
      if (data.code === 201) {
        
        return { success: true, response:data.response};
      } else {
        return { success: false, response: data.response };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, response: 'An error occurred'};
    }
  };
  

export default NewClaimAPI;


