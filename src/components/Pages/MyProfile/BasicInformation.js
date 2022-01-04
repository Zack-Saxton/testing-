import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Moment from "moment";
import { basicInformation, uploadNewProfileImage, } from "../../Controllers/myProfileController";
import LogoutController from "../../Controllers/LogoutController";
import CircularProgress from '@material-ui/core/CircularProgress';
import profileImg from "../../../assets/images/profile-img.png";
import { toast } from "react-toastify";
import {
  ButtonPrimary,
  ButtonSecondary,
  EmailTextField,
  PhoneNumber,
  TextField,
} from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";
import { ProfilePicture } from "../../../contexts/ProfilePicture";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Please enter a valid email address"
    )
    .required("Your email address is required"),

  phone: yup
    .string("Enter a name")
    .required("Your Phone number is required")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, "Please enter a valid Phone number")
    .matches(/^(\d)(?!\1+$)\d{9}$/, "Please enter a valid Phone number")
    .min(10, "Name must contain at least 10 digits"),
});

export default function BasicInformation(props) {
  
	
  const [loading, setLoading] = useState(false);
  const { dataProfile , setData } = useContext(ProfilePicture);
  const history = useHistory();

  let basicData = props?.basicInformationData?.identification != null ? props.basicInformationData.identification : null;
  let basicInfo =props?.basicInformationData?.latest_contact != null ? props.basicInformationData.latest_contact : null;
  let profileImageData = props?.getProfileImage != null ?  props.getProfileImage : profileImg;
  let hasActiveLoan = Cookies.get("hasActiveLoan") === "true" ? true : false;
  let hasApplicationStatus = Cookies.get("hasApplicationStatus")
  var appStatus=["rejected", "reffered", "expired"]; 
  let checkAppStatus = appStatus.includes(hasApplicationStatus)
  let disableField = (checkAppStatus === true || hasActiveLoan === true) ? true : false;


const [selectedFile, setSelectedFile] = useState(null);
const [docType] = useState("");
const [uploadedImage, setuploadedImage] = useState(null);

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
  history.push({
    pathname: "/login"
  });
};

const logoutUser = () => {
 
  toast.success("You are being logged out of the system", {
    position: "bottom-left",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => logOut(),
  });
};


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: basicInfo?.email ? basicInfo?.email : "",
      phone: basicInfo?.phone_number_primary ? basicInfo?.phone_number_primary : "",
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
          
        }  
        const uploadBasicInfoChange = () => {
          if (!toast.isActive("closeToast")) {
            toast.success("Updated Successfully", {
              position: "bottom-left",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: "closeToast",
              onClose: () => {
                setLoading(false); 
                props.getUserAccountDetails()        
              }
            });}
        }

        const uploadBasicInfoChangeLogOut = () => {
          if (!toast.isActive("closeToast")) {
            toast.success("Updated Successfully", {
              position: "bottom-left",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: "closeToast",
              onClose: () => {
                props.getUserAccountDetails()  
                logoutUser()      
              }
            });}
        }
        

        const uploadBasicInfoImageChange = async () => {
          if (selectedFile !== null) {
            var filePath = selectedFile.value;
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            if (!allowedExtensions.exec(filePath)) {
              toast.error(
                "Please upload file having extensions .jpeg .jpg .png only. ",
                {
                  position: "bottom-left",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              setLoading(false);
              selectedFile.value = "";
              return false
              
            } else if (selectedFile.files[0].size <= 10240000) {
              let reader = new FileReader();
              if (selectedFile.files && selectedFile.files[0]) {
                reader.onload = async () => {
                  const buffer2 = Buffer.from(reader.result, "base64");
                  let encodedFile = Buffer.from(buffer2).toString("base64");
                  let imageData = encodedFile
                    .toString()
                    .replace(/^dataimage\/[a-z]+base64/, "");
                  let fileName = selectedFile.files[0].name;
                  let fileType = selectedFile.files[0].type;
                  let documentType = docType;
                  
                  let email = basicInfo?.email === values.email ? basicInfo?.email :  values.email ;
                 
                  let uploadData = await uploadNewProfileImage(imageData, fileName, fileType, documentType,email);
                
                  if(uploadData.data.status === 200){
                  setData({ ...dataProfile, "profile_picture_url": 
                   uploadData?.data?.data?.profile_picture_url
                  ? uploadData?.data?.data?.profile_picture_url
                  : "" });                 

                    Cookies.set("profile_picture_url",
                    uploadData?.data?.data?.profile_picture_url
                      ? uploadData?.data?.data?.profile_picture_url
                      : ""
                  );           
                     
                    if (!toast.isActive("closeToast")){
                      toast.success(
                       
                           "Updated Successfully",
                        {
                          position: "bottom-left",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          toastId: "closeToast",
                          onClose: () => {

                            if((formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email && selectedFile !== null))
                            {
                              setuploadedImage(uploadData.data.data.profile_picture_url) 
                              props.AsyncEffect_profileImage()
                               props.getUserAccountDetails()
                              setLoading(false);
                              logoutUser()

                            }
                           
                           else if((formik.initialValues.phone !== values.phone && selectedFile !== null))
                           {                     
                                 
                            setuploadedImage(uploadData.data.data.profile_picture_url) 
                            props.AsyncEffect_profileImage()
                            props.getUserAccountDetails()
                            setLoading(false);
                            
                           }   
                           else  {
                            setLoading(false);
                            setuploadedImage(uploadData.data.data.profile_picture_url)   
                            props.AsyncEffect_profileImage()                             
        
                           }               
                          }
                        }
                      )
                    }
                  }
                  else{
                    if (!toast.isActive("closeToast")) {
                    toast.error(
                          "Error uploading file",
                        {
                          position: "bottom-left",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          toastId: "closeToast",
                          onClose: () => {
                            setLoading(false);
                          }
                        }
                      );
                  }
                }
                  
                };
                reader.readAsDataURL(selectedFile.files[0]);
               
              }
            } else {
              if (selectedFile.files[0].size > 10240000) {
                toast.error("Please upload file size below 10mb ", {
                  position: "bottom-left",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setLoading(false);
              } else if (docType == null) {
                toast.error("Please select an image type to upload", {
                  position: "bottom-left",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setLoading(false);
              }
            }
          }
        }  
     
        if (formik.initialValues.phone === phone && formik.initialValues.email === values.email && selectedFile === null ) {
          if (!toast.isActive("closeToast")) {
          toast.error("No changes made", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "closeToast",
            onClose: () => { setLoading(false);}
          });}
         
        }
        else {
        let res = await basicInformation(body); 
       
       if((formik.initialValues.email !== values.email && selectedFile !== null ) || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email && selectedFile !== null) || (formik.initialValues.phone !== values.phone && selectedFile !== null ) ){
        if (res.data.data.notes.length !== 0 && selectedFile !== null) {
        
            uploadBasicInfoImageChange() 
          
          }
        }       
          else if(selectedFile !== null)
          {
            uploadBasicInfoImageChange()
          }
          else if(formik.initialValues.phone !== values.phone && formik.initialValues.email === values.email)
          {
            if( res.data.data.notes.length !== 0 && res.data.data.emailUpdate === true )
            {
              uploadBasicInfoChange()
            } 
          }
          else if(formik.initialValues.email !== values.email || (formik.initialValues.phone !== values.phone && formik.initialValues.email !== values.email ))
          {
            if(res.data.data.notes.length !== 0 && res.data.data.emailUpdate === true)
            {
              uploadBasicInfoChangeLogOut()
            } 
          }       
       
           else {
              if (!toast.isActive("closeToast")) {
            toast.error("Please try again", {
              position: "bottom-left",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined, 
              toastId: "closeToast",           
            onClose: () => { setLoading(false);}
          });}
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
    <form onSubmit={formik.handleSubmit} style={{
      opacity: loading ? 0.55 : 1,
      pointerEvents: loading ? "none" : "initial"
    }}>
       { props?.basicInformationData === null ? (
              <Grid align="center"><CircularProgress  /></Grid>
        ): <>
        
        <Grid
        item
        xs={12}
        style={{ width: "100%", gap: 15, marginBottom: 18 }}
        container
        direction="row"
      >
      
        <TextField
          label="First Name"
          name="firstname"
          type="text"
          value={ basicData?.first_name ? basicData?.first_name : "" }
          disabled={true}
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{ width: "100%", gap: 15, marginBottom: 18 }}
        container
        direction="row"
      >
        <TextField
          label="Last Name"
          name="lastname"
          type="text"
          disabled={true}
          value={ basicData?.last_name ?  basicData?.last_name : ""}
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{ width: "100%", gap: 15, marginBottom: 18 }}
        container
        direction="row"
      >
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          format={"DD/MM/YYYY"}
          disabled={true}
          value={basicData?.date_of_birth ? Moment(  basicData?.date_of_birth ).format("MM/DD/YYYY") : ""}
        />
      </Grid>

      <Grid
        item
        xs={12}
        style={{ width: "100%", gap: 15, marginBottom: 18 }}
        container
        direction="row"
      >
        <EmailTextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          disabled={disableField === true ? false : true}
          onKeyDown={preventSpace}
          value={formik.values.email}
          materialProps={{ maxLength: "100" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ width: "100%", gap: 15, marginBottom: 18 }}
        container
        direction="row"
        id = {disableField === true ? "" : "profilePhoneNumberWrap" } 
      >
        <PhoneNumber
          name="phone"
          label="Primary Phone Number"
          placeholder="Enter your phone number"
          id="phone"
          disabled={disableField === true ? false : true}
          onKeyDown={preventSpace}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>

      <Grid container direction="row">
        <Grid item xs={8} sm={3} style={{ paddingTop: "10px", maxWidth: "100px" }}>
          <img
            width="80px"
            src={uploadedImage !== null ? uploadedImage : profileImageData}
            align="left"
            alt="Profile Pic"
            style={{ borderRadius: "50%" }}
          />
                
        </Grid>

        <Grid item xs={12} sm={6} style={{ paddingTop: "10px" }}>
          <ButtonSecondary
            stylebutton='{"background": "#FFFFFF", "height": "inherit", "color": "black","fontSize":"1rem","border-width":"1","border-style": "solid"}'
            id="uploadProfileImage"
            variant="contained"
            component="span"
            onClick={handleInputChange}
            disabled={disableField === true ? false : true}
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
          Allowed jpg, gif or png. Max size of 800kb
        </Grid>
      </Grid>
      <Grid
        container
        style={{ justifyContent: "left" }}
        alignItems="center"
        item
        lg={8}
        md={8}
        xs={12}
        className="textBlock alignButton"
      >
        <ButtonSecondary
            stylebutton='{"marginLeft": "","fontSize":""}'
            styleicon='{ "color":"" }'
            onClick={onClickCancelChange}
            disabled={disableField === true ? false : true}
        >
            Cancel
        </ButtonSecondary>

        <ButtonPrimary
                stylebutton='{"marginLeft": "","fontSize":"", "marginLeft": "5px"}'
                styleicon='{ "color":"" }'
                type="submit"
                disabled={loading}
               
                >
            Save Changes
            <i
            className="fa fa-refresh fa-spin customSpinner"
            style={{
              marginRight: "10px",
              display: loading ? "block" : "none",
              color: "blue"
            }}
          />
        </ButtonPrimary>

      </Grid>      
      </>  } 
    </form>
  );
}