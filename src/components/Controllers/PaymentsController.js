import APICall from "../lib/AxiosLib";
import Moment from "moment";
import ErrorLogger from "../lib/ErrorLogger"

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
    ErrorLogger("Error executing usrPaymentMethods API", error)
    Error("Error executing usrPaymentMethods API")
  }
}

/***** Enable AutoPay mode *****/
export async function enableAutoPay(enableAutoPayAccountNo, enableAutoPayCard, enableAutoPayDate, enableAutoPayIsDebit) {
  try {
    let cards = enableAutoPayCard.toString();
    let url = "enable_autopay";
    let param = "/" + enableAutoPayAccountNo;
    let data = {
      payment_account: cards,
      payment_option: "recurring_payment",
      payment_date: enableAutoPayDate,
      is_debit_payment: enableAutoPayIsDebit,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing enableAutoPay API", error)
    Error("Error executing enableAutoPay API")
  }
}

/***** Disable AutoPay mode *****/
export async function disableAutoPay(disableAutoPayAccountNo) {
  try {
    //API
    let url = "disable_autopay";
    let param = "/" + disableAutoPayAccountNo;
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing disableAutoPay API", error)
    Error("Error executing disableAutoPay API")
  }
}


/***** Schedule a payment *****/
export async function makePayment(scheduledPaymentAccountNo, scheduledPaymentCard, scheduledPaymentDatePicker, scheduledPaymentIsDebit, scheduledPaymentAmount) {
  try {
    let cards = scheduledPaymentCard.toString();
    let paymentAmounts = scheduledPaymentAmount.toString();
    let url = "make_payment";
    let param = "/" + scheduledPaymentAccountNo;
    let data = {
      payment_account: cards,
      payment_amount: paymentAmounts,
      payment_date: Moment(scheduledPaymentDatePicker).format("YYYY-MM-DD"),
      is_debit_payment: scheduledPaymentIsDebit,
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing makePayment API", error)
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
    ErrorLogger("Error executing deleteScheduledPayment API", error)
    Error("Error executing deleteScheduledPayment API")
  }
}