/*
#################################################################################################################
 
File Name           :    Select/index.js
Component Name      :    Single Select
Functionality       :    To use this Select Box as a default component for UI purpose across the whole application to 
                          maintain same consistency.
 
#################################################################################################################
 */

import React from "react";
import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useField } from "formik";
import InputLabel from "@material-ui/core/InputLabel";

const SelectWrapper = ({
	name,
	options,
	variant,
	required,
	select,
	labelform,

	...otherProps
}) => {
	//To return all formik state
	const [field] = useField(name);

	const [setselect, setSelect] = React.useState([]);

	const handleChange = (event) => {
		setSelect(event.target.value);
	};

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			maxWidth: 300,
		},
		menu: {
			width: 200,
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
		...field,
		...otherProps,
		fullWidth: true,
		variant: variant,
		className: classes.menu,

		onChange: handleChange,
	};
	const configFormControl = {
		className: classes.formControl,
		required: true,
	};

	//Validation Part

	let selectMF = JSON.parse(select);

	//View Part
	return (
		<FormControl {...configFormControl}>
			<InputLabel>{labelform}</InputLabel>
			<Select {...configSelect} value={setselect} MenuProps={MenuProps}>
				{selectMF.map((nam) => (
					<MenuItem key={nam.value} value={nam.value}>
						{nam.value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectWrapper;
