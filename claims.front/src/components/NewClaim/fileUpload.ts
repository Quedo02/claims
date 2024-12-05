import axios, { AxiosInstance } from 'axios';
const MB = 1024 * 1024;
const MAX_FILE_SIZE = 3 ;
const MAX_FILE_SIZE_MB = MB * MAX_FILE_SIZE;
const Instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3500', 
    // headers: {
    //     'Content-Type': 'multipart/i-data',
    // },
    //  withCredentials: true, FOR PRODUCTION
    //For production all this sction will be replaced by the instance component
});



interface Response {
    success: boolean;
    errorMessage?: string; // Only present on failure
  }
  
  interface fileinput {
    fileList:FileList;
    claimId:string;
  }

  const validFiles = ['image/png', 'image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
 

const fileUpload = async (body:fileinput): Promise<Response> => {
    try {
      console.log(body.fileList);
        const formData = new FormData();
        formData.append('id_claim',body.claimId)
        let totalSize = 0;
        for (let i = 0; i < body.fileList.length; i++) {
          if(validFiles.includes(body.fileList[i].type))
          {totalSize += body.fileList[i].size;
          if(totalSize <= MAX_FILE_SIZE_MB){
            formData.append('files[]', body.fileList[i]);
          }
          else{
            return {success:false, errorMessage:`Files exceed the maximum size of ${MAX_FILE_SIZE} MB`}
          }}
          else
          return{success:false, errorMessage:`Invalid file ${body.fileList[i].name}`}
          }

        console.log(formData)
        const response = await Instance.post('/api/uploadFiles', formData);
    
        const data = response.data;
        console.log(response);
        console.log(data);
      if (response.data.code === 201) {
        
        return { success: true};
      } else {
        return { success: false, errorMessage: data.response };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, errorMessage: 'An error occurred'};
    }
  };
  

export default fileUpload;


