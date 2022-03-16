const loggedIn = true;
const token = "";
let invalidLogin, forceChangePasswordToken, loginUserSuccess, errors;
import globalMessages from "../../assets/data/globalMessages.json";
import ErrorLogger from "../lib/ErrorLogger";

const getClientIp = function (req) {
    // Avoid leaking internal IP that is append to x-forwarded-for
    if (req.headers[ "x-forwarded-for" ]) {
        // try to get from x-forward-for if it set (behind reverse proxy)
        return req.headers[ "x-forwarded-for" ].split(",")[ 0 ].replace(/::ffff:/, "");
    } else if (req.connection && req.connection.remoteAddress) {
        // no proxy, try getting from connection.remoteAddress
        return req.connection.remoteAddress.replace(/::ffff:/, "");
    } else if (req.socket) {
        // try to get it from req.socket
        return req.socket.remoteAddress.replace(/::ffff:/, "");
    } else if (req.connection && req.connection.socket) {
        // try to get it form the connection.socket
        return req.connection.socket.remoteAddress.replace(/::ffff:/, "");
    } else {
        // if non above, fallback.
        return "127.0.0.1";
    }
};

const HandleSubmit = async (formValues) => {
    const values = {
        user: "",
        formPassword: formValues.password,
        clientIp: getClientIp(),
        logoName: "",
        password: formValues.password,
        userName: formValues.username,
    };
    let user,
        logoName,
        password = formValues.password,
        userName = formValues.username,
        clientIp = getClientIp();

    try {
        if (!loggedIn && !token) {
            let result = await fetch("/gps/loginUser", {
                method: "POST",
                body: JSON.stringify({
                    user,
                    username: formValues.username,
                    formPassword: formValues.password,
                    logoName: logoName,
                    password: password,
                    userName: userName,
                    clientIp,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            result = await result.json();

            if (result) {
                if (result?.user) values.user = result?.user;
                invalidLogin = result.invalidLogin || false;
                forceChangePasswordToken = result.forceChangePasswordToken || false;
                loginUserSuccess = result.loginUserSuccess || false;
            }
        }
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_HandleSubmit_API, error);
        errors = error;
    }
};

export default HandleSubmit;
