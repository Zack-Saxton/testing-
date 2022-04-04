import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { ButtonPrimary, ButtonSecondary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

function IncomeVerification() {
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
          Recent Pay Statements (your most recent), or most recent Benefits
          Statement from current calendar year (if you are retired or not
          employed), or 1099 Income Statement as discussed with your loan
          officer.
        </li>
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

export default IncomeVerification;
