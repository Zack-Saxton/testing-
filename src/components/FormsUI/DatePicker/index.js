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
	KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePickerWrapper = ({ name, format, defaultDate,label, ...otherProps }) => {

	// The first commit of Material-UI
	const currentDate = new Date();
	const [selectedDate, setSelectedDate] = React.useState( defaultDate ?? currentDate);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	var myDate = new Date();
	myDate.setDate(myDate.getDate() + 3);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth={true}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label={label}
					format= { format ?? 'MM/dd/yyyy'}
					value={selectedDate}
					onChange={handleDateChange}
					fullWidth={true}	
					// maxDate= { new Date("2021-06-29T21:11:54")}
					maxDate= { myDate }
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
					orientation="landscape"
					inputProps={{"data-testid":"datePicker"}}
					{...otherProps}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

DatePickerWrapper.propTypes = {
	name: PropTypes.string.isRequired,
};

export default DatePickerWrapper;
