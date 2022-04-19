import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import MFYearHolidaysAPI from "../../Controllers/HolidayCalenderController";
import ErrorLogger from "../../lib/ErrorLogger";
import "./YearHolidays.css";

export default function YearHolidays(props) {

  const [ MFYearHolidays, SetMFYearHolidays ] = useState([]);
  async function AsyncEffect_HolidayCalender() {
    try {
      let result = await MFYearHolidaysAPI();
      SetMFYearHolidays(result.data.MFYearHolidays);
    } catch (error) {
      ErrorLogger(' ERROR getting Year Holidays:', error);
    }
  }
  useEffect(() => {
    AsyncEffect_HolidayCalender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="overlay">
      <div className="yearholidays">
        <div className="yearholidays__content">
          <Typography component="span" className="yearholidays__description">
            <Grid className="holidayList">
              <Grid container className="workingSaturdays">
                <Grid item xs={ 12 } sm={ 12 } >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow className="tableHeadeing">
                          <TableCell>Date</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell>Holiday Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        { MFYearHolidays ? (
                          MFYearHolidays.map((element, index) => {
                            return (
                              <TableRow className="tableContent" key={ index }>
                                <TableCell>{ element.Date }</TableCell>
                                <TableCell>{ element.Day }</TableCell>
                                <TableCell>{ element.Holiday_Name }</TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <Typography component="span">No Holiday List found.</Typography>
                        ) }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </div>
      </div>
    </div>
  );
}
