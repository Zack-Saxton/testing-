import React from "react";
import PropTypes from "prop-types";
import "./iframe.css";
function Iframe(props) {
    return (<div id="insideIframe" dangerouslySetInnerHTML={ props.src } style={ { height: "500px" } } />);

}

Iframe.propTypes = {
    src: PropTypes.object
  };

export default Iframe;
