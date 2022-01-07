import React from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

class CheckLogin extends React.Component {
	componentDidMount() {
		const tokenString = Cookies.get("token") ? Cookies.get("token") : "{ }";
		const userToken = JSON.parse(tokenString);
		if (!userToken?.isLoggedIn) {
			this.props.history.push("/login");
		}
	}

	render() {
		return null;
	}
}

export default withRouter(CheckLogin);
