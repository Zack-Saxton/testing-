import axios from "axios";
import handleTokenExpiry from './handleTokenExpiry';


export async function getNoticationData() {
    const loginToken = JSON.parse(localStorage.getItem("token"));
    const email = localStorage.getItem("email");

    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
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
