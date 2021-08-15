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
 
const DatePickerWrapper = ({ name, format, defaultDate,label, placeholder,maxdate, ...otherProps }) => {

	// The first commit of Material-UI
	//const currentDate = new Date();
	const [selectedDate, setSelectedDate] = React.useState( null);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label={label}   
					fullWidth={true}
					format= { format ?? 'MM-dd-yyyy'}
					value={selectedDate}
					onChange={handleDateChange}
					minDate={new Date("1940-01-01")}
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