/*#################################################################################################################

File Name           :    Slider/index.js
Component Name      :    Slider
Functionality       :    To use this component to select a value uisng the slider input

#################################################################################################################*/
import React, { useState } from "react";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import "./slider.css";

//Initial Value points
const marks = [
  {
    value: 1000,
    label: "$1000",
  },
  {
    value: 25000,
    label: "$25000",
  },
];

//to add $ sign with value
function valuetext(value) {
  return `$${value}`;
}

//Component initialization
const TextfieldWrapper = ({
  name,
  label,
  min,
  max,
  difference,
  defaultValue,
  ...otherProps
}) => {
  //Set Formik field

  const [field, mata, helpers] = useField(name);

  // Styling part
  const useStyles = makeStyles((theme) => ({
    cssLabel: {
      backgroundColor: "red",
      fontSize: "20px",
      padding: "20px",
    },

    sliderWrap: {
      width: "100%",
      fontSize: "1.3rem",
      color: "#134ca7",
      fontWeight: "700",
    },

    label: {
      fontSize: "1.2rem",
    },
    FormControlWrap: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    OutputText: {
      fontSize: "1.3rem",
      color: "#134ca7",
      fontWeight: "700",
    },
    center: {
      textAlign: "center",
    },
    MuiSliderMarkLabel: {},
  }));

  const classes = useStyles();
  const [value, setValue] = useState(12500);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    helpers.setValue(newValue);
  };

  //Configuring the field with properties
  const configTextfield = {
    name: name,
    ...field,
    ...otherProps,
    className: classes.sliderWrap,
    value: typeof value === "number" ? value : 0,
    onChange: handleSliderChange,
    defaultValue: 12500,
    getAriaValueText: valuetext,
    step: 500,
    min: 1000,
    max: 25000,
    marks: marks,
    track: false,
  };

  return (
    <div className={classes.FormControlWrap}>
      <FormControl fullWidth={true}>
        <div className={classes.center}>
          <Typography
            className={classes.label}
            id="discrete-slider-always"
            gutterBottom
          >
            {label}
          </Typography>
        </div>
        <Slider {...configTextfield} {...otherProps} />
      </FormControl>
      <div className={classes.center}>
        <Typography id="discrete-slider-always" className={classes.OutputText}>
          $ {value}
        </Typography>
      </div>
    </div>
  );
};

TextfieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextfieldWrapper;
