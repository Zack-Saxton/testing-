import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useStylesMyBranch } from "./Style";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ScheduleCall from "./ScheduleCall";
import ScheduleAppointment from "./ScheduleAppointment";
import "../MyBranch/BranchInfo.css";

//Table fields - working days
function otherUsaState(day, monWedThur, tue, fri) {
  return { day, monWedThur, tue, fri };
}

function stateUsaCa(day, monWedThurFri, tue) {
  return { day, monWedThurFri, tue };
}

//Table field data - working hours
const otherState = [
  otherUsaState("From", "9:00 AM", "9:00 AM", "9:00 AM"),
  otherUsaState("To", "5:00 PM", "7:00 PM", "5:30 PM"),
];

const stateCA = [
  stateUsaCa("From", "9:00 AM", "10:00 AM"),
  stateUsaCa("To", "5:30 PM", "7:00 PM"),
];


export default function BranchDetail(MyBranchDetail) {

//Material UI css class
  const classes = useStylesMyBranch();

//Branch details from API
  let branchDetail = MyBranchDetail != null ? MyBranchDetail : null;
 


//Spliting statename
  let stateName = branchDetail?.MyBranchDetail ? branchDetail.MyBranchDetail?.result 
      ? null : branchDetail.MyBranchDetail?.message ? null  
      : branchDetail?.MyBranchDetail
      ? branchDetail?.MyBranchDetail?.Address?.split(",")
          [branchDetail?.MyBranchDetail?.Address?.split(",").length - 1].trim()
          .substring(0, 2)
      : null
    : null;


 //Formating Phone Number
 function formatPhoneNumber(phoneNumber) {
  if(phoneNumber ) {
  const cleanNum =phoneNumber.toString().replace(/\D/g, '');
  const match = cleanNum.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return '(' + match[1] + ') ' + (match[2] ? match[2] + "-" : "") + match[3];
  }
  return cleanNum;
}
else{
  return false
}
}

//View part
  return (
    <div>
      <Paper id="branchNameBox" className={classes.paper}>
        {branchDetail?.MyBranchDetail?.result ? (
          <p>No branch information</p>
        ) : (branchDetail?.MyBranchDetail?.BranchName || branchDetail?.MyBranchDetail?.branchName) ? (
          <>
            <Grid className={classes.branchDetailGrid}>
              <h4 className={classes.branchDetailHeading}>Branch Name</h4>
              <p className={classes.branchDetailInput}>
                {(branchDetail?.MyBranchDetail?.BranchName) ? (branchDetail.MyBranchDetail.BranchName) : (branchDetail?.MyBranchDetail?.branchName) ? (branchDetail.MyBranchDetail.branchName) : "" }
              </p>
            </Grid>
            
            <Grid className={classes.branchDetailGrid}>
              <h4 className={classes.branchDetailHeading}>Address</h4>
              <p className={classes.branchDetailInput}>
                {branchDetail?.MyBranchDetail?.Address ? branchDetail.MyBranchDetail.Address : "" }
              </p>
            </Grid>

            <Grid className={classes.branchDetailGrid}>
              <h4 className={classes.branchDetailHeading}>Phone Number</h4>
              <p className={classes.branchDetailInput}>
                <a id="phoneLink"href="tel:" style={{textDecoration: "none"}}> {formatPhoneNumber(branchDetail.MyBranchDetail.PhoneNumber)}</a>
              </p>
            </Grid>

            {stateName !== "CA" ? (
              <TableContainer>
                <Grid className={classes.branchDetailGrid}>
                  <h4 className={classes.branchDetailHeading}>Branch Hours</h4>
                </Grid>
                <Table id="workingHoursTableWrap" className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell align="center">Mon-Wed-Thur</TableCell>
                      <TableCell align="center">Tue</TableCell>
                      <TableCell align="center">Fri</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {otherState.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.day}
                        </TableCell>
                        <TableCell align="center">{row.monWedThur}</TableCell>
                        <TableCell align="center">{row.tue}</TableCell>
                        <TableCell align="center">{row.fri}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer>
                <Grid className={classes.branchDetailGrid}>
                  <h4 className={classes.branchDetailHeading}>Working Hours</h4>
                </Grid>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell align="center">Mon-Wed-Thur-Fri</TableCell>
                      <TableCell align="center">Tue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stateCA.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.day}
                        </TableCell>
                        <TableCell align="center">{row.monWedThurFri}</TableCell>
                        <TableCell align="center">{row.tue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Grid
              item
              xs={12}
              style={{ paddingTop: "10px", textAlign: "left" }}
            >
              <ScheduleCall MyBranchCall={MyBranchDetail} />
            </Grid>

            <Grid
              item
              xs={12}
              style={{ paddingTop: "10px", textAlign: "left" }}
            >
              <ScheduleAppointment MyBranchAppointment={MyBranchDetail} />
            </Grid>
          </>
        ) : (
          <p>No branch information </p>
        )}
      </Paper>
    </div>
  );
}
