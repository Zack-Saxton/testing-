import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ButtonPrimary, DatePicker, Select } from "../../FormsUI";
import { useStylesMyBranch } from "./Style";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Moment from "moment";
import { useFormik } from "formik";
import * as yup from "yup";
import momentTimeZone from "moment-timezone";
import {
  ca_M_W_Th_F,
  ca_Tue,
  other_Tue,
  Other_Fri,
  other_M_W_Thu,
} from "./WorkingHours";
import { ScheduleVisitApi } from "../../controllers/MyBranchController";

const validationSchema = yup.object({
  date: yup
    .date("Please enter valid date")
    .nullable()
    .required("Date is required"),

  appointmentTime: yup
    .string("Select Time")
    .nullable()
    .required("Time is required"),
});

const scheduleAppointmentDate = new Date();
scheduleAppointmentDate.setDate(scheduleAppointmentDate.getDate() + 30);

function disableWeekends(date) {
  const dateInterditesRaw = [
    new Date(date.getFullYear(), 0, 1),
    new Date(date.getFullYear(), 0, 17),
    new Date(date.getFullYear(), 1, 21),
    new Date(date.getFullYear(), 4, 30),
    new Date(date.getFullYear(), 6, 4),
    new Date(date.getFullYear(), 8, 5),
    new Date(date.getFullYear(), 9, 10),
    new Date(date.getFullYear(), 10, 11),
    new Date(date.getFullYear(), 10, 24),
    new Date(date.getFullYear(), 11, 25),
  ];

  const dateInterdites = dateInterditesRaw.map((arrVal) => {
    return arrVal.getTime();
  });

  return (
    date.getDay() === 0 ||
    date.getDay() === 6 ||
    dateInterdites.includes(date.getTime())
  );
}

export default function ScheduleAppointment(MyBranchAppointment) {
  const classes = useStylesMyBranch();

  let branchDetail = MyBranchAppointment != null ? MyBranchAppointment : null;

  let stateName = branchDetail.MyBranchAppointment.MyBranchDetail
    ? branchDetail.MyBranchAppointment.MyBranchDetail.result
      ? null
      : branchDetail?.MyBranchAppointment?.MyBranchDetail
      ? branchDetail.MyBranchAppointment.MyBranchDetail.Address.split(",")
          [
            branchDetail.MyBranchAppointment.MyBranchDetail.Address.split(",")
              .length - 1
          ].trim()
          .substring(0, 2)
      : null
    : null;

  const [scheduleAppointment, setScheduleAppointment] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

      if (response[0] === "true") {
        formik.values.date = null;
        formik.values.appointmentTime = null;
        setLoading(false);
        setScheduleAppointment(false);
      }
    },
  });

  const handleScheduleAppointment = () => {
    setScheduleAppointment(true);
  };

  const handleScheduleAppointmentclose = () => {
    document.getElementById("formAppointment").remove();
    formik.values.date = null;
    formik.values.appointmentTime = null;
    formik.touched.date = null;
    formik.touched.appointmentTime = null;
    setScheduleAppointment(false);
  };

  return (
    <div>
      <Grid item xs={12} style={{ paddingTop: "10px", textAlign: "left" }}>
        <ButtonPrimary
          stylebutton='{"float": "" }'
          onClick={handleScheduleAppointment}
        >
          Schedule An Appointment
        </ButtonPrimary>
      </Grid>

      <Dialog
        open={scheduleAppointment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <div className={classes.buttonClose}>
          <IconButton
            aria-label="close"
            onClick={handleScheduleAppointmentclose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title" style={{ padding: "unset" }}>
          <Typography component={"div"} className={classes.dialogHeading}>
            Schedule an Appointment
          </Typography>
        </DialogTitle>
        <form id="formAppointment" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid style={{ paddingBottom: "10px" }}>
              <DatePicker
                name="date"
                label="Date"
                placeholder="MM/DD/YYYY"
                id="date"
                disablePast
                onKeyDown={(e) => e.preventDefault()}
                shouldDisableDate={disableWeekends}
                maxdate={scheduleAppointmentDate}
                minyear={4}
                value={formik.values.date}
                onChange={(values) => {
                  formik.setFieldValue("date", values);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Grid>

            {stateName === "CA" ? (
              Moment(formik.values.date).format("dddd") === "Tuesday" ? (
                <Grid>
                  <Select
                    name="appointmentTime"
                    labelform="Time Slot"
                    select={ca_Tue}
                    onChange={formik.handleChange}
                    value={formik.values.appointmentTime || ""}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.appointmentTime &&
                      Boolean(formik.errors.appointmentTime)
                    }
                    helperText={
                      formik.touched.appointmentTime &&
                      formik.errors.appointmentTime
                    }
                  />{" "}
                </Grid>
              ) : (
                <Grid>
                  <Select
                    name="appointmentTime"
                    labelform="Time Slot"
                    select={ca_M_W_Th_F}
                    onChange={formik.handleChange}
                    value={formik.values.appointmentTime || ""}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.appointmentTime &&
                      Boolean(formik.errors.appointmentTime)
                    }
                    helperText={
                      formik.touched.appointmentTime &&
                      formik.errors.appointmentTime
                    }
                  />
                </Grid>
              )
            ) : Moment(formik.values.date).format("dddd") === "Tuesday" ? (
              <Grid>
                <Select
                  name="appointmentTime"
                  labelform="Time Slot"
                  select={other_Tue}
                  onChange={formik.handleChange}
                  value={formik.values.appointmentTime || ""}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.appointmentTime &&
                    Boolean(formik.errors.appointmentTime)
                  }
                  helperText={
                    formik.touched.appointmentTime &&
                    formik.errors.appointmentTime
                  }
                />{" "}
              </Grid>
            ) : Moment(formik.values.date).format("dddd") === "Friday" ? (
              <Grid>
                <Select
                  name="appointmentTime"
                  labelform="Time Slot"
                  select={Other_Fri}
                  onChange={formik.handleChange}
                  value={formik.values.appointmentTime || ""}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.appointmentTime &&
                    Boolean(formik.errors.appointmentTime)
                  }
                  helperText={
                    formik.touched.appointmentTime &&
                    formik.errors.appointmentTime
                  }
                />
              </Grid>
            ) : (
              <Grid>
                <Select
                  name="appointmentTime"
                  labelform="Time Slot"
                  select={other_M_W_Thu}
                  onChange={formik.handleChange}
                  value={formik.values.appointmentTime || ""}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.appointmentTime &&
                    Boolean(formik.errors.appointmentTime)
                  }
                  helperText={
                    formik.touched.appointmentTime &&
                    formik.errors.appointmentTime
                  }
                />
              </Grid>
            )}
          </DialogContent>

          <DialogActions style={{ justifyContent: "center" }}>
            <ButtonPrimary
              type="submit"
              stylebutton='{"background": "", "color":"" }'
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
