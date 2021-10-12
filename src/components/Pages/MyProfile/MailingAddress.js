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


export default function AccountDetailCard(userAccountDetailCard) {
  const classes = useStylesLoanHistory();
  let userAccountDetail = userAccountDetailCard != null ? userAccountDetailCard : null;

  //  view part
  return (

    <TableContainer>
    <Table
      className={classes.table}
      aria-label="simple table"
    >

        <TableRow>
          <TableCell
            component="th"
            className={classes.tableHeadRow}
            scope="row"
          >
            <Typography className={classes.cardHeading} >
              Street Address
            </Typography>
            <TextField
              name="streetaddress"
              type="text"
              defaultValue= {userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_street} 
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
              City
            </Typography>
            <TextField
              name="lastname"
              type="text"
              defaultValue= {userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_city} 
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
              State
            </Typography>
            <TextField
              name="lastname"
              type="text"
              defaultValue= {userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_state} 
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
              Zip Code
            </Typography>
            <TextField
              name="lastname"
              type="text"
              defaultValue= {userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_postal_code} 
              disabled={false}            />
          </TableCell>
        </TableRow>

    </Table>
  </TableContainer>
  
  );
}

