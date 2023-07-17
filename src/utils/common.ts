import axios from 'axios';
import {
  deleteAccessToken,
  loadAccessToken,
} from '../persistent/access-token-util';
import { appSocket } from '../socket';
import { APP_SHARED_VIDEO_TOPIC } from '../constants';
import { NotificationDto } from '../models/notification-models';
import { logInfo } from '../logs/logger';

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

export const connectWs = async () => {
  if (!appSocket.connected) {
    appSocket.connect();

    logInfo('Connected to socket server');
  }
}

export const notifyNewSharedVideo = async (data: NotificationDto) => {
  if (appSocket.connected) {
    appSocket.emit(APP_SHARED_VIDEO_TOPIC, data);

    logInfo('Just sent a new shared video notification');
  }
}

export const listenSharedVideoEvent = async (cb: (data: NotificationDto) => void) => {
  if (!appSocket.listeners(APP_SHARED_VIDEO_TOPIC).length) {
    appSocket.on(APP_SHARED_VIDEO_TOPIC, cb);
    logInfo('Just registered a new shared video event listener');
  }
}

export const disconnectWs = async () => {
  if (appSocket.connected) {
    logInfo('Disconnecting from socket server');

    appSocket.off(APP_SHARED_VIDEO_TOPIC);
    appSocket.disconnect();
  }
}
