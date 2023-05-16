import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface apiUrlState {
  apiUrl: { url: string | null; };
}

const initialState: apiUrlState = {
  apiUrl: { url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6' },
};

const apiUrlSlice = createSlice({
  name: 'apiUrl',
  initialState,
  reducers: {
    setApiUrl(state, action: PayloadAction<apiUrlState>) {
      return { ...state, apiUrl: action.payload.apiUrl };
    },
  },
});

export const selectApiUrl = ((state: RootState) => state.apiUrl.apiUrl)
export const { setApiUrl } = apiUrlSlice.actions;
export const apiUrlReducer = apiUrlSlice.reducer;