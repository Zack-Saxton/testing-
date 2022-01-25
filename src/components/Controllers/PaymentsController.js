import APICall from "../lib/AxiosLib";
import Moment from "moment";

/***** Get payment methods *****/
export async function usrPaymentMethods() {
  try {
    let url = "get_payment_methods";
    let param = "";
    let data = {}
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing usrPaymentMethods API")
  }
}

/***** Enable AutoPay mode *****/
export async function enableAutoPay(accntNo, card, paymentDate, isDebit) {
  try {
    let cards = card.toString();
    let url = "enable_autopay";
    let param = "/" + accntNo;
    let data = {
      payment_account: cards,
      payment_option: "recurring_payment",
      payment_date: paymentDate,
      is_debit_payment: isDebit,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing enableAutoPay API")
  }
}

/***** Disable AutoPay mode *****/
export async function disableAutoPay(accntNo) {
  try {
    //API
    let url = "disable_autopay";
    let param = "/" + accntNo;
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing disableAutoPay API")
  }
}

/***** Schedule a payment *****/
export async function makePayment(accntNo, card, paymentDatepicker, isDebit, paymentAmount) {
  try {
    let cards = card.toString();
    let paymentAmounts = paymentAmount.toString();
    let url = "make_payment";
    let param = "/" + accntNo;
    let data = {
      payment_account: cards,
      payment_amount: paymentAmounts,
      payment_date: Moment(paymentDatepicker).format("YYYY-MM-DD"),
      is_debit_payment: isDebit,
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing makePayment API")
  }
}

/***** Cancel the Scheduled payment *****/
export async function deleteScheduledPayment(accntNo, refNo, isCard) {
  try {
    let url = isCard === true ? "delete_scheduled_debit_payment" : "delete_scheduled_payment";
    let param = "/" + accntNo + "/" + refNo;
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing deleteScheduledPayment API")
  }
}