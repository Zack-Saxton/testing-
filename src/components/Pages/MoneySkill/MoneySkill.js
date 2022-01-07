import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  ButtonPrimary,
  ButtonSecondary
} from "../../FormsUI";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useStylesMoneySkill } from "./Style";
import "./Style.css";
import getMoneySkillUrl from "../../Controllers/MoneySkillController"

export default function MoneySkill(props) {

//Material UI css class
 const classes = useStylesMoneySkill();

 //API Call
 const [moneySkillUrl, setMoneySkillUrl] = useState(null);
 const [status, setStatus] = useState(null);

 async function getMoneySkillAPI() {
  let response = await getMoneySkillUrl();
  setStatus(response?.data?.status)
  setMoneySkillUrl(response?.data?.data?.moneyskillurl ? response?.data?.data?.moneyskillurl : "https://lms.moneyskill.org/students/login")
 }

 useEffect(() => {
   getMoneySkillAPI();
   return () => {
    setStatus({}); 
    setMoneySkillUrl({}); 
  };
 }, []);

//Pop up
  const handleCloseMoneySkill = () => {
    props.onChange(false);
  };

//View part
  return (
    <div>
     <Dialog
      id="moneySkillDialogBox"
        open={props.moneySkill}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.moneySkillDialog }}
      >
        <div id="closeBtn" className={classes.buttonClose}>
          <IconButton
            aria-label="close"
            onClick={handleCloseMoneySkill}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <h2 id="moneySkillDialogHeading" className={classes.moneySkillDialogHeading}>
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
            <a target="blank" id="moneySkillInfoLink" href="https://www.afsaef.org/Privacy-Policy">(found here)</a>&nbsp;
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
            onClick={handleCloseMoneySkill}
            stylebutton='{"float": "" }'
          >
            Stay on Marinerfinance.com
          </ButtonSecondary>

          <ButtonPrimary
            href={moneySkillUrl}
            id="Continue"
            stylebutton='{"float": "" }'
            target="_blank"
            disabled={status === null  ? true : false}
            onClick={handleCloseMoneySkill}
          >
            Continue
              <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                  marginRight: "10px",
                  display:status === null ? "block" : "none",
              }}
              />
          </ButtonPrimary>
        </div>
      </Dialog>
    </div>
  );
}
