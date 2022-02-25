import Grid from "@material-ui/core/Grid";
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
import "./Style.css";

export default function ChangePassword(basicInformationData) {

  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);
  const [ , setprofileTabNumber ] = useGlobalState();

  let basicInfo = basicInformationData?.basicInformationData?.latest_contact != null ? basicInformationData.basicInformationData.latest_contact : null;
  const passwordvalidationSchema = yup.object().shape({
    oldPassword: yup
      .string(globalMessages.PasswordEnter)
      .required(globalMessages.PasswordOld),
    newPassword: yup
      .string(globalMessages.PasswordEnter)
      .max(30, globalMessages.PasswordMax)
      .min(8, globalMessages.PasswordMin)
      .matches(
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30})$/,
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
      .min(8, globalMessages.PasswordMin)
      .matches(
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30})$/,
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
    setprofileTabNumber({ profileTabNumber: 0 });
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
          if (response?.data?.change_password?.passwordReset === true) {
            if (!toast.isActive("closeToast")) {
              toast.success(response?.data?.change_password?.message ?? globalMessages.PasswordChangedSuccessfully, {
                toastId: "closeToast",
                onClose: () => {
                  setLoading(false);
                  onClickCancelChange();
                  logoutUser();
                }
              });
            }
          } else if (response?.data?.change_password?.passwordReset === false) {
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
    setprofileTabNumber({ profileTabNumber: 0 });
  };
  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  return (
    <div>
      <form onSubmit={ formikPassword.handleSubmit } name="formPassword" id="formPassword">
        <Grid container
          item
          xs={ 12 }
          direction="row"
        >
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <PasswordField
              id="oldPasswordWrap"
              name="oldPassword"
              type="password"
              label="Old Password"
              onKeyDown={ preventSpace }
              autoComplete="off"
              materialProps={ { maxLength: "30", autoComplete: "off" } }
              value={ formikPassword.values.oldPassword }
              onChange={ formikPassword.handleChange }
              onBlur={ formikPassword.handleBlur }
              error={
                formikPassword.touched.oldPassword && Boolean(formikPassword.errors.oldPassword)
              }
              helperText={ formikPassword.touched.oldPassword && formikPassword.errors.oldPassword }
              variant="standard"
              disabled={ false }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <PasswordField
              id="newPasswordWrap"
              name="newPassword"
              type="password"
              label="New Password"
              autoComplete="new-password"
              onKeyDown={ preventSpace }
              materialProps={ { maxLength: "30", autoComplete: "new-password" } }
              variant="standard"
              value={ formikPassword.values.newPassword }
              onChange={ formikPassword.handleChange }
              onBlur={ formikPassword.handleBlur }
              error={
                formikPassword.touched.newPassword && Boolean(formikPassword.errors.newPassword)
              }
              helperText={ formikPassword.touched.newPassword && formikPassword.errors.newPassword }
              disabled={ false }
            />
            <p style={ { textAlign: "justify", fontSize: "0.938rem" } }>
              Please ensure your password meets the following criteria: between 8 and 30 characters in length, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, at least 1 special character.
            </p>
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 18 } }
            container
            direction="row"
          >
            <PasswordField
              id="retypeNewPasswordWrap"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              onKeyDown={ preventSpace }
              autoComplete="new-password"
              materialProps={ { maxLength: "30", autoComplete: "new-password" } }
              value={ formikPassword.values.confirmPassword }
              onChange={ formikPassword.handleChange }
              onBlur={ formikPassword.handleBlur }
              error={
                formikPassword.touched.confirmPassword && Boolean(formikPassword.errors.confirmPassword)
              }
              helperText={ formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword }
              variant="standard"
              disabled={ false }
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid container
            item
            xs={ 12 }
            sm={ 4 }
            md={ 3 }
            lg={ 2 }
            xl={ 1 }
            direction="row"
            style={ { padding: "10px 0px" } }
            id="reEnterUpdate"
          >
            <ButtonSecondary
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              styleicon='{ "color":"" }'

              onClick={ handleCancelButton }

            >
              Cancel
            </ButtonSecondary>
          </Grid>
          <Grid container
            item
            xs={ 12 }
            sm={ 4 }
            md={ 3 }
            lg={ 2 }
            xl={ 1 }
            direction="row"
            style={ { padding: "10px 0px " } }
            id="reEnterCancel"
          >
            <ButtonPrimary
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
              styleicon='{ "color":"" }'

              type="submit"
              disabled={ loading }
            >
              Update
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={ {
                  marginRight: "10px",
                  display: loading ? "block" : "none",
                  color: 'blue'
                } }
              />
            </ButtonPrimary>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
