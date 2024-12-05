import React, { useEffect, useState } from 'react';
import fetchFiles, { File } from './fetchFiles';

interface ImageGalleryProps {
  folderName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ folderName }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedFiles = await fetchFiles(folderName);
        setFiles(fetchedFiles);
      } catch (err) {
        setError('Failed to load files.');
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [folderName]);

  if (loading) {
    return <p>Loading files...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (files.length === 0) {
    return <p>No files found in the folder "{folderName}".</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {files.map((file) => (
        <div key={file.filename} style={{ textAlign: 'center' }}>
          <img
            src={`http://localhost:3600/${file.path}`}
            alt={file.filename}
            style={{ width: '150px', height: 'auto', objectFit: 'cover' }}
          />
          <p>{file.filename}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;

