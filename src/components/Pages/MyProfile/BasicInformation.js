import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useFormik } from "formik";
import * as imageConversion from 'image-conversion';
import Cookies from "js-cookie";
import Moment from "moment";
import PropTypes from "prop-types";
import React, { useContext, useRef, useState, useEffect } from "react";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import profileImg from "../../../assets/images/profile-img.jpg";
import { ProfilePicture } from "../../../contexts/ProfilePicture";
import LogoutController from "../../Controllers/LogoutController";
import { basicInformation, uploadNewProfileImage } from "../../Controllers/MyProfileController";
import ProfileImageController from "../../Controllers/ProfileImageController";
import { ButtonPrimary, ButtonSecondary, EmailTextField, TextField } from "../../FormsUI";
import ErrorLogger from '../../lib/ErrorLogger';
import { useStylesMyProfile } from "./Style";
import { useAccountOverview } from '../../../hooks/useAccountOverview'
import "./Style.css";
import { phoneNumberMask, maskPhoneNumberWithAsterisk } from '../../Controllers/CommonController'
import { usePhoneNumber } from '../../../hooks/usePhoneNumber';
import { FormValidationRules } from "../../lib/FormValidationRule";
let formValidation = new FormValidationRules();
const validationSchema = yup.object({
  email: formValidation.email(),
  phone: formValidation.phoneNumber(),
});

async function filetoImage(file) {
  try {
    return await imageConversion.filetoDataURL(file);
  } catch (error) {
    ErrorLogger("Error executing image conversion", error);
  }
}
const maskDOB = (dob) => {
  let monthDay = (dob.slice(0, 6)).replace(/\d/g, '*'); 
  return monthDay + dob.slice(6);
}
const shortANDoperation = (pramOne, pramtwo) => {
  return pramOne && pramtwo
};
export default function BasicInformation(props) {
  const classes = useStylesMyProfile();
  const [ loading, setLoading ] = useState(false);
  const { data, setData } = useContext(ProfilePicture);
  const [ basicData, setBasicData ] = useState();
  const [ basicInfo, setBasicInfo ] = useState();
  const navigate = useNavigate();
  const { data : accountDetails, refetch, isLoading } = useAccountOverview();
  const { refetch: refetchProfilePicture } = useQuery('my-profile-picture', ProfileImageController);
  let refSelectImage = useRef();
  let profileImageData = props?.getProfileImage ?? profileImg;
  let hasActiveLoan = (/true/i).test(Cookies.get("hasActiveLoan"));
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  let appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus || hasActiveLoan) ? true : false;
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ docType ] = useState("");
  const [ uploadedImage, setUploadedImage ] = useState(null);
  const { phoneNumberValue, setPhoneNumberValue, phoneNumberCurrentValue, setPhoneNumberCurrentValue, updateActualValue, updateMaskValue, updateEnterPhoneNo } = usePhoneNumber();

  useEffect(() => {
    if(accountDetails) {
      setBasicData(accountDetails?.data?.customer?.identification);
      setBasicInfo(accountDetails?.data?.customer?.latest_contact);
    }
  }, [accountDetails])
  
  const handleInputChange = () => {
    refSelectImage.current.click();
    setSelectedFile(refSelectImage.current);
  };

  const onClickCancelChange = () => {
    formik.resetForm();
    setSelectedFile(null);
  };

  const onClickResetForm = () =>{
    formik.resetForm();
    setPhoneNumberValue(basicInfo?.phone_number_primary ?? "");
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(basicInfo?.phone_number_primary ?? "")));
    setSelectedFile(null);
  }

  const logOut = () => {
    setLoading(false);
    LogoutController();
    navigate("/login");
  };

  const logoutUser = () => {
    toast.success(globalMessages.LoggedOut, {
      onClose: () => logOut(),
    });
  };  
  useEffect(() => {
    if(basicInfo) {
    setPhoneNumberValue(basicInfo?.phone_number_primary ?? "");
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(basicInfo?.phone_number_primary ?? "")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ basicInfo]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: basicInfo?.email ?? "",
      phone: basicInfo?.phone_number_primary ?? "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      const phone =
        values.phone
          .replace(/-/g, "")
          .replace(/\)/g, "")
          .replace(/\(/g, "")
          .replace(/ /g, "") || "";

      let body = {
        primaryPhoneNumber: phoneNumberValue,
        email: values.email,
      };
      
      const uploadBasicInfoChange = () => {
        if (!toast.isActive("closeToast")) {
          refetch().then( () => 
            toast.success(globalMessages.UpdatedSuccessfully, {
            toastId: "closeToast",
            onClose: () => {
              setLoading(false);
              onClickCancelChange();
            }
          }));
        }
      };

      const uploadBasicInfoChangeLogOut = () => {
        if (!toast.isActive("closeToast")) {
          refetch().then(() => toast.success(globalMessages.UpdatedSuccessfully, {
            toastId: "closeToast",
            onClose: () => {
              logoutUser();
              onClickCancelChange();
            }
          }));
        }
      };
      const showErrorMessage = (message) => {
        if (!toast.isActive("closeToast")) {
          toast.error(message, {
            toastId: "closeToast",
            onOpen: () => { setLoading(false); }
          });
        }
      }
      const uploadBasicInfoImageChange = async () => {
        if (selectedFile) {
          let filePath = selectedFile.value;
          let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
          if (!allowedExtensions.exec(filePath)) {
            toast.error(globalMessages.ImageExtentions);
            setLoading(false);
            selectedFile.value = "";
            return false;
          } else if (selectedFile.files[ 0 ].size <= 819200) {
            let reader = new FileReader();
            if (selectedFile.files && selectedFile.files[ 0 ]) {
              reader.onload = async () => {
                const compressFile = await imageConversion.compressAccurately(selectedFile.files[ 0 ], {
                  size: 80,
                  accuracy: '',
                  type: "image/jpeg",
                  width: '',
                  height: "200",
                  scale: 0.5,
                  orientation: 2
                });
                const compressImage = await filetoImage(compressFile);
                const buffer2 = Buffer.from(compressImage, "base64");
                let encodedFile = Buffer.from(buffer2).toString("base64");
                let imageData = encodedFile
                  .toString()
                  .replace(/^dataimage\/[a-z]+base64/, "");
                let fileName = selectedFile.files[ 0 ].name;
                fileName = fileName.substr(0, fileName.lastIndexOf(".")) + ".jpeg";
                let fileType = compressFile.type;
                let documentType = docType;
                let email = basicInfo?.email === values.email ? basicInfo?.email : values.email;

                let uploadData = await uploadNewProfileImage(imageData, fileName, fileType, documentType, email);
                if (uploadData.status === 200) {
                  setData({
                    ...data, "profilePictureURL": uploadData?.data?.profile_picture_url ?? ""
                  });

                  Cookies.set("profilePictureURL", uploadData?.data?.profile_picture_url ?? "");
                  if (!toast.isActive("closeToast")) {
                    toast.success(
                      globalMessages.UpdatedSuccessfully,
                      {
                        toastId: "closeToast",
                        onClose: () => {
                          if ((formik.initialValues.email !== values.email && selectedFile) || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email && selectedFile)) {
                            setUploadedImage(uploadData?.data?.profile_picture_url);
                            refetchProfilePicture();
                            refetch();
                            setLoading(false);
                            onClickCancelChange();
                            logoutUser();
                          }
                          else if ((formik.initialValues.phone !== values.phone && selectedFile)) {
                            setUploadedImage(uploadData?.data?.profile_picture_url);
                            refetchProfilePicture();
                            refetch();
                            setLoading(false);
                            onClickCancelChange();
                          }
                          else {
                            setLoading(false);
                            setUploadedImage(uploadData?.data?.profile_picture_url);
                            refetchProfilePicture();
                            onClickCancelChange();
                          }
                        }
                      }
                    );
                  }
                }
                else {
                  showErrorMessage(globalMessages.FileUploadError);                  
                }
              };
              reader.readAsDataURL(selectedFile.files[ 0 ]);
            }
          } else {
            if (selectedFile.files[ 0 ].size > 819200) {
              toast.error(globalMessages.FileUploadMax);
              setLoading(false);
            } else if (!docType) {
              toast.error(globalMessages.FileUploadTypeImage);
              setLoading(false);
            }
          }
        }
      };

      if (formik.initialValues.phone === phone && formik.initialValues.email === values.email && !selectedFile) {
        showErrorMessage(globalMessages.NoChange);        
      }
      else {
        let res = await basicInformation(body);
        let notesLength = res?.data?.notes?.length ?? 0;
        if ((formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && selectedFile !== null)) {
          if (notesLength !== 0 && selectedFile !== null) {
            uploadBasicInfoImageChange();
          }else if(res?.data?.statusCode == 400){
            showErrorMessage(globalMessages.INVALIDENTRY);            
          }
        } else if (selectedFile !== null) {
          uploadBasicInfoImageChange();
        } else if (formik.initialValues.phone !== values.phone && formik.initialValues.email === values.email) {
          if (notesLength !== 0 && res?.data?.emailUpdate) {
            uploadBasicInfoChange();
          }
        } else if (formik.initialValues.email !== values.email || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email)) {
           if(res?.data?.statusCode == 400){
            showErrorMessage(globalMessages.INVALIDENTRY);            
          }
          if (notesLength !== 0 && res?.data?.emailUpdate) {
              uploadBasicInfoChangeLogOut();
          }
        } else {
          showErrorMessage(globalMessages.TryAgain);          
        }
      }
    }
  });

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  
  return (
    <div data-testid="basic-information-component">
      <form onSubmit={formik.handleSubmit} style={{
        opacity: loading ? 0.55 : 1,
        pointerEvents: loading ? "none" : "initial"
      }}>
        {isLoading ? (
          <Grid align="center"><CircularProgress /></Grid>
        ) : <>
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <TextField
              id="basicFirstName"
              label="First Name"
              name="firstname"
              type="text"
              value={basicData?.first_name ? basicData?.first_name : ""}
              disabled={true}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <TextField
              id="basicLastName"
              label="Last Name"
              name="lastname"
              type="text"
              disabled={true}
              value={basicData?.last_name ? basicData?.last_name : ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <TextField
              id="basicDOB"
              label="Date of Birth"
              name="dob"
              type="date"
              format={"DD/MM/YYYY"}
              disabled={true}
              value={basicData?.date_of_birth ? maskDOB(Moment(basicData?.date_of_birth).format("MM/DD/YYYY")) : ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <EmailTextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              disabled={!disableField}
              onKeyDown={preventSpace}
              value={formik.values.email}
              materialProps={{ maxLength: "100" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                shortANDoperation(formik.touched.email, Boolean(formik.errors.email))
              }
              helperText = {
                shortANDoperation(formik.touched.email, formik.errors.email)
              }
              />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
            id={disableField ? "basicPhoneNumber" : "profilePhoneNumberWrap"}
          >
            <TextField
              name="phone"
              label="Primary Phone Number"
              placeholder="Enter your phone number"
              id="phone"
              type="text"
              materialProps={{ maxLength: "14" }}
              onKeyDown={preventSpace}
              onBlur={(event)=>{
                updateMaskValue(event);
                formik.handleBlur(event);
              }}
              value = { phoneNumberCurrentValue }
              onChange={(event)=>{
                updateEnterPhoneNo(event);
                formik.handleChange(event);
              }}
              error={shortANDoperation(formik.touched.phone, Boolean(formik.errors.phone))}
              helperText = {shortANDoperation(formik.touched.phone, formik.errors.phone)}
              disabled={!disableField}
              onFocus={ updateActualValue }

            />
          </Grid>

          <Grid container direction="row">
            <Grid id="imgUploadWrap" item xs={8} sm={3}>
              <img
                style={{ width: "100%" }}
                src={uploadedImage ?? profileImageData}
                align="left"
                alt="Profile Pic"
              />

            </Grid>

            <Grid item xs={12} sm={6} style={{ paddingTop: "10px" }}>
              <ButtonSecondary
                stylebutton='{"background": "#FFFFFF", "padding":"0px 30px","fontWeight":"700","color": "#214476","fontSize":"0.938rem","borderWidth":"1","borderStyle": "solid"}'
                id="uploadProfileImage"
                variant="contained"
                component="span"
                onClick={handleInputChange}
                disabled={!disableField}
              >
                Upload New Photo
              </ButtonSecondary>

              <input
                accept=".png, .jpeg, .jpg "
                multiple
                hidden
                id="selectImage"
                type="file"
                ref={refSelectImage}
              />
              <br></br>
              <small className={classes.fileAllowedText}>
                Allowed jpg, jpeg or png. Max size of 800kb
              </small>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            item
            lg={8}
            md={8}
            xs={12}
            className={`${ classes.buttonGrid } textBlock alignButton saveButtonWrap`}
          >
            <ButtonSecondary
              stylebutton='{"padding":"0px 30px"}'
              styleicon='{ "color":"" }'
              onClick={onClickResetForm}
              disabled={!disableField}
            >
              Cancel
            </ButtonSecondary>
            <ButtonPrimary
              stylebutton='{"color":"#171717", "fontWeight":"700", "marginLeft": "5px","padding":"0px 30px", "fontSize":"0.938rem"}'
              styleicon='{ "color":"" }'
              type="submit"
              disabled={loading}
            >
              Save Changes
              <AutorenewIcon className="rotatingIcon"
                style={{
                display: loading ? "block" : "none",
              }}/>
            </ButtonPrimary>
          </Grid>
        </>}
      </form>
    </div>
  );
}
BasicInformation.propTypes = {
  getProfileImage: PropTypes.string
};