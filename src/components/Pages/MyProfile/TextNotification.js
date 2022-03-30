import { FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import { textNotification } from "../../Controllers/MyProfileController";
import {
  ButtonPrimary,
  ButtonSecondary,
  Checkbox,
  PhoneNumber
} from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesMyProfile } from "./Style";
import "./Style.css";

export default function TextNotification() {
  const classes = useStylesMyProfile();
  const [ loading, setLoading ] = useState(false);
  const [ openDisclosure, setOpenDisclosur ] = useState(false);
  const navigate = useNavigate();
  const [ , setProfileTabNumber ] = useGlobalState();
  let phone = Cookies.get("opted_phone_texting");
  let isTextNotify = (/true/i).test(Cookies.get("isTextNotify"));
  let [ disabledContent, setDisabledContent ] = useState(isTextNotify);

  const onClickCancelChange = () => {
    formikTextNote.resetForm();
    navigate("/customers/myProfile");
    setProfileTabNumber({ profileTabNumber: 0 });
  };

  const phoneValidationSchema = yup.object().shape({
    phone: yup
      .string(globalMessages.NameEnter)
      .required(globalMessages.PhoneRequired)
      .transform((value) => value.replace(/[^\d]/g, ""))
      .matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, globalMessages.PhoneValid)
      .matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
      .min(10, globalMessages.PhoneMin),

    acceptTerms: yup
      .boolean()
      .oneOf([ true ], globalMessages.Accept_Text_Terms)
      .oneOf([ false ], `False ${ globalMessages.Accept_Text_Terms }`),
  });

  function phoneNumberMask(values) {
    let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
    return (values);
  }

  const formikTextNote = useFormik({
    initialValues: {
      phone: phone ? phoneNumberMask(phone) : "",
      textingterms: phone ? true : false,
      acceptTerms: phone ? true : false,
    },
    enableReinitialize: true,
    validationSchema: phoneValidationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      setDisabledContent(false);
      try {
        let body = {
          phone: values.phone,
        };

        let result = await textNotification(body, disabledContent);
        if (result?.data?.sbt_subscribe_details?.HasNoErrors || result?.data?.sbt_getInfo?.HasNoErrors) {
          toast.success("Updated successfully");
          onClickCancelChange();
        } else {
          toast.error("No changes made");
        }
        onClickCancelChange();
      } catch (error) {
        ErrorLogger("Error occured while changing text notification.", error);
      }
    },
  });

  const handleSwitchNotification = (event) => {
    setDisabledContent(event.target.checked);
    formikTextNote.resetForm();
  };
  const handleDisclosureClickOpen = () => {
    setOpenDisclosur(true);
  };
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  const handleDisclosureClose = () => {
    setOpenDisclosur(false);
  };

  return (
    <div className="textNotificationWrap" >
      <form
        onSubmit={ formikTextNote.handleSubmit }
        name="formTextNotify"
        id="formTextNotify"
      >
        <Grid
          item
          xs={ 12 }
          className={ classes.textNotificationTitle }
          container
          direction="row"
        >
          <Typography
            className={ classes.textLabel }
          >
            Enable Text Notifications
          </Typography>
        </Grid>
        <Grid
          item
          xs={ 12 }
          className={ classes.textFormRow }
          container
          direction="row"
        >
          <FormControlLabel
            id="NotificationsTxt"
            control={
              <Switch
                checked={ disabledContent }
                onChange={ handleSwitchNotification }
                value={ disabledContent }
                inputProps={ { "data-test-id": "switch" } }
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
          xs={ 12 }
          className={ classes.textNotificationTitle }
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
            onKeyDown={ preventSpace }
            value={ formikTextNote.values.phone }
            onLoad={ formikTextNote.handleChange }
            onChange={ formikTextNote.handleChange }
            onBlur={ formikTextNote.handleBlur }
            disabled={ !disabledContent }
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
            onClick={ handleDisclosureClickOpen }
            className={ classes.linkStyle }
          >
            Disclosure
          </Link>
        </Grid>
        <Grid
          item
          xs={ 12 }
          style={ { marginBottom: 20 } }
          container
        >
          <Checkbox
            item
            xs={ 1 }
            name="textingterms"
            disabled={ !disabledContent }
            id="textingterms"
            labelid="texting-terms"
            testid="checkbox"
            stylelabelform='{ "fontSize":"12px" }'
            stylecheckbox='{ "fontSize":"12px" }'
            stylecheckboxlabel='{ "fontSize":"12px" }'
            required
          />
          <Grid
            item
            xs={ 10 }
            className={ classes.termsGrid }
          >
            I have read, understand, and agree to the &nbsp;
            <Link
              to={ `/textingTermsOfUse` }
              target="_blank"
              className={ classes.linkStyle }
            >
              Texting Terms of Use.
            </Link>
          </Grid>
        </Grid>

        <Grid container direction="row">
          <ButtonSecondary
            stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
            styleicon='{ "color":"" }'
            type="submit"
            onClick={ onClickCancelChange }
            disabled={ loading }
          >
            Cancel
          </ButtonSecondary>

          <ButtonPrimary
            stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif", "marginLeft": "5px"}'
            styleicon='{ "color":"" }'
            type="submit"
            disabled={ loading }
          >
            Update
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={ {
                marginRight: "10px",
                display: loading ? "block" : "none",
              } }
            />
          </ButtonPrimary>
        </Grid>
      </form>

      <Dialog
        open={ openDisclosure }
        onClose={ handleDisclosureClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography id="scheduleTxt" className={ classes.dialogHeading }>
            Disclosure
          </Typography>
          <IconButton
            id="autopayCloseBtn"
            aria-label="close"
            className={ classes.closeButton }
            onClick={ handleDisclosureClose }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              align="justify"
              className={ classes.discosureText }
              gutterBottom
            >
              <p className={ classes.discosureContent }>
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
              <p className={ classes.discosureContent }>
                I understand that any text messages Mariner sends to me may be
                accessed by anyone with access to my text messages. I
                acknowledge that my mobile phone service provider may charge me
                fees for text messages that Mariner sends to me, and I agree
                that Mariner shall have no liability for the cost of any such
                text messages. I understand that I may unsubscribe from text
                messages by replying &quot;STOP&quot; to any text message that I receive
                from Mariner or on Mariner&apos;s behalf.
              </p>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handleDisclosureClose }
          >
            Ok
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}
