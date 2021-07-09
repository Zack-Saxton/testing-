import React from 'react';
import AppBar from './AppBar/AppBar';
import { Grid } from "@material-ui/core";
import "../App/app.css";
import Footer from "../Layout/Footer/Footer"


const Post =  ({children}) => {

    console.log('render Main Admin')

    return (
        <div>
            <div id="body">
                <Grid className="sample"></Grid>
                    <AppBar />
                    {children}
            </div>
            <Footer />
        </div>
    )
}

export default Post;