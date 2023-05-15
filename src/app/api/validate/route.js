import { NextResponse } from "next/server";
import {
  validatePostRequest,
} from '../../../utils/validation';
import StorageManager from '../../../storage/StorageManager';
import { store } from "../../../store";
import { selectPlayers } from '../../../store/playersDataSlice';
import { validatePlayerField } from '../../../utils/validation';
import { fetchPlayersIfNeeded } from '../../../utils/fetchPlayers';


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const label = searchParams.get("player");

  if (!label)
    return NextResponse.json({
      error: "Invalid request",
    }, {
      status: 400,
    });

  await fetchPlayersIfNeeded();

  // Check if selected player is valid
  const players = selectPlayers (store.getState() );

  if (validatePlayerField(label, players)) {
    return NextResponse.json({
      valid: true
    }, {
      status: 200,
    });
  }
  else {
    return NextResponse.json({
      valid: false
    }, {
      status: 200,
    });
  }
}
