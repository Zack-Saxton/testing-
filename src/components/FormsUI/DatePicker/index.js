/*#################################################################################################################

File Name           :    DatePicker/index.js
Component Name      :    DatePicker
Functionality       :    To use this component to get the date with restrictions to select particular dates like
												 restrict future, past dates, select between given range of dates like that.

#################################################################################################################*/
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "./DatePicker.css";

const DatePickerWrapper = ({ name, format, label, refId,
	placeholder, maxdate, minyear, ...otherProps }) => {

	// The first commit of Material-UI
	//const currentDate = new Date();
	const [ selectedDate, setSelectedDate ] = useState(null);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const dateNow = new Date();
	const year = dateNow.getFullYear();
	const month = dateNow.getMonth();
	const day = dateNow.getDate();
	const minDate = new Date(year - minyear, month, day);

	return (
		<MuiPickersUtilsProvider utils={ DateFnsUtils }>
			<Grid container justifyContent="space-around">
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label={ label }
					fullWidth={ true }
					format={ format ?? 'MM/dd/yyyy' }
					value={ selectedDate }
					onChange={ handleDateChange }
					InputAdornmentProps={ { position: 'start' } }
					minDate={ minDate }
					maxDate={ new Date(maxdate) }
					placeholder={ placeholder }
					KeyboardButtonProps={ {	"aria-label": "change date"} }
					{ ...otherProps }
					inputProps={ { "data-test-id": "datePicker", ref: refId } }
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

DatePickerWrapper.propTypes = {
	name: PropTypes.string.isRequired,
	format: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	maxdate: PropTypes.instanceOf(Date),
	minyear: PropTypes.number,
	refId: PropTypes.object

};

export default DatePickerWrapper;