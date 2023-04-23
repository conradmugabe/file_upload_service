import { ChangeEvent, useRef, useState } from 'react';

export default function useFile() {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      // Some validation checks would be nice here.
      // Like checking the file size, file type, etc before upload.
      setFile(files[0]);
    }
  };

  return { ref: inputRef, file, onChange, onClick };
}
