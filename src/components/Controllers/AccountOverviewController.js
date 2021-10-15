import axios from "axios";
import handleTokenExpiry from './HandleTokenExpiry';

export default async function setAccountDetails() {
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
            method: "GET",
            url: "/customer/account_overview",

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