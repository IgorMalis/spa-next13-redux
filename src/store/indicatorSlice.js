import { createSlice } from "@reduxjs/toolkit";

import { INDICATOR } from '../utils/constants';


const initialState = {
  text: 'Loading...',
  type: INDICATOR.LOADING,
  modalVisible: false,
  redirectTime: 0,
};

const indicatorSlice = createSlice({
  name: "indicator",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    showModal: (state) => {
      state.modalVisible = true;
    },
    hideModal: (state) => {
      state.modalVisible = false;
    },
    setRedirectTime: (state, action) => {
      state.redirectTime = action.payload;
    },
  },
});

export const {
  setText,
  setType,
  showModal,
  hideModal,
  setRedirectTime,
} = indicatorSlice.actions;

export default indicatorSlice.reducer;

export const selectText = (state) => state.indicator.text;
export const selectType = (state) => state.indicator.type;
export const selectModalVisible = (state) => state.indicator.modalVisible;
export const selectRedirectTime = (state) => state.indicator.redirectTime;
