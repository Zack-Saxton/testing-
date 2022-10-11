export const currencyFormat = (val) => {
  if (val) {
    let formated = parseFloat(val);
    let currency = "$";
    return (
      currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
    );
  }
  return val;
};