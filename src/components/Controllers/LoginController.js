import axios from "axios";

export default async function loginSubmit(email, password) {
    let body = {
        "email": email,
        "password": password
    }
    let response = {
        isLoggedIn: '',
        active: '',
        data: ''
    }
    try {

        response.data = await axios({
            method: "POST",
            url: "/customer/login",
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",

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
