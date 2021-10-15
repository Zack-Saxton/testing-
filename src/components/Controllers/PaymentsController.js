import axios from "axios";
import handleTokenExpiry from './HandleTokenExpiry';

//get payment methods
export async function usrPaymentMethods(account) {

//get the user access token
    const loginToken = JSON.parse(localStorage.getItem("token"));
//response - get the required data from API-result
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    let accountNo = account
    try {
        await axios({
            method: "GET",
            url: "/gps/get_payment_options/"+accountNo,

            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        }).then((res) => (response.data = res));
    } catch (error) {
        handleTokenExpiry(error);
        response.data = error.response;
    }
    return response;
}

//Enable AutoPay mode
export async function enableAutoPay(accntNo,card,paymentDate,isDebit) {

//get the user access token
    const loginToken = JSON.parse(localStorage.getItem("token"));
//response - get the required data from API-result
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    let cards = card.toString();

 //Data to be send to api
    let body = {
            "payment_account": cards, 
            "payment_option" : "recurring_payment",   
            "payment_date": paymentDate, 
            "is_debit_payment" : isDebit 
    }
    try {
        await axios({
            method: "POST",
            url: "/gps/make_recurring_payment/"+accntNo,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        }).then((res) => (response.data = res));
    } catch (error) {
        handleTokenExpiry(error);
        response.data = error;
    }
    return response;
}

//Disable AutoPay mode
export async function disableAutoPay(accntNo,card,paymentDate,isDebit) {
//get the user access token
    const loginToken = JSON.parse(localStorage.getItem("token"));
//response - get the required data from API-result
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    try {
        await axios({
            method: "POST",
            url: "/gps/delete_recurring_payment/"+accntNo,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        }).then((res) => (response.data = res));
    } catch (error) {
        handleTokenExpiry(error);
        response.data = error;
    }
    return response;
}

//Schedule a payment
export async function makePayment(accntNo,card,paymentDatepicker,isDebit,paymentAmount) {

 //get the user access token
    const loginToken = JSON.parse(localStorage.getItem("token"));
    //response - get the required data from API-result
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    let cards = card.toString();
    let paymentAmounts = paymentAmount.toString();
    
//Data to be send to api
    let body = {
            "payment_account": cards, 
            "payment_amount" : paymentAmounts,   
            "payment_date": paymentDatepicker, 
            "is_debit_payment" : isDebit 
    }

    try {
        await axios({
            method: "POST",
            url: "/gps/make_payment/"+accntNo,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        }).then((res) => (response.data = res));
    } catch (error) {
        handleTokenExpiry(error);
        response.data = error;
    }
    return response;
}

//Cancel the Scheduled payment
export async function deleteScheduledPayment(accntNo,refNo,isCard) {

//get the user access token
    const loginToken = JSON.parse(localStorage.getItem("token"));
 //response - get the required data from API-result
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };

    try {
        await axios({
            method: "POST",
            url: isCard === true ? "/gps/delete_scheduled_debit_payment/"+accntNo+"/"+refNo : "/gps/delete_scheduled_payment/"+accntNo+"/"+refNo ,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        }).then((res) => (response.data = res));
    } catch (error) {
        handleTokenExpiry(error);
        response.data = error;
    }
    return response;
}