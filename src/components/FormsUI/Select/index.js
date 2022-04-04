/*
#################################################################################################################

File Name           :    Select/index.js
Component Name      :    Single Select
Functionality       :    To use this Select Box as a default component for UI purpose across the whole application to
													maintain same consistency.

#################################################################################################################
 */

import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import React from "react";
import "./SelectBox.css";

const SelectWrapper = ({
	name,
	variant,
	required,
	select,
	labelform,
	selectTestID,
	inputTestID,
	value,
	onChange,
	helperText,
	refId,
	...otherProps
}) => {
	//To return all formik state

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
		}
	}));

	const classes = useStyles();	

	//Configuring Field with Properties
	const configSelect = {
		...otherProps,
		fullWidth: true,
		variant: variant,
		};
	const configFormControl = {
		className: classes.formControl,
		fullWidth: true,
	};

	//Validation Part
	let selectMF = JSON.parse(select);

	//View Part
	return (
		<FormControl { ...configFormControl }>
			<InputLabel>{ labelform }</InputLabel>
			<Select { ...configSelect } name={ name } value={ value } onChange={ onChange } inputRef={ refId } data-test-id={ selectTestID ?? "selectBox" } inputProps={ { "data-test-id": inputTestID ?? "selectInput" } }>
				{ selectMF.map((nam) => (
					<MenuItem key={ nam.value } value={ nam.value }>
						<span className="subOption" value={ nam.value }>{ nam.label ? nam.label : nam.value }</span>
					</MenuItem>
				)) }
			</Select>
			<FormHelperText error={ true }>{ helperText }</FormHelperText>
		</FormControl>
	);
};

SelectWrapper.propTypes = {
	name: PropTypes.string.isRequired,
	variant: PropTypes.string,
	required: PropTypes.bool,
	select: PropTypes.string,
	labelform: PropTypes.string,
	selectTestID: PropTypes.string,
	inputTestID: PropTypes.string,
	refId: PropTypes.object,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	onChange: PropTypes.func,
	helperText: PropTypes.string,
};

export default SelectWrapper;
