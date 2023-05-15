export const calcSubtotal = (qty) => {
  const COST_PER_CARD = parseFloat( process.env.NEXT_PUBLIC_COST_PER_CARD );
  
  return qty*COST_PER_CARD;
};

export const calcTotal = (playersData) => {
  var sum = playersData.reduce((accumulator, currentValue) => {
    return accumulator + (isNaN(currentValue.subtotal)?0:currentValue.subtotal);
  }, 0);
  
  return sum;
};
