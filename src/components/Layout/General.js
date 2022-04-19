import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React from 'react';
import CheckLoginTimeout from "./CheckLoginTimeout";
import "./Layout.css";
import Footer from './NormalFooter/NormalFooter';
import Header from './NormalHeader/NormalHeader';
import HeaderWithoutMenu from './NormalHeader/HeaderWithoutMenu';

const General = ({ children, skipHeaderMenu }) => {

    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    return (
        <div id="BG">
            {
                loginToken.isLoggedIn ? <CheckLoginTimeout /> : null
            }
            <div className='topBar'></div>
            {skipHeaderMenu ? <HeaderWithoutMenu /> :  <Header /> }
            { children }
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