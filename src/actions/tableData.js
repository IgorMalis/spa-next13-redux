import {
  setTableData,
} from '../store/playersTableSlice';

export const updateTableData = (d) => (dispatch, getState) => {
  dispatch( setTableData(d) );
};
