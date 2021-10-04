import axios from "axios";
import handleTokenExpiry from './handleTokenExpiry';

 export async function getVantageScore() {
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    try {
        await axios({
            method: "GET",
            url: "/creditmonitoring/get_credit_reports_cac",

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


