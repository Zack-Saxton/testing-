import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from '../Login';
import CustomComponents from "../CustomComponent";
import { Grid } from "@material-ui/core";
import "./app.css";

function App() {
  //authentication token
  const [token] = useState();

  //check for authentication token

    return (
      <>
        <Router>
          <Grid className="gridStyle">
            { !token ? <CustomComponents /> : <Login /> }
          </Grid>
        </Router>
      </>
    )
}

export default App;
