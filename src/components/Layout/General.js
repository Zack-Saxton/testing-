import React from 'react';
import Header from './NormalHeader/NormalHeader';
import Footer from './NormalFooter/NormalFooter';
import "./Layout.css"


const General = ({ children }) => {

    return (
        <div id="BG">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default General;