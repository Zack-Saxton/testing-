import APICall from "../lib/AxiosLib";

// *** Prepare API to add ACH Bank Payment *** [01]
export async function addBankPayment(oldPassword, newPassword) {
  let url = "add_new_payment_method";
  let param = "";
  let data = {
    // ===================================== Change Right side value with variables
    "account_type": "Checking",
    "routing_number": "256074974",
    "account_number": "000068947000",
    "account_holder": "ROBERTA C. FFRZYLKKR",
    "nickname": "Corbett MSA",
    "defaultBank": 0
  }
  let method = "POST";
  let addAccessToken = true;

  //Make API call to add ACH Bank Payment Method [01]
  let addBankPayment = await APICall(url, param, data, method, addAccessToken);
  return addBankPayment;
}

// *** Prepare API to add ACH Bank Payment *** [02]
export async function addDebitCardPayment(oldPassword, newPassword) {
  let url = "add_new_card_payment_method";
  let param = "";
  let data = {
    // ===================================== Change Right side value with variables
    "address_street": "3 Test Street",
    "address_city": "Nottingham",
    "address_state": "MD",
    "address_postal_code": "21236",
    "cardholder_name": "Brandon C Testerman",
    "card_number": "4011190070070071",
    "issuer": "Visa",
    "cvv": 111,
    "exp_date": "04/22"
  }
  let method = "POST";
  let addAccessToken = true;

  //Make API call to add Debit Card Payment Method [02]
  let addDebitCardPayment = await APICall(url, param, data, method, addAccessToken);
  return addDebitCardPayment;
}