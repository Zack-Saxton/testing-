import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesNoOfferAvailable } from "./Style";
import "./Style.css";

export default function NoOfferAvailable() {
  //Material UI css class
  const classes = useStylesNoOfferAvailable();

  //View part
  return (
    <div data-testid = "noOffer_component">
      <div className={classes.mainContentBackground} id="mainContentBackground">
        <Box>
          <Grid
            xs={12}
            item
            container
            justifyContent="center"
            alignItems="center"
            className={classes.gridInsideBox}
          >
            <Grid
              xs={11}
              sm={10}
              md={8}
              lg={6}
              xl={6}
              className="cardWrapper"
              justifyContent="center"
              alignItems="center"
              container
              item
            >
              <Paper className={classes.paper}>
                <Typography
                  className={classes.title}
                  data-testid="title"
                  color="textSecondary"
                >
                  Thank you for applying to Mariner Finance!
                </Typography>

                <Typography  data-testid="noOfferParagraph" className={classes.noOfferParagraph}>
                  Unfortunately, we are unable to offer you a loan at this time.
                  Please note that your credit score was not impacted in any way
                  by this process.
                </Typography>

                <Typography className={classes.noOfferParagraph}>
                  Thank you once again for your interest in Mariner Finance.
                </Typography>

                <Grid item xs={12} className={classes.noOfferButtonGrid}>
                <NavLink
                  to="/select-amount"
                  className={classes.noOfferNavLink}
                >
                  <ButtonPrimary
                    type="submit"
                    data-testid="submit"
                    stylebutton='{"background": "", "color":"", "fontSize" : "15px ! important", "padding" : "0px 30px" }'
                  >
                    Apply again?
                  </ButtonPrimary>
                  </NavLink>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
