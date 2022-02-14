import Cookies from "js-cookie";
import React from "react";
import { withRouter } from "react-router-dom";

class CheckLogin extends React.Component {
	componentDidMount() {
		const tokenString = Cookies.get("token") ? Cookies.get("token") : "{ }";
		const userToken = JSON.parse(tokenString);
		if (!userToken?.isLoggedIn) {
			this.props.navigate("/login");
		}
	}

	render() {
		return null;
	}
}

export default withRouter(CheckLogin);
