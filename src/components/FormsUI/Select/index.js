/*
#################################################################################################################

File Name           :    Select/index.js
Component Name      :    Single Select
Functionality       :    To use this Select Box as a default component for UI purpose across the whole application to
													maintain same consistency.

#################################################################################################################
 */

import React from "react";
import { FormControl, FormHelperText, makeStyles, MenuItem, Select } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import "./SelectBox.css";

const SelectWrapper = ({
	name,
	options,
	variant,
	required,
	select,
	labelform,
	selectTestID,
	inputTestID,
	value,
	onChange,
	helperText,
	...otherProps
}) => {
	//To return all formik state

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
			<Select {...configSelect} name={name} value={value} onChange={onChange} MenuProps={MenuProps} data-test-id={selectTestID ?? "selectBox"} inputProps={{ "data-test-id": inputTestID ?? "selectInput" }}>
				{selectMF.map((nam) => (
					<MenuItem key={nam.value} value={nam.value}>
						<span className="subOption" value={nam.value}>{nam.label ? nam.label : nam.value}</span>
					</MenuItem>
					// <option value={nam.value}>{nam.value}</option>
				))}
			</Select>
			<FormHelperText error={true}>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default SelectWrapper;
