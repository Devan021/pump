
import React, { useState } from 'react';
import axios from 'axios';
import './global.css';

const UploadFilePage = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ name: '', description: '', customField: '' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prevMetadata => ({
      ...prevMetadata,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify(metadata));
    formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${process.env.JWT_TOKEN}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={metadata.name} onChange={handleMetadataChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={metadata.description} onChange={handleMetadataChange} />
        </div>
        <div>
          <label htmlFor="customField">Custom Field:</label>
          <input type="text" id="customField" name="customField" value={metadata.customField} onChange={handleMetadataChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadFilePage;
