import { createSlice } from '@reduxjs/toolkit';
import { ToastState } from '../states';

//-------------------------------
const initialState: ToastState = {
  message: '',
};

//-----------------------------
const toastSlice = createSlice({
  name: 'toastSlice',
  initialState: initialState,
  reducers: {
    setToastMessage: (state, action) => {
      if (state.message != action.payload) {
        state.message = action.payload;
      }
    },
  },
});

const toastReducer = toastSlice.reducer;
export const { setToastMessage } = toastSlice.actions;
export default toastReducer;
