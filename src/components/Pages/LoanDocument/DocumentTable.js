import GetAppIcon from "@mui/icons-material/GetApp";
import PrintIcon from "@mui/icons-material/Print";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Moment from "moment";
import React from "react";
import { documentdownload as downloadDocument, documentprint as printDocument } from "../../Controllers/LoanDocumentController";
import { useStylesLoanDocument } from "./Style";

export default function LoanDocumentTable(userLoanDocumentData) {

  //Material UI css class
  const classes = useStylesLoanDocument();
  //Loan Document data from API
  let userLoanDocument = userLoanDocumentData;
  //Download loan document
  const downloadDoc = (id, name, fileURL) => {
    downloadDocument(id, name, fileURL);
  };
  //Print loan document
  const printDoc = (id, name, fileURL) => {
    printDocument(id, name, fileURL);
  };
  const outputDateFormat = 'MM/DD/YYYY';

  //View Part
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
          {userLoanDocument?.userLoanDocumentData?.length ? (
            userLoanDocument.userLoanDocumentData.map((row) => (
              <TableRow key={(Math.random() * 1000)}>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  {row.displayname}
                </TableCell>
                <TableCell className={classes.tableHeadRow}>
                  {Moment(new Date(row.date_uploaded)).format(outputDateFormat)}
                </TableCell>
                <TableCell className={classes.tableHeadRow}>
                  <PrintIcon className={classes.appIcon}
                    onClick={() =>
                      printDoc(row.downloadProp.file_id, row.downloadProp.name, row.downloadProp.fileURL)
                    }
                  />{" "}
                  <GetAppIcon className={classes.appIcon}
                    onClick={() =>
                      downloadDoc(row.downloadProp.file_id, row.downloadProp.name, row.downloadProp.fileURL)
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
