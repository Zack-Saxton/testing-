import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
 
  
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  heading:{
    color: "white"
    
}
}));



export default function MoneySkill() {
  const classes = useStyles();

  return (
    <div >
        
        <Grid container justifyContent={"center"} style={{ marginTop: "-150px" }}>
          <Grid container direction="row" item xs={10}>
            <Typography className={classes.heading} variant="h1">
              Money Skill
            </Typography>
            
          </Grid> 

          <Grid item xs={10}>
            <Paper className={classes.paper} >
                <p >Page Under Development </p>
             
            </Paper>
          </Grid>
        </Grid>

     

    </div>
  );
}
