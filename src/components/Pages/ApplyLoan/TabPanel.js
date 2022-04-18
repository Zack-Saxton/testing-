import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  //return the JSX part for tab
  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `scrollable-auto-tab-panel-${ index }` }
      aria-labelledby={ `scrollable-auto-tab-${ index }` }
      { ...other }
    >
      { value === index && (
        <Box>
          <div>{ children }</div>
        </Box>
      ) }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;