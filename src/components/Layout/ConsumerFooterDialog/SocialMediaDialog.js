import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React from "react";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import { useStylesConsumer } from "./Style";
import "./Style.css";

export default function SocialMediaDialog(props) {
  //Material UI css class
  const classes = useStylesConsumer();
  //Pop up
  const handleCloseSocialMedia = () => {
    props.onChange(false);
  };

  //View part
  return (
    <div>
      <Dialog
        id="consumerDialogBox"
        open={props.socialMedia}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.consumerDialog }}
      >
        <div id="closeBtn" className={classes.buttonClose}>
          <IconButton
            aria-label="close"
            onClick={handleCloseSocialMedia}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <h2
          id="consumerDialogHeading"
          className={classes.consumerDialogHeading}
        >
          You are about to leave marinerfinance.com
        </h2>

        <div>
          <p className={classes.consumerParagaraph}>
            Mariner Finance provides this link for your convenience and is not
            responsible for and makes no claims or representations regarding the
            content, terms of use, or privacy policies of third party websites.
          </p>
        </div>

        <div id="buttonWrap">
          <ButtonSecondary
            id="stayBtn"
            onClick={handleCloseSocialMedia}
            stylebutton='{"float": "" }'
          >
            Stay on Marinerfinance.com
          </ButtonSecondary>

          <ButtonPrimary
            href={props.URL}
            onClick={handleCloseSocialMedia}
            id="Continue"
            stylebutton='{"float": "" }'
            target="_blank"
          >
            Continue
          </ButtonPrimary>
        </div>
      </Dialog>
    </div>
  );
}

SocialMediaDialog.propTypes = {
  socialMedia: PropTypes.bool,
  onChange: PropTypes.func,
  URL: PropTypes.string
};