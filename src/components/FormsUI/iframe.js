import PropTypes from "prop-types";
import React from "react";
import "./iframe.css";
function Iframe(props) {
  return (<div id="insideIframe" dangerouslySetInnerHTML={ props.src } className="iframeStyle" />);
}

Iframe.propTypes = {
  src: PropTypes.object
};

export default Iframe;
