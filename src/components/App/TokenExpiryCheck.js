import Cookies from "js-cookie";
import LogoutController from "../Controllers/LogoutController"
const tokenExpiryCheck = (error) => {

    if (error.response.data === "Unauthorized" || error.response.data === "Access token has expired") {
        LogoutController();
        Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
        window.location.replace("/login");
    }
    return null;
}

export default tokenExpiryCheck;