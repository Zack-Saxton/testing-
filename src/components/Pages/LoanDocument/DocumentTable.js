import React from "react";
import { useStylesLoanDocument } from "./Style";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  documentdownload as downloadDocument,
  documentprint as documentprint,
} from "../../controllers/LoanDocumentController";
import PrintIcon from "@material-ui/icons/Print";
import Moment from "moment";
import GetAppIcon from "@material-ui/icons/GetApp";

//View Part
export default function LoanDocumentTable(userLoanDocumentData) {
  const classes = useStylesLoanDocument();

  let userLoanDocument =
    userLoanDocumentData != null ? userLoanDocumentData : null;

  const downloadDoc = (id, name) => {
    downloadDocument(id, name);
  };

  const printDoc = (id, name) => {
    documentprint(id, name);
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>Document Name</TableCell>
            <TableCell className={classes.tableHead}>Date Uploaded</TableCell>
            <TableCell className={classes.tableHead}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userLoanDocument.userLoanDocumentData.length ? (
            userLoanDocument.userLoanDocumentData.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  {row.displayname}
                </TableCell>
                <TableCell className={classes.tableHeadRow}>
                  {Moment(row.date_uploaded).format("MM-DD-YYYY")}
                </TableCell>
                <TableCell className={classes.tableHeadRow}>
                  <PrintIcon style={{ color: "blue" }}
                    onClick={() =>
                      printDoc(row.downloadProp.file_id, row.downloadProp.name)
                    }
                  />{" "}
                  <GetAppIcon style={{ color: "blue" }}
                    onClick={() =>
                      downloadDoc(
                        row.downloadProp.file_id,
                        row.downloadProp.name
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" align="center">
                You do not have any documents
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
