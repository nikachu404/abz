import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { INITIAL_API_URL } from '../../components/constants';

interface apiUrlState {
  apiUrl: { url: string | null };
}

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
      return { ...state, apiUrl: action.payload.apiUrl };
    },
  },
});

export const selectApiUrl = (state: RootState) => state.apiUrl.apiUrl;
export const { setApiUrl } = apiUrlSlice.actions;
export const apiUrlReducer = apiUrlSlice.reducer;
