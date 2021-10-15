import React from 'react';
import AppBar from './AppBar/SideNav';
import {Grid} from "@material-ui/core";
import "../App/App.css";
import Footer from "../Layout/Footer/Footer"


const Post =  ({children}) => {

    return (
        <div>
            <div id="body">
                <Grid className="sample"/>
                    <AppBar />
                    {children}
            </div>
            <Footer />
        </div>
    )
}

export default Post;