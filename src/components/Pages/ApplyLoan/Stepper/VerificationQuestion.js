import React, { useState } from "react";
import {
  ButtonWithIcon,
  PhoneNumber,
  TextField,
  Radio,
} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

  content_grid:{
      marginTop: "15px"
  }

}));


//View Part
export default function VerificationQuestion() {
  const classes = useStyles();

  return (
    <div>
      <p style={{textAlign: "justify"}}>Please answer the questions below to help verify your identity. 
          Please provide your response within 5 minutes.</p>

      <Grid item xs={12} className={classes.content_grid}>
        <Radio
          name="question"
          labelforform="Question 1 goes here?"
          radiolabel='[{"label":"Option1", "value":"option1"},{"label":"Option2", "value":"option2"},
          {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]'
          value="male"
          row={true}
          required={true}
          labelplacement={"end"}
          style={{fontWeight: "normal"}}
        />
      </Grid>

      <Grid item xs={12} className={classes.content_grid}>
        <Radio
          name="question"
          labelforform="Question 2 goes here?"
          radiolabel='[{"label":"Option1", "value":"option1"},{"label":"Option2", "value":"option2"},
          {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]'
          value="male"
          row={true}
          required={true}
          labelplacement={"end"}
          style={{fontWeight: "normal"}}
        />
      </Grid>

      <Grid item xs={12} className={classes.content_grid}>
        <Radio
          name="question"
          labelforform="Question 3 goes here?"
          radiolabel='[{"label":"Option1", "value":"option1"},{"label":"Option2", "value":"option2"},
          {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]'
          value="male"
          row={true}
          required={true}
          labelplacement={"end"}
          style={{fontWeight: "normal"}}
        />
      </Grid>

      <Grid item xs={12} className={classes.content_grid}>
        <Radio
          name="question"
          labelforform="Question 4 goes here?"
          radiolabel='[{"label":"Option1", "value":"option1"},{"label":"Option2", "value":"option2"},
          {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]'
          value="male"
          row={true}
          required={true}
          labelplacement={"end"}
          style={{fontWeight: "normal"}}
        />
      </Grid>

      
    </div>
  );
}
