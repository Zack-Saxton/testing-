import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import getMoneySkillUrl from "../../Controllers/MoneySkillController";
import {
  ButtonPrimary,
  ButtonSecondary
} from "../../FormsUI";
import { useStylesMoneySkill } from "./Style";
import "./Style.css";

export default function MoneySkill(props) {

  //Material UI css class
  const classes = useStylesMoneySkill();

  //API Call
  const [ moneySkillUrl, setMoneySkillUrl ] = useState(null);

  async function getMoneySkillAPI() {
    let response = await getMoneySkillUrl();
    setMoneySkillUrl(response?.data?.moneyskillurl ?? "https://lms.moneyskill.org/students/login");
  }

  useEffect(() => {
    getMoneySkillAPI();
    return () => {
      setMoneySkillUrl({});
    };
  }, []);

  //Pop up
  const handleCloseMoneySkill = () => {
    props.onChange(false);
  };

  //View part
  return (
    <div data-testid = "MoneySkill_component">
      <Dialog
        id="moneySkillDialogBox"
        open={props?.moneySkill}
        data-testid = "MoneySkill_dialog"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.moneySkillDialog }}
      >
        <div id="closeBtn" className={classes.buttonClose}>
          <IconButton
          data-testid = "closeIcon_Button"
            aria-label="close"
            onClick={handleCloseMoneySkill}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <h2 id="moneySkillDialogHeading" data-testid = "Dialog_Heading" className={classes.moneySkillDialogHeading}>
          You are about to leave <br /> marinerfinance.com
        </h2>

        <div>
          <p className={classes.moneySkillParagaraph}>
            Mariner Finance provides this link for your convenience and is not
            responsible for and makes no claims or representations regarding the
            content, terms of use, or privacy policies of third party websites.
          </p>

          <p className={classes.moneySkillParagaraph}>
            The information you provide to register and use MoneySKILL is
            governed by the privacy policy of the American Financial Services
            Association Education Foundation &nbsp;
            <a target="blank" data-testid = "moneySkillInfoLink" id="moneySkillInfoLink" href="https://www.afsaef.org/Privacy-Policy">(found here)</a>&nbsp;
            and the privacy policy of Mariner Finance &nbsp;
            <a target="blank" id="moneySkillInfoLink" href="https://www.marinerfinance.com/resources/legal/privacy-statement/">(found here)</a>.
            &nbsp; If you have any questions about the collection and use of the
            information you provide, please review those policies and use the
            contact mechanisms provided for in the policies.
          </p>
        </div>

        <div id="buttonWrap">
          <ButtonSecondary
            id="stayBtn"
            data-testid = "stayBtn"
            onClick={handleCloseMoneySkill}
            stylebutton='{"float": "" }'
          >
            Stay on Marinerfinance.com
          </ButtonSecondary>

          <ButtonPrimary
            href={moneySkillUrl}
            id="Continue"
            data-testid = "Continue_Btn"
            stylebutton='{"float": "" }'
            target="_blank"
            disabled={!moneySkillUrl}
            onClick={handleCloseMoneySkill}
          >
            Continue
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                marginRight: "10px",
                display: !moneySkillUrl ? "block" : "none",
              }}
            />
          </ButtonPrimary>
        </div>
      </Dialog>
    </div>
  );
}
MoneySkill.propTypes = {
  onChange: PropTypes.func,
  moneySkill: PropTypes.bool,
};