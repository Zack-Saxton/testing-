import React from 'react';
import Header from './NormalHeader/NormalHeader';
import Footer from './NormalFooter/NormalFooter';


const General =  ({children}) => {

    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default General;