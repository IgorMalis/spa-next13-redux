"use client";

import { useSelector, useDispatch } from "react-redux";

import Image from 'next/image';
import StatusIndicator from './StatusIndicator';
import InvoiceForm from './InvoiceForm';

import {
  selectPlayersData,
  setPlayer,
  setQuantity,
  addItem,
} from '../store/playersTableSlice';

import {
  selectFirstName,
  selectLastName,
  selectEmail,
} from '../store/userInfoSlice';

import {
  selectText,
  selectType,
} from '../store/indicatorSlice';

import {
  INDICATOR,
  FORM_MODE,
} from '../utils/constants';


const InvoiceView = () => {

  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const type = useSelector(selectType);

  return (
    <div style={{ width: '100%', margin: '0px auto' }}>
      {
         type == INDICATOR.WARNING &&
         <StatusIndicator />
      }
      {
         type == INDICATOR.SUCCESS &&
         <InvoiceForm mode={FORM_MODE.VIEW} />
      }
    </div>
  );

};

export default InvoiceView;
