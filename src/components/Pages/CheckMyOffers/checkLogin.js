import React from "react";
import { Redirect, withRouter  } from 'react-router-dom';
class CheckLogin extends React.Component {
  componentDidMount() {
    
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    alert(userToken?.isLoggedIn);
    if(!userToken?.isLoggedIn){
      alert(userToken?.isLoggedIn);
      this.props.history.push("/login");
    }
  }

  render() {
    return null;
  }
}

export default withRouter(CheckLogin);