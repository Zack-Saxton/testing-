import React from 'react';
import "./Layout.css";
import Footer from './NormalFooter/NormalFooter';
import Header from './NormalHeader/NormalHeader';
import CheckLoginTimeout from "./CheckLoginTimeout";
import Cookies from "js-cookie";

const General = ({ children }) => {

    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    return (
        <div id="BG">
            {
                loginToken.isLoggedIn === true ? <CheckLoginTimeout /> : null
            }
            <div className='topBar'></div>
            <Header />
            { children }
            <Footer />
        </div>
    );
};

export default General;