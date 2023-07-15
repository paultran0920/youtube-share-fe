import axios from 'axios';
import { AccountDto } from '../models/account-model';
import { User } from '../models/base-models';
import { ACCOUNT_ROOT } from './constants';

export const fetchUserProfile = async (): Promise<User> => {
  const result = await axios.get<User>(`${ACCOUNT_ROOT}/profile`);

  return result.data;
};

export const fetchAccount = async (id: string): Promise<AccountDto> => {
  const result = await axios.get<AccountDto>(`${ACCOUNT_ROOT}/${id}`);

  return result.data;
};
