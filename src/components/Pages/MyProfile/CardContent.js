import React, { useEffect, useState, Component } from "react";

import {useStylesLoanHistory} from "./Style";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
//import TextsmsIcon from "@material-ui/icons/Textsms";
import { toast } from "react-toastify";

import LoanHistoryController from "../../controllers/LoanHistoryController";
import { withStyles } from '@material-ui/core';
import "./selectoffer.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonWithIcon,
  ButtonSwitch,
  Checkbox,
  Radio,
  TextField,
} from "../../FormsUI";
/*const handleInputChange = () => {
  setSelectedFile(document.getElementById("file"));
};
const [selectedFile, setSelectedFile] = useState(null);

const uploadDoc = () => {
  if (selectedFile === null) {
    {
      toast.error("please select a file to upload", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } else {
    var filePath = selectedFile.value;

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

    if (!allowedExtensions.exec(filePath)) {
      {
        toast.error(
          "Please upload file having extensions .jpeg/.jpg/.png/.pdf only. ",
          {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
      selectedFile.value = "";

      return false;
    } else {
      console.log(selectedFile);
      let reader = new FileReader();
      if (selectedFile.files && selectedFile.files[0]) {
        reader.onload = () => {
          const buffer2 = Buffer.from(reader.result, "base64");

          let test = Buffer.from(buffer2).toJSON().data;
          let fileName = selectedFile.files[0].name;
          let fileType = selectedFile.files[0].type;

          uploadDocument(test, fileName, fileType);
        };
        reader.readAsDataURL(selectedFile.files[0]);
      }
    }
  }
};
*/



export default function LoanHistoryCard(userLoanHistoryCard) {
  const classes = useStylesLoanHistory();
  let userLoanHistory = userLoanHistoryCard != null ? userLoanHistoryCard : null;

  //Calculate Total amount financed
  let TotalAmount = 0;

  if (userLoanHistory.userLoanHistoryCard != null) {
    for (let i = 0; i < userLoanHistory.userLoanHistoryCard.length; i++) {
      TotalAmount += Number(
        userLoanHistory.userLoanHistoryCard[i].loanPaymentInformation.accountDetails.OriginalFinancedAmount
      );
    }
  }
  //  view part
  return (
        <TableContainer>
          <Table
            className={classes.table}
            aria-label="simple table"
          >
            <TableBody>

              <TableRow>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  <Typography className={classes.cardHeading} >
                    First Name
                  </Typography>
                  <TextField
                    name="firstname"
                    type="text"
                   // materialProps={{ defaultValue: "Johnny Test" }}
                   defaultValue= {userLoanHistory.userLoanHistoryCard?.customer?.identification?.first_name} 
                    //disabled={false}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  <Typography className={classes.cardHeading} >
                    Last Name
                  </Typography>
                  <TextField
                    name="lastname"
                    type="text"
                    //materialProps={{ defaultValue: "Doe" }}
                    disabled={false}
                    defaultValue= {userLoanHistory.userLoanHistoryCard?.customer?.identification?.last_name} 
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  <Typography className={classes.cardHeading} >
                    Date of Birth
                  </Typography>
                  <TextField
                    name="dob"
                    type="text"
                  //  materialProps={{ defaultValue: "02/25/1990" }}
                  disabled={false}
                  defaultValue= {userLoanHistory.userLoanHistoryCard?.customer?.identification?.date_of_birth} 
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  <Typography className={classes.cardHeading} >
                    Email Address
                  </Typography>
                  <TextField
                    name="email"
                    type="text"
                    //materialProps={{ defaultValue: "john@mf.io" }}
                    defaultValue= {userLoanHistory.userLoanHistoryCard?.customer.latest_contact.email} 
                    disabled={false}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                >
                  <Typography className={classes.cardHeading} >
                    Primary Phone Number
                  </Typography>
                  <TextField
                    name="primaryphone"
                    type="text"
                  //  materialProps={{ defaultValue: "410-555-1212" }}
                  defaultValue= {userLoanHistory.userLoanHistoryCard?.customer.latest_contact.phone_number_primary} 
                  disabled={false}
                  />
                </TableCell>
              </TableRow>

              <Grid item xs={4} stylebutton='{"marginLeft": "10px" ,"fontSize":"1rem"}'>
                <input
                  style={{
                    paddingBottom: "20px",
                  }}
                  //accept="image/*"
                  id="contained-button-file"
                  multiple
                  id="file"
                  type="file"
                 // onChange={handleInputChange}
                />
                {/* <label htmlFor="contained-button-file"> */}
                <Button
                  variant="contained"
                  // onClick={() => uploadDoc()}
                  className={classes.uploadbutton}
                  component="span"
                  >
                  Upload New Photo
                </Button>
                Allowed jpg, gif or png. Max size of 800kb
                {/* </label> */}
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
  );
}


/*
for (let i = 0; i < userLoanHistory.foundUser.length; i++) {
    testVar =  'test2';
    //      testVar =  userLoanHistory.foundUser.firstname ?? 'test2';
}
       
[ {testVar} ]
             {JSON.stringify(userLoanHistory)} :
*/   
