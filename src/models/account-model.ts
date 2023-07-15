import { BaseDto, Role } from './base-models';

export enum AccountStatus {
  Pending = 'Pending',
  Activated = 'Activated',
  Student = 'Disabled',
}

export interface AccountDto extends BaseDto {
  email: string;
  password?: string;
  status: AccountStatus;
  role: Role;
  profile: ProfileDto;
}

export interface ProfileDto extends BaseDto {
  name: string;
  contact: string;
  avatar?: string;
  avatarUrl?: string;
  accountId: string;
}
