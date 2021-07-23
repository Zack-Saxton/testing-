const loggedIn = true;
const token = "";
let invalidLogin, forceChangePasswordToken, loginUserSuccess, errors;

const getClientIp = function (req) {
	// Avoid leaking internal IP that is appened to x-forwarded-for
	if (req.headers["x-forwarded-for"]) {
		// try to get from x-forwared-for if it set (behind reverse proxy)
		return req.headers["x-forwarded-for"].split(",")[0].replace(/::ffff:/, "");
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

const handleSubmit = async (formValues) => {
	const values = {
		user: "",
		formPassword: formValues.password,
		clientIp: getClientIp(),
		LogonName: "",
		Password: formValues.password,
		GPS_email: formValues.username,
	};
	let user,
		LogonName,
		Password = formValues.password,
		GPS_email = formValues.username,
		clientIp = getClientIp();

	try {
		if (!loggedIn && !token) {
			let result = await fetch("/gps/loginUser", {
				method: "POST",
				body: JSON.stringify({
					user,
					username: formValues.username,
					formPassword: formValues.password,
					LogonName,
					Password,
					GPS_email,
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
		// else if (req.body.response && req.body.response.user) {
		//   values.user = req.body.response.user;
		// }
	} catch (error) {
		errors = error;
	}
};

export default handleSubmit;
