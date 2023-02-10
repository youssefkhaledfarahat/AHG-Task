import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/uploadcsv', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to upload file. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      <p>{message}</p>
    </form>
  );
};

export default UploadCSV;