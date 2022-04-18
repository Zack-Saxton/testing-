import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import Moment from "moment";
import momentTimeZone from "moment-timezone";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import { ScheduleCallApi } from "../../Controllers/MyBranchController";
import { ButtonPrimary, DatePicker, Select } from "../../FormsUI";
import { useStylesMyBranch } from "./Style";
import {
  ca_M_W_Th_F,
  ca_Tue,
  Other_Fri,
  other_M_W_Thu,
  other_Tue,
  updated_other_Tue,
  upt_ca_M_W_TH_F,
  upt_ca_Tue,
  upt_other_Fri,
  upt_other_M_W_Thu,
} from "./WorkingHours";

//Date validation
const scheduleDateCall = new Date();
scheduleDateCall.setDate(scheduleDateCall.getDate() + 30);

// yup validation
const validationSchema = yup.object({
  appointmentDate: yup
    .date(globalMessages.ValidDate)
    .nullable()
    .required(globalMessages.Appointment_Date_Required)
    .typeError(globalMessages.ValidDate)
    .max(scheduleDateCall, globalMessages.validCheckDate),
  callTime: yup
    .string(globalMessages.Enter_Appointment_Time)
    .nullable()
    .required(globalMessages.Appointment_Time_Required),
});
const dateFormat = "YYYY-MM-DD";
export default function ScheduleCall({ MyBranchCall, holidayData }) {
  //Material UI css class
  const classes = useStylesMyBranch();
  const refFormCall = useRef();
  //Branch details from API
  let branchDetail = MyBranchCall ?? null;
  let commonHoliday = [ 0, 6 ]; //Sunday and Saturday
  //US holidays
  function disableHolidays(appointmentDate) {
    const holidayAPIData = holidayData?.holidays ?? [];
    const holidayAPIDataValues = holidayAPIData?.map((arrVal) => {
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
  let stateName = branchDetail?.MyBranchCall?.MyBranchDetail
    ? branchDetail?.MyBranchCall?.MyBranchDetail?.result
      ? null
      : branchDetail?.MyBranchCall?.MyBranchDetail?.message
        ? null
        : branchDetail?.MyBranchCall?.MyBranchDetail
          ? branchDetail?.MyBranchCall?.MyBranchDetail?.Address?.split(",")
          [
            branchDetail?.MyBranchCall?.MyBranchDetail?.Address?.split(",")
              .length - 1
          ].trim()
            .substring(0, 2)
          : null
    : null;

  const [ scheduleCall, setScheduleCall ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  //Formik implementation
  const formik = useFormik({
    initialValues: {
      appointmentDate: null,
      callTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let callDate = Moment(values.appointmentDate).format(dateFormat);
      let callingTime = values.callTime;
      let callTimeZone = momentTimeZone
        .tz(momentTimeZone.tz.guess())
        .zoneAbbr();

      setLoading(true);
      let response = await ScheduleCallApi(callDate, callingTime, callTimeZone);
      if (response) {
        formik.values.appointmentDate = null;
        formik.values.callTime = "";
        setLoading(false);
        setScheduleCall(false);
      }
    },
  });

  const appointmentDay = [ "Saturday", "Sunday" ];

  //pop up open & close
  const handleScheduleCall = () => {
    setScheduleCall(true);
  };

  const handleScheduleCallClose = () => {
    refFormCall.current.remove();
    formik.values.appointmentDate = null;
    formik.values.callTime = "";
    formik.touched.appointmentDate = null;
    formik.touched.callTime = null;
    setScheduleCall(false);
  };
  const dateFormatOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const getTimeSlotOption = (timeList) => {
    return (
      <Select
        id="timeSlotSelect"
        name="callTime"
        labelform="Time Slot"
        select={ JSON.stringify(timeList) }
        onChange={ formik.handleChange }
        value={ formik.values.callTime }
        onBlur={ formik.handleBlur }
        error={ formik.touched.callTime && Boolean(formik.errors.callTime) }
        helperText={ formik.touched.callTime && formik.errors.callTime }
      />
    );
  };
  const showBranchClosedMessage = () => {
    return (
      <p className={ classes.branchClose }>
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
      <Grid item xs={ 12 } className={classes.gridSchedule}>
        <ButtonPrimary
          stylebutton='{"float": "", "padding":"0px 30px", "fontSize":"0.938rem" }'
          onClick={ handleScheduleCall }
        >
          Schedule a call
        </ButtonPrimary>
      </Grid>

      <Dialog
        open={ scheduleCall }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={ { paper: classes.dialogPaper } }
      >
        <div className={ classes.buttonClose }>
          <IconButton
            aria-label="close"
            onClick={ handleScheduleCallClose }
            className={ classes.closeButton }
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title" className = {classes.scheduleDialog}>
          <Typography className={ classes.dialogHeading }>
            Schedule a Call
          </Typography>
          <Typography className="endDate">
            You have until <span> { scheduleDateCall.toLocaleDateString('en-us', dateFormatOption) } </span>to schedule Date & Time for your appointment
          </Typography>
        </DialogTitle>
        <form id="formCall" ref={ refFormCall } onSubmit={ formik.handleSubmit }>
          <DialogContent>
            <Grid className={classes.gridDatepicker}>
              <DatePicker
                name="appointmentDate"
                label="Date"
                placeholder="MM/DD/YYYY"
                id="appointmentDate"
                disablePastDate = "true"
                onKeyDown={ (event) => event.preventDefault() }
                autoComplete="off"
                disableDate={ disableHolidays }
                maxdate={ scheduleDateCall }
                minyear={ 4 }
                value={ formik.values.appointmentDate }
                onChange={ (values) => {
                  formik.setFieldValue("appointmentDate", values);
                  formik.setFieldValue("callTime", "");
                } }
                onBlur={ formik.handleBlur }
                error={
                  formik.touched.appointmentDate &&
                  Boolean(formik.errors.appointmentDate)
                }
                helperText={
                  formik.touched.appointmentDate &&
                  formik.errors.appointmentDate
                }
              />
            </Grid>

            { stateName === "CA" ? (
              selectedAppointmentDay === "Tuesday" ? (
                <Grid>
                  { isTodayAppointment
                    ? upt_ca_Tue.length !== 0 && isNotHolidayAppointment
                      ? getTimeSlotOption(upt_ca_Tue)
                      : showBranchClosedMessage()
                    : getTimeSlotOption(ca_Tue) }
                </Grid>
              ) : !appointmentDay.includes(selectedAppointmentDay) ? (
                <Grid>
                  { isTodayAppointment
                    ? upt_ca_M_W_TH_F.length !== 0 && isNotHolidayAppointment
                      ? getTimeSlotOption(upt_ca_M_W_TH_F)
                      : showBranchClosedMessage()
                    : getTimeSlotOption(ca_M_W_Th_F) }
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
                  : getTimeSlotOption(other_Tue) }
              </Grid>
            ) : selectedAppointmentDay === "Friday" ? (
              <Grid>
                { isTodayAppointment
                  ? upt_other_Fri.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(upt_other_Fri)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(Other_Fri) }
              </Grid>
            ) : !appointmentDay.includes(selectedAppointmentDay) ? (
              <Grid>
                { isTodayAppointment
                  ? upt_other_M_W_Thu.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(upt_other_M_W_Thu)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(other_M_W_Thu) }
              </Grid>
            ) : (
              showBranchClosedMessage()
            ) }
          </DialogContent>

          <DialogActions className={classes.scheduleDialogAction}>
            <ButtonPrimary
              type="submit"
              stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
              disabled={ loading }
            >
              Call Back
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

ScheduleCall.propTypes = {
  MyBranchCall: PropTypes.object,
  holidayData: PropTypes.object,
};
