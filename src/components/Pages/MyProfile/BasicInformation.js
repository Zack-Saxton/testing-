import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Moment from "moment";
import Typography from "@material-ui/core/Typography";
import ProfileImageController from "../../Controllers/ProfileImageController";
import {
  basicInformation,
  uploadNewProfileImage,
} from "../../Controllers/myProfileController";
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

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("A valid email address is required")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "A valid email address is required"
    )
    .required("Your email address is required"),

  phone: yup
    .string("Enter a name")
    .required("Your Phone number is required")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .matches(/^[1-9]{1}\d{2}\d{3}\d{4}$/, "Invalid Phone")
    .matches(/^(\d)(?!\1+$)\d{9}$/, "Invalid Phone")
    .min(10, "Name must contain at least 10 digits"),
});

export default function BasicInformation(userAccountDetailCard) {
  let userAccountDetail =
    userAccountDetailCard != null ? userAccountDetailCard : null;
  const [error] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkApplicationStatus = async (event) => {
    formik.handleBlur(event);
    if (event.target.value !== "" || event.target.value !== null) {
      let body = {
        email: event.target.value,
      };
      if (event.target.value !== "") {
        return axios({
          method: "POST",
          url: "/customer/get_customer_by_email",
          data: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  };

  const onClickCancelChange = () => {
    formik.resetForm();
  };

  const [profileImage, setProfileImage] = useState(null);
  async function AsyncEffect_profileImage() {
    setProfileImage(await ProfileImageController());
  }
  useEffect(() => {
    AsyncEffect_profileImage();
  }, []);

  let profileImageData =
    profileImage?.data?.data?.profile_picture_url != null
      ? profileImage.data.data.profile_picture_url
      : profileImg;

  const formik = useFormik({
    initialValues: {
      email:
        userAccountDetail?.userAccountDetailCard?.customer?.latest_contact
          ?.email ?? "",
      phone: userAccountDetail?.userAccountDetailCard?.customer?.latest_contact
        ?.phone_number_primary
        ? userAccountDetail.userAccountDetailCard.customer.latest_contact
            .phone_number_primary
        : "",
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
      if (values.email !== null) {
        let body = {
          email: values.email,
          isAuthenticated: true,
          profileInfo: {
            primaryPhoneNumber: phone,
            email: values.email,
          },
        };
        let res = await basicInformation(body);

        if (res.data.data.emailUpdate === true) {
          toast.success("Updates successfull", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        } else {
          toast.error("No changes made", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    },
  });

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleInputChange = () => {
    setSelectedFile(document.getElementById("file"));
  };

  const uploadProfileImage = () => {
    if (selectedFile === null) {
      toast.error("please select a file to upload", {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
        }
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [docType] = useState("");
  return (
    <form onSubmit={formik.handleSubmit}>
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
          defaultValue={
            userAccountDetail?.userAccountDetailCard?.customer?.identification
              ?.first_name
          }
          //materialProps={userAccountDetail?.userAccountDetailCard?.customer?.identification?.first_name}
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
          //materialProps={{ defaultValue: "Doe" }}
          disabled={true}
          defaultValue={
            userAccountDetail.userAccountDetailCard?.customer?.identification
              ?.last_name
          }
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
          //                  materialProps={{ defaultValue: "02/25/1990" }}
          disabled={true}
          defaultValue={Moment(
            userAccountDetail.userAccountDetailCard?.customer?.identification
              ?.date_of_birth
          ).format("MM/DD/YYYY")}
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
          type="text"
          onKeyDown={preventSpace}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>

      <Grid container direction="row">
        <Grid item xs={12} sm={3} style={{ paddingTop: "20px" }}>
          {/*  <PersonOutlineIcon />{" "}*/}
          <img
            id="sidebarProfilePic"
            src={profileImageData}
            alt="Profile Pic"
          />

          <input
            accept="image/png, image/jpeg, application/pdf, image/jpg "
            multiple
            id="file"
            type="file"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{ paddingTop: "10px" }}>
          <ButtonSecondary
            stylebutton='{"background": "#FFFFFF", "height": "inherit", "color": "black","fontSize":"1rem","border-width":"1","border-style": "solid"}'
            id="uploadProfileImage"
            variant="contained"
            onClick={() => uploadProfileImage()}
            component="span"
          >
            Upload New Photo
          </ButtonSecondary>
          <br></br>
          Allowed jpg, gif or png. Max size of 800kb
        </Grid>
      </Grid>
      <Grid
        container
        style={{ justifyContent: "center" }}
        alignItems="center"
        item
        lg={8}
        md={8}
        xs={12}
        className="textBlock alignButton"
      >
        <ButtonSecondary
          stylebutton='{"marginRight": " ", "height": "inherit"}'
          styleicon='{ "color":"" }'
          id="apply-loan-reset-button"
          onClick={onClickCancelChange}
        >
          <Typography align="center" className="textCSS ">
            Cancel
          </Typography>
        </ButtonSecondary>

        <ButtonPrimary
          type="submit"
          stylebutton='{"marginLeft": "5px","background": "#FFBC23", "height": "inherit", "color": "black","fontSize":"1rem"}'
          disabled={error || loading}
        >
          <Typography align="center" className="textCSS ">
            Save Changes
          </Typography>
          <i
            className="fa fa-refresh fa-spin customSpinner"
            style={{
              marginRight: "10px",
              display: loading ? "block" : "none",
            }}
          />
        </ButtonPrimary>
      </Grid>
    </form>
  );
}
