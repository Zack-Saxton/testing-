import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React from "react";
import "../App/App.css";
import CheckLoginStatus from "../App/CheckLoginStatus";
import Footer from "../Layout/Footer/Footer";
import AppBar from "./AppBar/SideNav";
import CheckLoginTimeout from "./CheckLoginTimeout";
import GA4 from "../Layout/ga4/GA4";


const Post = ({ children }) => {

    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');

    return (
        <div>
            <GA4 />
            <CheckLoginTimeout />
            {
                
                loginToken.isLoggedIn && loginToken?.isMFA && loginToken?.isMFACompleted ?
                <>
                        <div id="body">
                            <div className='topBar'></div>
                            <AppBar />
                            {children}
                            <Footer />
                        </div>
                    </>
                :
                loginToken.isLoggedIn && !loginToken?.isMFA 
                 ?
                    <>
                        <div id="body">
                            <div className='topBar'></div>
                            <AppBar />
                            {children}
                            <Footer />
                        </div>
                    </>
                     : <CheckLoginStatus />
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