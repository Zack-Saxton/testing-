import React from "react";
import {ButtonPrimary, Radio, TextField} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TextFieldWithToolTip from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function BankAccountVerification() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <p style={{ textAlign: "justify" }}>
          <b>Funding</b> <br />
          Please provide your bank account information. This is the bank account
          where you will receive your Funds Please note that this bank account
          must be in the applicant's name
        </p>

        <Grid sm={12} item className={classes.content_grid}>
          <TextField
            name="accountholder"
            placeholder="Account Holder"
            label="Account Holder"
          />
        </Grid>
      </div>

      <Grid item xs={12} className={classes.content_grid}>
        <Radio
          name="question"
          labelforform="Account Type"
          radiolabel='[{"label":"Savings", "value":"saving"},{"label":"Checking", "value":"checking"}]'
          value="account"
          row={true}
          labelplacement={"end"}
          style={{ fontWeight: "normal" }}
        />
      </Grid>

      <Grid container spacing={4} direction="row">
        <Grid item xs={12} sm={6} direction="row" style={{ width:"100%" }}>
          <TextFieldWithToolTip
            name="bankrouting"
           style={{ width:"100%" }}
            type="text"
            placeholder="Bank Routing number"
            label={
              <div>
                Bank Routing number
                <Tooltip title="Bank Routing Number" placement="start-top">
                  <InfoOutlinedIcon
                    style={{ fontSize: "small", color: "blue" }}
                  />
                </Tooltip>
              </div>
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} direction="row" style={{ width:"100%" }}>
          <TextFieldWithToolTip
            name="bankinfo"
           style={{ width:"100%" }}
            type="text"
            placeholder="Bank Information"
            label={
              <div>
                Bank Information
                <Tooltip title="Bank Information" placement="start-top">
                  <InfoOutlinedIcon
                    style={{ fontSize: "small", color: "blue" }}
                  />
                </Tooltip>
              </div>
            }
          />
        </Grid>
      </Grid>

      <Grid item sm={12} className={classes.content_grid}>
        <TextField
          name="bankaccount"
          placeholder="Bank Account Number"
          label="Bank Account Number"
        />
      </Grid>
      <Grid  item sm={12} className={classes.content_grid}>
        <TextField
          name="confirmaccount"
          placeholder="Confirm Account Number"
          label="Confirm Account Number"
        />
      </Grid>

      <div>
        <p>
          <b>Repayment</b> <br />
          Please choose your preferred repayment method.
        </p>
      </div>
      <Grid item xs={12} className={classes.content_grid}>
        <Radio
          name="question"
          radiolabel='[{"label":"Automatic Payment", "value":"autopayment "}]'
          value="account"
          row={true}
          labelplacement={"end"}
          style={{ fontWeight: "normal" }}
        />
        <span>
          <br />
          <p
            style={{
              marginLeft: "30px",
              marginTop: "-10px",
              textAlign: "justify",
            }}
          >
            We electronically debit your bank account each month. You can cancel
            or change the bank account at any time. By clicking the box you are
            electronically signing and acknowledging and agreeing to the Auto
            Pay Authorization{" "}
          </p>
        </span>
      </Grid>

      <Grid item xs={12}>
        <Radio
          name="question"
          radiolabel='[{"label":"Payment by Check", "value":"checkpayment"}]'
          value="account"
          row={true}
          labelplacement={"end"}
          style={{ fontWeight: "normal" }}
        />
        <span>
          <br />
          <p style={{ marginLeft: "30px", marginTop: "-10px" }}>
            {" "}
            You'll mail us a check each month.
          </p>
        </span>
      </Grid>

      <div>
        <p style={{ textAlign: "justify" }}>
          <b>Upload Voided Personal Check:</b>
          <br />
          Please upload a voided personal check for the bank account you
          provided. If you do not have a personal check, please upload your most
          recent bank statement.
        </p>

        <p>
          Please ensure:
          <li>Your full account number and name are visible</li>
          <li>Acceptable file formats are PDF, JPG, JPEG, GIF and PNG</li>
        </p>
      </div>

      <Grid className={classes.content_grid}>
        <ButtonPrimary stylebutton='{"background": "", "color":"" }'>
          Upload Your Document
        </ButtonPrimary>
      </Grid>
    </div>
  );
}
