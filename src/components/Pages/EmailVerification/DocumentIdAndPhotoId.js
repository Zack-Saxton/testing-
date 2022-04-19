import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ErrorLogger from "../../lib/ErrorLogger";
import { Grid } from "@mui/material";
import {
  ButtonPrimary,
  Select,
} from "../../../components/FormsUI";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Chip from "@mui/material/Chip";
import CloseIcon from '@mui/icons-material/Close';
import Selfielicense from "../../../assets/gallery/selfielicense.png";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useStylesEmailVerification } from "./Style";
import { uploadEmailVerificationDocument } from "../../Controllers/EmailVerificationController";

const videoConstraints = {
  facingMode: "environment"
};

function DocumentIdAndPhotoId(props) {
  const [docType, setDocType] = useState("");   
  const [ loading, setLoading ] = useState(false); 
  const [ disableNext, setDisableNext ] = useState(true);
  const [ showCamera, setShowCamera ] = useState(false); 
  const [ showSelfieCamera, SetShowSelfieCamera ] = useState(false); 
  const refWebCam = useRef(null);
  const refWebCamPhoto = useRef(null);
  const [ label, setLabel ] = useState("");
  const [ selfieLabel, setSelfieLabel ] = useState("");
  const [ selectDocument, setSelectDocument ] = useState(null);
  const [ selectSelfieDocument, setSelectSelfieDocument ] = useState(null);
  const [ imgSrc, setImgSrc ] = useState(null); 
  const [ selfieImageSrc, setSelfieImageSrc ] = useState(null); 
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ selectedSelfieFile, setSelectedSelfieFile ] = useState(null);
  
  const isMenuOpen = Boolean(selectDocument); 
  const isSelfieMenuOpen = Boolean(selectSelfieDocument); 
  const refChangeEvent = useRef("");
  const refSelfieChangeEvent = useRef("");
  
  const classes = useStylesEmailVerification();

  useEffect(() => {
    checkSelectedAllDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ imgSrc, selfieImageSrc  ]);

  const handleDocType = (event) => {
    setDocType(event.target.value.trim());    
    event.target.value = '';
  };  
  
  const handleMenuOpen = (event) => { 
    if(docType === ''){
      toast.error("Select ID type");
    }else{
      setSelectDocument(event.currentTarget);
    }
  };  
  const handleSelfieMenuOpen = (event) => {
    setSelectSelfieDocument(event.currentTarget);
  }

  const checkSelectedAllDocument = () => {
    setDisableNext(true);
    if(((selectedFile?.files && selectedFile.files[ 0 ]) || (imgSrc)) && 
    ((selectedSelfieFile?.files && selectedSelfieFile.files[ 0 ]) || (selfieImageSrc))){
      setDisableNext(false);
    } 
  }

  const capture = () => {
    const imageSrc =  refWebCam.current.getScreenshot();
    setImgSrc(imageSrc);
  };  
  
  const captureSelfie = () => {
    const selfieImageSrc =  refWebCamPhoto.current.getScreenshot();
    setSelfieImageSrc(selfieImageSrc);
  };

  const validateUploadedFile = (fileSource) => {    
    if(fileSource?.files[ 0 ]?.name){
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
      let fileName = fileSource.files[ 0 ].name;
      if(!allowedExtensions.exec(fileName)){
        if (!toast.isActive("closeToast")) {
          toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ", { toastId: "closeToast" });
        }
        return false;
      }else if(fileSource.files[ 0 ].size > 10240000){
        if (!toast.isActive("closeToast")) {
          toast.error(globalMessages.Please_Upload_File_Below_Size, { toastId: "closeToast" });
        }
        return false;
      }
      return true;
    }else{
      return false;
    }
    
  }
  const handleChange = (event) => {    
    if(validateUploadedFile(selectedFile)){
      setLabel(selectedFile.files[ 0 ].name);
      checkSelectedAllDocument();
    }else{
      selectedFile.value = "";
    }
  };  
  
  const handleSelfieChange = (event) => {
    if(validateUploadedFile(selectedSelfieFile)){
      setSelfieLabel(selectedSelfieFile.files[ 0 ].name);
      checkSelectedAllDocument();
    }else{
      selectedSelfieFile.value = "";
    }
  };

  const handleElseTwo = async (fileObject, callSecondFunction) => {
    let reader = new FileReader();
    try {
      if (fileObject.files && fileObject.files[ 0 ]) {
        reader.onload = async () => {
          const buffer2 = Buffer.from(reader.result, "base64");
          let fileData = Buffer.from(buffer2).toJSON().data;
          let fileName = fileObject.files[ 0 ].name;
          let fileType = fileObject.files[ 0 ].type;
          setLoading(true);
          let compressedFile = [{
            sourcePath: "",
            data: fileData,
            fileName: fileName
          }];
          let fileExtension = fileName.split('.').pop();
          let fileSize = fileObject.files[ 0 ].size;
          let filesInfo = getFileInfo(fileName, fileType, fileExtension, fileSize);
          let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, "customer_identification_license");
          if (response) {            
            fileObject.value = "";
            if(callSecondFunction){
              uploadSelfieDocument();
            }else{
              setLoading(false);
              toast.success(response?.data?.message ?? globalMessages.Document_upload);
              props.next();
            }
          }
          setLoading(false);
        };
        reader.readAsDataURL(fileObject.files[ 0 ]);
        return true;
      }
    } catch (error) {
      ErrorLogger(" Error in emailVerificationDocument", error);
    }
    return false;
  };
  const openFileWindow = () => {   
    refChangeEvent.current.click();     
  }
  const openSelfieFileWindow = () => { 
    refSelfieChangeEvent.current.click();     
 }
  const enableCameraOption = () => {
    setDisableNext(true);
    setShowCamera(true);
    setImgSrc(null);
    setSelectedFile(null);
    handleMenuClose();
    setLabel("");
  }

  const enableSelfieCameraOption = () => {
    setDisableNext(true);
    SetShowSelfieCamera(true);
    setSelfieImageSrc(null);
    setSelectedSelfieFile(null);
    handleSelfieMenuClose();
    setSelfieLabel("");    
  }
  //Selecting file for upload
  const handleInputChange = () => {
    setSelectedFile( refChangeEvent.current);  
    setShowCamera(false);
    setImgSrc(null);
    handleMenuClose();
  };
  const handleSelfieInputChange = (event) => {
    setSelectedSelfieFile(refSelfieChangeEvent.current)
    SetShowSelfieCamera(false);
    setSelfieImageSrc(null);
    handleSelfieMenuClose();
  };
  const handleMenuClose = (event) => {
    setSelectDocument(null);
  };
  
  const handleSelfieMenuClose = (event) => {
    setSelectSelfieDocument(null);
  }

  const getFileInfo = (fileName, fileType, fileExtension, fileSize) => {
    return {
      "fieldname": "file",
      "originalname": fileName,
      "name": fileName,
      "encoding":"7bit",
      "mimetype": fileType,
      "path": "",
      "extension": fileExtension,
      "size": fileSize,
      "truncated": false,
      "buffer": null,
      "uploaddirectory": ""
    };
  }
  
  const deleteSelectedFile = (type) => {
    if(type === 1){
      setSelectedFile(null);
      setLabel("");
    }else{
      setSelectedSelfieFile(null);
      setSelfieLabel("");
    }
    setDisableNext(true);
  }

  const uploadCameraPhoto = async (imageSource, docType, callSecondFunction) => {    
    try {
      let imageData = imageSource;
      let fileName = `${docType}.jpeg`;
      let fileData = imageData
                    .toString()
                    .replace(/^data:image\/[a-z]+base64/, "");
      let compressedFile = [{
        sourcePath: "",
        data: fileData,
        fileName: fileName
      }];
      
      let filesInfo = getFileInfo(fileName, "image/jpeg", "jpeg", "0");
      let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, "customer_identification_license");
      if (response) {        
        setShowCamera(false);
        setImgSrc(null);
        handleMenuClose();
        if(callSecondFunction){
          uploadSelfieDocument();
        }else{
          toast.success(response?.data?.message ?? globalMessages.Document_upload);
          setLoading(false);
          props.next();
        }
      }
      setLoading(false);
    } catch (error) {
      ErrorLogger(" Error in emailVerificationDocument", error);
    }
  } 
  
  const uploadDocument = () => {
    //Upload ID document
    setLoading(true);
    if(imgSrc){
      uploadCameraPhoto(imgSrc, docType, true);
    }else if(selectedFile?.files){
      handleElseTwo(selectedFile, true);
    }  
  }

  const uploadSelfieDocument  = () => {
    if(selfieImageSrc){
      uploadCameraPhoto(selfieImageSrc, "selfie_photo", false);
    }else if(selectedSelfieFile?.files){
      handleElseTwo(selectedSelfieFile, false);
    }
  }
  const fileOptionDesign = ( refChangeEvent, facingMode) => {
    return (
      <>
        <ButtonPrimary
            onClick={ handleMenuOpen }
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
          >
           Select Your Documents
          </ButtonPrimary>
          {
            label ?
              <Chip
              className={classes.chipButton}
                label={ label }
                onDelete={ ()=> deleteSelectedFile(1) }
                deleteIcon={<CloseIcon />}
              />
            :
            ""
          }
          
          <Menu
            anchorEl={ selectDocument }
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={ isMenuOpen }
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Typography className={classes.dropdownMenu} onClick={ openFileWindow }>
                Select from Existing Files
                <input
                  id="selectFile"
                  accept="image/png, image/jpeg, application/pdf, image/jpg "
                  style={{ display: "none" }}
                  type="file"
                  ref={  refChangeEvent }
                  onClick={ ()=> handleInputChange() }
                  onChange={ (event) => handleChange(event) }
                ></input>
              </Typography>
            </MenuItem>
            <MenuItem>
              <a to="/faq" className="nav_link ">
                <Typography className={classes.dropdownMenu} onClick={ ()=> enableCameraOption() }>
                  Upload from Camera
                </Typography>
              </a>
            </MenuItem>
          </Menu>          
          {showCamera  ?
            (!imgSrc ? 
              <Grid style={ { margin: "10px 0px"} } item sm={12} md={6}  >              
              <Webcam
                audio={false}
                ref={ refWebCam}
                screenshotFormat="image/jpeg"
                height={360}
                width={500}
                videoConstraints={{
                  ...videoConstraints,
                  facingMode
                }}
              />      
              <Grid container>
                <ButtonPrimary
                  onClick={ capture }
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
                >
                  Capture Photo
                </ButtonPrimary>  
              </Grid> 
            </Grid> : 
            <Grid style={ { margin: "10px 0px"} } item sm={12} md={6} >
              <Grid style={{ margin: "0px 10px"}}>
                {imgSrc && (
                  <img
                    src={ imgSrc }
                    height={360}
                    width={480}
                  />
                )}
              </Grid> 
                
                <Grid container>
                  <ButtonPrimary
                    onClick={ ()=> enableCameraOption() }
                    stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
                  >
                    Take another picture
                  </ButtonPrimary>
                </Grid>
            </Grid>
            )          
          : 
            <>
            </>
          }
      </>
    );
  }
  
  const fileOptionDesignSelfie = ( refSelfieChangeEvent, facingMode) => {
    return (
      <>
        <ButtonPrimary
            onClick={ handleSelfieMenuOpen }
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
          >
           Select Your Picture
          </ButtonPrimary>          
            {
            selfieLabel ?
              <Chip
              className={classes.chipButton}
                label={ selfieLabel }
                onDelete={ ()=> deleteSelectedFile(2) }
                deleteIcon={<CloseIcon />}
              />
            :
            ""
          }
          <Menu
            anchorEl={ selectSelfieDocument }
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={ isSelfieMenuOpen }
            onClose={ handleSelfieMenuClose }
          >
            <MenuItem>
              <Typography className={classes.dropdownMenu} onClick={ openSelfieFileWindow }>
                Select from Existing Files
                <input
                  id="selectSelfieFile"
                  accept="image/png, image/jpeg, application/pdf, image/jpg "
                  style={{ display: "none" }}
                  type="file"
                  ref={  refSelfieChangeEvent }
                  onClick={ handleSelfieInputChange }
                  onChange={ (event) => handleSelfieChange(event) }
                ></input>
              </Typography>
            </MenuItem>
            <MenuItem>
              <a to="/faq" className="nav_link ">
                <Typography className={classes.dropdownMenu} onClick={ ()=> enableSelfieCameraOption() }>
                  Upload from Camera
                </Typography>
              </a>
            </MenuItem>
          </Menu>
          {showSelfieCamera  ?
            (!selfieImageSrc ? 
              <Grid style={ { margin: "10px 0px"} } item sm={12} md={6} >              
              <Webcam
                audio={false}
                ref={ refWebCamPhoto }
                screenshotFormat="image/jpeg"
                height={360}
                width={500}
                videoConstraints={{
                  ...videoConstraints,
                  facingMode
                }}
              />     
              <Grid container>
                <ButtonPrimary
                  onClick={ captureSelfie }
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
                >
                  Capture Photo
                </ButtonPrimary>
              </Grid> 
            </Grid> : 
            <Grid style={ { margin: "10px 0px"} } item sm={12} md={6} >
              <Grid style={{ margin: "0px 10px"}}>
                {selfieImageSrc && (
                  <img
                    src={ selfieImageSrc }
                    height={360}
                    width={480}
                  />
                )}
              </Grid>                 
                <Grid container>
                  <ButtonPrimary
                    onClick={ ()=> enableSelfieCameraOption() }
                    stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
                  >
                    Take another picture
                  </ButtonPrimary>
                </Grid>
            </Grid>
            )          
          : 
            <>
            </>
          }
      </>
    );
  }  

  return (
    <Grid>
      { loading ?
        <Grid className="circleprog" style={ { width: "100%", textAlign: "center", margin: "20px 0px" } }>
          <CircularProgress />
        </Grid> 
      :
      <Grid>
      <span className={classes.ensureTitle}>
        Please upload an image of your driver’s license, passport, state-issued
        photo ID card, or military/federal government photo ID.
      </span>
      <span className={classes.ensureText}>Please ensure:</span>
      <ul className={classes.PleaseEnsureList}>
        <li>The image is in color.</li>
        <li>The document is currently valid.</li>
        <li>The entire document is visible and all information is legible.</li>
        <li>Acceptable file formats are PDF, JPG, JPEG, PNG.</li>
      </ul>

      <Grid item sm={12} md={6} className={classes.selectDocumentType}>
        <Grid id="selectInputGrid" className={classes.selectInput}>
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
      </Grid>
      <Grid item md={12} sm={12}>
        { fileOptionDesign( refChangeEvent, "environment") }
      </Grid>
      <Grid item md={12} sm={12} className={classes.uploadDocumentText}>
        <span className={classes.uploadDocumentParagraph}>
          Please upload a picture of yourself, in which you are holding your
          state or federal government issued ID next to your face. Please ensure
          that the information on the ID is legible and that your hand is
          clearly visible and holding your ID. This will allow us to check that
          your ID document matches your appearance (similar to an in-person ID
          check).
          <br />
        </span>
          <span className={classes.exampleText}>
            To see an example, please look at the image below.
            </span>
        <Grid className="SelfieLicenseImage">
          <img src={Selfielicense} alt="Selfielicense" />
          <span>Sample Photograph</span>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} >
        { fileOptionDesignSelfie( refSelfieChangeEvent, "user") }
        <Grid className={classes.nextButton} container>
          <ButtonPrimary 
            stylebutton='{"color": ""}' 
            disabled = { disableNext }
            onClick = { uploadDocument }
            >Next</ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
    }
  </Grid>  
  );
}

export default DocumentIdAndPhotoId;

DocumentIdAndPhotoId.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
	next: PropTypes.func,
};
