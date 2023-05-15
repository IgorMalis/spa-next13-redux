import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  invoiceNumber: NaN,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setInvoiceNumber,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;

export const selectFirstName = (state) => state.userInfo.firstName;
export const selectLastName = (state) => state.userInfo.lastName;
export const selectEmail = (state) => state.userInfo.email;
export const selectInvoiceNumber = (state) => state.userInfo.invoiceNumber;
