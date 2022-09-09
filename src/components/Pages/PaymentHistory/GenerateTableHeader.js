import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { useStylesPaymenthistory } from "./Style";

export default function GenerateTableHeader(props) {
  const classes = useStylesPaymenthistory();
  const { headingLabel, columnAlignment } = props;
  return(
    <TableHead>
      <TableRow>
        {
          headingLabel.map((value, index) => (
            <TableCell className={classes.tableHead} align={columnAlignment[index]} key={`generate-table-header-${index}`}>
              { value }
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  );
}

GenerateTableHeader.propTypes = {
  headingLabel: PropTypes.array.isRequired,
  columnAlignment: PropTypes.array.isRequired
};