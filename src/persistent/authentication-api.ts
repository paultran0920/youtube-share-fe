import axios from 'axios';
import { JSONDto } from '../models/base-models';
import { deleteAccessToken, saveAccessToken } from './access-token-util';
import { AUTH_ROOT } from './constants';

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const result = await axios.post<JSONDto>(`${AUTH_ROOT}/login`, {
    username: username,
    password: password,
  });

  result.data.access_token && saveAccessToken(result.data.access_token);

  return result.data.access_token;
};

export const logout = async (): Promise<void> => {
  await axios.post<void>(`${AUTH_ROOT}/logout`);
  deleteAccessToken();
};
