/*#################################################################################################################

File Name           :    TableCellWrapper/index.js
Component Name      :    TableCellWrapper
Functionality       :    To use this component to create the body of the table using table cell objects.

#################################################################################################################*/
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

//Initializing tablecellwrapper
const TableCellWrapper = ({ parseData, className, align, ...otherProps }) => {
	const BuildCell = (data) => {
		var dom_content = [];
		for (var key in data.data) {
			dom_content.push(
				<TableCell
					key = {Math.random()*1000}
					className={ data.data[ key ].className }
					align={ data.data[ key ].align }
				>
					{ data.data[ key ].value }
				</TableCell>
			);
		}
		return dom_content;
	};

	const BuildTable = (data) => {
		var dom_content = [];
		if (data) {
			data.data.forEach(function (arrayItem) {
				dom_content.push(
					<TableRow key={Math.random()*1000}>
						<BuildCell data={ arrayItem } />
					</TableRow>
				);
			});
		}

		return dom_content;
	};

	return (
		<TableBody>
			<BuildTable data={ parseData } />
		</TableBody>
	);
};

export default TableCellWrapper;
