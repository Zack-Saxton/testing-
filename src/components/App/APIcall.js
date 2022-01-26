import axios from "axios";
import Cookies from "js-cookie";
const APICall = async (url, data, method, addAccessToken) => {
    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    let response = {
        status: "",
        statusText: "",
        data: "",
    };
    try {
        await axios({
            method: method,
            url: url,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                if (addAccessToken !== true) {
                    delete headers.common["x-access-token"];
                }
                return data;
            },
        }).then((res) => {
            response.data = res?.data?.data?.data ?? res?.data?.data ?? res?.data;
            response.status = res.status;
            response.statusText = res.statusText;
        });
    } catch (error) {
        response.data = error?.response?.data?.data?.data ?? error?.response?.data?.data ?? error?.response?.data;
        response.status = error.response.status;
        response.statusText = error.response.statusText;
    }
    return response;
}

export default APICall;