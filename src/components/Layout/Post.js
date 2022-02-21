import Cookies from "js-cookie";
import React from "react";
import "../App/App.css";
import CheckLoginStatus from "../App/CheckLoginStatus";
import Footer from "../Layout/Footer/Footer";
import AppBar from "./AppBar/SideNav";
import CheckLoginTimeout from "./CheckLoginTimeout";

const Post = ({ children }) => {

    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');

    return (
        <div>
            <CheckLoginTimeout />
            {
                loginToken.isLoggedIn === true ?
                    <>
                        <div id="body">
                            <div className='topBar'></div>
                            <AppBar />
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

export default Post;