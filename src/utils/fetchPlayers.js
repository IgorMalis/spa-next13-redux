

//https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.division.name

import { store } from "../store";

import {
  setTeams,
  appendPlayers,
  setPlayers,
  needToFetch,
  beginFetch,
} from '../store/playersDataSlice';


export const fetchPlayersIfNeeded = async () => {
  if ( needToFetch(store.getState()) ) {
    await store.dispatch( beginFetch() );
    await fetchTeams();
  }
}

export const fetchTeams = async () => {
  const response = await fetch(`https://records.nhl.com/site/api/franchise`);

  if (response.status >= 300) {
    throw new Error('Error fetching teams');
  }
  const body = await response.json();
  const teams = body.data;

  // 39 teams
  store.dispatch( setTeams(teams) );

  // Fetch players for each team and wait 200ms between each request
  for (var i = 0; i < (process.env.MAX_TEAMS <= teams.length ? process.env.MAX_TEAMS : teams.length); i++) {
    await fetchTeamAsync(teams[i].id, teams[i].teamAbbrev);
  }

  // Sort players alphabetically
  let players = store.getState().playersData.players.slice(0);
  players.sort((a, b) => a.label.localeCompare(b.label));
  store.dispatch( setPlayers( players ) );
}

// Wait 200ms between requests to avoid being throttled
const fetchTeamAsync = async (id, abv) => {
  return new Promise(resolve => {
    setTimeout(async () => {
      await fetchTeam(id, abv);
      resolve();
    }, 200);
  });
};

const fetchTeam = async (id, abv) => {
  const response = await fetch(`https://records.nhl.com/site/api/player/byTeam/${id}`);
  if (response.status >= 300) {
    throw new Error('Error fetching team');
  }
  const body = await response.json();
  const players = body.data;

  await store.dispatch( appendPlayers({players, abv}) );
};
