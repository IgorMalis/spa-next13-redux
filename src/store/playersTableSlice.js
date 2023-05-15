import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  players: [{
    name: '',
    nameValid: false,
    quantity: NaN,
    subtotal: NaN,
  },
  {
    name: '',
    nameValid: false,
    quantity: NaN,
    subtotal: NaN,
  },
  {
    name: '',
    nameValid: false,
    quantity: NaN,
    subtotal: NaN,
  }],
};

const playersTableSlice = createSlice({
  name: "playersTable",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      const {name, index} = action.payload;
      state.players[index].name = name;
    },
    setQuantity: (state, action) => {
      const {quantity, index} = action.payload;
      state.players[index].quantity = quantity;
    },
    setSubtotal: (state, action) => {
      const {subtotal, index} = action.payload;
      state.players[index].subtotal = subtotal;
    },
    addItem: (state, action) => {
      state.players.push({
        name: '',
        nameValid: false,
        quantity: NaN,
        subtotal: NaN,
      });
    },
    setTableData: (state, action) => {
      const tableData = action.payload;

      let players = [];
      for (let i=0; i < tableData.length; i+=3) {
        players.push({
          name: tableData[i],
          nameValid: true,
          quantity: parseInt( tableData[i+1] ),
          subtotal: parseFloat( tableData[i+2] ),
        });
      }
      state.players = players;
    },
    setPlayerValid: (state, action) => {
      const index = action.payload;
      state.players[index].nameValid = true;
    },
    setPlayerInvalid: (state, action) => {
      const index = action.payload;
      state.players[index].nameValid = false;
    },
  },
});

export const {
  setPlayer,
  setQuantity,
  setSubtotal,
  addItem,
  setTableData,
  setPlayerValid,
  setPlayerInvalid,
} = playersTableSlice.actions;

export default playersTableSlice.reducer;

export const selectPlayersData = (state) => state.playersTable.players;
