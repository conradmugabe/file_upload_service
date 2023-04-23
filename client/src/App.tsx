import { AxiosRequestConfig } from 'axios';

import './App.css';
import useFile from './hooks/useFile';
import apiClientService from './services/api.service';
import HttpService from './services/http.service';
import { useState } from 'react';

type UploadFileCallback = (file: File, key: string) => void;

type UploadFileResponse = { signedUrl: string; key: string };

const uploadFile = async (
  file: File,
  config?: AxiosRequestConfig,
  callbackFn?: UploadFileCallback
) => {
  const httpService = new HttpService<UploadFileResponse>('/');

  const { signedUrl, key } = await httpService.create({
    contentType: file.type,
    userId: 'conradmugabe',
  });

  await apiClientService.put(signedUrl, file, {
    ...config,
    headers: { ...config?.headers, 'Content-Type': file.type },
  });

  if (callbackFn) callbackFn(file, key);
};

function App() {
  const [percentageUploaded, setPercentageUploaded] = useState(0);
  const { file, onChange, onClick, setFile, ref } = useFile();

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
      {file && percentageUploaded > 0 && (
        <p className="read-the-docs">Uploaded {percentageUploaded}%</p>
      )}
    </>
  );
}

export default App;
