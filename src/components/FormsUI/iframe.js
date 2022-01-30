import React from "react";
function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ props.src } style={ { height: "500px" } } />);

}
export default Iframe;
