import axios from "axios";
import Cookies from "js-cookie";
const APICall = async (url, data, method, addAccessToken) => {
    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    let response = {
        status: "",
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
                if(addAccessToken !== true){
                    delete headers.common["x-access-token"];
                }
                return data;
            },
        }).then((res) => { 
           
            response.data = res; 
        });
    } catch (error) {
        response.data = error.response;
        
    }
    return response;
}

export default APICall;

export const APICallNoData = async (url, method, addAccessToken) => {
    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    let response = {
        status: "",
        data: "",
    };
    try { 
        await axios({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                if(addAccessToken !== true){
                    delete headers.common["x-access-token"];
                }
                return data;
            },
        }).then((res) => { 
           
            response.data = res;
        });
    } catch (error) {
        response.data = error.response;
        
    }
    return response;
}

  