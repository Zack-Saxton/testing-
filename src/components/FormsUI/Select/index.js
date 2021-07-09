/*
#################################################################################################################
 
File Name           :    Select/index.js
Component Name      :    Single Select
Functionality       :    To use this Select Box as a default component for UI purpose across the whole application to 
                          maintain same consistency.
 
#################################################################################################################
 */

import React from "react";
import { FormControl, makeStyles, MenuItem, Select, FormHelperText } from "@material-ui/core";
import { useField } from "formik";
import InputLabel from "@material-ui/core/InputLabel";

const SelectWrapper = ({
	name,
	options,
	variant,
	required,
	select, 
	labelform,
	value,
	helperText,
	...otherProps
}) => {
	//To return all formik state
	
	const [selectVal, setSelectVal] = React.useState('');

	const handleChange = (event) => {
		setSelectVal(event.target.value);
		value = event.target.value;
		console.log("inside component", event.target.value);
		// onChange(event);
	};

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			
		},
		menu: {
			
		},
	}));

	const classes = useStyles();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 150,
			},
		},
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "left",
		},
		transformOrigin: {
			vertical: "top",
			horizontal: "left",
		},
		getContentAnchorEl: null,
	};

	//Configuring Field with Properties
	const configSelect = {
		...otherProps,
		fullWidth: true,
		variant: variant,
		className: classes.menu,

		// onChange: handleChange,
	};
	const configFormControl = {
		className: classes.formControl,
		// required: true,
		fullWidth: true,
	};

	//Validation Part

	let selectMF = JSON.parse(select);

	//View Part
	return (
		<FormControl {...configFormControl}>
			<InputLabel>{labelform}</InputLabel>
			<Select {...configSelect} name={name} value={value} MenuProps={MenuProps} data-testid= "selectBox" inputProps={{"data-testid": "selectInput"}}>
				{selectMF.map((nam) => (
					<MenuItem key={nam.value} value={nam.value}>
						<option value={nam.value}>{nam.value}</option>
					</MenuItem>
					// <option value={nam.value}>{nam.value}</option>
				))}
			</Select>
			<FormHelperText error={true}>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default SelectWrapper;
