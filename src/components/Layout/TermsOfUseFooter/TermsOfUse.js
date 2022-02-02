import React from "react";
import "./Style.css";
import { useStylesTermsOfUse } from "./Style";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { RenderContent } from "../../FormsUI";



export default function TermsOfUse() {
    const classes = useStylesTermsOfUse();

    
  //View part
  return (
    <div >
      <div className="mainDiv">
   
        <Grid  item xs={ 12 }>
        <Paper  className={ classes.paper }>
           
          <RenderContent disclosureLink="/cacTermsOfUse" />
            </Paper>

        </Grid>
        
      </div>
    </div>
  );
}