import { AxiosRequestConfig } from 'axios';

import apiClientService from './api.service';
import HttpService from './http.service';

type UploadFileCallback = (file: File, key: string) => void;

type UploadFileResponse = { signedUrl: string; key: string };

const controller = new AbortController();

export const cancelFileUpload = () => {
  controller.abort();
};

export const uploadFile = async (
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
    signal: controller.signal,
    headers: { ...config?.headers, 'Content-Type': file.type },
  });

  if (callbackFn) callbackFn(file, key);
};
