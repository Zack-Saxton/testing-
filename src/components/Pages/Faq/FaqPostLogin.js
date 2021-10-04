import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { ButtonWithIcon } from "../../FormsUI";
import { useStylesFaq } from "./Style";
import "./Style.css";
import Faq from "./Faq";

export default function FaqPostLogin() {
  const classes = useStylesFaq();
  //Load data
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        style={{
          marginTop: "-150px",
          paddingRight: "30px",
          paddingLeft: "30px",
          paddingBottom: "30px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.titleHeading}>
              <NavLink
                to="/customers/accountOverview"
                style={{ textDecoration: "none" }}
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
              </NavLink>{" "}
              Frequently Asked Questions
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Faq />
        </Grid>
      </Grid>
    </div>
  );
}
