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
import imageCompression from 'browser-image-compression';

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
  const [ facingMode ] = useState(docType === 'Selfie' ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT);

  const handleMenuOpen = (event) => {
    setSelectDocument(event.currentTarget);
  }
  const capture = React.useCallback(() => {
    const imageSrc = refWebCam.current.getScreenshot();
    setImgSrc(imageSrc);
    setDisableNext(false);
  }, [ refWebCam, setImgSrc ]);

  function handleImageUpload(event) {
        const imageFile = event.files[0];
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
            handleElseTwo(compressedFile)
          })
          .catch(function (error) {
            toast.error("Error uploading document, please try again")
            ErrorLogger("Error uploading document", error.message)
          });
      }

  const handleChange = (_event) => {
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
  const handleElseTwo = async (fileUploadDocument) => {
    let reader = new FileReader();
    try {
      if (selectedFile.files && fileUploadDocument) {
        reader.readAsDataURL(fileUploadDocument);
        reader.onload = async () => {
          let compressFileData = reader.result
          let imageData = compressFileData
            .toString()
            .replace(/^data:.+;base64,/, "");  
          const buffer2 = Buffer.from(imageData, "base64");       
          let fileName = fileUploadDocument.name;
          let fileType = fileUploadDocument.type;
          let documentType = typeOfDocument;
          setLoading(true);
          let compressedFile = [ {
            sourcePath: "",
            data: buffer2,
            fileName: fileName
          } ];
          let fileExtension = fileName.split('.').pop();
          let fileSize = fileUploadDocument.size;
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
    if(selectedFile?.value){
      selectedFile.value = null;
    }
    setShowCamera(false);
    setImgSrc(null);    
    setDisableNext(true);
    handleMenuClose();
    setLabel("");
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
      .replace(/^data:.+;base64,/, "");
      const buffer2 = Buffer.from(fileData, "base64");
      let compressedFile = [ {
        sourcePath: "",
        data: buffer2,
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
  const UploadDocumentFile = () => {
    if (imgSrc) {
      uploadCameraPhoto();
    } else if (selectedFile.files && selectedFile.files[ 0 ]) {

      let filterImage = /(\.jpg|\.jpeg|\.png)$/i;
      if(filterImage.exec(selectedFile?.files[0].name)){
        handleImageUpload(selectedFile);
      }
      else{
        handleElseTwo(selectedFile?.files[0]);
      }
      
    }
  }
  const deleteSelectedFile = () => {
    selectedFile.value = "";
    setSelectedFile(null);
    setLabel("");
    setDisableNext(true);
  }

  const showLabel = (labelText) => {
    return (labelText ?
      <Chip
        className={classes.chipButton}
        label={labelText}
        data-testid = "deleteSelectedFile"
        onDelete={() => deleteSelectedFile()}
        deleteIcon={<CloseIcon />}
      />
      :
      "");
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
          {props.title ?? 'Upload Document'}
        </ButtonPrimary>
        { showLabel(label) }
        <Menu
          anchorEl={selectDocument}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          data-testid = "handleMenuClose"
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
                accept=".png, .jpeg, .pdf, .jpg "
                style={{ display: "none" }}
                type="file"
                ref={refChangeEvent}
                onClick={handleInputChange}
                onChange={(event) => handleChange(event)}
              ></input>
            </Typography>
          </MenuItem>
          <MenuItem>
              <Typography data-testid = "render_uploadFromCamera" className={classes.dropdownMenu} onClick={enableCameraOption}>
                Upload from Camera
              </Typography>
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
                  data-testid = "capture"
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
          {!props?.showUploadButton ? 
          <>
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
              onClick={UploadDocumentFile}
              data-testid = "render_nextButton"
            >
              Next
            </ButtonPrimary>
          </>
          :
            <ButtonPrimary
            stylebutton='{"color": ""}'
            disabled={disableNext}
            onClick={UploadDocumentFile}
            data-testid = "render_nextButton"
          >
            Submit
          </ButtonPrimary>
          }
          
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
  showUploadButton: PropTypes.bool,
};