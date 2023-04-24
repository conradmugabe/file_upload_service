import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useFile from './hooks/useFile';
import { uploadFile, cancelFileUpload } from './services/file.service';
import './App.css';

function App() {
  const [percentageUploaded, setPercentageUploaded] = useState(0);
  const { file, onChange, onClick, setFile, ref } = useFile();
  const uploadInProgress = file && percentageUploaded > 0;

  const fn = (file: File, key: string) => {
    alert(JSON.stringify({ key, name: file.name }, null, 2));
    setFile(undefined);
    setPercentageUploaded(0);
  };

  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const { loaded, total } = progressEvent;
        const percentageUploaded = Math.round((loaded / total) * 100);
        setPercentageUploaded(percentageUploaded);
      }
    },
  };

  return (
    <>
      <h1>File Upload Service</h1>
      <div className="card">
        <input className="d-none" type="file" ref={ref} onChange={onChange} />
        <button onClick={onClick}>Select File From Your Computer</button>
        <p>
          Selected File: <code>{file?.name}</code>
        </p>
        {file && (
          <button onClick={() => uploadFile(file, config, fn)}>
            Upload File
          </button>
        )}
      </div>
      <div>
        {uploadInProgress && (
          <p className="read-the-docs">Uploaded {percentageUploaded}%</p>
        )}
        {uploadInProgress && (
          <button onClick={() => cancelFileUpload()}>Cancel</button>
        )}
      </div>
    </>
  );
}

export default App;
