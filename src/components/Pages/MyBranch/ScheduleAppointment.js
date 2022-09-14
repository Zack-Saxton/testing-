import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Moment from "moment";
import momentTimeZone from "moment-timezone";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
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
  latitude,
  longitude
}) {
  //Material UI css class
  const classes = useStylesMyBranch();
  const refFormCall = useRef();
  //API call
  let branchDetail = MyBranchAppointment;
  let commonHoliday = [ 0, 6 ]; //Sunday and Saturday
  //US holidays
  function disableHolidays(appointmentDate) {
    const holidayAPIData = holidayData ?? [];
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
      let visitTimeZone = branchDetail.MyBranchDetail.timezone;
      
      setLoading(true);
      let response = await ScheduleVisitApi(visitDate, visitTime, visitTimeZone, latitude, longitude);
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
    refFormCall.current.remove();
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
        select={JSON.stringify(timeList)}
        onChange={formik.handleChange}
        value={formik.values.appointmentTime}
        onBlur={formik.handleBlur}
        error={formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime)}
        helperText={formik.touched.appointmentTime && formik.errors.appointmentTime}
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
      <Grid item xs={12} className={classes.gridSchedule}>
        <ButtonPrimary
          id="scheduleAppointmentBtn"
          stylebutton='{"float": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
          onClick={handleScheduleAppointment}
          data-testid="appointment"
        >
          Schedule An Appointment
        </ButtonPrimary>
      </Grid>

      <Dialog
        open={scheduleAppointment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
        data-testid="dialog"
      >
        <div className={classes.buttonClose}>
          <IconButton
            aria-label="close"
            onClick={handleScheduleAppointmentClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title" className={classes.scheduleDialog}>
          <Typography component={"div"} className={classes.dialogHeading}>
            Schedule an Appointment
          </Typography>
          <Typography className="endDate">
            You have until <span> {scheduleAppointmentDate.toLocaleDateString('en-us', dateFormatOption)} </span>to schedule your appointment
          </Typography>
        </DialogTitle>
        <form id="formAppointment" ref={refFormCall} onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid className={classes.gridDatepicker}>
              <DatePicker
                name="appointmentDate"
                label="Date"
                placeholder="MM/DD/YYYY"
                id="appointmentDate"
                disablePastDate="true"
                onKeyDown={(event) => event.preventDefault()}
                autoComplete="off"
                disableDate={disableHolidays}
                maxdate={scheduleAppointmentDate}
                minyear={4}
                value={formik.values.appointmentDate}
                onChange={(values) => {
                  formik.values.appointmentDate = values;
                  formik.setFieldValue("appointmentDate", values);
                  formik.setFieldValue("appointmentTime", "");
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.appointmentDate && Boolean(formik.errors.appointmentDate)}
                helperText={formik.touched.appointmentDate && formik.errors.appointmentDate}
              />
            </Grid>
            {stateName === "CA" ? (
              selectedAppointmentDay === "Tuesday" ? (
                <Grid className="timeSlotWrap">
                  {isTodayAppointment
                    ? upt_ca_Tue.length !== 0 && isNotHolidayAppointment
                      ? getTimeSlotOption(upt_ca_Tue)
                      : showBranchClosedMessage()
                    : getTimeSlotOption(ca_Tue)}
                </Grid>
              ) : !appointmentDay.includes(selectedAppointmentDay) ? (
                <Grid className="timeSlotWrap">
                  {isTodayAppointment
                    ? upt_ca_M_W_TH_F.length !== 0 && isNotHolidayAppointment
                      ? getTimeSlotOption(upt_ca_M_W_TH_F)
                      : showBranchClosedMessage()
                    : getTimeSlotOption(ca_M_W_Th_F)}
                </Grid>
              ) : (
                showBranchClosedMessage()
              )
            ) : selectedAppointmentDay === "Tuesday" ? (
              <Grid className="timeSlotWrap">
                {isTodayAppointment
                  ? updated_other_Tue.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(updated_other_Tue)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(other_Tue)}
              </Grid>
            ) : selectedAppointmentDay === "Friday" ? (
              <Grid className="timeSlotWrap">
                {isTodayAppointment
                  ? upt_other_Fri.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(upt_other_Fri)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(Other_Fri)}
              </Grid>
            ) : !appointmentDay.includes(selectedAppointmentDay) ? (
              <Grid className="timeSlotWrap">
                {isTodayAppointment
                  ? upt_other_M_W_Thu.length !== 0 && isNotHolidayAppointment
                    ? getTimeSlotOption(upt_other_M_W_Thu)
                    : showBranchClosedMessage()
                  : getTimeSlotOption(other_M_W_Thu)}
              </Grid>
            ) : (
              showBranchClosedMessage()
            )}
          </DialogContent>

          <DialogActions className={classes.scheduleDialogAction} >
            <ButtonPrimary
              type="submit"
              stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              disabled={loading}
            >
              Schedule an appointment
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={{
                  marginRight: "10px",
                  color: "blue",
                  display: loading ? "block" : "none",
                }}
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
  holidayData: PropTypes.array,
  latitude: PropTypes.string,
  longitude: PropTypes.string
};