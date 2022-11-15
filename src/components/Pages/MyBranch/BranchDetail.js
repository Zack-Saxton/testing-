import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../Controllers/BranchDayTiming";
import HolidayCalenderController from "../../Controllers/HolidayCalenderController";
import "../MyBranch/BranchInfo.css";
import ScheduleAppointment from "./ScheduleAppointment";
import ScheduleCall from "./ScheduleCall";
import { useStylesMyBranch } from "./Style";
import { useHolidayCalender } from "../../../hooks/useHolidayCalender"
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

  //API call
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const { data : holidayCalenderApi } = useHolidayCalender();

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position){
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
  });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Holiday Calender from API
  let holidayCalenderData = holidayCalenderApi?.data?.MFYearHolidays.map(({ Date }) => formatDate(Date));
  //Branch details from API
  let branchDetail = MyBranchDetail;

  //Statename
  let stateName = branchDetail?.MyBranchDetail?.branchstate;

  //Formating Phone Number
  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber) {
      const cleanNumber = phoneNumber.toString().replace(/\D/g, "");
      const match = cleanNumber.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        return (
          "(" + match[ 1 ] + ") " + (match[ 2 ] ? match[ 2 ] + "-" : "") + match[ 3 ]
        );
      }
      return cleanNumber;
    } else {
      return false;
    }
  }

  //View part
  return (
    <div data-testid="branch-details-component">
      <Paper id="branchNameBox" className={classes.paper}>
        {branchDetail?.MyBranchDetail?.result ? (
          <p>No branch information</p>
        ) : branchDetail?.MyBranchDetail?.BranchName ||
          branchDetail?.MyBranchDetail?.branchName ? (
          <>
            <Grid className={classes.branchDetailGrid}>
              <h4 className={classes.branchDetailHeading}>Branch Name</h4>
              <p className={classes.branchDetailInput}>
                {branchDetail?.MyBranchDetail?.BranchName
                  ? branchDetail.MyBranchDetail.BranchName
                  : branchDetail?.MyBranchDetail?.branchName
                    ? branchDetail.MyBranchDetail.branchName
                    : ""}
              </p>
            </Grid>

            <Grid className={classes.branchDetailGrid}>
              <h4 className={classes.branchDetailHeading}>Address</h4>
              <p className={classes.branchDetailInput}>
                {branchDetail?.MyBranchDetail?.Address
                  ? branchDetail.MyBranchDetail.Address
                  : ""}
              </p>
            </Grid>

            <Grid className={classes.branchDetailGrid}>
              <h4 className={classes.branchDetailHeading}>Phone Number</h4>
              <p className={classes.branchDetailInput}>
                <a
                  id="phoneLink"
                  href="tel:"
                  className={classes.navLinkMyBranch} >
                  {formatPhoneNumber(branchDetail.MyBranchDetail.PhoneNumber)}
                </a>
              </p>
            </Grid>

            {stateName !== "CA" ? (
              <TableContainer>
                <Grid className={classes.branchDetailGrid}>
                  <h4 className={classes.branchDetailHeading}>Branch Hours</h4>
                </Grid>
                <Table
                  id="workingHoursTableWrap"
                  className={classes.table}
                  aria-label="simple table"
                >
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
                      <TableRow key={`branch-details-time1-${index}`}>
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
                <Table id="workingHoursCATableWrap" className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell align="center">Mon-Wed-Thur-Fri</TableCell>
                      <TableCell align="center">Tue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stateCA.map((row, index) => (
                      <TableRow key={`branch-details-time2-${index}`}>
                        <TableCell component="th" scope="row">
                          {row.day}
                        </TableCell>
                        <TableCell align="center">
                          {row.monWedThurFri}
                        </TableCell>
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
              className={classes.gridSchedule}
            >
              <ScheduleCall
                MyBranchCall={MyBranchDetail}
                holidayData={holidayCalenderData}
                latitude={latitude}
                longitude={longitude}
              />
            </Grid>

            <Grid
              item
              xs={12}
              className={classes.gridSchedule}
            >
              <ScheduleAppointment
                MyBranchAppointment={MyBranchDetail}
                holidayData={holidayCalenderData}
                latitude={latitude}
                longitude={longitude}
              />
            </Grid>
          </>
        ) : (
          <p>No branch information </p>
        )}
      </Paper>
    </div>
  );
}
