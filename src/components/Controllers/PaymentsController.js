import Moment from "moment";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get payment methods *****/
export async function usrPaymentMethods() {
  try {
    let url = "get_payment_methods";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_usrPaymentMethods_API, error);
  }
}

/***** Enable AutoPay mode *****/
export async function enableAutoPay(enableAutoPayAccountNo, enableAutoPayCard, enableAutoPayDate, enableAutoPayIsDebit, removeScheduledPayment) {
  try {
    let cards = enableAutoPayCard.toString();
    let url = "enable_autopay";
    let param = "/" + enableAutoPayAccountNo;
    let data = {
      payment_account: cards,
      payment_option: "recurring_payment",
      payment_date: enableAutoPayDate,
      is_debit_payment: enableAutoPayIsDebit,
      RemoveScheduledPayment: removeScheduledPayment,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_enableAutoPay_API, error);
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
    ErrorLogger(globalMessages.Error_executing_disableAutoPay_API, error);
  }
}

/***** Schedule a payment *****/
export async function makePayment(scheduledPaymentAccountNo, scheduledPaymentCard, scheduledPaymentDatePicker, scheduledPaymentIsDebit, scheduledPaymentAmount, RemoveScheduledPayment) {
  try {
    let cards = scheduledPaymentCard.toString();
    let paymentAmounts = scheduledPaymentAmount.toString().replace(",","");
    let url = "make_payment";
    let param = "/" + scheduledPaymentAccountNo;
    let data = {
      payment_account: cards,
      payment_amount: paymentAmounts,
      payment_date: Moment(scheduledPaymentDatePicker).format("YYYY-MM-DD"),
      isDebitPayment: scheduledPaymentIsDebit,
      RemoveScheduledPayment: RemoveScheduledPayment,
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_makePayment_API, error);
  }
}

/***** Cancel the Scheduled payment *****/
export async function deleteScheduledPayment(accountNo, referenceNo, isCard) {
  try {
    let url = isCard ? "delete_scheduled_debit_payment" : "delete_scheduled_payment";
    let param = "/" + accountNo + "/" + referenceNo;
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_deleteScheduledPayment_API, error);
  }
}