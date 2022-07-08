import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import LogoutController from "../../Controllers/LogoutController";
import { changePassword } from "../../Controllers/MyProfileController";
import {
  ButtonPrimary,
  ButtonSecondary,
  PasswordField
} from "../../FormsUI";
import { useStylesMyProfile } from "./Style";
import "./Style.css";

export default function ChangePassword(basicInformationData) {
  const classes = useStylesMyProfile();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);
  const [ , setProfileTabNumber ] = useGlobalState();

  let basicInfo = basicInformationData?.basicInformationData?.latest_contact;
  const passwordValidationSchema = yup.object().shape({
    oldPassword: yup
      .string(globalMessages.PasswordEnter)
      .required(globalMessages.PasswordOld),
    newPassword: yup
      .string(globalMessages.PasswordEnter)
      .max(30, globalMessages.PasswordMax)
      .min(10, globalMessages.PasswordMin)
      .matches(
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,30})$/,
        globalMessages.PasswordCriteria
      )
      .required(globalMessages.PasswordNewRequired),
    confirmPassword: yup
      .string(globalMessages.PasswordEnter)
      .oneOf(
        [ yup.ref("newPassword"), null ],
        globalMessages.PasswordConfirmationMatch
      )
      .max(30, globalMessages.PasswordMax)
      .min(10, globalMessages.PasswordMin)
      .matches(
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,30})$/,
        globalMessages.PasswordCriteria
      )
      .required(globalMessages.PasswordConfirmationRequired),
  });
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
  const onClickCancelChange = () => {
    formikPassword.resetForm();
    navigate('/customers/myProfile');
    setProfileTabNumber({ profileTabNumber: 0 });
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  const helperIf = (response) => {
    toast.success(response?.data?.change_password?.message ?? globalMessages.PasswordChangedSuccessfully, {
      toastId: "closeToast",
      onClose: () => {
        setLoading(false);
        onClickCancelChange();
        logoutUser();
      }
    });
  }
  const formikPassword = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (values.newPassword === values.oldPassword) {
          if (!toast.isActive("closeToast")) {
            toast.error(globalMessages.PasswordOldNewMatch, {
              toastId: "closeToast",
              onClose: () => { setLoading(false); }
            });
          }
        } else {
          let email = basicInfo?.email;
          let response = await changePassword(
            values.oldPassword,
            values.newPassword,
            email
          );
          if (response?.data?.change_password?.passwordReset) {
            if (!toast.isActive("closeToast")) {
              helperIf(response)
            }
          } else if (!response?.data?.change_password?.passwordReset) {
            if (!toast.isActive("closeToast")) {
              toast.error(response?.data?.change_password?.message ?? globalMessages.PasswordCheckOld, {
                toastId: "closeToast",
                onClose: () => { setLoading(false); }
              });
            }
          }
        }
      } catch (error) {
        toast.error(globalMessages.TryAgain, {
          onClose: () => { setLoading(false); }
        });
      }
    },
  });

  const handleCancelButton = () => {
    formikPassword.resetForm();
    navigate("/customers/myProfile");
    setProfileTabNumber({ profileTabNumber: 0 });
  };
  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  return (
    <div data-testid="profile-change-password">
      <form onSubmit={formikPassword.handleSubmit} name="formPassword" id="formPassword">
        <Grid container
          item
          xs={12}
          direction="row"
        >
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <PasswordField
              id="oldPasswordWrap"
              name="oldPassword"
              type="password"
              label="Old Password"
              onKeyDown={preventSpace}
              autoComplete="off"
              materialProps={{ maxLength: "30", autoComplete: "off" }}
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
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <PasswordField
              id="newPasswordWrap"
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
              disabled={false}
            />
              <ul className="error-validation">
                <span>
              <li className={((formikPassword?.values?.newPassword).length >= 10 && (formikPassword?.values?.newPassword).length < 30) ? "validation-success" : "validation-failed"}>
                Between 10 and 30 characters in length
                </li>
              <li className={/[A-Z]/.test(formikPassword?.values?.newPassword) ? "validation-success" : "validation-failed"}>
                At least 1 uppercase letter
              </li>
              <li className={/[a-z]/.test(formikPassword?.values?.newPassword) ? "validation-success" : "validation-failed"}>
                At least 1 lowercase letter
                </li>
                </span>
                <span>
              <li className={/\d/.test(formikPassword?.values?.newPassword) ? "validation-success" : "validation-failed" }>
                At least 1 number
              </li>
              <li className={/[*@!#$%()^~{}]+/.test(formikPassword?.values?.newPassword) ? "validation-success" : "validation-failed"}>
                At least 1 special character.
              </li>
              </span>
              </ul>
           </Grid>
          <Grid
            item
            xs={12}
            className={classes.basicInfoGrid}
            container
            direction="row"
          >
            <PasswordField
              id="retypeNewPasswordWrap"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
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
            xs={12}
            sm={4}
            md={3}
            lg={2}
            xl={1}
            direction="row"
            className={classes.passwordButtonGrid}
            id="reEnterUpdate"
          >
            <ButtonSecondary
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              styleicon='{ "color":"" }'

              onClick={handleCancelButton}

            >
              Cancel
            </ButtonSecondary>
          </Grid>
          <Grid container
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            xl={1}
            direction="row"
            className={classes.passwordButtonGrid}
            id="reEnterCancel"
          >
            <ButtonPrimary
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
              styleicon='{ "color":"" }'

              type="submit"
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
