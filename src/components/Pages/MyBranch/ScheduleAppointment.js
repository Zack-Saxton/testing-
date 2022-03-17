import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import Moment from "moment";
import momentTimeZone from "moment-timezone";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import { ScheduleVisitApi } from "../../Controllers/MyBranchController";
import { ButtonPrimary, DatePicker, Select } from "../../FormsUI";
import { useStylesMyBranch } from "./Style";
import {
  ca_M_W_Th_F,
  ca_Tue, Other_Fri,
  other_M_W_Thu, other_Tue, updated_other_Tue,
  upt_ca_M_W_TH_F,
  upt_ca_Tue,
  upt_other_Fri,
  upt_other_M_W_Thu
} from "./WorkingHours";

//Date validation
const scheduleAppointmentDate = new Date();
scheduleAppointmentDate.setDate(scheduleAppointmentDate.getDate() + 30);

// yup validation
const validationSchema = yup.object({
  appointmentDate: yup
    .date(globalMessages.ValidDate)
    .nullable()
    .required(globalMessages.Appointment_Date_Required)
    .typeError(globalMessages.ValidDate)
    .max(scheduleAppointmentDate, globalMessages.validCheckDate),

  appointmentTime: yup
    .string(globalMessages.Enter_Appointment_Time)
    .nullable()
    .required(globalMessages.Appointment_Time_Required),
});
const dateFormat = "YYYY-MM-DD";
export default function ScheduleAppointment({
  MyBranchAppointment,
  holidayData,
}) {
  //Material UI css class
  const classes = useStylesMyBranch();
  const formCallRef = useRef();
  //API call
  let branchDetail = MyBranchAppointment;
  let commonHoliday = [0, 6]; //Sunday and Saturday
  //US holidays
  function disableHolidays(appointmentDate) {
    const holidayAPIData = holidayData?.holidays ?? [];
    const holidayAPIDataValues = holidayAPIData.map((arrVal) => {
      return new Date(arrVal + "T00:00").getTime();
    });
    return (
      commonHoliday.includes(appointmentDate.getDay()) ||
      holidayAPIDataValues.includes(appointmentDate.getTime())
    );
  }

  //Validating current date is holiday
  const today = new Date();
  const todayDate = (Moment(today).format(dateFormat));
  const checkToday = holidayData?.holidays?.find((holidays) => holidays === todayDate);

  //Spliting statename
  let stateName = branchDetail?.MyBranchAppointment?.MyBranchDetail
    ? branchDetail?.MyBranchAppointment?.MyBranchDetail?.result
      ? null
      : branchDetail?.MyBranchAppointment?.MyBranchDetail?.message
        ? null
        : branchDetail?.MyBranchAppointment?.MyBranchDetail
          ? branchDetail?.MyBranchAppointment?.MyBranchDetail?.Address?.split(",")
          [
            branchDetail?.MyBranchAppointment?.MyBranchDetail?.Address?.split(
              ","
            ).length - 1
          ].trim()
            .substring(0, 2)
          : null
    : null;

  const [ scheduleAppointment, setScheduleAppointment ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  //Formik implementation
  const formik = useFormik({
    initialValues: {
      appointmentDate: null,
      appointmentTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let visitDate = Moment(values.appointmentDate).format(dateFormat);
      let visitTime = values.appointmentTime;
      let visitTimeZone = momentTimeZone
        .tz(momentTimeZone.tz.guess())
        .zoneAbbr();

      setLoading(true);
      let response = await ScheduleVisitApi(visitDate, visitTime, visitTimeZone);
      if (response) {
        formik.values.appointmentDate = null;
        formik.values.appointmentTime = "";
        setLoading(false);
        setScheduleAppointment(false);
      }
    },
  });

  const appointmentDay = [ "Saturday", "Sunday" ];

  //pop up open & close
  const handleScheduleAppointment = () => {
    setScheduleAppointment(true);
  };

  const handleScheduleAppointmentClose = () => {
    formCallRef.current.remove();
    formik.values.appointmentDate = null;
    formik.values.appointmentTime = "";
    formik.touched.appointmentDate = null;
    formik.touched.appointmentTime = null;
    setScheduleAppointment(false);
  };
  
  const dateFormatOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  
  const getTimeSlotOption = (timeList) => {
    return (
      <Select
        id="ScheduleAppointmentSelect"
        name="appointmentTime"
        labelform="Time Slot"
        select={ JSON.stringify(timeList) }
        onChange={ formik.handleChange }
        value={ formik.values.appointmentTime }
        onBlur={ formik.handleBlur }
        error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
        helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
      />
    );
  };
  const showBranchClosedMessage = () => {
    return (
      <p className={classes.branchClose}>
        Branch is closed, Please select a new day.
      </p>
    );
  };

  let selectedAppointmentDate = Moment(formik.values.appointmentDate).format(dateFormat);
  let selectedAppointmentDay = Moment(formik.values.appointmentDate).format("dddd");
  let isTodayAppointment = (selectedAppointmentDate === todayDate);
  let isNotHolidayAppointment = (selectedAppointmentDate !== checkToday);
  //View part
  return (
    <div>
      <Grid item xs={ 12 } style={ { paddingTop: "10px", textAlign: "left" } }>
        <ButtonPrimary
          id="scheduleAppointmentBtn"
          stylebutton='{"float": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
          onClick={ handleScheduleAppointment }
        >
          Schedule An Appointment
        </ButtonPrimary>
      </Grid>

      <Dialog
        open={ scheduleAppointment }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={ { paper: classes.dialogPaper } }
      >
        <div className={ classes.buttonClose }>
          <IconButton
            aria-label="close"
            onClick={ handleScheduleAppointmentClose }
            className={ classes.closeButton }
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title" style={ { padding: "unset" } }>
          <Typography component={ "div" } className={ classes.dialogHeading }>
            Schedule an Appointment
          </Typography>
          <Typography className="endDate">
            You have until <span> { scheduleAppointmentDate.toLocaleDateString('en-us', dateFormatOption) } </span>to schedule your appointment
          </Typography>
        </DialogTitle>
        <form id="formAppointment" ref={ formCallRef } onSubmit={ formik.handleSubmit }>
          <DialogContent>
            <Grid style={ { paddingBottom: "10px" } }>
              <DatePicker
                name="appointmentDate"
                label="Date"
                placeholder="MM/DD/YYYY"
                id="appointmentDate"
                disablePast
                onKeyDown={ (event) => event.preventDefault() }
                autoComplete="off"
                shouldDisableDate={ disableHolidays }
                maxdate={ scheduleAppointmentDate }
                minyear={ 4 }
                value={ formik.values.appointmentDate }
                onChange={ (values) => {
                  formik.setFieldValue("appointmentDate", values);
                  formik.setFieldValue("appointmentTime", "");
                } }
                onBlur={ formik.handleBlur }
                error={ formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate) }
                helperText={ formik.touched.appointmentDate && formik.errors.appointmentDate }
              />
            </Grid>
            {stateName === "CA" ? (
              selectedAppointmentDay === "Tuesday" ? (
                <Grid>
                  { isTodayAppointment
                    ? upt_ca_Tue.length !== 0 && isNotHolidayAppointment
                      ? getTimeSlotOption(upt_ca_Tue)
                      : showBranchClosedMessage()
                    : getTimeSlotOption(ca_Tue)}
                </Grid>
              ) : !appointmentDay.includes(selectedAppointmentDay) ? (
                  <Grid>
                  { isTodayAppointment
                    ? upt_ca_M_W_TH_F.length !== 0 && isNotHolidayAppointment
                      ? getTimeSlotOption(upt_ca_M_W_TH_F)
                      : showBranchClosedMessage()
                    : getTimeSlotOption(ca_M_W_Th_F)}
                  </Grid>
              ) : (
                showBranchClosedMessage()
              )
            ) : selectedAppointmentDay === "Tuesday" ? (
              <Grid>
                { isTodayAppointment
                  ? updated_other_Tue.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(updated_other_Tue)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(other_Tue)}
              </Grid>
            ) : selectedAppointmentDay === "Friday" ? (
              <Grid>
                { isTodayAppointment
                  ? upt_other_Fri.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(upt_other_Fri)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(Other_Fri)}
              </Grid>
            ) : !appointmentDay.includes(selectedAppointmentDay) ? (
              <Grid>
                { isTodayAppointment
                  ? upt_other_M_W_Thu.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(upt_other_M_W_Thu)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(other_M_W_Thu)}
              </Grid>
            ) : (
              showBranchClosedMessage()
            )}
          </DialogContent>

          <DialogActions style={ { justifyContent: "center" } }>
            <ButtonPrimary
              type="submit"
              stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              disabled={ loading }
            >
              Schedule an appointment
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={ {
                  marginRight: "10px",
                  color: "blue",
                  display: loading ? "block" : "none",
                } }
              />
            </ButtonPrimary>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
ScheduleAppointment.propTypes = {
  MyBranchAppointment: PropTypes.object,
  holidayData: PropTypes.object,
};