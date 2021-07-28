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
  setSelect,
  max,
  select,
  difference,
  defaultValue,
  customMarks,
  ...otherProps
}) => {
  //Set Formik field


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
      fontSize: "1rem",
      color: "#134ca7",
      fontWeight: "500",
    },
    center: {
      textAlign: "center",
    },
    MuiSliderMarkLabel: {},
  }));

  const classes = useStyles();
  const [value, setValue] = useState(defaultValue ?? 12500);
  const handleSliderChange = (event, newValue) => {
    if(newValue > 5000)
    {
      if(newValue % 500 === 0)
      {
        setValue(newValue);
        setSelect(newValue);
      }
    }
    else{
      setValue(newValue);
      setSelect(newValue);
    }
   
  };

  //Configuring the field with properties
  const config = {
    name: name,
    ...otherProps,
    className: classes.sliderWrap,
    value: typeof value === "number" ? value : 0,
    onChange: handleSliderChange,
    defaultValue: defaultValue ?? 12500,
    getAriaValueText: valuetext,
    step: difference ?? 250,
    min: min ?? 1000,
    max: max ?? 25000,
    marks: customMarks ?? marks ,
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
        <Slider {...config} {...otherProps} name={name} 
/>
      </FormControl>
      <div className={classes.center}>
        <Typography id="discrete-slider-always" variant='h6'  className={classes.OutputText}>
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
