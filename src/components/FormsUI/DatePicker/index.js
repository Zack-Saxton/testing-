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

const DatePickerWrapper = ({ name, format, ...otherProps }) => {

	// The first commit of Material-UI
	const [selectedDate, setSelectedDate] = React.useState(
		new Date()
	);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth={true}>
			<Grid container justify="space-around">
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label="Date picker dialog"
					format= { format ?? 'MM/dd/yyyy'}
					value={selectedDate}
					onChange={handleDateChange}
					fullWidth={true}
					// maxDate= {Date(1900-01-01)}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
					orientation="landscape"
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
