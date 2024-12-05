import Instance from "../Utils/Instance";

interface Response {
  success: boolean;
  response: string;
}

interface UpdateCommentProps{
    id:number;
    affected:string;

}

const UpdateClaim = async(props: UpdateCommentProps): Promise<Response>=>{
   const {id, affected}= props;
   console.log(affected)
   try{
    const response = await Instance.put(`/api/claim/${id}`,{
       affected: affected,
    });
    console.log(response)
    const data = response.data;
    if (data.code === 201) {
        return { success: true, response: "Success" };
      } else {
        return { success: false, response: "Failed to update the claim." };
      }
   }
   catch (error) {
    console.error("Error:", error);
    return { success: false, response: "An error occurred" };
  }
};
export default UpdateClaim;