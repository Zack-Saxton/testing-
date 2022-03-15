import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import * as imageConversion from 'image-conversion';
import Cookies from "js-cookie";
import Moment from "moment";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import profileImg from "../../../assets/images/profile-img.jpg";
import { ProfilePicture } from "../../../contexts/ProfilePicture";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import LogoutController from "../../Controllers/LogoutController";
import { basicInformation, uploadNewProfileImage } from "../../Controllers/MyProfileController";
import ProfileImageController from "../../Controllers/ProfileImageController";
import { ButtonPrimary, ButtonSecondary, EmailTextField, TextField } from "../../FormsUI";
import ErrorLogger from '../../lib/ErrorLogger';
import "./Style.css";

const validationSchema = yup.object({
  email: yup
    .string(globalMessages.EmailEnter)
    .email(globalMessages.EmailValid)
    .matches(
      /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
      globalMessages.EmailValid
    )
    .required(globalMessages.EmailRequired),
  phone: yup
    .string(globalMessages.PhoneEnter)
    .required(globalMessages.PhoneRequired)
    .transform((value) => value.replace(/[^\d]/g, ""))
    .matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, globalMessages.PhoneValid)
    .matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
    .min(10, globalMessages.PhoneMin),
});

async function filetoImage(file) {
  try {
    return await imageConversion.filetoDataURL(file);
  } catch (error) {
    ErrorLogger("Error executing image conversion", error);
  }
}

export default function BasicInformation(props) {

  const [ loading, setLoading ] = useState(false);
  const { dataProfile, setData } = useContext(ProfilePicture);
  const navigate = useNavigate();
  const { refetch } = useQuery('loan-data', usrAccountDetails);
  const { refetch: refetchProfilePicture } = useQuery('my-profile-picture', ProfileImageController);

  let basicData = props?.basicInformationData?.identification;
  let basicInfo = props?.basicInformationData?.latest_contact;
  let profileImageData = props?.getProfileImage ?? profileImg;
  let hasActiveLoan = (/true/i).test(Cookies.get("hasActiveLoan"));
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  var appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus || hasActiveLoan) ? true : false;
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ docType ] = useState("");
  const [ uploadedImage, setuploadedImage ] = useState(null);

  const handleInputChange = () => {
    document.getElementById("selectImage").click();
    setSelectedFile(document.getElementById("selectImage"));
  };

  const onClickCancelChange = () => {
    formik.resetForm();
    setSelectedFile(null);
  };

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
  function phoneNumberMask(values) {
    let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
    return (values);
  }

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
        primaryPhoneNumber: phone,
        email: values.email,
      };
      const uploadBasicInfoChange = () => {
        if (!toast.isActive("closeToast")) {
          refetch().then(() => toast.success(globalMessages.UpdatedSuccessfully, {
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

      const uploadBasicInfoImageChange = async () => {
        if (selectedFile !== null) {
          var filePath = selectedFile.value;
          var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
          if (!allowedExtensions.exec(filePath)) {
            toast.error(globalMessages.ImageExtentions);
            setLoading(false);
            selectedFile.value = "";
            return false;
          } else if (selectedFile.files[ 0 ].size <= 819200) {
            let reader = new FileReader();
            if (selectedFile.files && selectedFile.files[ 0 ]) {
              reader.onload = async () => {
                const compress_file = await imageConversion.compressAccurately(selectedFile.files[ 0 ], {
                  size: 80,
                  accuracy: '',
                  type: "image/jpeg",
                  width: '',
                  height: "200",
                  scale: 0.5,
                  orientation: 2
                });
                const compress_image = await filetoImage(compress_file);
                const buffer2 = Buffer.from(compress_image, "base64");
                let encodedFile = Buffer.from(buffer2).toString("base64");
                let imageData = encodedFile
                  .toString()
                  .replace(/^dataimage\/[a-z]+base64/, "");
                let fileName = selectedFile.files[ 0 ].name;
                fileName = fileName.substr(0, fileName.lastIndexOf(".")) + ".jpeg";
                let fileType = compress_file.type;
                let documentType = docType;
                let email = basicInfo?.email === values.email ? basicInfo?.email : values.email;

                let uploadData = await uploadNewProfileImage(imageData, fileName, fileType, documentType, email);
                if (uploadData.status === 200) {
                  setData({
                    ...dataProfile, "profile_picture_url": uploadData?.data?.profile_picture_url ?? ""
                  });

                  Cookies.set("profile_picture_url", uploadData?.data?.profile_picture_url ? uploadData?.data?.profile_picture_url : "");
                  if (!toast.isActive("closeToast")) {
                    toast.success(
                      globalMessages.UpdatedSuccessfully,
                      {
                        toastId: "closeToast",
                        onClose: () => {
                          if ((formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email && selectedFile !== null)) {
                            setuploadedImage(uploadData?.data?.profile_picture_url);
                            refetchProfilePicture();
                            refetch();
                            setLoading(false);
                            onClickCancelChange();
                            logoutUser();
                          }
                          else if ((formik.initialValues.phone !== values.phone && selectedFile !== null)) {
                            setuploadedImage(uploadData?.data?.profile_picture_url);
                            refetchProfilePicture();
                            refetch();
                            setLoading(false);
                            onClickCancelChange();
                          }
                          else {
                            setLoading(false);
                            setuploadedImage(uploadData?.data?.profile_picture_url);
                            refetchProfilePicture();
                            onClickCancelChange();
                          }
                        }
                      }
                    );
                  }
                }
                else {
                  if (!toast.isActive("closeToast")) {
                    toast.error(globalMessages.FileUploadError,
                      {
                        toastId: "closeToast",
                        onClose: () => {
                          setLoading(false);
                        }
                      }
                    );
                  }
                }
              };
              reader.readAsDataURL(selectedFile.files[ 0 ]);
            }
          } else {
            if (selectedFile.files[ 0 ].size > 819200) {
              toast.error(globalMessages.FileUploadMax);
              setLoading(false);
            } else if (docType == null) {
              toast.error(globalMessages.FileUploadTypeImage);
              setLoading(false);
            }
          }
        }
      };

      if (formik.initialValues.phone === phone && formik.initialValues.email === values.email && selectedFile === null) {
        if (!toast.isActive("closeToast")) {
          toast.error(globalMessages.NoChange, {
            toastId: "closeToast",
            onClose: () => { setLoading(false); }
          });
        }
      }
      else {
        let res = await basicInformation(body);

        if ((formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && selectedFile !== null)) {
          if (res?.data?.notes.length !== 0 && selectedFile !== null) {
            uploadBasicInfoImageChange();
          }
        }
        else if (selectedFile !== null) {
          uploadBasicInfoImageChange();
        }
        else if (formik.initialValues.phone !== values.phone && formik.initialValues.email === values.email) {
          if (res?.data?.notes.length !== 0 && res?.data?.emailUpdate) {
            uploadBasicInfoChange();
          }
        }
        else if (formik.initialValues.email !== values.email || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email)) {
          if (res?.data?.notes.length !== 0 && res?.data?.emailUpdate) {
            uploadBasicInfoChangeLogOut();
          }
        }
        else {
          if (!toast.isActive("closeToast")) {
            toast.error(globalMessages.TryAgain, {
              toastId: "closeToast",
              onClose: () => { setLoading(false); }
            });
          }
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
    <div>
      <form onSubmit={ formik.handleSubmit } style={ {
        opacity: loading ? 0.55 : 1,
        pointerEvents: loading ? "none" : "initial"
      } }>
        { props?.basicInformationData === null ? (
          <Grid align="center"><CircularProgress /></Grid>
        ) : <>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <TextField
              id="basicFirstName"
              label="First Name"
              name="firstname"
              type="text"
              value={ basicData?.first_name ? basicData?.first_name : "" }
              disabled={ true }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <TextField
              id="basicLastName"
              label="Last Name"
              name="lastname"
              type="text"
              disabled={ true }
              value={ basicData?.last_name ? basicData?.last_name : "" }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <TextField
              id="basicDOB"
              label="Date of Birth"
              name="dob"
              type="date"
              format={ "DD/MM/YYYY" }
              disabled={ true }
              value={ basicData?.date_of_birth ? Moment(basicData?.date_of_birth).format("MM/DD/YYYY") : "" }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <EmailTextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              disabled={ !disableField }
              onKeyDown={ preventSpace }
              value={ formik.values.email }
              materialProps={ { maxLength: "100" } }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.email && Boolean(formik.errors.email) }
              helperText={ formik.touched.email && formik.errors.email }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
            id={ disableField ? "basicPhoneNumber" : "profilePhoneNumberWrap" }
          >
            <TextField
              name="phone"
              label="Primary Phone Number"
              placeholder="Enter your phone number"
              id="phone"
              type="text"
              materialProps={ { maxLength: "14" } }
              onKeyDown={ preventSpace }
              onBlur={ formik.handleBlur }
              value={ formik.values.phone ? phoneNumberMask(formik.values.phone) : "" }
              onChange={ formik.handleChange }
              error={ formik.touched.phone && Boolean(formik.errors.phone) }
              helperText={ formik.touched.phone && formik.errors.phone }
              disabled={ !disableField }

            />
          </Grid>

          <Grid container direction="row">
            <Grid id="imgUploadWrap" item xs={ 8 } sm={ 3 }>
              <img
                style={ { width: "100%" } }
                src={ uploadedImage ?? profileImageData }
                align="left"
                alt="Profile Pic"
              />

            </Grid>

            <Grid item xs={ 12 } sm={ 6 } style={ { paddingTop: "10px" } }>
              <ButtonSecondary
                stylebutton='{"background": "#FFFFFF", "padding":"0px 30px","fontWeight":"700","color": "#214476","fontSize":"0.938rem","borderWidth":"1","borderStyle": "solid"}'
                id="uploadProfileImage"
                variant="contained"
                component="span"
                onClick={ handleInputChange }
                disabled={ !disableField }
              >
                Upload New Photo
              </ButtonSecondary>

              <input
                accept="image/png, image/jpeg, image/jpg "
                multiple
                hidden
                id="selectImage"
                type="file"
              />
              <br></br>
              <small style={ { fontSize: "12px", color: "#595959" } }>
                Allowed jpg, gif or png. Max size of 800kb
              </small>
            </Grid>
          </Grid>
          <Grid
            container
            style={ { justifyContent: "left" } }
            alignItems="center"
            item
            lg={ 8 }
            md={ 8 }
            xs={ 12 }
            className="textBlock alignButton"
          >
            <ButtonSecondary
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              styleicon='{ "color":"" }'
              onClick={ onClickCancelChange }
              disabled={ !disableField }
            >
              Cancel
            </ButtonSecondary>
            <ButtonPrimary
              stylebutton='{"marginLeft": "", "color":"#171717", "fontWeight":"700", "marginLeft": "5px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              styleicon='{ "color":"" }'
              type="submit"
              disabled={ loading }
            >
              Save Changes
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={ {
                  marginRight: "10px",
                  display: loading ? "block" : "none",
                  color: "blue"
                } }
              />
            </ButtonPrimary>
          </Grid>
        </> }
      </form>
    </div>
  );
}
BasicInformation.propTypes = {
  basicInformationData: PropTypes.object,
  getProfileImage: PropTypes.string
};