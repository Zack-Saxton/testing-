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
import {
    MuiPickersUtilsProvider,
   
	KeyboardDatePicker
} from "@material-ui/pickers";
import "./datePicker.css";
 
const DatePickerWrapper = ({ name, format, defaultDate,label, placeholder,maxdate,minyear, ...otherProps }) => {

	// The first commit of Material-UI
	//const currentDate = new Date();
	const [selectedDate, setSelectedDate] = React.useState( null);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	var d = new Date();
	var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var minDate = new Date(year - minyear, month, day);
	

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
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
					inputProps={{"data-testid":"datePicker"}}
					
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};
 
DatePickerWrapper.propTypes = {
    name: PropTypes.string.isRequired,
};
 
export default DatePickerWrapper;