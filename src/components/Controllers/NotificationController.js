import axios from "axios";
import handleTokenExpiry from './HandleTokenExpiry';


export async function getNoticationData() {
    //get the user access token
    const loginToken = JSON.parse(localStorage.getItem("token"));
    //get the user email id
    const email = localStorage.getItem("email");

    //response - get the required data from API-result
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };

    //Data to be send to api
    let body = {
            "username": email, 
            "isAuthtenticated" : "false",   
    }

    try {
        await axios({
            method: "POST",
            url: "../customer/get_notification_data_cac",
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
