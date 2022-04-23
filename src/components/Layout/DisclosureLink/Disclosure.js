import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import React from "react";
import { RenderContent } from "../../FormsUI";
import { useStylesDisclosure } from "./Style";
export default function Disclosure(props) {
  const classes = useStylesDisclosure();
  return (
    <div>
      <div className={classes.mainDivDynamicPage}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RenderContent disclosureLink={props.URL} />
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

Disclosure.propTypes = {
  URL: PropTypes.string
};
