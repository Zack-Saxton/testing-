import React from 'react';
import Footer from '../NormalFooter/NormalFooter';
import BranchHeader from './BranchHeader';

const BranchHeaderLayout = ({ children }) => {

    return (
        <div id="BG">
            <div className='topBar'></div>
            <BranchHeader />
            { children }
            <Footer />
        </div>
    );
};

export default BranchHeaderLayout;