/*#################################################################################################################

File Name           :    SocialSecurityNumber/index.js
Component Name      :    SocialSecurityNumber
Functionality       :    To use this component to validate and get the SSN in the correct format from the user.

#################################################################################################################*/
import React, {useState} from "react";
import {createTheme, ThemeProvider as MuiThemeProvider,} from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";

const theme = createTheme();
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
	placeholder,
	mask,
	...otherProps
}) => {
	const [unmaskedval, setUnMaskedVal] = useState("");

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
					mask={mask ? mask: "999-99-9999"}
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
							placeholder={placeholder}
							helperText={helperText}
							inputProps={{ "data-test-id": "ssn", unmaskedval: unmaskedval }}
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
