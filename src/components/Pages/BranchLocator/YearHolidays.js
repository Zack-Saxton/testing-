import React from "react";
import "./YearHolidays.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import { MFYearHolidays } from "../../../assets/data/marinerBusinesStates";

export default function YearHolidays(props) {
  YearHolidays.defaultProps = {
    show: {},
    cancel: () => { }
  }
  YearHolidays.propTypes = {
    show: {},
    cancel: () => { }
  }
  if (!props.show) {
    return <></>
  }

  return (
    <div>
      <div className="overlay">
        <div className="yearholidays">
          <div className="yearholidays__content">
            <h2 className="yearholidays__title">Mariner Finance Holidays Hours</h2>
            <p className="yearholidays__description">
              <Grid className="holidayList">
                <Grid container className="workingSaturdays">
                  <Grid item sm={12} md={8}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Holiday Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {MFYearHolidays ? (
                            MFYearHolidays.map((element, index) => {
                              return (
                                <TableRow key={index}>
                                  <TableCell>{element.Date}</TableCell>
                                  <TableCell>{element.Day}</TableCell>
                                  <TableCell>{element.Holiday_Name}</TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <p> No Holiday List found.</p>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>
            </p>
          </div>
          <hr />
          <div className="yearholidays__footer">
            <button className="yearholidays__cancel" onClick={props.cancel}>  OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}
