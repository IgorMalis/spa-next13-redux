"use client";

import { useRef } from "react";

import {
	updateFirstName,
	updateLastName,
	updateEmail,
	updateInvoiceNumber,
} from "../actions/userInfo";

import {
	updateTableData,
} from "../actions/tableData";

import { useDispatch, useSelector } from "react-redux";


function SyncInvoice({ invoiceNumber, firstName, lastName, email, tableData }) {
  const dispatch = useDispatch();
  const loaded = useRef(false);
  if (!loaded.current) {
    dispatch(updateInvoiceNumber(invoiceNumber));
    dispatch(updateFirstName(firstName));
    dispatch(updateLastName(lastName));
    dispatch(updateEmail(email));
    dispatch(updateTableData(tableData));

    loaded.current = true;
  }

  return null;
}

export default SyncInvoice;
