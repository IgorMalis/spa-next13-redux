import { NextResponse } from "next/server";
import { fetchPlayersIfNeeded } from '../../../utils/fetchPlayers';
import {
  selectPlayers,
} from '../../../store/playersDataSlice';
import { store } from "../../../store";


export async function GET(request) {
  await fetchPlayersIfNeeded();

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const players = selectPlayers( store.getState() );
  const playersData = players.filter((p) =>
    p.label.toLowerCase().includes(name?.toLowerCase() ?? "")
  );

 return NextResponse.json(playersData);
};
