import axios from "axios";
import handleTokenExpiry from './HandleTokenExpiry';

export async function changeTextNotify(opted_phone_texting) {
    /*
    req.body.profileInfo.opted_phone_texting
    req.body.allLoansClosed = activeLoans.allLoansClosed true/false
    req.body.sbtInfo;
    */
    const email = localStorage.getItem("email");
    let body = {
        "email": email,
        "profileInfo": {
            "opted_phone_texting": opted_phone_texting
            //"prevPhoneInfo": "4235738888"
        },
        "sbtInfo": {
            "SubscriptionOptions":
                [{
                    "BrandingId": "1",
                    "BrandingName": "Mariner Finance"
                }]
        }
    }

    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        data: ''
    }
    try {
        await axios({
            method: "POST",
            url: "/gps/sbt_subscribe",
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