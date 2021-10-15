import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckLoginStatus from "../../App/CheckLoginStatus";

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



export default function MyProfile() {
  const classes = useStyles();

  return (
    <div >
        <CheckLoginStatus/>
        <Grid container justifyContent={"center"} style={{ marginTop: "-150px" }}>
          <Grid container direction="row" item xs={10}>
            <Typography variant="h1" className={classes.heading}>
                My Profile
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
