import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import globalMessages from "../../../assets/data/globalMessages.json";
import {
  ButtonPrimary
} from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { uploadEmailVerificationDocument } from "../../Controllers/EmailVerificationController";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  facingMode: FACING_MODE_ENVIRONMENT
};

function UploadDocument(props) {
  const classes = useStylesEmailVerification();
  const [ showCamera, setShowCamera ] = useState(false);
  const [ label, setLabel ] = useState([]);
  const [ loading, setLoading ] = useState(false); 
  const [ imgSrc, setImgSrc ] = useState(null);
  const [ selectDocument, setSelectDocument ] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState(null);
  const isMenuOpen = Boolean(selectDocument);
  const refChangeEvent = useRef("");
  const refWebCam = useRef(null);
  const docType = props.docType ? props.docType : "";
  const typeOfDocument = props.documentType ? props.documentType : "";
  const [facingMode, setFacingMode] = useState(docType === 'Selfie' ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT);
  const switchCamera = useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);
  const handleMenuOpen = (event) => {    
    if(!checkFileTypeExist()){
      toast.error("Select ID type");
    }else{
      setSelectDocument(event.currentTarget);
    }
  };  
  const capture = React.useCallback(() => {
    const imageSrc =  refWebCam.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [ refWebCam, setImgSrc]);  

  const handleChange = (event) => {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
    let uploadedFile = selectedFile.files;
    let uploadedFileList = [];
    let isOtherFileExtension = false;
    let isSizeExceed = false;
    for(let index=0; index < uploadedFile.length; index++){
      let fileName = uploadedFile[ index ].name;
      uploadedFileList.push(fileName);      
      if (!allowedExtensions.exec(fileName)) {
        isOtherFileExtension = true;
      }
      if (selectedFile.files[ index ].size > 10240000) {
        isSizeExceed = true;
      }
    }
    if(isOtherFileExtension){
      if (!toast.isActive("closeToast")) {
        toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ", { toastId: "closeToast" });
      }
      selectedFile.value = "";
    }else if(isSizeExceed){
      if (!toast.isActive("closeToast")) {
        toast.error(globalMessages.Please_Upload_File_Below_Size, { toastId: "closeToast" });
      }
      selectedFile.value = "";
    }else{
      setLabel(uploadedFileList);
      handleElseTwo();
    }
  };
  const checkFileTypeExist = () => {
    return !(typeOfDocument === "customer_identification_license" && docType === '');
  }
  const handleElseTwo = () => {
    let reader = new FileReader();
    try {
      if (selectedFile.files && selectedFile.files[ 0 ] && checkFileTypeExist()) {
        reader.onload = async () => {
          const buffer2 = Buffer.from(reader.result, "base64");
          let fileData = Buffer.from(buffer2).toJSON().data;
          let fileName = selectedFile.files[ 0 ].name;
          let fileType = selectedFile.files[ 0 ].type;
          let documentType = typeOfDocument;
          setLoading(true);
          let compressedFile = [{
            sourcePath: "",
            data: fileData,
            fileName: fileName
          }];
          let fileExtension = fileName.split('.').pop();
          let fileSize = selectedFile.files[ 0 ].size;
          let filesInfo = getFileInfo(fileName, fileType, fileExtension, fileSize);
          let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, documentType);
          if (response) {
            setLoading(false);
            selectedFile.value = "";
          }
        };
        reader.readAsDataURL(selectedFile.files[ 0 ]);
      }else if(!checkFileTypeExist()){
        toast.error("Select ID type");
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
    handleMenuClose();
    setLabel([]);
  }
  //Selecting file for upload
  const handleInputChange = () => {
    setSelectedFile( refChangeEvent.current);  
    setShowCamera(false);
    setImgSrc(null);
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

  const uploadCameraPhoto = async () => {    
    try {
      let documentType = typeOfDocument;
      let imageData = imgSrc;
      let fileName = "Passport.jpeg"
      let fileData = imageData
                    .toString()
                    .replace(/^data:image\/[a-z]+base64/, "");
      let compressedFile = [{
        sourcePath: "",
        data: fileData,
        fileName: fileName
      }];
      
      let filesInfo = getFileInfo(fileName, "image/jpeg", "jpeg", "0");
      let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, documentType);
      if (response) {
        setLoading(false);
        setShowCamera(false);
        setImgSrc(null);
        handleMenuClose();
      }
    } catch (error) {
      ErrorLogger(" Error in emailVerificationDocument", error);
    }  
  } 
  
  return (
    <>
      <ButtonPrimary
          onClick={handleMenuOpen}
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          { props.title ?? 'Select Your Document' }
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
            <Typography className={classes.dropdownMenu} onClick={ openFileWindow }>
              Select from Existing Files
              <input
                id="selectFile"
                accept="image/png, image/jpeg, application/pdf, image/jpg "
                style={{ display: "none" }}
                type="file"
                ref={  refChangeEvent }
                onClick={ handleInputChange }
                onChange={ (event) => handleChange(event) }
              ></input>
            </Typography>
          </MenuItem>
          <MenuItem>
            <a to="/faq" className="nav_link ">
              <Typography className={classes.dropdownMenu} onClick={ enableCameraOption }>
                Upload from Camera
              </Typography>
            </a>
          </MenuItem>
        </Menu>
        <Grid container direction="row">
          <Grid className="gridPadding" item xs={ 12 }>
            {
              label.map((fileName, key) => (
                <Grid key={Math.random() * 1000} style={ { marginLeft: "2px" } }>{ loading ? "Uploading..." : "" }</Grid>
              ))
            }
            
          </Grid>
        </Grid>
        {showCamera  ?
          (!imgSrc ? 
            <Grid container style={ { margin: "10px 0px"} } >              
            <Webcam
              audio={false}
              ref={ refWebCam}
              screenshotFormat="image/jpeg"
              height={360}
              width={640}
              videoConstraints={{
                ...videoConstraints,
                facingMode
              }}
            />       
            <ButtonPrimary
              onClick={capture}
              stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
            >
              Capture Photo
            </ButtonPrimary>      
            
          </Grid> : 
          <Grid container style={ { margin: "10px 0px"} }>
            <Grid style={{ margin: "0px 10px"}}>
              {imgSrc && (
                <img
                  src={imgSrc}
                />
              )}
            </Grid> 
              <Grid>
                <ButtonPrimary
                  onClick={ uploadCameraPhoto }
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"0px 10px 10px 0px"}'
                >
                  Upload
                </ButtonPrimary>
              </Grid>
              <Grid>
                <ButtonPrimary
                  onClick={ enableCameraOption }
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"0px 0px 10px 0px"}'
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
export default UploadDocument;

UploadDocument.propTypes = {
  applicationNumber: PropTypes.string,
  customerEmail: PropTypes.string,
  title: PropTypes.string,
  documentType: PropTypes.string,
  docType: PropTypes.string
};