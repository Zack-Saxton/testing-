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
import {Link, NavLink} from "react-router-dom";

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
  const [open, setOpen] = React.useState(false);
  let userAccountDetail = userAccountDetailCard != null ? userAccountDetailCard : null;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [values, setValues] = React.useState(0);
  const handleTabChange = (event, newValues) => {
    setValues(newValues);
  };

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
              Enable Text Notifications
            </Typography>

            <ButtonSwitch
              value="switch"
              label="Text Notifications are"
              labelPlacement="end"
            />

            <Typography className={classes.cardHeading} ><br />
              If you have not yet agreed to receive  text messages and would like to receive text messages concerning your account, please enable text notifications above and provide the requested information.
            </Typography>
            <Typography className={classes.cardHeading} >
            <br />
              Mobile number
            </Typography>
            <TextField
              name="lastname"
              type="text"
              materialProps={{ defaultValue: "" }}
              disabled={false}
            />
            <Link to="#"
              onClick={handleClickOpen}
              className={classes.autoPayLink}
            >
            Disclosure
          </Link>

          <p>
          <Checkbox
                name="textingterms"
                labelid="texting-terms"
                testid="checkbox"
                stylelabelform='{ "font-size":"12px" }'
                stylecheckbox='{ "font-size":"12px" }'
                stylecheckboxlabel='{ "font-size":"12px" }'
              />

            I have read, understand, and agree to the&nbsp; 
          <Link to="#"
              onClick={handleClickOpen}
              className={classes.autoPayLink}
            >
            Texting Terms of Use.
          </Link>
          </p>

          </TableCell>
        </TableRow>

    </Table>
  </TableContainer>
  
  );
}

