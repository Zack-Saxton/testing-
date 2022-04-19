/*#################################################################################################################

File Name           :    SocialSecurityNumber/index.js
Component Name      :    SocialSecurityNumber
Functionality       :    To use this component to validate and get the SSN in the correct format from the user.

#################################################################################################################*/
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import React, { useState } from "react";
import InputMask from "react-input-mask";

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
	const [ unmaskedval, setUnMaskedVal ] = useState("");

	const handleChange = (event) => {
		setUnMaskedVal(
			event.target.value.replace(/-/g, "").replace(/ /g, "") || ""
		);

		if (onChange) {
			onChange(event);
		}
	};

	return (
		<FormControl fullWidth={ true }>
				<InputMask
					fullWidth={ true }
					mask={ mask ? mask : "999-99-9999" }
					value={ value }
					name={ name }
					onChange={ handleChange }
					disabled={ false }
					maskChar=""
					{ ...otherProps }
				>
					{ () => (
						<TextField
							label={ label }
							name={ name }
							error={ error }
							placeholder={ placeholder }
							helperText={ helperText }
							variant="standard"
							inputProps={ { "data-test-id": "ssn", unmaskedval: unmaskedval } }
						/>
					) }
				</InputMask>
		</FormControl>
	);
};

SSNWrapper.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	error: PropTypes.bool,
	required: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func,
	helperText: PropTypes.string,
	setError: PropTypes.string,
	setHelperText: PropTypes.string,
	placeholder: PropTypes.string,
	mask: PropTypes.string,
};

export default SSNWrapper;
