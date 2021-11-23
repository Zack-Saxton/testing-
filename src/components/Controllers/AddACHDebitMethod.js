import { toast } from "react-toastify";
import APICall from "../lib/AxiosLib";

//  ========*******======== Add ACH Bank Payment                ========*******========
export async function AddACHPaymentAPI(accountNickname, accountHolder, bankRoutingNumber, bankAccountNumber, accountType, defaultBank) {
  //API
  let url = "add_ach_payment_method";
  let param = "";
  let data = {
    nickname: accountNickname,
    account_holder: accountHolder,
    routing_number: bankRoutingNumber,
    account_number: bankAccountNumber,
    account_type: accountType,
    defaultBank: defaultBank
  };
  let method = "POST";
  let addAccessToken = true;
  //API call
  let addACHPaymentMethod = await APICall(url, param, data, method, addAccessToken);
  //API response
  addACHPaymentMethod.data.status === 200
    ? toast.success(
      addACHPaymentMethod?.data?.data ? addACHPaymentMethod.data.data : "ACH Payment Added...",
      {
        position: "bottom-left",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
    : toast.error(`Error adding ACH Payment`, {
      position: "bottom-left",
      autoClose: 5500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return "true";
}
//  ========*******======== END of [Add ACH Bank Payment]       ========*******========

//  ========*******======== Add Debit Card Payment              ========*******========
export async function AddDebitCardAPI(accountNickname, cardNumber, cardName, cvv, expirydate) {
  //API
  let url = "add_debit_card_payment_method";
  let param = "";
  let data = {
    accountNickname: accountNickname,
    cardNumber: cardNumber,
    cardName: cardName,
    cvv: cvv,
    expirydate: expirydate,
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  let addAddDebitCardMethod = await APICall(url, param, data, method, addAccessToken);
  //API response
  addAddDebitCardMethod.data.status === 200
    ? toast.success(
      addAddDebitCardMethod.data.data("ACH Payment Added..."),
      {
        position: "bottom-left",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
    : toast.error("Error adding ACH Payment", {
      position: "bottom-left",
      autoClose: 5500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return "true";
}
//  ========*******======== END of [Add Debit Card Payment]     ========*******========

//  ========*******======== Delete ACH Bank Payment             ========*******========
export async function DeleteACHPaymentAPI() {
  //API
  let url = "delete_ach_payment_method";
  let param = "";
  let data = {
    "isMobile": true
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  let deleteACHPaymentMethod = await APICall(url, param, data, method, addAccessToken);

  //API response
  deleteACHPaymentMethod.data.status === 200
    ? toast.success(
      deleteACHPaymentMethod.data.data("ACH Payment Deleted..."),
      {
        position: "bottom-left",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
    : toast.error("Error Deleting ACH Payment...", {
      position: "bottom-left",
      autoClose: 5500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return "true";
}
//  ========*******======== END of [Delete ACH Bank Payment]    ========*******========

//  ========*******======== Delete Debit Card Payment             ========*******========
export async function DeleteDebitCardAPI() {
  //API
  let url = "delete_debit_card_payment_method";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  let deleteDebitCardMethod = await APICall(url, param, data, method, addAccessToken);

  //API response
  deleteDebitCardMethod.data.status === 200
    ? toast.success(
      deleteDebitCardMethod.data.data("Debit Card Payment Deleted..."),
      {
        position: "bottom-left",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
    : toast.error("Error Deleting Debit Card Payment...", {
      position: "bottom-left",
      autoClose: 5500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return "true";
}
//  ========*******======== END of [Delete Debit Card Payment]    ========*******========

//  ========*******======== Delete Debit Card Payment             ========*******========
export async function ShowPaymentMethodAPI() {
  //API
  let url = "get_payment_options";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  let ShowPaymentMethod = await APICall(url, param, data, method, addAccessToken);

  //API response

  return ShowPaymentMethod;
}
//  ========*******======== END of [Delete Debit Card Payment]    ========*******========