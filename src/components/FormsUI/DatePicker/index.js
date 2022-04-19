/*#################################################################################################################

File Name           :    DatePicker/index.js
Component Name      :    DatePicker
Functionality       :    To use this component to get the date with restrictions to select particular dates like
												 restrict future, past dates, select between given range of dates like that.

#################################################################################################################*/
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import globalMessages from '../../../assets/data/globalMessages.json';
import "date-fns";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "./DatePicker.css";

const DatePickerWrapper = ({ format, label, views,
	placeholder,required,  onChange, disableDate, disablePastDate,
	maxdate, minyear,error, helperText, value, ...otherProps }) => {

	const [ selectedDate, setSelectedDate ] = useState(value ?? null);	
  const [ errorTF, setErrorTF ] = useState(false);
  const [ helperTextTF, setHelperTextTF ] = useState("");
	
	const handleDateChange = (event) => {
		setSelectedDate(event);
		setErrorTF((required && !event.target.value));
    setHelperTextTF((required && !event.target.value) ? globalMessages.required : '');
    if (onChange) {
      onChange(event);
    }
	};

	const disableCustomDate = (event) => {
		if (disableDate)
		{
			disableDate(event)
		}
	}
	const dateNow = new Date();
	const year = dateNow.getFullYear();
	const month = dateNow.getMonth();
	const day = dateNow.getDate();
	const minDate = new Date(year - minyear, month, day);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Grid container justifyContent="space-around">
				<DatePicker
					margin="normal"
					id="date-picker-dialog"
					label={ label }					
					inputFormat={ format ?? 'MM/dd/yyyy' }	
					onChange={ handleDateChange }
					value={ selectedDate }
					InputAdornmentProps={ { position: 'start' } }
					minDate={ minDate }
					maxDate={ new Date(maxdate) }
					shouldDisableDate = {disableCustomDate}
					disablePast = {disablePastDate === "true" ? true : false}
          views={views ?? ['year', 'month', 'day']}
					renderInput={(props) => (
					<TextField 
						{...props} 
						 { ...otherProps }
						fullWidth={ true }
						placeholder={ placeholder }						
    				error={ error ? error : errorTF}
    				helperText= {error ? helperText : helperTextTF}						
						variant="standard" />
					  )} 
				/>
			</Grid>
		</LocalizationProvider>
	);
};

DatePickerWrapper.propTypes = {
	name: PropTypes.string.isRequired,
	format: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.instanceOf(Date),
	maxdate: PropTypes.instanceOf(Date),
	minyear: PropTypes.number,
	helperText: PropTypes.string,
	error: PropTypes.bool,
	required: PropTypes.string,
	onChange: PropTypes.func,
	views : PropTypes.array,
	disablePastDate : PropTypes.string,
	disableDate : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
};

export default DatePickerWrapper;