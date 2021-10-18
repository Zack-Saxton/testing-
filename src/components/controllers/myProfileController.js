import axios from "axios";
import handleTokenExpiry from './handleTokenExpiry';

export async function changePassword(oldPassword, newPassword) {
    const email = localStorage.getItem("email");    
    let body = {
        "email": email,
        "oldPassword": oldPassword,
        "newPassword": newPassword
    }
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        data: ''
    }
    try {
        await axios({
            method: "POST",
            url: "/customer/change_password",
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        }).then((res) => (
            response.data = res));
    } catch (error) {
        handleTokenExpiry(error);
        response.data = error.response;
    }
    return response
}
