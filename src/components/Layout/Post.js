import React from 'react';
import AppBar from './AppBar/SideNav';
import {Grid} from "@material-ui/core";
import "../App/app.css";
import Footer from "../Layout/Footer/Footer"
import CheckLoginStatus from '../App/CheckLoginStatus';


const Post =  ({children}) => {

    return (
        <div>
            <div id="body">
                <CheckLoginStatus />
                <Grid className="sample"/>
                    <AppBar />
                    {children}
            </div>
            <Footer />
        </div>
    )
}

export default Post;