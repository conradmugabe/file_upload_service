import './App.css';
import useFile from './hooks/useFile';

type UploadFileCallback = (file: File) => void;

const uploadFile = (file: File, callback?: UploadFileCallback) => {
  // request for a presigned URL from the server.
  // upload the file
  // parse the response to a callback function eg. to continue and create a post
  
  // QUESTIONS
  // 1. Does selecting a file automatically upload the file. This then questions deleting and all that.
  // 2. onChange function should be able to take in some callback that takes File interface and returns void.
  //    This can be used to do some kind of validation.
};

function App() {
  const { file, onChange, onClick, ref } = useFile();

  return (
    <>
      <h1>File Upload Service</h1>
      <div className="card">
        <input className="d-none" type="file" ref={ref} onChange={onChange} />
        <button onClick={onClick}>Select File From Your Computer</button>
        <p>
          Selected File: <code>{file?.name}</code>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
