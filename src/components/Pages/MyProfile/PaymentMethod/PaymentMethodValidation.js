import * as yup from "yup";
import globalMessages from "../../../../assets/data/globalMessages.json";

export function debitCardValidation() {
  return yup.object({
    cardNumber: yup
      .string(globalMessages.Card_Number_Required)
      .required(globalMessages.Card_Number_Required)
      .min(13, globalMessages.Card_Min_Number)
      .matches(/^5[1-5]\d{14}|^4\d{12}(?:\d{3})?$/g, globalMessages.Valid_Card),
    cardName: yup
      .string(globalMessages.Card_Holder_Name_Required)
      .required(globalMessages.Card_Holder_Name_Required),
    streetAddress: yup
      .string(globalMessages.Street_Address)
      .required(globalMessages.Street_Address_Required),
    city: yup
      .string(globalMessages.Enter_City)
      .required(globalMessages.City_Required),
    state: yup
      .string(globalMessages.Enter_State)
      .required(globalMessages.State_Required),
    zipcode: yup
      .string(globalMessages.Enter_Zipcode)
      .required(globalMessages.Zipcode_Required)
      .min(5, globalMessages.Zipcode_Required),
    cvv: yup
      .string(globalMessages.Enter_CVV)
      .required(globalMessages.CVV_Required)
      .matches(
        /^(?!000)\d{3}$/,
        globalMessages.CVV_Valid
    )
      .min(3, globalMessages.CVV_Required),
  
    expiryDate: yup
      .date(globalMessages.Card_Valid_Date)
      .nullable()
      .required(globalMessages.Card_Expiry_Date_Required)
      .typeError(globalMessages.Valid_Expiry_Date)
      .min(
        new Date(new Date().getFullYear(), new Date().getMonth()),
        globalMessages.Expired_Card
      ),
  });

}

export function bankAccountValidation() {
  return yup.object({
    accountNickname: yup
      .string(globalMessages.Account_Nick_Name)
      .max(30, globalMessages.Account_Nick_Name_Max)
      .min(2, globalMessages.Account_Nick_Name_Min)
      .required(globalMessages.Nick_Name_Required),
    accountHolder: yup
      .string(globalMessages.Account_Holder_Name)
      .max(30, globalMessages.Account_Holder_Name_Max)
      .min(2, globalMessages.Account_Holder_Name_Min)
      .required(globalMessages.Account_Holder_Name_Required),
    bankRoutingNumber: yup
      .string(globalMessages.Enter_Routing_No)
      .required(globalMessages.Routing_No_Required)
      .min(9, globalMessages.validBankRoutingNumber),
    bankName: yup
      .string(globalMessages.Bank_Name)
      .max(50, globalMessages.Bank_Name_Max)
      .min(3, globalMessages.Bank_Name_Min)
      .required(globalMessages.Bank_Name_Required),
    bankAccountNumber: yup
      .string(globalMessages.Enter_Account_No)
      .required(globalMessages.Accoun_No_Required)
      .min(4, globalMessages.validAccountNumber)
      .max(17, globalMessages.validAccountNumber)
      .matches(/^0*[1-9]\d*$/,globalMessages.BankAccountNumber_Valid),
  });
}

