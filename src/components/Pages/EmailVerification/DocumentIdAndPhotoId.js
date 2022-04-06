import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  ButtonPrimary,
  ButtonSecondary,
  Select,
} from "../../../components/FormsUI";
import Selfielicense from "../../../assets/gallery/selfielicense.png";
import { useStylesEmailVerification } from "./Style";
import UploadDocument from "./UploadDocument";



function DocumentIdAndPhotoId(props) {
  const [docType, setDocType] = useState("");   
  const [ loading, setLoading ] = useState(false);  
  const classes = useStylesEmailVerification();

  const handleDocType = (event) => {
    setDocType(event.target.value.trim());    
    event.target.value = '';
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
        <UploadDocument 
          documentType="idDocumentPhoto" 
          docType={ docType }
          applicationNumber={ props.applicationNumber }
          customerEmail={ props.customerEmail }
        />
                
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
      <Grid item sm={12} md={6} >
        <UploadDocument 
          title="Upload your Picture" 
          applicationNumber={ props.applicationNumber }
          customerEmail={ props.customerEmail }
          />

        <Grid className={classes.nextButton} container>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black","padding":"0px 30px"}'
          >
            Reset
          </ButtonSecondary>

          <ButtonPrimary stylebutton='{"color": ""}' onClick={ props.next }>Next</ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DocumentIdAndPhotoId;

DocumentIdAndPhotoId.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
	next: PropTypes.func,
};
