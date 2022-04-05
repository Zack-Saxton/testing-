import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  ButtonPrimary,
  ButtonSecondary,
  Select,
} from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { uploadEmailVerificationDocument } from "../../Controllers/EmailVerificationController";

function UploadDocument(props) {
  const classes = useStylesEmailVerification();
  const [ showCamera, setShowCamera ] = useState(false);
  //const [ label, setlabel ] = useState("No File Upload");
  const [ loading, setLoading ] = useState(false); 
  const [imgSrc, setImgSrc] = useState(null);
  const [selectDocument, setSelectDocument] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState(null);
  const isMenuOpen = Boolean(selectDocument);
  const changeEvent = useRef("");
  const webcamRef = useRef(null);
  const docType = props.docType ?? '';

  const handleMenuOpen = (event) => {
    setSelectDocument(event.currentTarget);
  };  
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleChange = (event) => {
    let uploadedFile = selectedFile.value.split("\\");
    //setlabel(uploadedFile[ uploadedFile.length - 1 ]);
    if (!selectedFile) {
      if (!toast.isActive("closeToast")) {
        toast.error(globalMessages.Please_Select_File_Upload, { toastId: "closeToast" });
      }
    } else {
      let filePath = selectedFile.value;
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
      if (!allowedExtensions.exec(filePath)) {
        if (!toast.isActive("closeToast")) {
          toast.error("Please upload file having extensions .jpeg .jpg .png .pdf only. ");
        }
        selectedFile.value = "";
        return false;
      } else if (selectedFile.files[ 0 ].size <= 10240000) {
        handleElseTwo();
      } else {
        handleElse();
      }
    }

  };
  const handleElseTwo = () => {
    let reader = new FileReader();
    if (selectedFile.files && selectedFile.files[ 0 ]) {
      reader.onload = async () => {
        const buffer2 = Buffer.from(reader.result, "base64");
        let fileData = Buffer.from(buffer2).toJSON().data;
        let fileName = selectedFile.files[ 0 ].name;
        let fileType = selectedFile.files[ 0 ].type;
        let documentType = docType;
        setLoading(true);
        let compressedFile = [{
          sourcePath: "",
          data: fileData,
          fileName: fileName
        }];
        let filesInfo = {
          "fieldname": "file",
          "originalname": fileName,
          "name": fileName,
          "encoding":"7bit",
          "mimetype": fileType,
          "path": "",
          "extension": fileName.split('.').pop(),
          "size": selectedFile.files[ 0 ].size,
          "truncated": false,
          "buffer": null,
          "uploaddirectory": ""
        };
        let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, documentType);
        if (response) {
          setLoading(false);
          //setDocType("");
          selectedFile.value = "";
        }
        //Passing data to API
      };
      reader.readAsDataURL(selectedFile.files[ 0 ]);
    }
  };
  const openFileWindow = () => {
    changeEvent.current.click();
  }
  const enableCameraOption = () => {
    setShowCamera(true);
    setImgSrc(null);
    handleMenuClose();
  }
  //Selecting file for upload
  const handleInputChange = () => {
    setSelectedFile(changeEvent.current);
    setShowCamera(false);
    setImgSrc(null);
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setSelectDocument(false);
  };
  const handleElse = () => {
    if (selectedFile.files[ 0 ].size > 10240000) {
      if (!toast.isActive("closeToast")) {
        toast.error(globalMessages.Please_Upload_File_Below_Size, { toastId: "closeToast" });
      }
    }
  };
  const uploadCameraPhoto = async () => {
    let documentType = docType;
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
    let filesInfo = {
      "fieldname": "file",
      "originalname": fileName,
      "name": fileName,
      "encoding":"7bit",
      "mimetype": "image/jpeg",
      "path": "",
      "extension": "jpeg",
      "size": 0,
      "truncated": false,
      "buffer": null,
      "uploaddirectory": ""
    };
    let response = await uploadEmailVerificationDocument(compressedFile, filesInfo, props.applicationNumber, props.customerEmail, documentType);
        if (response) {
          setLoading(false);
          //setDocType("");
          selectedFile.value = "";
        }
  } 
  return (
    <>
      <ButtonPrimary
          onClick={handleMenuOpen}
          stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
        >
          { props.title ?? 'Upload a Document' }
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
                style={{ display: "none" }}
                type="file"
                ref={ changeEvent }
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
        {showCamera  ?
          (!imgSrc ? 
            <Grid container >
              <ButtonPrimary
              onClick={capture}
              stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "margin":"10px 0px"}'
            >
              Capture Photo
            </ButtonPrimary>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              height={360}
              width={640}
            />            
            
          </Grid> : 
          <Grid container style={ { margin: "10px 0px"} }>
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
            <Grid style={{ margin: "0px 10px"}}>
              {imgSrc && (
                <img
                  src={imgSrc}
                />
              )}
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