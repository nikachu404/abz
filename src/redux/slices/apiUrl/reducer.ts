import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_API_URL } from '../../../components/constants';
import { apiUrlState } from './types';

const initialState: apiUrlState = {
  apiUrl: {
    url: INITIAL_API_URL,
  },
};

const apiUrlSlice = createSlice({
  name: 'apiUrl',
  initialState,
  reducers: {
    setApiUrl(state, action: PayloadAction<apiUrlState>) {
      state.apiUrl = action.payload.apiUrl;
    },
  },
});

export const apiUrlReducer = apiUrlSlice.reducer;
