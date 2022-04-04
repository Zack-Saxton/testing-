import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import {
  ButtonPrimary,
  ButtonSecondary,
  Select,
} from "../../../components/FormsUI";
import Selfielicense from "../../../assets/gallery/selfielicense.png";
import { useStylesEmailVerification } from "./Style";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

function DocumentIdAndPhotoId() {
  const [docType, setDocType] = useState("");
  const [selectDocument, setSelectDocument] = useState(false);

  const isMenuOpen = Boolean(selectDocument);

  const handleMenuOpen = (event) => {
    setSelectDocument(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectDocument(null);
  };

  const classes = useStylesEmailVerification();

  const handleDocType = (event) => {
    setDocType(event.target.value.trim());
    changeEvent.current.click();
    event.target.value = "";
  };
  return (
    <Grid>
      <span>
        Please upload an image of your driver’s license, passport, state-issued
        photo ID card, or military/federal government photo ID.
      </span>
      <span>Please ensure:</span>
      <ul className={classes.PleaseEnsureList}>
        <li>The image is in color.</li>
        <li>The document is currently valid.</li>
        <li>The entire document is visible and all information is legible.</li>
        <li>Acceptable file formats are PDF, JPG, JPEG, PNG.</li>
      </ul>

      <Grid item sm={12} md={6} className={classes.selectDocumentType}>
        <Grid className={classes.selectInput}>
          <Select
            id="selectDoccumentWrap"
            name="selectDocument"
            labelform="Select ID Type"
            select='[{ "label": "Drivers License", "value": "id_doc"},
                {"label": "Passport","value": "income_doc"},
                { "label": "State-issued Photo ID Card","value": "bank_doc"},
                { "label": "Military Federal Government Photo Id","value":"other_doc"}]'
            onChange={handleDocType}
            value={docType}
          />
        </Grid>
        <ButtonPrimary
          onClick={handleMenuOpen}
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          Upload a Document
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
      </Grid>

      <Grid className={classes.uploadDocumentText}>
        <span className={classes.uploadDocumentParagraph}>
          Please upload a picture of yourself, in which you are holding your
          state or federal government issued ID next to your face. Please ensure
          that the information on the ID is legible and that your hand is
          clearly visible and holding your ID. This will allow us to check that
          your ID document matches your appearance (similar to an in-person ID
          check).
          <br />
          To see an example, please look at the image below.
        </span>
        <Grid className="SelfieLicenseImage">
          <img src={Selfielicense} alt="Selfielicense" />
          <span>Sample Photograph</span>
        </Grid>
      </Grid>
      <Grid>
        <ButtonPrimary
          onClick={handleMenuOpen}
          stylebutton='{"background": "#FFBC23","padding":"0px 30px", "color": "black"}'
        >
          Upload your Picture
        </ButtonPrimary>

        <Grid className={classes.nextButton} container>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black","padding":"0px 30px"}'
          >
            Reset
          </ButtonSecondary>

          <ButtonPrimary stylebutton='{"color": ""}'>Next</ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DocumentIdAndPhotoId;
