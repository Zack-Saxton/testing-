/*#################################################################################################################

File Name           :    SocialSecurityNumber/index.js
Component Name      :    SocialSecurityNumber
Functionality       :    To use this component to validate and get the SSN in the correct format from the user.

#################################################################################################################*/
import React, { useState } from "react";
import { useField } from "formik";
import {
	ThemeProvider as MuiThemeProvider,
	createMuiTheme,
} from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import Textfield from "../Textfield/index";
import { TextField, FormLabel, FormControlLabel } from "@material-ui/core";
import Content from "../../../assets/Content/content";

const theme = createMuiTheme();
const SSNWrapper = ({
	name,
	label,
	error,
	required,
	value,
	onChange,
	helperText,
	setError,
	setHelperText,
	...otherProps
}) => {
	// const [mobile, setSSN] = React.useState("");
	const [unMaskedVal, setUnMaskedVal] = useState("");
	// const [isError, setIsError] = useState(false);
	// const [helpertext, setHelpertext] = useState("");

	const handleChange = (event) => {
		setUnMaskedVal(
			event.target.value.replace(/-/g, "").replace(/ /g, "") || ""
		);


		if (onChange) {
			onChange(event);
		}
	};


	return (
		<FormControl fullWidth={true}>
			<MuiThemeProvider theme={theme}>
				<InputMask
					fullWidth={true}
					mask="999-99-9999"
					value={value}
					name={name}
					onChange={handleChange}
					disabled={false}
					maskChar=""
					{...otherProps}
				>
					{() => (
						<TextField
							label={label}
							name={name}
							error={error}
							placeholder="Enter your social security number"
							helperText={helperText}
							inputProps={{ "data-testid": "ssn", unmaskedval: unMaskedVal }}
						/>
					)}
				</InputMask>
			</MuiThemeProvider>
		</FormControl>
	);
};

SSNWrapper.propTypes = {
	name: PropTypes.string.isRequired,
};

export default SSNWrapper;
