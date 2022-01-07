/*#################################################################################################################
 
File Name           :    DatePicker/index.js
Component Name      :    DatePicker
Functionality       :    To use this component to get the date with restrictions to select particular dates like 
                         restrict future, past dates, select between given range of dates like that.
 
#################################################################################################################*/
import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import "./DatePicker.css";

const DatePickerWrapper = ({ name, format, defaultDate,label, placeholder,maxdate,minyear, ...otherProps }) => {

	// The first commit of Material-UI
	//const currentDate = new Date();
	const [selectedDate, setSelectedDate] = React.useState(' ');
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const d = new Date();
	const year = d.getFullYear();
	const month = d.getMonth();
	const day = d.getDate();
	const minDate = new Date(year - minyear, month, day);


	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justifyContent="space-around">
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label={label}   
					fullWidth={true}
					format= { format ?? 'MM/dd/yyyy'}
					value={selectedDate}
					onChange={handleDateChange}
					InputAdornmentProps={{ position: 'start' }}
					minDate={minDate}
					maxDate={new Date(maxdate)}
					placeholder={placeholder}
					
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
					
					
					{...otherProps}
					inputProps={{"data-test-id":"datePicker"}}
					
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};
 
DatePickerWrapper.propTypes = {
    name: PropTypes.string.isRequired,
};
 
export default DatePickerWrapper;