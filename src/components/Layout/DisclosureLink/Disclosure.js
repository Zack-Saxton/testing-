import React from "react"
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RenderContent } from "../../FormsUI";
import { useStylesDisclosure } from "./Style";
export default function Disclosure(props) {
  const classes = useStylesDisclosure();
  return (
    <div>
      <div className={ classes.mainDivDynamicPage }>
        <Grid item xs={ 12 }>
          <Paper className={ classes.paper }>
            <RenderContent disclosureLink={ props.URL } />
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

Disclosure.propTypes = {
  URL: PropTypes.string
};
