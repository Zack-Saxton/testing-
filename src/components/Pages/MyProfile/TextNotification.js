import React, { useEffect, useState } from "react";
import { useStylesMyProfile } from "./Style";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { textNotification } from "../../Controllers/myProfileController";
import { toast } from "react-toastify";
import AccountDetailsController from "../../Controllers/AccountOverviewController";
import "./Style.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  Checkbox,
  PhoneNumber,
} from "../../FormsUI";
import * as yup from "yup";
import { useFormik } from "formik";

export default function TextNotification() {
  const classes = useStylesMyProfile();
  const [opted_phone_texting] = React.useState("");
  const [accountDetailStatus, setaccountDetailStatus] = useState(null);
  async function AsyncEffect_accountDetail() {
    setaccountDetailStatus(await AccountDetailsController());
  }
  useEffect(() => {
    AsyncEffect_accountDetail();
  }, []);
  let accountDetailData =
    accountDetailStatus != null ? accountDetailStatus.data.data : null;
  let phonenum =
    accountDetailData?.customer?.latest_contact?.opted_phone_texting;
  let textnotifybool = phonenum ? true : false;

  const [openDisclosure, setDisclosureOpen] = useState(false);
  const [disabledContent, setdisabledContent] = useState(textnotifybool);
  const phonevalidationSchema = yup.object().shape({
    phone: yup
      .string("Enter a name")
      .required("Your Phone number is required")
      .transform((value) => value.replace(/[^\d]/g, ""))
      .matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, "Invalid Phone")
      .matches(/^(\d)(?!\1+$)\d{9}$/, "Invalid Phone")
      .min(10, "Name must contain at least 10 digits"),

    acceptterms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .oneOf([false], "False You must accept the terms and conditions"),
  });

  const initialValues = {
    phone: phonenum,
    textingterms: false,
    acceptterms: false,
  };

  const formikTextNote = useFormik({
    initialValues: { initialValues },
    enableReinitialize: true,
    validationSchema: phonevalidationSchema,

    onSubmit: async (values) => {
      try {
        if (values.textingterms === "") {
          toast.error("You must agree to the terms of use", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (values.opted_phone_texting === "") {
          toast.error("You must provide a valid phone number", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          let body = {
            phone: values.phone,
          };

          let res = await textNotification(body);

          if (res.data.data.emailUpdate === true) {
            toast.success("Updates successfull", {
              position: "bottom-left",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("No changes made", {
              position: "bottom-left",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      } catch (err) {
        toast.error("Error occured while changing text notification.", {
          position: "bottom-left",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  const handleSwitchNotification = (event) => {
    setdisabledContent(event.target.checked);
  };
  const handleDisclosureClickOpen = () => {
    setDisclosureOpen(true);
  };
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  const handleDisclosureClose = () => {
    setDisclosureOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <form
        onSubmit={formikTextNote.handleSubmit}
        name="formTextNotify"
        id="formTextNotify"
      >
        <Grid
          item
          xs={12}
          style={{ width: "100%", gap: 15, marginBottom: 20 }}
          container
          direction="row"
        >
          <Typography className={classes.cardHeading}>
            Enable Text Notifications
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ width: "100%", gap: 15, marginBottom: -10 }}
          container
          direction="row"
        >
          <FormControlLabel
            control={
              <Switch
                checked={disabledContent}
                onChange={handleSwitchNotification}
                value={disabledContent}
                inputProps={{ "data-test-id": "switch" }}
                color="primary"
              />
            }
            labelPlacement="end"
            label={
              disabledContent
                ? "Text Notifications are ON"
                : "Text Notifications are Off"
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ width: "100%", gap: 15, marginBottom: 20 }}
          container
          direction="row"
        >
          <p class="sepmarginBottom">
            <br />
            If you have not yet agreed to receive text messages and would like
            to receive text messages concerning your account, please enable text
            notifications above and provide the requested information.
          </p>
          <PhoneNumber
            name="phone"
            label="Mobile Number"
            placeholder="Mobile number"
            id="phone"
            defaultvalue={opted_phone_texting}
            type="text"
            materialProps={{ defaultValue: "" }}
            onKeyDown={preventSpace}
            value={formikTextNote.values.phone}
            onChange={formikTextNote.handleChange}
            onBlur={formikTextNote.handleBlur}
            error={
              formikTextNote.touched.phone &&
              Boolean(formikTextNote.errors.phone)
            }
            helperText={
              formikTextNote.touched.phone && formikTextNote.errors.phone
            }
          />
          <Link
            to="#"
            onClick={handleDisclosureClickOpen}
            className={classes.autoPayLink}
            style={{ textDecoration: "none" }}
          >
            Disclosure
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ width: "100%", gap: 15, marginBottom: 20 }}
          container
          direction="row"
        >
          <Checkbox
            name="textingterms"
            disabled={disabledContent === false ? true : false}
            id="textingterms"
            labelid="texting-terms"
            testid="checkbox"
            style={{ marginTop: "-12px", marginRight: "-120px" }}
            stylelabelform='{ "fontSize":"12px" }'
            stylecheckbox='{ "fontSize":"12px" }'
            stylecheckboxlabel='{ "fontSize":"12px" }'
            required="required"
          />
          <span style={{ paddingTop: "8px", marginLeft: "-30px" }}>
            I have read, understand, and agree to the &nbsp;
            <Link
              to="resources/legal/texting-terms-of-use"
              className={classes.autoPayLink}
              style={{ textDecoration: "none" }}
            >
              Texting Terms of Use.
            </Link>
          </span>
        </Grid>

        <Grid container direction="row">
          <ButtonSecondary
            stylebutton='{"width": "120px", "marginRight": " ", "height": "36px"}'
            styleicon='{ "color":"" }'
            id="apply-loan-reset-button"
            onClick={() => window.location.reload()}
          >
            <Typography align="center" className="textCSS ">
              Cancel
            </Typography>
          </ButtonSecondary>

          <ButtonPrimary
            type="submit"
            stylebutton='{"marginLeft": "5px","background": "#FFBC23", "color": "black","fontSize":"1rem","width": "140px", "height": "36px"}'
          >
            <Typography align="center" className="textCSS ">
              Update
            </Typography>
          </ButtonPrimary>
        </Grid>
      </form>

      <Dialog
        open={openDisclosure}
        onClose={handleDisclosureClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Disclosure</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "12px" }}
          >
            <p className={classes.discosureContent}>
              By providing my mobile and/or home number (including any phone
              number that I later convert to a mobile number), I expressly
              consent and agree to receive informational phone calls and text
              messages (including auto dialers and/or with pre-recorded
              messages) by or on behalf of Mariner for transactional purposes,
              such as the collection and servicing of all of my accounts. I
              understand that my consent for non-marketing, informational calls
              and messages applies to each phone number that I provide to
              Mariner now or in the future.
            </p>
            <p className={classes.discosureContent}>
              I understand that any text messages Mariner sends to me may be
              accessed by anyone with access to my text messages. I acknowledge
              that my mobile phone service provider may charge me fees for text
              messages that Mariner sends to me, and I agree that Mariner shall
              have no liability for the cost of any such text messages. I
              understand that I may unsubscribe from text messages by replying
              "STOP" to any text message that I receive from Mariner or on
              Mariner's behalf.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleDisclosureClose}
          >
            Ok
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}
