"use client";

import { useRef } from "react";
//import { store } from "../store";
import {
	setText,
	setType,
} from "../store/indicatorSlice";
import { useDispatch, useSelector } from "react-redux";

function SyncIndicator({ text, type }) {
	const dispatch = useDispatch();
  const loaded = useRef(false);
  if (!loaded.current) {
    dispatch(setType(type));
    dispatch(setText(text));
    loaded.current = true;
  }

  return null;
}

export default SyncIndicator;
