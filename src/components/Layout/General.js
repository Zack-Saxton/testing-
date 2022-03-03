import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React from 'react';
import CheckLoginTimeout from "./CheckLoginTimeout";
import "./Layout.css";
import Footer from './NormalFooter/NormalFooter';
import Header from './NormalHeader/NormalHeader';

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

General.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ])
};

export default General;