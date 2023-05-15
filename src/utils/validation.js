// Validate quantity input
export const validateQuantity = (value) => {
	// Empty or integer
	return ((!value) || 
		(!isNaN(value) &&
		parseInt(value).toString() === value));
};

// Check at least one valid row in table
// and no invalid rows (only one of player/quantity filled in)
export const validateTableData = (tableData) => {
  let atLeastOneRowValid = false;

  for (let i = 0; i < tableData.length; i++) {
    const item = tableData[i];
    // Partially filled out - invalid
    if ((item.name.length > 0 && isNaN(item.quantity)) ||
      (item.name.length == 0 && !isNaN(item.quantity)) ||
      (!item.nameValid && !isNaN(item.quantity)))
      return false;

    if (item.name.length > 0 && !isNaN(item.quantity) && item.nameValid)
      atLeastOneRowValid = true;
  }

  return atLeastOneRowValid;
};

// Remove rows left empty
export const stripTableData = (tableData) => {
  const newData = tableData.filter( item =>
    (item.name.length > 0 && !isNaN(item.quantity)));

  return newData;
};

// Validate POST request body when user submits invoice
export const validatePostRequest = (body) => {
  return (body.firstName &&
    body.lastName &&
    body.email &&
    body.data);
};

// Determine if entered Player is valid
export const validatePlayerField = (value, players) => {
  if (players.length == 0)
    console.log('Error: players list empty');

  let playerMatch = false;
  players.map(p => {
    if (p.label === value)
      playerMatch = true;
  });
  return playerMatch;
};
