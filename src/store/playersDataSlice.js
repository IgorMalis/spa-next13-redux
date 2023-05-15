import { createSlice } from "@reduxjs/toolkit";

import { INDICATOR } from '../utils/constants';


const initialState = {
  teams: [],
  players: [],
  begun: false,
};

const playersDataSlice = createSlice({
  name: "playersData",
  initialState,
  reducers: {
    beginFetch: (state) => {
      state.begun = true;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    appendPlayers: (state, action) => {
      const { players, abv } = action.payload;

      for (let i = 0; i < players.length; i++) {
        const p = players[i];
        state.players.push({
          id: parseInt(p.id),
          label: `${p.prName} ${p.birthDate} (${abv})`,
        });
      }

    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const {
  beginFetch,
  setTeams,
  appendPlayers,
  setPlayers,
} = playersDataSlice.actions;

export default playersDataSlice.reducer;

export const selectTeams = (state) => state.playersData.teams;
export const selectPlayers = (state) => state.playersData.players;
export const needToFetch = (state) => state.playersData.players.length == 0 && !state.playersData.begun;
