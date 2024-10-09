import { createSlice } from '@reduxjs/toolkit';

interface navigationState {
  backdrop: boolean;
  showToast: boolean;
  toastMessage: string;
  toastIcon?: string;
  activeStep: number;
  headerSearchInput: string;
  studentDetailTab: number;
}

const initialState: navigationState = {
  backdrop: false,
  showToast: false,
  toastMessage: '',
  toastIcon: undefined,
  activeStep: 0,
  headerSearchInput: '',
  studentDetailTab: 0,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setBackdrop: (state, action) => {
      state.backdrop = action.payload;
    },
    setShowToast: (state, action) => {
      const { showToast, toastMessage, toastIcon } = action.payload;
      state.showToast = showToast;
      state.toastMessage = toastMessage;
      state.toastIcon = toastIcon;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setHeaderSearchInput: (state, action) => {
      state.headerSearchInput = action.payload;
    },
    setStudentDetailTab: (state, action) => {
      state.studentDetailTab = action.payload;
    },
  },
});

export const {
  setBackdrop,
  setShowToast,
  setActiveStep,
  setHeaderSearchInput,
  setStudentDetailTab,
} = navigationSlice.actions;

export default navigationSlice.reducer;
