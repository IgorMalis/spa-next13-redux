import {
  setFirstName,
  setLastName,
  setEmail,
  setInvoiceNumber,
} from '../store/userInfoSlice';


export const updateFirstName = (firstName) => (dispatch, getState) => {
  dispatch( setFirstName(firstName) );
};

export const updateLastName = (lastName) => (dispatch, getState) => {
  dispatch( setLastName(lastName) );
};

export const updateEmail = (email) => (dispatch, getState) => {
  dispatch( setEmail(email) );
};

export const updateInvoiceNumber = (n) => (dispatch, getState) => {
  dispatch( setInvoiceNumber(n) );
};
