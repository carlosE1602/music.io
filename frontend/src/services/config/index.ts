import axios from 'axios';

export const HttpService = axios.create({
  timeout: 20000,
  baseURL: '//localhost:3000',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    credentials: false,
  },
});
