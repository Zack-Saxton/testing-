import React,{useState} from "react";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./Style.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  PasswordField,
} from "../../FormsUI";
import * as yup from "yup";
import { useFormik } from "formik";
import { changePassword } from "../../Controllers/myProfileController";
import Cookies from "js-cookie"
import { decryptAES } from "../../lib/Crypto"
import { tabAtom } from "./MyProfileTab";
import { useAtom } from "jotai";


export default function ChangePassword(basicInformationData) {
const history = useHistory();
const cred = JSON.parse(Cookies.get("cred") ? decryptAES(Cookies.get("cred")) : '{ }');
const [loading, setLoading] = useState(false);
const [, setTabvalue] = useAtom(tabAtom)

let basicInfo =basicInformationData?.basicInformationData?.latest_contact != null ? basicInformationData.basicInformationData.latest_contact : null;
const passwordvalidationSchema = yup.object().shape({
  oldPassword: yup
    .string("Enter your password")    
    .required("Your old password is required"),
  newPassword: yup
    .string("Enter your password")
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .matches(
      /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30})$/,
      "Your password doesn't meet the criteria."
    )
    .required("Your new password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Your confirmation password must match new password."
    )
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .matches(
      /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30})$/,
      "Your password doesn't meet the criteria."
    )
    .required("Your confirmation password is required"),
});

const onClickCancelChange = () => {
  formikPassword.resetForm();
  history.push({pathname:'/customers/myProfile'});
  setTabvalue(0)
 };


const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
  };
const formikPassword = useFormik({
  initialValues: initialValues,
  enableReinitialize: true,
  validationSchema: passwordvalidationSchema,
  onSubmit: async (values) => {
    setLoading(true);
    try {
      if (values.newPassword === values.oldPassword) {
        if (!toast.isActive("closeToast")) {
          toast.error("Old and new Password must be different. ", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "closeToast",
            onClose: () => {setLoading(false);}
          });
        }
      } else {
        let email = basicInfo?.email
        let response = await changePassword(
          values.oldPassword,
          values.newPassword,
          email

        );
        if (response?.data?.data?.change_password?.passwordReset === true) {
         
          if (!toast.isActive("closeToast")) {
            toast.success(response?.data?.data?.change_password?.message ? response?.data?.data?.change_password?.message :"Password Changed successfully", {
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
                onClickCancelChange()
              }
            });
          }
        } else if(response?.data?.data?.change_password?.passwordReset === false) {
          if (!toast.isActive("closeToast")) {
            toast.error(response?.data?.data?.change_password?.message ? response?.data?.data?.change_password?.message : "Please check your old password and try again", {
              position: "bottom-left",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: "closeToast",
              onClose: () => {setLoading(false);}
            });
          }
        }
      }
    } catch(err) {
      toast.error("Please try again.", {
        position: "bottom-left",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {setLoading(false);}
      });
      }
    },
  });

const handleCancelButton = () => {
  formikPassword.resetForm();
}
//Preventing space key
const preventSpace = (event) => {
  if (event.keyCode === 32) {
    event.preventDefault();
  }
};
  return (
    <div>
         <form onSubmit={formikPassword.handleSubmit} name="formPassword" id="formPassword">  
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                    >
                      <Grid
                        item
                        xs={12}
                        style={{ width: "100%", gap: 15, marginBottom: 18 }}
                        container
                        direction="row"
                      >
                        <PasswordField
                          name="oldPassword"
                          type="password"
                          label="Old Password"
                          onKeyDown={preventSpace}
                          autoComplete="off"
                          materialProps={{ maxLength: "30", autoComplete : "off" }}
                          value={formikPassword.values.oldPassword}
                          onChange={formikPassword.handleChange}
                          onBlur={formikPassword.handleBlur}
                          error={
                                  formikPassword.touched.oldPassword && Boolean(formikPassword.errors.oldPassword)
                                }
                          helperText={formikPassword.touched.oldPassword && formikPassword.errors.oldPassword}
                          variant="standard"
                          disabled={false}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ width: "100%", gap: 15, marginBottom: 18 }}
                        container
                        direction="row"
                      >
                        <PasswordField
                          name="newPassword"
                          type="password"
                          label="New Password"
                          autoComplete="new-password"
                          onKeyDown={preventSpace}
                          materialProps={{ maxLength: "30", autoComplete: "new-password" }}
                          variant="standard"
                           value={formikPassword.values.newPassword}
                          onChange={formikPassword.handleChange}
                          onBlur={formikPassword.handleBlur}
                          error={
                                  formikPassword.touched.newPassword && Boolean(formikPassword.errors.newPassword)
                                }
                          helperText={formikPassword.touched.newPassword && formikPassword.errors.newPassword}
                          floatingLabelText="Password"
                          disabled={false}
                        />
                        <p style={{ textAlign: "justify"}}>
                          Please ensure your password meets the following criteria: between 8 and 30 characters in length, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, at least 1 special character.
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{ width: "100%", gap: 15, marginBottom: 18 }}
                        container
                        direction="row"
                      >
                        <PasswordField
                          name="confirmPassword"
                          type="password"
                          label="Retype New Password"
                          onKeyDown={preventSpace}
                          autoComplete="new-password"
                          materialProps={{ maxLength: "30", autoComplete: "new-password" }}
                          value={formikPassword.values.confirmPassword}
                          onChange={formikPassword.handleChange}
                          onBlur={formikPassword.handleBlur}
                          error={
                                  formikPassword.touched.confirmPassword && Boolean(formikPassword.errors.confirmPassword)
                                }
                          helperText={formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword}
                          variant="standard"
                          disabled={false}
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                          onClick={handleCancelButton}                        
                  
                        >
                          Cancel
                        </ButtonSecondary>
                      </Grid>
                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <ButtonPrimary
                          stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-continue-button"
                         type = "submit"
                         disabled={loading}
                         >
                           Update
                           <i
                             className="fa fa-refresh fa-spin customSpinner"
                             style={{
                               marginRight: "10px",
                               display: loading ? "block" : "none",
                               color: 'blue'
                             }}
                           />
                        </ButtonPrimary>
                </Grid>
            </Grid>
        </form>
    </div>
  );
}
