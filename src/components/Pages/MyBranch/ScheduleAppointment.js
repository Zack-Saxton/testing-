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
import React from "react";
import * as yup from "yup";
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
// yup validation
const validationSchema = yup.object({
  date: yup
    .date("Please enter a valid date")
    .nullable()
    .required("Date is required"),

  appointmentTime: yup
    .string("Select Time")
    .nullable()
    .required("Time is required"),
});

export default function ScheduleAppointment({
  MyBranchAppointment,
  holidayData,
}) {
  //Material UI css class
  const classes = useStylesMyBranch();

  //API call
  let branchDetail = MyBranchAppointment != null ? MyBranchAppointment : null;

  //Date validation
  const scheduleAppointmentDate = new Date();
  scheduleAppointmentDate.setDate(scheduleAppointmentDate.getDate() + 30);

  //US holidays
  function disableHolidays(date) {
    const holidayApiData = holidayData?.holidays;
    const holidayApiDataValues = holidayApiData.map((arrVal) => {
      return new Date(arrVal + "T00:00").getTime();
    });
    return (
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      holidayApiDataValues.includes(date.getTime())
    );
  }

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

  const [ scheduleAppointment, setScheduleAppointment ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(false);

  //Formik implementation
  const formik = useFormik({
    initialValues: {
      date: null,
      appointmentTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var visitDate = Moment(values.date).format("YYYY-MM-DD");

      var visitTime = values.appointmentTime;
      let visitTimeZone = momentTimeZone
        .tz(momentTimeZone.tz.guess())
        .zoneAbbr();

      setLoading(true);
      let response = await ScheduleVisitApi(
        visitDate,
        visitTime,
        visitTimeZone
      );
      if (response === "true") {
        formik.values.date = null;
        formik.values.appointmentTime = "";
        setLoading(false);
        setScheduleAppointment(false);
      }
    },
  });

  //pop up open & close
  const handleScheduleAppointment = () => {
    setScheduleAppointment(true);
  };

  const handleScheduleAppointmentclose = () => {
    document.getElementById("formAppointment").remove();
    formik.values.date = null;
    formik.values.appointmentTime = "";
    formik.touched.date = null;
    formik.touched.appointmentTime = null;
    setScheduleAppointment(false);
  };

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
            onClick={ handleScheduleAppointmentclose }
            className={ classes.closeButton }
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title" style={ { padding: "unset" } }>
          <Typography component={ "div" } className={ classes.dialogHeading }>
            Schedule an Appointment
          </Typography>
        </DialogTitle>
        <form id="formAppointment" onSubmit={ formik.handleSubmit }>
          <DialogContent>
            <Grid style={ { paddingBottom: "10px" } }>
              <DatePicker
                name="date"
                label="Date"
                placeholder="MM/DD/YYYY"
                id="date"
                disablePast
                autoComplete="off"
                onKeyDown={ (event) => event.preventDefault() }
                shouldDisableDate={ disableHolidays }
                maxdate={ scheduleAppointmentDate }
                minyear={ 4 }
                value={ formik.values.date }
                onChange={ (values) => {
                  formik.setFieldValue("date", values);
                } }
                onBlur={ formik.handleBlur }
                error={ formik.touched.date && Boolean(formik.errors.date) }
                helperText={ formik.touched.date && formik.errors.date }
              />
            </Grid>
            { stateName === "CA" ? (
              Moment(formik.values.date).format("dddd") === "Tuesday" ? (
                <Grid>
                  { Moment(formik.values.date).format("DD-MM-YYYY") ===
                    Moment(new Date()).format("DD-MM-YYYY")
                    ? upt_ca_Tue.length !== 0 ?
                      <Select
                        name="appointmentTime"
                        labelform="Time Slot"
                        select={ JSON.stringify(upt_ca_Tue) }
                        onChange={ formik.handleChange }
                        value={ formik.values.appointmentTime }
                        onBlur={ formik.handleBlur }
                        error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                        helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                      /> : <p>No time slot available</p>
                    :
                    <Select
                      name="appointmentTime"
                      labelform="Time Slot"
                      select={ ca_Tue }
                      onChange={ formik.handleChange }
                      value={ formik.values.appointmentTime }
                      onBlur={ formik.handleBlur }
                      error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                      helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                    /> }
                </Grid>
              ) : (
                <Grid>
                  { Moment(formik.values.date).format("DD-MM-YYYY") ===
                    Moment(new Date()).format("DD-MM-YYYY")
                    ? upt_ca_M_W_TH_F.length !== 0 ?
                      <Select
                        name="appointmentTime"
                        labelform="Time Slot"
                        select={ JSON.stringify(upt_ca_M_W_TH_F) }
                        onChange={ formik.handleChange }
                        value={ formik.values.appointmentTime }
                        onBlur={ formik.handleBlur }
                        error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                        helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                      /> : <p>No time slot available</p>
                    :
                    <Select
                      name="appointmentTime"
                      labelform="Time Slot"
                      select={ ca_M_W_Th_F }
                      onChange={ formik.handleChange }
                      value={ formik.values.appointmentTime }
                      onBlur={ formik.handleBlur }
                      error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                      helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                    /> }
                </Grid>
              )
            ) : Moment(formik.values.date).format("dddd") === "Tuesday" ? (
              <Grid>
                { Moment(formik.values.date).format("DD-MM-YYYY") ===
                  Moment(new Date()).format("DD-MM-YYYY")
                  ? updated_other_Tue.length !== 0 ?
                    <Select
                      name="appointmentTime"
                      labelform="Time"
                      select={ JSON.stringify(updated_other_Tue) }
                      onChange={ formik.handleChange }
                      value={ formik.values.appointmentTime }
                      onBlur={ formik.handleBlur }
                      error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                      helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                    /> : <p>No time slot available</p>
                  :
                  <Select
                    name="appointmentTime"
                    labelform="Time"
                    select={ other_Tue }
                    onChange={ formik.handleChange }
                    value={ formik.values.appointmentTime }
                    onBlur={ formik.handleBlur }
                    error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                    helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                  /> }

              </Grid>
            ) : Moment(formik.values.date).format("dddd") === "Friday" ? (
              <Grid>
                { Moment(formik.values.date).format("DD-MM-YYYY") ===
                  Moment(new Date()).format("DD-MM-YYYY")
                  ? upt_other_Fri.length !== 0 ?
                    <Select
                      name="appointmentTime"
                      labelform="Time Slot"
                      select={ JSON.stringify(upt_other_Fri) }
                      onChange={ formik.handleChange }
                      value={ formik.values.appointmentTime }
                      onBlur={ formik.handleBlur }
                      error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                      helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                    />
                    : <p>No time slot available</p>
                  :
                  <Select
                    name="appointmentTime"
                    labelform="Time Slot"
                    select={ Other_Fri }
                    onChange={ formik.handleChange }
                    value={ formik.values.appointmentTime }
                    onBlur={ formik.handleBlur }
                    error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                    helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                  /> }
              </Grid>
            ) : (
              <Grid>
                { Moment(formik.values.date).format("DD-MM-YYYY") ===
                  Moment(new Date()).format("DD-MM-YYYY")
                  ? upt_other_M_W_Thu.length !== 0 ?
                    <Select
                      name="appointmentTime"
                      labelform="Time Slot"
                      select={ JSON.stringify(upt_other_M_W_Thu) }
                      onChange={ formik.handleChange }
                      value={ formik.values.appointmentTime }
                      onBlur={ formik.handleBlur }
                      error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                      helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                    />
                    : <p>No time slot available</p>
                  :
                  <Select
                    name="appointmentTime"
                    labelform="Time Slot"
                    select={ other_M_W_Thu }
                    onChange={ formik.handleChange }
                    value={ formik.values.appointmentTime }
                    onBlur={ formik.handleBlur }
                    error={ formik.touched.appointmentTime && Boolean(formik.errors.appointmentTime) }
                    helperText={ formik.touched.appointmentTime && formik.errors.appointmentTime }
                  /> }
              </Grid>
            ) }
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
