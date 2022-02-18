import React from 'react';
import "./Layout.css";
import Footer from './NormalFooter/NormalFooter';
import Header from './NormalHeader/NormalHeader';

const General = ({ children }) => {

    return (
        <div id="BG">
            <div className='topBar'></div>
            <Header />
            { children }
            <Footer />
        </div>
    );
};

export default General;