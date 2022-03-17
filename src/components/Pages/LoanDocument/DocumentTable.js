import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GetAppIcon from "@material-ui/icons/GetApp";
import PrintIcon from "@material-ui/icons/Print";
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
  const downloadDoc = (id, name) => {
    downloadDocument(id, name);
  };
  //Print loan document
  const printDoc = (id, name) => {
    printDocument(id, name);
  };
  const outputDateFormat = 'MM/DD/YYYY';

  //View Part
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={ classes.tableHead }>Document Name</TableCell>
            <TableCell className={ classes.tableHead }>Date Uploaded</TableCell>
            <TableCell className={ classes.tableHead }>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { userLoanDocument?.userLoanDocumentData?.length ? (
            userLoanDocument.userLoanDocumentData.map((row) => (
              <TableRow key={ (Math.random() * 1000) }>
                <TableCell
                  component="th"
                  className={ classes.tableHeadRow }
                  scope="row"
                >
                  { row.displayname }
                </TableCell>
                <TableCell className={ classes.tableHeadRow }>
                  { Moment(new Date(row.date_uploaded)).format(outputDateFormat) }
                </TableCell>
                <TableCell className={ classes.tableHeadRow }>
                  <PrintIcon style={ { color: "#104eb3", cursor: "pointer" } }
                    onClick={ () =>
                      printDoc(row.downloadProp.file_id, row.downloadProp.name)
                    }
                  />{ " " }
                  <GetAppIcon style={ { color: "#104eb3", cursor: "pointer" } }
                    onClick={ () =>
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
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
