import React from 'react';
import "./Layout.css";
import Footer from './NormalFooter/NormalFooter';
import Header from './NormalHeader/NormalHeader';

const General = ({ children }) => {

    return (
        <div id="BG">
            <Header />
            { children }
            <Footer />
        </div>
    );
};

export default General;