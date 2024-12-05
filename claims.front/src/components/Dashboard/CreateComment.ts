import Instance from "../Utils/Instance";

interface Response {
  success: boolean;
  response: string;
}

interface CreateCommentProps {
    managerComment: string; 
    affectedComment: string; 
    idClaim: number; 
  }

const CreateComment = async (props: CreateCommentProps): Promise<Response> => {
    const { managerComment, affectedComment, idClaim} = props;
  try {
   
    const response2 = await Instance.post("/api/comments", {
        manager_comment: managerComment,
        affected_comment: affectedComment,
    });

    const data2 = response2.data;
    console.log("Comment Response:", data2);
    console.log(data2.code)
    if (data2.code === 201) {
      
      const id_comment = data2.response;

     
      const response = await Instance.post('/api/tracing', {
        id_claim: idClaim,
        id_comment: id_comment, 
        tracing: "initial tracing",
        result: "Under investigation",
        points: 5,
      });

      const data = response.data;
      console.log("Tracing Response:", data);

      if (data.code === 201) {
        return { success: true, response: data.response };
      } else {
        return { success: false, response: data.response };
      }
    } else {
      return { success: false, response: "Failed to create comment" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, response: "An error occurred" };
  }
};

export default CreateComment;
