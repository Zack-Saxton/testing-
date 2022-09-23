import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useUSHolidayList } from "./useYearHolidays";
import "./YearHolidays.css";

export default function YearHolidays() {

  const [ MFYearHolidays, SetMFYearHolidays ] = useState([]);
  const { result } = useUSHolidayList();
  useEffect(() => {
    if(result){
      SetMFYearHolidays(result.data.MFYearHolidays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ result ]);
  return (
    <div className="overlay" data-testid="year-holidays-component">
      <div className="yearholidays">
        <div className="yearholidays__content">
          <Typography component="span" className="yearholidays__description">
            <Grid className="holidayList">
              <Grid container className="workingSaturdays">
                <Grid item xs={12} sm={12} >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow className="tableHeadeing">
                          <TableCell data-testid="holiday-date-header">Date</TableCell>
                          <TableCell data-testid="holiday-day-header">Day</TableCell>
                          <TableCell data-testid="holiday-name-header">Holiday Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {MFYearHolidays ? (
                          MFYearHolidays.map((element, index) => {
                            return (
                              <TableRow className="tableContent" key={`year-holidays-${index}`}>
                                <TableCell data-testid="holiday-date-body">{element.Date}</TableCell>
                                <TableCell data-testid="holiday-day-body">{element.Day}</TableCell>
                                <TableCell data-testid="holiday-name-body">{element.Holiday_Name}</TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <Typography component="span">No Holiday List found.</Typography>
                        )}
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
