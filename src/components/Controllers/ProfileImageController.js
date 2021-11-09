import axios from "axios";

export default async function usrBasicInformation(email) {
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let body = {
        "email" : email
    }
    let response = {
        isLoggedIn: "",
        active: "",
        data: ""
    };
    try {
        response.data = await axios({
            method: "POST",
            url: "/customer/get_profile_picture",
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",

                "x-access-token": loginToken.apiKey,
            },
            transformRequest: (data, headers) => {
                delete headers.common["Content-Type"];
                return data;
            },
        });
		
	} catch (error) {
		response.data = error.response;
	}
    return response
}
