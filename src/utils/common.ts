import axios from 'axios';
import {
  deleteAccessToken,
  loadAccessToken,
} from '../persistent/access-token-util';
import { CustomEventEmitter } from './event-emitter';

export const appEventEmitter = new CustomEventEmitter();

export const setupAxiosInterceptors = async () => {
  axios.interceptors.request.use((config) => {
    const accessToken = loadAccessToken();
    if (config.headers && accessToken && !config.headers.notAddAuthorization) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        deleteAccessToken();
        document.location.href = '/login';
      } else {
        return Promise.reject(error);
      }
    }
  );
};
