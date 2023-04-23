import axios from 'axios';

const apiClientService = axios.create({
  baseURL: 'http://localhost:4000',
});

export default apiClientService;
