import { AxiosRequestConfig } from 'axios';
import apiClientService from './api.service';

export default class HttpService<T> {
  constructor(private endpoint: string) {}

  create = (data?: any, config?: AxiosRequestConfig) =>
    apiClientService
      .post<T>(this.endpoint, data, config)
      .then((response) => response.data);

  getMany = (config?: AxiosRequestConfig) =>
    apiClientService.get<T>(this.endpoint, config).then((res) => res.data);

  getOne = (id: string | number, config?: AxiosRequestConfig) =>
    apiClientService
      .get<T>(this.endpoint + '/' + id, config)
      .then((response) => response.data);
}
