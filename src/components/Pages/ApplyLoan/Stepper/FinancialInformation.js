import React, { useState } from "react";
import {
    ButtonSecondary,
  Select,
  TextField,
  Radio,
} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    content_grid:{
        marginTop: "15px"
    }
  
  }));


//View Part
export default function FinancialInformation() {
    const classes = useStyles();
 
  return (
    <div>
      <Grid  sm={5} className={classes.content_grid}>
        <TextField
          name="firstName"
         
          label="Employer Name"
         
        />
        </Grid>

        <Grid  sm={5} className={classes.content_grid}>
        <TextField
          name="firstName"
         
          label="Current Job Title"
         
        />
        </Grid>
        <Grid sm={5} className={classes.content_grid}>
        <Select
              name="select"
              labelform="Years at current address"
              select='[{"value":"0-3"}, {"value":"3-5"},  {"value":"5-10"}]'
            />
        </Grid>

        <Grid sm={5} className={classes.content_grid}>
        <Select
              name="select"
              labelform="How did you hear about us?"
              select='[{"value":"Internet"}, {"value":"Friends"}]'
            />
        </Grid>

       

     
    </div>
  );
}
