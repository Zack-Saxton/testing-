import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../FormsUI";
import Faq from "./Faq";
import { useStylesFaq } from "./Style";
import "./Style.css";

export default function FaqPostLogin() {

  //Material UI css class
  const classes = useStylesFaq();

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <Grid
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 }>
            <Typography variant="h3" className={ classes.titleHeading }>
              <NavLink
                to="/customers/accountOverview"
                style={ { textDecoration: "none" } }
              >
                <ButtonWithIcon
                  icon="arrow_backwardIcon"
                  iconposition="left"
                  stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px", "marginTop":"unset" }'
                  styleicon='{ "color":"" }'
                />
              </NavLink>{ " " }
              Frequently Asked Questions
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={ 12 }>
          <Faq />
        </Grid>
      </Grid>
    </div>
  );
}
