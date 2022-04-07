import React, { useState } from "react";
import { Grid } from "@mui/material";
import { ButtonPrimary, ButtonSecondary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

function BankAccountVerification() {
  const [selectDocument, setSelectDocument] = useState(false);

  const isMenuOpen = Boolean(selectDocument);

  const handleMenuOpen = (event) => {
    setSelectDocument(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectDocument(null);
  };
  const classes = useStylesEmailVerification();
  return (
    <Grid>
      <ul>
        <li>
          Please upload a voided personal check for the bank account you
          provided. If you do not have a personal check, please upload your most
          recent bank statement.
        </li>
      </ul>
      <span>Please ensure:</span>
      <ul>
        <li>Your full account number and name are visible.</li>
        <li>Acceptable file formats are PDF, JPG, JPEG and PNG.</li>
      </ul>
      <Grid>
        <ButtonPrimary
          onClick={handleMenuOpen}
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          Upload Your Document
        </ButtonPrimary>

        <Menu
          anchorEl={selectDocument}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          // id={ mobileMenuId }
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Typography className={classes.dropdownMenu}>
              Select from Existing Files
              <input
                id="selectFile"
                style={{ display: "none" }}
                type="file"
              ></input>
            </Typography>
          </MenuItem>
          <MenuItem>
            <a to="/faq" className="nav_link ">
              <Typography className={classes.dropdownMenu}>
                Upload from Camera
              </Typography>
            </a>
          </MenuItem>
        </Menu>

        <Grid className={classes.nextButton} container>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black","padding":"0px 30px"}'
          >
            Reset
          </ButtonSecondary>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black", "borderRadius": "50px"}'
          >
            Prev
          </ButtonSecondary>

          <ButtonPrimary stylebutton='{"color": ""}'>Next</ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BankAccountVerification;
