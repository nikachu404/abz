import { RootState } from '../../store';
import { apiUrlState } from './types';

export const selectApiUrl = (state: RootState) =>
  (state.apiUrl as apiUrlState).apiUrl;
