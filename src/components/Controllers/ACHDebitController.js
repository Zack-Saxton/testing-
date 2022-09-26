import {toast} from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

//  ========*******======== Add ACH Bank Payment                ========*******========
export async function AddACHPaymentAPI(accountNickName, accountHolder, bankRoutingNumber, bankAccountNumber, accountType, defaultBank) {
  try {
    //API
    let url = "add_ach_payment_method";
    let param = "";
    let data = {
      nickname: accountNickName,
      account_holder: accountHolder,
      routing_number: bankRoutingNumber,
      account_number: bankAccountNumber,
      account_type: accountType,
      defaultBank: defaultBank
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    //API response

    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Ach_Error_Add_Achpayment_API, error);
  }
}
//  ========*******======== END of [Add ACH Bank Payment]       ========*******========

//  ========*******======== Add Debit Card Payment              ========*******========
export async function AddDebitCardAPI(accountNickName, cardNumber, cardName, cvv, expiryDate) {
  try {
    //API
    let url = "add_debit_card_payment_method";
    let param = "";
    let data = {
      accountNickname: accountNickName,
      cardNumber: cardNumber,
      cardName: cardName,
      cvv: cvv,
      expirydate: expiryDate,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    let addAddDebitCardMethod = await APICall(url, param, data, method, addAccessToken);
    //API response
    addAddDebitCardMethod.data.status === 200
      ? toast.success(
        addAddDebitCardMethod.data(globalMessages.Ach_Add_Achpayment))
      : toast.error(globalMessages.Ach_Error_Add_Achpayment);
    return true;
  } catch (error) {
    ErrorLogger(globalMessages.Ach_Error_Add_Achpayment, error);
  }  
}
//  ========*******======== END of [Add Debit Card Payment]     ========*******========

//  ========*******======== Delete ACH Bank Payment             ========*******========
export async function DeleteACHPaymentAPI() {
  try {
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
        deleteACHPaymentMethod.data(globalMessages.Ach_Delete_Achpayment))
      : toast.error(globalMessages.Ach_Error_Delete_Achpayment);
    return true;
  } catch (error) {
    ErrorLogger(globalMessages.Ach_Error_Delete_Achpayment, error);
  }   
}
//  ========*******======== END of [Delete ACH Bank Payment]    ========*******========

//  ========*******======== Delete Debit Card Payment             ========*******========
export async function DeleteDebitCardAPI() {
  try {
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
        deleteDebitCardMethod.data(globalMessages.Ach_Delete_Debit_Card_payment))
      : toast.error(globalMessages.Ach_Error_Delete_Debit_Card_payment);
    return true;
  } catch (error) {
    ErrorLogger(globalMessages.Ach_Error_Delete_Debit_Card_payment, error);
  }  
}
//  ========*******======== END of [Delete Debit Card Payment]    ========*******========

//  ========*******======== Delete Debit Card Payment             ========*******========
export async function ShowPaymentMethodAPI() {
  try {
    //API
    let url = "get_payment_options";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Ach_Error_Show_Payment_API, error);
  }
}
//  ========*******======== END of [Delete Debit Card Payment]    ========*******========