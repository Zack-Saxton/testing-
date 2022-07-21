import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React from 'react';
import CheckLoginTimeout from "./CheckLoginTimeout";
import "./Layout.css";
import Footer from './NormalFooter/NormalFooter';
import HeaderWithoutMenu from './NormalHeader/HeaderWithoutMenu';
import Header from './NormalHeader/NormalHeader';
import GA4 from "../Layout/ga4/GA4";

const General = ({ children, skipHeaderMenu }) => {

    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    return (
        <div id="BG">
            <GA4 />
            {
                loginToken.isLoggedIn ? <CheckLoginTimeout /> : null
            }
            <div className='topBar'></div>
            {skipHeaderMenu ? <HeaderWithoutMenu /> : <Header />}
            {children}
            <Footer />
        </div>
    );
};

General.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]),
    skipHeaderMenu: PropTypes.bool
};

export default General;