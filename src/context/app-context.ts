import React, { createContext, Dispatch } from 'react';
import { User } from '../models/base-models';
import { NotificationDto } from '../models/notification-models';

export const defaultContext: ContextDataType = {};

export interface ContextDataType {
  // Display sucess message
  message?: string;
  // Display error message
  errorMessage?: string;
  // Display the Backdrop
  waiting?: boolean;
  // Current logged in user
  currentUser?: User;
  // Notifications
  notifications?: NotificationDto[];
}

export interface ContextType {
  contextData: ContextDataType;
  setContextData: Dispatch<React.SetStateAction<ContextDataType>>;
}

export const AppContext = createContext<ContextType>({
  contextData: defaultContext,
  setContextData: () => {},
});
