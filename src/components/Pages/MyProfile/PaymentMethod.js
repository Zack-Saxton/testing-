import React, { useEffect, useState, Component } from "react";
import {useStylesLoanHistory} from "./Style";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
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


function createData(
    type,
    name,
    setdefault,
    paymentmethodid,
    deletethis
  ) {
    return {
      type,
      name,
      setdefault,
      paymentmethodid,
      deletethis
      };
  }
  const branch = (
    <Grid container direction="row" alignItems="center">
      <AccountBalanceIcon /> 
    </Grid>
  );
  
  const online = (
    <Grid container direction="row" alignItems="center">
      <DesktopMacIcon /> 
    </Grid>
  );
  
  
const rows36term = [
    createData(branch, "Test1", "", "101", ""),
    createData(online, "Test2", "", "102", ""),
  ];
  
export default function AccountDetailCard(userAccountDetailCard) {
  const classes = useStylesLoanHistory();
  let userAccountDetail = userAccountDetailCard != null ? userAccountDetailCard : null;

  //  view part
  return (

    <Grid container
    item
    xs={12}
    direction="row"
    style={{ paddingBottom: "10px", width: "100%" }}
  >



    <TableContainer>
      <Table
        className={classes.table}
        aria-label="simple table"
      >
        <TableBody>
          {rows36term.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">TEST
              {row.type} {row.name} (nickname)
              </TableCell>
              <TableCell component="th" scope="row">
                <Radio
                  name="select"
                  label="Set as Default"
                  radiolabel='[{ "value":"select"}]'
                  value="select"
                /> Set as Default
              </TableCell>
              <TableCell align="left">
              <ListIcon/>( {row.paymentmethodid} )
              </TableCell>
              <TableCell align="left">
                <DeleteIcon/>
              </TableCell>
            </TableRow>
          ))}
          
          <TableRow>
            <TableCell
              component="th"
              className={classes.tableHeadRow}
              scope="row"
              colSpan="4"
            >
              <p>
                Setting an account as your default does not automatically discontinue recurring payments for another account.
              </p>

            </TableCell>
          </TableRow>

        </TableBody>

      </Table>
    </TableContainer>
  </Grid>
  
  );
}

