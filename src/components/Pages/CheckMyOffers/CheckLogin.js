import React from "react";
import {withRouter} from 'react-router-dom';

class CheckLogin extends React.Component {
  componentDidMount() {
    
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if(!userToken?.isLoggedIn){
      this.props.history.push("/login");
    }
  }

  render() {
    return null;
  }
}

export default withRouter(CheckLogin);
