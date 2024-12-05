import Instance from "../Utils/Instance";

interface LoginResponse {
    success: boolean;
    rol?: string;          // Optional since it's only present on success
    name?: string;         // Optional since it's only present on success
    errorMessage?: string; // Only present on failure
  }
  
const LoginAPI = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await Instance.post(
        '/',
        { username, password },
      );
      const data = response.data;
      console.log(response);
      console.log(data);
  
      if (data.code === 200) {
        return { success: true, rol: data.response.rol, name: data.response.name };
      } else {
        return { success: false, errorMessage: data.response };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, errorMessage: 'An error occurred during login' };
    }
  };
  

export default LoginAPI;


