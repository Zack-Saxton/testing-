import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Reset Password method *****/
export default async function ResetPasswordController(password) {
    try {
        let url = "password_reset";
        let param = "";
        let data = {
            password: password,
        };
        let method = "POST";
        let addAccessToken = true;

        //API call
        return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_ResetPasswordController_API, error);
    }
}