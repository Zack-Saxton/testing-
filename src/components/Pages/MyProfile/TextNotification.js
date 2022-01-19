import React, { useState } from "react";
import { useStylesMyProfile } from "./Style";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { textNotification } from "../../Controllers/myProfileController";
import { toast } from "react-toastify";
import { tabAtom } from "./MyProfileTab";
import { useAtom } from "jotai";
import "./Style.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  Checkbox,
  PhoneNumber,
} from "../../FormsUI";
import * as yup from "yup";
import { useFormik } from "formik";
import Cookies from "js-cookie";

export default function TextNotification() {
  const classes = useStylesMyProfile();
  const [loading, setLoading] = useState(false);
  const [openDisclosure, setDisclosureOpen] = useState(false);
  const history = useHistory();
  const [, setTabvalue] = useAtom(tabAtom);
  let phone = Cookies.get("opted_phone_texting");
  let textnotifybool = Cookies.get("isTextNotify") === "true" ? true : false;
  let [disabledContent, setdisabledContent] = useState(textnotifybool);
  const onClickCancelChange = () => {
    formikTextNote.resetForm();
    history.push({ pathname: "/customers/myProfile" });
    setTabvalue(0);
  };

  const phonevalidationSchema = yup.object().shape({
    phone: yup
      .string("Enter a name")
      .required("Your Phone number is required")
      .transform((value) => value.replace(/[^\d]/g, ""))
      .matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, "Please enter a valid phone number")
      .matches(/^(\d)(?!\1+$)\d{9}$/, "Please enter a valid phone number")
      .min(10, "Name must contain at least 10 digits"),

    acceptterms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .oneOf([false], "False You must accept the terms and conditions"),
  });

  const formikTextNote = useFormik({
    initialValues: {
      phone: phone ? phone : "",
      textingterms: phone ? true : false,
      acceptterms: phone ? true : false,
    },
    enableReinitialize: true,
    validationSchema: phonevalidationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        let body = {
          phone: values.phone,
        };

        let res = await textNotification(body, disabledContent);
        if (
          res.data.data?.sbt_subscribe_details?.HasNoErrors === true ||
          res.data.data?.sbt_getInfo?.HasNoErrors === true
        ) {
          toast.success("Updated successfully", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          Cookies.set("isTextNotify", disabledContent);
          window.setTimeout(function () {
            window.location.reload();
          }, 4000);
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
        window.setTimeout(function () {
          setLoading(false);
        }, 3050);
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
    formikTextNote.resetForm();
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
          <Typography
            style={{ fontSize: "0.75rem" }}
            className={classes.cardHeading}
          >
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
            id="NotificationsTxt"
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
                ? "Text Notifications are On"
                : "Text Notifications are Off"
            }
          />
        </Grid>
        <Grid
          id="txtPhoneNumber"
          item
          xs={12}
          style={{ width: "100%", gap: 15, marginBottom: 20 }}
          container
          direction="row"
        >
          <p className="sepmarginBottom">
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
            type="text"
            onKeyDown={preventSpace}
            value={formikTextNote.values.phone}
            onChange={formikTextNote.handleChange}
            onBlur={formikTextNote.handleBlur}
            disabled={disabledContent === false ? true : false}
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
            className={classes.linkStyle}
            style={{ textDecoration: "none", color: "#0F4EB3" }}
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
            stylelabelform='{ "fontSize":"12px" }'
            stylecheckbox='{ "fontSize":"12px" }'
            stylecheckboxlabel='{ "fontSize":"12px" }'
            required
          />
          <span
            style={{
              fontSize: "0.938rem",
              paddingTop: "8px",
              marginLeft: "-30px",
            }}
          >
            I have read, understand, and agree to the &nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              color="#0F4EB3"
              href="https://www.marinerfinance.com/resources/legal/texting-terms-of-use"
              className={classes.linkStyle}
              style={{ textDecoration: "none" }}
            >
              Texting Terms of Use.
            </a>
          </span>
        </Grid>

        <Grid container direction="row">
          <ButtonSecondary
            stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
            styleicon='{ "color":"" }'
            type="submit"
            onClick={onClickCancelChange}
            disabled={loading}
          >
            Cancel
          </ButtonSecondary>

          <ButtonPrimary
            stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif", "marginLeft": "5px"}'
            styleicon='{ "color":"" }'
            type="submit"
            disabled={loading}
          >
            Update
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                marginRight: "10px",
                display: loading ? "block" : "none",
              }}
            />
          </ButtonPrimary>
        </Grid>
      </form>

      <Dialog
        open={openDisclosure}
        onClose={handleDisclosureClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography id="scheduleTxt" className={classes.dialogHeading}>
            Disclosure
          </Typography>
          <IconButton
            id="autopayCloseBtn"
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDisclosureClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              align="justify"
              style={{ fontSize: "15px", color: "black" }}
              gutterBottom
            >
              <p className={classes.discosureContent}>
                By providing my mobile and/or home number (including any phone
                number that I later convert to a mobile number), I expressly
                consent and agree to receive informational phone calls and text
                messages (including auto dialers and/or with pre-recorded
                messages) by or on behalf of Mariner for transactional purposes,
                such as the collection and servicing of all of my accounts. I
                understand that my consent for non-marketing, informational
                calls and messages applies to each phone number that I provide
                to Mariner now or in the future.
              </p>
              <p className={classes.discosureContent}>
                I understand that any text messages Mariner sends to me may be
                accessed by anyone with access to my text messages. I
                acknowledge that my mobile phone service provider may charge me
                fees for text messages that Mariner sends to me, and I agree
                that Mariner shall have no liability for the cost of any such
                text messages. I understand that I may unsubscribe from text
                messages by replying "STOP" to any text message that I receive
                from Mariner or on Mariner's behalf.
              </p>
            </Typography>
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
