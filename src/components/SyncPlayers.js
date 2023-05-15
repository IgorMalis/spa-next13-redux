"use client";

import { useRef } from "react";
import { store } from "../store";
import {
	setPlayers,
} from "../store/playersDataSlice";


function SyncPlayers({ players }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setPlayers(players));
    loaded.current = true;
  }

  return null;
}

export default SyncPlayers;
