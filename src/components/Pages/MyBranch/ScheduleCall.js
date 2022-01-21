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
import {
  ca_M_W_Th_F,
  ca_Tue,
  other_Tue,
  Other_Fri,
  other_M_W_Thu,
  upt_ca_M_W_TH_F, upt_ca_Tue, updated_other_Tue, upt_other_Fri, upt_other_M_W_Thu
} from "./WorkingHours";
import { ScheduleCallApi } from "../../Controllers/MyBranchController";
import momentTimeZone from "moment-timezone";

// yup validation
const validationSchema = yup.object({
  date: yup
    .date("Please enter a valid date")
    .nullable()
    .required("Date is required"),

  callTime: yup.string("Select Time").nullable().required("Time is required"),
});

//Date validation
const scheduleDateCall = new Date();
scheduleDateCall.setDate(scheduleDateCall.getDate() + 30);

//US holidays
function disableWeekends(date) {
  const dateInterditesRaw = [
    new Date(date.getFullYear(), 0, 1),
    new Date(date.getFullYear(), 0, 18),
    new Date(date.getFullYear(), 4, 31),
    new Date(date.getFullYear(), 6, 5),
    new Date(date.getFullYear(), 8, 6),
    new Date(date.getFullYear(), 10, 11),
    new Date(date.getFullYear(), 10, 25),
    new Date(date.getFullYear(), 11, 24),
    new Date(date.getFullYear(), 11, 31),
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

export default function ScheduleCall(MyBranchCall) {

  //Material UI css class
  const classes = useStylesMyBranch();

  //Branch details from API
  let branchDetail = MyBranchCall != null ? MyBranchCall : null;

  //Spliting statename
  let stateName = branchDetail?.MyBranchCall?.MyBranchDetail
    ? branchDetail?.MyBranchCall?.MyBranchDetail?.result
      ? null : branchDetail?.MyBranchCall?.MyBranchDetail?.message ? null
        : branchDetail?.MyBranchCall?.MyBranchDetail
          ? branchDetail?.MyBranchCall?.MyBranchDetail?.Address?.split(",")
          [
            branchDetail?.MyBranchCall?.MyBranchDetail?.Address?.split(",").length -
            1
          ].trim()
            .substring(0, 2)
          : null
    : null;

  const [scheduleCall, setScheduleCall] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  //Formik implementation
  const formik = useFormik({
    initialValues: {
      date: null,
      callTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var callDate = Moment(values.date).format("YYYY-MM-DD");
      var callingTime = values.callTime;

      let callTimeZone = momentTimeZone
        .tz(momentTimeZone.tz.guess())
        .zoneAbbr();

      setLoading(true);

      let response = await ScheduleCallApi(callDate, callingTime, callTimeZone);


      if (response === "true") {
        formik.values.date = null;
        formik.values.callTime = null;
        setLoading(false);
        setScheduleCall(false);
      }
    },
  });

  //pop up open & close
  const handleScheduleCall = () => {
    setScheduleCall(true);
  };

  const handleScheduleCallClose = () => {
    document.getElementById("formCall").remove();
    formik.values.date = null;
    formik.values.callTime = null;
    formik.touched.date = null;
    formik.touched.callTime = null;
    setScheduleCall(false);
  };

  //View part
  return (
    <div>
      <Grid item xs={12} style={{ paddingTop: "10px", textAlign: "left" }}>
        <ButtonPrimary
          stylebutton='{"float": "", "padding":"0px 30px", "fontSize":"0.938rem" }'
          onClick={handleScheduleCall}
        >
          Schedule a call
        </ButtonPrimary>
      </Grid>

      <Dialog
        open={scheduleCall}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <div className={classes.buttonClose}>
          <IconButton
            aria-label="close"
            onClick={handleScheduleCallClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title" style={{ padding: "unset" }}>
          <Typography className={classes.dialogHeading}>
            Schedule a Call
          </Typography>
        </DialogTitle>
        <form id="formCall" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid style={{ paddingBottom: "10px" }}>
              <DatePicker
                name="date"
                label="Date"
                placeholder="MM/DD/YYYY"
                id="date"
                disablePast
                autoComplete="off"
                onKeyDown={(e) => e.preventDefault()}
                shouldDisableDate={disableWeekends}
                maxdate={scheduleDateCall}
                minyear={4}
                value={formik.values.date || ""}
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
                <Select
                  name="callTime"
                  labelform="Time Slot"
                  select={Moment(formik.values.date).format("DD-MM-YYYY") === Moment(new Date()).format("DD-MM-YYYY") ? upt_ca_Tue : ca_Tue}
                  onChange={formik.handleChange}
                  value={formik.values.callTime || ""}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.callTime && Boolean(formik.errors.callTime)
                  }
                  helperText={formik.touched.callTime && formik.errors.callTime}
                />
              ) : (
                <Select
                  name="callTime"
                  labelform="Time Slot"
                  select={Moment(formik.values.date).format("DD-MM-YYYY") === Moment(new Date()).format("DD-MM-YYYY") ? upt_ca_M_W_TH_F : ca_M_W_Th_F}
                  onChange={formik.handleChange}
                  value={formik.values.callTime}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.callTime && Boolean(formik.errors.callTime)
                  }
                  helperText={formik.touched.callTime && formik.errors.callTime}
                />
              )
            ) : Moment(formik.values.date).format("dddd") === "Tuesday" ? (
              <Select
                name="callTime"
                labelform="Time Slot"
                select={Moment(formik.values.date).format("DD-MM-YYYY") === Moment(new Date()).format("DD-MM-YYYY") ? updated_other_Tue : other_Tue}
                onChange={formik.handleChange}
                value={formik.values.callTime || ""}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.callTime && Boolean(formik.errors.callTime)
                }
                helperText={formik.touched.callTime && formik.errors.callTime}
              />
            ) : Moment(formik.values.date).format("dddd") === "Friday" ? (
              <Select
                name="callTime"
                labelform="Time Slot"
                select={Moment(formik.values.date).format("DD-MM-YYYY") === Moment(new Date()).format("DD-MM-YYYY") ? upt_other_Fri : Other_Fri}
                onChange={formik.handleChange}
                value={formik.values.callTime || ""}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.callTime && Boolean(formik.errors.callTime)
                }
                helperText={formik.touched.callTime && formik.errors.callTime}
              />
            ) : (
              <Select
                name="callTime"
                labelform="Time Slot"
                select={Moment(formik.values.date).format("DD-MM-YYYY") === Moment(new Date()).format("DD-MM-YYYY") ? upt_other_M_W_Thu : other_M_W_Thu}
                onChange={formik.handleChange}
                value={formik.values.callTime || ""}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.callTime && Boolean(formik.errors.callTime)
                }
                helperText={formik.touched.callTime && formik.errors.callTime}
              />
            )}
          </DialogContent>

          <DialogActions style={{ justifyContent: "center" }}>
            <ButtonPrimary
              type="submit"
              stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
              disabled={loading}
            >
              Call Back
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
