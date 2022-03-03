/*#################################################################################################################

File Name           :    DatePicker/index.js
Component Name      :    DatePicker
Functionality       :    To use this component to get the date with restrictions to select particular dates like
												 restrict future, past dates, select between given range of dates like that.

#################################################################################################################*/
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@mui/material/Grid";
//import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@mui/lab";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import "date-fns";
import PropTypes from "prop-types";
import React from "react";
import "./DatePicker.css";

const DatePickerWrapper = ({ name, format, label, placeholder, maxdate, minyear, ...otherProps }) => {

	// The first commit of Material-UI
	//const currentDate = new Date();
	const [ selectedDate, setSelectedDate ] = React.useState(null);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const d = new Date();
	const year = d.getFullYear();
	const month = d.getMonth();
	const day = d.getDate();
	const minDate = new Date(year - minyear, month, day);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Grid container justifyContent="space-around">
				<DatePicker
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

					KeyboardButtonProps={ {
						"aria-label": "change date",
					} }
					renderInput={(props) => (
						<TextField {...props} helperText="valid mask" />
					  )}
					// { ...otherProps }
					// inputProps={ { "data-test-id": "datePicker" } }

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
	maxdate: PropTypes.instanceOf(Date),
	minyear: PropTypes.number
};

export default DatePickerWrapper;