import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface GuestState {
  guest_session_id: string | null;
}

const initialState: GuestState = {
  guest_session_id: null,
};

export const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setGuestSessionId: (state, action: PayloadAction<string>) => {
      state.guest_session_id = action.payload;
    },
  },
});

export const { setGuestSessionId } = guestSlice.actions;

export default guestSlice.reducer;
