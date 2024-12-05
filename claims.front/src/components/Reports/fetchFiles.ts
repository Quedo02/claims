import axios from 'axios';

interface File {
  filename: string;
  path: string;
}

const fetchFiles = async (folderName: string): Promise<File[]> => {
  try {
    const response = await axios.get(`http://localhost:3600/api/files/${folderName}`);
    if (response.data.success) {
      return response.data.files as File[];
    } else {
      console.error(response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

export default fetchFiles;
export type { File };
