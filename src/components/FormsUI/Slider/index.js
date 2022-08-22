/*#################################################################################################################

File Name           :    Slider/index.js
Component Name      :    Slider
Functionality       :    To use this component to select a value using the slider input

#################################################################################################################*/
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import "./Slider.css";

//Initial Value points
const marks = [
  {
    value: 1000,
    label: "$1,000",
  },
  {
    value: 25000,
    label: "$25,000",
  },
];

//to add $ sign with value
function valuetext(value) {
  return `$${ value }`;
}

//Component initialization
const TextfieldWrapper = ({
  name,
  label,
  min,
  setSelect,
  max,
  difference,
  defaultValue,
  customMarks,
  amount,
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
    hideSection:{
      display:"none"
    },
    showSection: {
      display: "block",
    },
    '& .MuiSlider-thumb':{
      color:"red !important"
    },
    test:{
      color:"red"
    },
    MuiSliderMarkLabel: {},
  }));

  const classes = useStyles();
  const [ value, setValue ] = useState(defaultValue ?? 12500);
  const handleSliderChange = (event, newValue) => {

    if (newValue > 5000) {
      if (!(newValue % 500)) {
        setValue(newValue);
        setSelect(newValue);
      }
      else {
        setValue(newValue - (newValue % 500));
        setSelect(newValue - (newValue % 500));
      }
    }
    else {
      setValue(newValue);
      setSelect(newValue);
    }
  };

  const [ display, setdisplay ] = useState(false);
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
    marks: customMarks ?? marks,
    // track: false,
  };

useEffect(() => {
  if (amount === false){
    setdisplay(true);
  } 
},[amount])

  return (
    <div className={classes.FormControlWrap}>
      <FormControl fullWidth={true}>
        <div className={classes.center}>
          <Typography
            className={classes.label}
            id="discrete-slider-always"
            gutterBottom
          >
            <span className="sliderLabelWrap">
                        <span>Select Loan Amount†</span>
                        <span className="minAndMaxDiv">
                          <span className="minDiv">Min<br/><NumberFormat value={min} displayType={'text'} thousandSeparator={true} decimalScale={0} fixedDecimalScale={true} prefix={'$'} /></span>
                          <span id="selectedAmountText" className={display ? classes.showSection : classes.hideSection}> 
                            <NumberFormat value={value} displayType={'text'} thousandSeparator={true} decimalScale={0} fixedDecimalScale={true} prefix={'$'} />
                          </span>
                          <span className="maxDiv">Max<br/><NumberFormat value={max} displayType={'text'} thousandSeparator={true} decimalScale={0} fixedDecimalScale={true} prefix={'$'} /></span>
                        </span>
              </span>
          </Typography>
        </div>
        <div>
          
        </div>
        <Slider  className={`${classes.test}`} {...config} {...otherProps} name={name}/>
      </FormControl>
    </div>
  );
};

TextfieldWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.object,
  min: PropTypes.number,
  setSelect: PropTypes.func,
  max: PropTypes.number,
  difference: PropTypes.number,
  defaultValue: PropTypes.number,
  customMarks: PropTypes.object,
  amount: PropTypes.bool,
};

export default TextfieldWrapper;
