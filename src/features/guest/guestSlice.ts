import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface GuestState {
  guestSessionId: string | null;
}

const initialState: GuestState = {
  guestSessionId: null,
};

export const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setGuestSessionId: (state, action: PayloadAction<string>) => {
      state.guestSessionId = action.payload;
    },
  },
});

export const { setGuestSessionId } = guestSlice.actions;

export default guestSlice.reducer;
