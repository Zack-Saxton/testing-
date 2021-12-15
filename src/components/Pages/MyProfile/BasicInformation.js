import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Moment from "moment";
import ProfileImageController from "../../Controllers/ProfileImageController";
import { basicInformation, uploadNewProfileImage, } from "../../Controllers/myProfileController";
import CircularProgress from '@material-ui/core/CircularProgress';
import profileImg from "../../../assets/images/profile-img.png";
import { getCustomerByEmail } from "../../Controllers/CheckMyOffersController";
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

export default function BasicInformation(basicInformationData) {

  const [submit, setSubmit] = useState(false);
  const [error] = useState(false);
  const [loading, setLoading] = useState(false);



  let basicData = basicInformationData?.basicInformationData?.identification != null ? basicInformationData.basicInformationData.identification : null;
  let basicInfo = basicInformationData?.basicInformationData?.latest_contact != null ? basicInformationData.basicInformationData.latest_contact : null;


  const checkApplicationStatus = async (event) => {
    formik.handleBlur(event);
    if (event.target.value !== "" || event.target.value !== null) {
      let result = await getCustomerByEmail(event.target.email);
      if (result && result?.data?.data?.AppSubmittedInLast30Days === true) {
        setSubmit(true);
        setLoading(false);
      }
    }
  }


  const [profileImage, setProfileImage] = useState(null);
  async function AsyncEffect_profileImage() {
    setProfileImage(await ProfileImageController());
  }
  useEffect(() => {
    AsyncEffect_profileImage();
  }, []);



  let profileImageData = profileImage?.data?.data?.profile_picture_url != null ? profileImage.data.data.profile_picture_url : profileImg;

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

      if (formik.initialValues.phone === phone && formik.initialValues.email === values.email) {
        toast.error("No changes made", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => { setLoading(false); }
        });

      }
      else {
        let res = await basicInformation(body);

        if (res.data.data.notes.length !== 0) {
          toast.success("Updated successfully", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              setLoading(false);
              window.location.reload();
            }
          });

        } else {
          toast.error("Please try again", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => { setLoading(false); }
          });
        }
      }

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
          return false;
        } else if (selectedFile.files[0].size <= 10240000) {
          let reader = new FileReader();
          if (selectedFile.files && selectedFile.files[0]) {
            reader.onload = () => {
              const buffer2 = Buffer.from(reader.result, "base64");
              let test = Buffer.from(buffer2).toJSON().data;
              let fileName = selectedFile.files[0].name;
              let fileType = selectedFile.files[0].type;
              let documentType = docType;
              uploadNewProfileImage(test, fileName, fileType, documentType);
            };
            reader.readAsDataURL(selectedFile.files[0]);
            setLoading(false);
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

  });

  const onClickCancelChange = () => {
    formik.resetForm();
  };

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleInputChange = () => {
    document.getElementById("selectImage").click();
    setSelectedFile(document.getElementById("selectImage"));
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [docType] = useState("");
  return (
    <form onSubmit={formik.handleSubmit}>
      {basicInformationData?.basicInformationData === null ? (
        <Grid align="center"><CircularProgress /></Grid>
      ) : <>


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
            value={basicData?.first_name ? basicData?.first_name : ""}
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
            value={basicData?.last_name ? basicData?.last_name : ""}
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
            value={basicData?.date_of_birth ? Moment(basicData?.date_of_birth).format("MM/DD/YYYY") : ""}
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
            onKeyDown={preventSpace}
            value={formik.values.email}
            materialProps={{ maxLength: "100" }}
            onLoad={checkApplicationStatus}
            onChange={formik.handleChange}
            onBlur={checkApplicationStatus}
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
        >
          <PhoneNumber
            name="phone"
            label="Primary Phone Number"
            placeholder="Enter your phone number"
            id="phone"
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
              src={profileImageData}
              align="left"
              alt="Profile Pic"
            />
            <Typography className={submit ? "showMsg" : "hideMsg"} style={{ textAlign: "left", marginLeft: "8%", marginTop: "2%" }}>
              It looks like you have already submitted an application within the last 30 days.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} style={{ paddingTop: "10px" }}>
            <ButtonSecondary
              stylebutton='{"background": "#FFFFFF", "height": "inherit", "color": "black","fontSize":"1rem","border-width":"1","border-style": "solid"}'
              id="uploadProfileImage"
              variant="contained"
              component="span"
              onClick={handleInputChange}
              disabled={error || loading}
            >
              Upload New Photo
            </ButtonSecondary>

            <input
              accept="image/png, image/jpeg, application/pdf, image/jpg "
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
      </>}
    </form>
  );
}
