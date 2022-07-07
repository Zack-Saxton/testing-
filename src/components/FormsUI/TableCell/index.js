/*#################################################################################################################

File Name           :    TableCellWrapper/index.js
Component Name      :    TableCellWrapper
Functionality       :    To use this component to create the body of the table using table cell objects.

#################################################################################################################*/
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React from "react";

//Initializing tablecellwrapper
const TableCellWrapper = ({ parseData, ..._otherProps }) => {
	const BuildCell = (data) => {
		let dom_content = [];
		for (let key in data.data) {
			dom_content.push(
				<TableCell
					key={Math.random() * 1000}
					className={data.data[ key ].className}
					align={data.data[ key ].align}
				>
					{data.data[ key ].value}
				</TableCell>
			);
		}
		return dom_content;
	};

	const BuildTable = (data) => {
		let dom_content = [];
		if (data) {
			data.data.forEach(function (arrayItem) {
				dom_content.push(
					<TableRow key={Math.random() * 1000}>
						<BuildCell data={arrayItem} />
					</TableRow>
				);
			});
		}
		return dom_content;
	};
	return (
		<TableBody
			data-testid="test-table-body"
		>
			<BuildTable data={parseData} />
		</TableBody>
	);
};

TableCellWrapper.propTypes = {
	parseData: PropTypes.array,
	className: PropTypes.object,
	align: PropTypes.string
};

export default TableCellWrapper;
