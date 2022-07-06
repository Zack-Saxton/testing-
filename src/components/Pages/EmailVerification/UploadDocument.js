import CloseIcon from '@mui/icons-material/Close';
import Chip from "@mui/material/Chip";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import globalMessages from "../../../assets/data/globalMessages.json";
import {
  ButtonPrimary,
  ButtonSecondary
} from "../../../components/FormsUI";
import { uploadEmailVerificationDocument } from "../../Controllers/EmailVerificationController";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesEmailVerification } from "./Style";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_ENVIRONMENT
};

function UploadDocument(props) {
  const classes = useStylesEmailVerification();
  const [ showCamera, setShowCamera ] = useState(false);
  const [ disableNext, setDisableNext ] = useState(true);
  const [ label, setLabel ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ imgSrc, setImgSrc ] = useState(null);
  const [ selectDocument, setSelectDocument ] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState(null);
  const isMenuOpen = Boolean(selectDocument);
  const refChangeEvent = useRef("");
  const refWebCam = useRef(null);
  const docType = props.docType ? props.docType : "";
  const typeOfDocument = props.documentType ? props.documentType : "";
  const [ facingMode, setFacingMode ] = useState(docType === 'Selfie' ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT);

  const handleMenuOpen = (event) => {
    setSelectDocument(event.currentTarget);
  }
  const capture = React.useCallback(() => {
    const imageSrc = refWebCam.current.getScreenshot();
    setImgSrc(imageSrc);
    setDisableNext(false);
  }, [ refWebCam, setImgSrc ]);

  const handleChange = (event) => {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
    if (selectedFile?.files[ 0 ]?.name) {
      let fileName = selectedFile.files[ 0 ].name
      if (!allowedExtensions.exec(fileName)) {
        if (!toast.isActive("closeToast")) {
          toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ", { toastId: "closeToast" });
        }
        selectedFile.value = "";
      } else if (selectedFile.files[ 0 ].size > 10240000) {
        if (!toast.isActive("closeToast")) {
          toast.error(globalMessages.Please_Upload_File_Below_Size, { toastId: "closeToast" });
        }
        selectedFile.value = "";
      } else {
        setLabel(fileName);
        setDisableNext(false);
      }
    }
  };
  const handleElseTwo = async () => {
    let reader = new FileReader();
    try {
      if (selectedFile.files && selectedFile.files[ 0 ]) {
        reader.readAsDataURL(selectedFile.files[ 0 ]);
        reader.onload = async () => {
          let compressFileData = reader.result;
          const buffer2 = Buffer.from(compressFileData, "base64");
          let encodedFile = Buffer.from(buffer2).toString("base64");
          let imageData = encodedFile
            .toString()
            .replace(/^dataimage\/[a-z]+base64/, "");          
          let fileName = selectedFile.files[ 0 ].name;
          let fileType = selectedFile.files[ 0 ].type;
          let documentType = typeOfDocument;
          setLoading(true);
          let compressedFile = [ {
            sourcePath: "",
            data: imageData,
            fileName: fileName
          } ];
          let fileExtension = fileName.split('.').pop();
          let fileSize = selectedFile.files[ 0 ].size;
          let filesInfo = getFileInfo(fileName, fileType, fileExtension, fileSize);
          let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, documentType);
          if (response?.status === 200) {
            setLoading(false);
            selectedFile.value = "";
            toast.success(response?.data?.message ?? globalMessages.Document_upload);
            props.next();
          }else{
            setLoading(false);
          }
        };
      }
    } catch (error) {
      ErrorLogger(" Error in emailVerificationDocument", error);
    }
  };
  const openFileWindow = () => {
    refChangeEvent.current.click();
  }
  const enableCameraOption = () => {
    setShowCamera(true);
    setImgSrc(null);
    setDisableNext(true);
    handleMenuClose();
    setLabel("");
  }
  //Selecting file for upload
  const handleInputChange = () => {
    setSelectedFile(refChangeEvent.current);
    setShowCamera(false);
    setImgSrc(null);
    setDisableNext(true);
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setSelectDocument(false);
  };

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

  const uploadCameraPhoto = async () => {
    try {
      setLoading(true);
      let documentType = typeOfDocument;
      let imageData = imgSrc;
      let fileName = "Passport.jpeg"
      let fileData = imageData
        .toString()
        .replace(/^dataimage\/[a-z]+base64/, "");
      let compressedFile = [ {
        sourcePath: "",
        data: fileData,
        fileName: fileName
      } ];

      let filesInfo = getFileInfo(fileName, "image/jpeg", "jpeg", "0");
      let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, documentType);
      if (response?.status === 200) {
        setLoading(false);
        setShowCamera(false);
        setImgSrc(null);
        handleMenuClose();
        toast.success(response?.data?.message ?? globalMessages.Document_upload);
        props.next();
      }else{
        setLoading(false);
      }
      return response;
    } catch (error) {
      ErrorLogger(" Error in emailVerificationDocument", error);
    }
    return false;
  }
  const UploadDocument = () => {
    if (imgSrc) {
      uploadCameraPhoto();
    } else if (selectedFile.files && selectedFile.files[ 0 ]) {
      handleElseTwo();
    }
  }
  const deleteSelectedFile = () => {
    setSelectedFile(null);
    setLabel("");
    setDisableNext(true);
  }
  return (
    <>{loading ?
      <Grid className="circleprog" style={{ width: "100%", textAlign: "center", margin: "20px 0px" }}>
        <CircularProgress />
      </Grid>
      :
      <>
        <ButtonPrimary
          onClick={handleMenuOpen}
          data-testid = "render_selectDocument"
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          {props.title ?? 'Select Your Document'}
        </ButtonPrimary>
        {
          label ?
            <Chip
              className={classes.chipButton}
              label={label}
              onDelete={() => deleteSelectedFile()}
              deleteIcon={<CloseIcon />}
            />
            :
            ""
        }
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
            <Typography className={classes.dropdownMenu} onClick={openFileWindow}>
              Select from Existing Files
              <input
                id="selectFile"
                data-testid="selectFile"
                accept="image/png, image/jpeg, application/pdf, image/jpg "
                style={{ display: "none" }}
                type="file"
                ref={refChangeEvent}
                onClick={handleInputChange}
                onChange={(event) => handleChange(event)}
              ></input>
            </Typography>
          </MenuItem>
          <MenuItem>
            <a to="/faq" className="nav_link ">
              <Typography data-testid = "render_uploadFromCamera" className={classes.dropdownMenu} onClick={enableCameraOption}>
                Upload from Camera
              </Typography>
            </a>
          </MenuItem>
        </Menu>
        {showCamera ?
          (!imgSrc ?
            <Grid container style={{ margin: "10px 0px" }} >
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
            <Grid container style={{ margin: "10px 0px" }}>
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
                  onClick={enableCameraOption}
                  data-testid= "takeAnotherPicture"
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
        <Grid className={classes.nextButton} container>
          <ButtonSecondary
            id="buttonMarginRight"
            stylebutton='{"color": "black", "borderRadius": "50px"}'
            onClick={props.prev}
            data-testid = "render_prevButton"
          >
            Prev
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"color": ""}'
            disabled={disableNext}
            onClick={UploadDocument}
            data-testid = "render_nextButton"
          >
            Next
          </ButtonPrimary>
        </Grid>
      </>
    }
    </>
  );
}
export default UploadDocument;

UploadDocument.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
  title: PropTypes.string,
  documentType: PropTypes.string,
  docType: PropTypes.string,
  prev: PropTypes.func,
  next: PropTypes.func,
};