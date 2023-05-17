import { PayloadAction } from '@reduxjs/toolkit';
import { apiUrlState } from './types';

export const setApiUrl = (
  payload: apiUrlState,
): PayloadAction<apiUrlState> => ({
  type: 'apiUrl/setApiUrl',
  payload,
});
