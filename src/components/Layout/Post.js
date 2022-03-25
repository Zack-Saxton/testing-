import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React from "react";
import "../App/App.css";
import CheckLoginStatus from "../App/CheckLoginStatus";
import Footer from "../Layout/Footer/Footer";
import AppBar from "./AppBar/SideNav";
import CheckLoginTimeout from "./CheckLoginTimeout";

const Post = ({ children, ...referenceID  }) => {

    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');

    return (
        <div>
            <CheckLoginTimeout />
            {
                loginToken.isLoggedIn ?
                    <>
                        <div id="body">
                            <div className='topBar'></div>
                            <AppBar refIdProp = {referenceID} />
                            { children }
                            <Footer />
                        </div>
                    </>
                    :
                    <CheckLoginStatus />
            }
        </div>
    );
};

Post.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ])
};

export default Post;