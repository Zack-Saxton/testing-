import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import CircularProgress from '@mui/material/CircularProgress';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import globalMessages from "../../../assets/data/globalMessages.json";
import Selfielicense from "../../../assets/gallery/selfielicense.png";
import {
  ButtonPrimary,
  Select
} from "../../../components/FormsUI";
import { uploadEmailVerificationDocument } from "../../Controllers/EmailVerificationController";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesEmailVerification } from "./Style";

const videoConstraints = {
  facingMode: "environment"
};

function DocumentIdAndPhotoId(props) {
  const [ docType, setDocType ] = useState("");
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
  }, [ imgSrc, selfieImageSrc ]);

  const handleDocType = (event) => {
    setDocType(event.target.value.trim());
    event.target.value = '';
  };

  const handleMenuOpen = (event) => {
    if (docType === '') {
      toast.error("Select ID type");
    } else {
      setSelectDocument(event.currentTarget);
    }
  };
  const handleSelfieMenuOpen = (event) => {
    setSelectSelfieDocument(event.currentTarget);
  }

  const checkSelectedAllDocument = () => {
    setDisableNext(true);
    if (((selectedFile?.files && selectedFile.files[ 0 ]) || (imgSrc)) &&
      ((selectedSelfieFile?.files && selectedSelfieFile.files[ 0 ]) || (selfieImageSrc))) {
      setDisableNext(false);
    }
  }

  const capture = () => {
    const imageSrc = refWebCam.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const captureSelfie = () => {
    const screenSnapshot = refWebCamPhoto.current.getScreenshot();
    setSelfieImageSrc(screenSnapshot);
  };

  const validateUploadedFile = (fileSource) => {
    if (fileSource?.files[ 0 ]?.name) {
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
      let fileName = fileSource.files[ 0 ].name;
      if (!allowedExtensions.exec(fileName)) {
        if (!toast.isActive("closeToast")) {
          toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ", { toastId: "closeToast" });
        }
        return false;
      } else if (fileSource.files[ 0 ].size > 10240000) {
        if (!toast.isActive("closeToast")) {
          toast.error(globalMessages.Please_Upload_File_Below_Size, { toastId: "closeToast" });
        }
        return false;
      }
      return true;
    } else {
      return false;
    }

  }
  const handleChange = (_event) => {
    if (validateUploadedFile(selectedFile)) {
      setLabel(selectedFile.files[ 0 ].name);
      checkSelectedAllDocument();
    } else {
      selectedFile.value = "";
    }
  };

  const handleSelfieChange = (_event) => {
    if (validateUploadedFile(selectedSelfieFile)) {
      setSelfieLabel(selectedSelfieFile.files[ 0 ].name);
      checkSelectedAllDocument();
    } else {
      selectedSelfieFile.value = "";
    }
  };

  const uploadSelectedDocument = async (fileObject, callSecondFunction) => {
    let reader = new FileReader();
    try {
      if (fileObject.files && fileObject.files[ 0 ]) {
        reader.readAsDataURL(fileObject.files[ 0 ]);
        reader.onload = async () => {
          let compressFileData = reader.result;
          let imageData = compressFileData
            .toString()
          .replace(/^data:.+;base64,/, "");
          const buffer2 = Buffer.from(imageData, "base64");
          let fileName = fileObject.files[ 0 ].name;
          let fileType = fileObject.files[ 0 ].type;
          setLoading(true);
          let compressedFile = [ {
            sourcePath: "",
            data: buffer2,
            fileName: fileName
          } ];
          let fileExtension = fileName.split('.').pop();
          let fileSize = fileObject.files[ 0 ].size;
          let filesInfo = getFileInfo(fileName, fileType, fileExtension, fileSize);
          let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, "customer_identification_license");
          if (response?.status === 200) {
            fileObject.value = "";
            if (callSecondFunction) {
              uploadSelfieDocument();
            } else {
              setLoading(false);
              toast.success(response?.data?.message ?? globalMessages.Document_upload);
              props.next();
            }
          }else{
            setLoading(false);
          }
        };        
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
    setSelectedFile(refChangeEvent.current);
    setShowCamera(false);
    setImgSrc(null);
    handleMenuClose();
  };
  const handleSelfieInputChange = (_event) => {
    setSelectedSelfieFile(refSelfieChangeEvent.current)
    SetShowSelfieCamera(false);
    setSelfieImageSrc(null);
    handleSelfieMenuClose();
  };
  const handleMenuClose = (_event) => {
    setSelectDocument(null);
  };

  const handleSelfieMenuClose = (_event) => {
    setSelectSelfieDocument(null);
  }

  const getFileInfo = (fileName, fileType, fileExtension, fileSize) => {
    return {
      "fieldname": "file",
      "originalname": fileName,
      "name": fileName,
      "encoding": "7bit",
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
    if (type === 1) {
      setSelectedFile(null);
      setLabel("");
    } else {
      setSelectedSelfieFile(null);
      setSelfieLabel("");
    }
    setDisableNext(true);
  }

  const uploadCameraPhoto = async (imageSource, docTypeName, callSecondFunction) => {
    try {
      setLoading(true);
      let imageData = imageSource;
      let fileName = `${ docTypeName }.jpeg`;
      let fileData = imageData
        .toString()
      .replace(/^data:.+;base64,/, "");
      const buffer2 = Buffer.from(fileData, "base64");
      let compressedFile = [ {
        sourcePath: "",
        data: buffer2,
        fileName: fileName
      } ];
      
      let filesInfo = getFileInfo(fileName, "image/jpeg", "jpeg", "0");
      let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, "customer_identification_license");
      if (response?.status === 200) {
        setShowCamera(false);
        setImgSrc(null);
        handleMenuClose();
        if (callSecondFunction) {
          uploadSelfieDocument();
        } else {
          toast.success(response?.data?.message ?? globalMessages.Document_upload);
          setLoading(false);
          props.next();
        }
      }else{
        setLoading(false);
      }
    } catch (error) {
      ErrorLogger(" Error in emailVerificationDocument", error);
    }
  }
  function getValueByLable(text, ctx) {
    return document.evaluate("//*[.='" + text + "']",
      ctx || document, null, XPathResult.ANY_TYPE, null).iterateNext();
  }

  const uploadDocument = () => {
    getValueByLable("ID Document & Photo").scrollIntoView();
    //Upload ID document
    setLoading(true);
    if (imgSrc) {
      uploadCameraPhoto(imgSrc, docType, true);
    } else if (selectedFile?.files) {
      uploadSelectedDocument(selectedFile, true);
    }
  }

  const uploadSelfieDocument = () => {
    setLoading(true);
    if (selfieImageSrc) {
      uploadCameraPhoto(selfieImageSrc, "selfie_photo", false);
    } else if (selectedSelfieFile?.files) {
      uploadSelectedDocument(selectedSelfieFile, false);
    }
  }
  const fileOptionDesign = (refChangeEventObj, facingMode) => {
    return (
      <>
        <ButtonPrimary
        data-testid = "render_selectDocument"
          onClick={handleMenuOpen}
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          Upload Document
        </ButtonPrimary>
        {
          label ?
            <Chip
              className={classes.chipButton}
              label={label}
              onDelete={() => deleteSelectedFile(1)}
              deleteIcon={<CloseIcon />}
            />
            :
            ""
        }

        <Menu
          anchorEl={selectDocument}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Typography className={classes.dropdownMenu} onClick={openFileWindow}>
              Select from Existing Files
              <input
                id="selectFile" 
                name= "selectExistingFile"             
                data-testid="selectFile"
                accept=".png, .jpeg, .pdf, .jpg"
                style={{ display: "none" }}
                type="file"
                ref={refChangeEventObj}
                onClick={() => handleInputChange()}
                onChange={(event) => handleChange(event)}
              ></input>
            </Typography>
          </MenuItem>
          <MenuItem>
            <a className="nav_link ">
              <Typography data-testid = "render_uploadFromCamera" className={classes.dropdownMenu} onClick={() => enableCameraOption()}>
                Upload from Camera
              </Typography>
            </a>
          </MenuItem>
        </Menu>
        {showCamera ?
          (!imgSrc ?
            <Grid style={{ margin: "10px 0px" }} item sm={12} md={6}  >
              <Webcam
                audio={false}
                ref={refWebCam}
                screenshotFormat="image/jpeg"
                height={360}
                width={500}
                className={classes.selfieCamera}
                videoConstraints={{
                  ...videoConstraints,
                  facingMode
                }}
              />
              <Grid container>
                <ButtonPrimary
                  onClick={capture}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
                >
                  Capture Photo
                </ButtonPrimary>
              </Grid>
            </Grid> :
            <Grid style={{ margin: "10px 0px" }} item sm={12} md={6} >
              {imgSrc && (
                <img
                  src={imgSrc}
                  height={360}
                  width={480}
                  className={classes.selfieImage}
                />
              )}

              <Grid container>
                <ButtonPrimary
                  onClick={() => enableCameraOption()}
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

  const fileOptionDesignSelfie = (refSelfieChangeEventObj, facingMode) => {
    return (
      <>
        <ButtonPrimary
          onClick={handleSelfieMenuOpen}
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          Select File
        </ButtonPrimary>
        {
          selfieLabel ?
            <Chip
              className={classes.chipButton}
              label={selfieLabel}
              onDelete={() => deleteSelectedFile(2)}
              deleteIcon={<CloseIcon />}
            />
            :
            ""
        }
        <Menu
          anchorEl={selectSelfieDocument}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isSelfieMenuOpen}
          onClose={handleSelfieMenuClose}
        >
          <MenuItem>
            <Typography className={classes.dropdownMenu} onClick={openSelfieFileWindow}>
              Select from Existing Files
              <input
                id="selectSelfieFile"
                accept=".png, .jpeg, .pdf, .jpg"
                style={{ display: "none" }}
                type="file"
                ref={refSelfieChangeEventObj}
                onClick={handleSelfieInputChange}
                onChange={(event) => handleSelfieChange(event)}
              ></input>
            </Typography>
          </MenuItem>
          <MenuItem>
            <a className="nav_link">
              <Typography className={classes.dropdownMenu} onClick={() => enableSelfieCameraOption()}>
                Upload from Camera
              </Typography>
            </a>
          </MenuItem>
        </Menu>
        {showSelfieCamera ?
          (!selfieImageSrc ?
            <Grid style={{ margin: "10px 0px" }} item sm={12} md={6} >
              <Webcam
                audio={false}
                ref={refWebCamPhoto}
                screenshotFormat="image/jpeg"
                height={360}
                width={500}
                className={classes.selfieCamera}
                videoConstraints={{
                  ...videoConstraints,
                  facingMode
                }}
              />
              <Grid container>
                <ButtonPrimary
                  onClick={captureSelfie}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
                >
                  Capture Photo
                </ButtonPrimary>
              </Grid>
            </Grid> :
            <Grid style={{ margin: "10px 0px" }} item sm={12} md={6} >
              {selfieImageSrc && (
                <img
                  src={selfieImageSrc}
                  height={360}
                  width={480}
                  className={classes.selfieImage}
                />
              )}
              <Grid container>
                <ButtonPrimary
                  onClick={() => enableSelfieCameraOption()}
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
      {loading ?
        <Grid className="circleprog" style={{ width: "100%", textAlign: "center", margin: "20px 0px" }}>
          <CircularProgress />
        </Grid>
        :
        <Grid  data-testid = "render_CheckList">
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
            {fileOptionDesign(refChangeEvent, "environment")}
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
            {fileOptionDesignSelfie(refSelfieChangeEvent, "user")}
            <Grid className={classes.nextButton} container>
              <ButtonPrimary
               data-testid = "render_NextButton"
                stylebutton='{"color": ""}'
                disabled={disableNext}
                onClick={uploadDocument}
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
