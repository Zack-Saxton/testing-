import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "../../routes";
import CustomComponents from "../CustomComponent";
import { Grid } from "@material-ui/core";
import "./app.css";

function App() {
  //authentication token
  const [token] = useState();

  //check for authentication token
  if (!token) {
    return (
      <>
        <Router>
          <Grid className="gridStyle">
            <CustomComponents />
          </Grid>
        </Router>
      </>
    );
  }
}

export default App;
