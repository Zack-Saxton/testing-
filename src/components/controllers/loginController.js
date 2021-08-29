import axios from "axios";

export default async function loginSubmit( email, password, setToken ) {
    let body = {
        "email" : email,
        "password": password
    }
    let response = {
        isLoggedIn: '',
        active: '',
        data: ''
    }
    try {
		
			let result = await axios({
				method: "POST",
				url: "/customer/login",
				data: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					Host: "psa-development.marinerfinance.io",
					"Accept-Encoding": "gzip, deflate, br",
					Connection: "keep-alive",
					"Content-Length": "6774",
				},
				transformRequest: (data, headers) => {
					delete headers.common["Content-Type"];
					return data;
				},
			});
			console.log('dat',result);
            response.data = result;
			
		
	} catch (error) {
		response.data = error.response;
	}
    return response
}