import * as yup from "yup";
import globalMessages from "../../assets/data/globalMessages.json";
export class FormValidationRules {

    email() {
        return yup
            .string(globalMessages.EmailRequired)
            .email(globalMessages.EmailValid)
            .matches(
                /^[a-zA-Z0-9][a-zA-Z0-9._-]+@[a-zA-Z0-9+/._-]+\.[a-zA-Z]{2,6}$/, //eslint-disable-line
                globalMessages.EmailValid
            )
            .required(globalMessages.EmailRequired);
    }
    password() {
        return yup
            .string(globalMessages.PasswordEnter)
            .when('isRegisterForm', {
                is: (isRegisterForm) => isRegisterForm === 1,
                then: yup
                    .string()
                    .min(10, globalMessages.PasswordMin)
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,30}$/,
                        globalMessages.PasswordCriteria
                    )
            })
            .max(30, globalMessages.PasswordMax)
            .required(globalMessages.PasswordRequired);
    }

    confirmPassword() {
        return yup
            .string()
            .max(30, globalMessages.PasswordMax)
            .min(10, globalMessages.PasswordMin)
            .required(globalMessages.PasswordRequired)
            .when("password", {
                is: (password) => password?.length > 0,
                then: yup
                    .string()
                    .oneOf(
                        [ yup.ref("password") ],
                        globalMessages.PasswordConfirmationMatch
                    ),
            });
    }
    firstName() {
        return yup
            .string(globalMessages.FirstNameEnter)
            .max(30, globalMessages.FirstNameMax)
            .min(2, globalMessages.FirstNameMin)
            .required(globalMessages.FirstNameRequired);
    }
    lastName() {
        return yup
            .string(globalMessages.LastNameEnter)
            .max(30, globalMessages.LastNameMax)
            .min(2, globalMessages.LastNameMin)
            .required(globalMessages.LastNameRequired);
    }
    dobDate() {
        return yup
            .date(globalMessages.DateOfBirthValid)
            .nullable()
            .required(globalMessages.DateOfBirthRequired)
            .max(
                new Date(
                    new Date(
                        new Date().getFullYear() +
                        "/" +
                        (new Date().getMonth() + 1) +
                        "/" +
                        new Date().getDate()
                    ).getTime() - 567650000000
                ),
                globalMessages.DateOfBirthMinAge
            )
            .min(new Date(1920, 1, 1), globalMessages.DateOfBirthMaxAge)
            .typeError(globalMessages.DateOfBirthValid);
    }

    zipCode() {
        return yup
            .string(globalMessages.ZipCodeEnter)
            .max(5, globalMessages.ZipCodeMax)
            .required(globalMessages.ZipCodeRequired);
    }
    ssn() {
        return yup
            .string(globalMessages.SSNEnter)
            .required(globalMessages.SSNRequired)
            .transform((value) => value.replace(/[^\d]/g, ""))
            .matches(
                /^(?!000)[0-8]\d{2}(?!00)\d{2}(?!0000)\d{4}$/,
                globalMessages.SSNValid
            )
            .matches(/^(\d)(?!\1+$)\d{8}$/, globalMessages.SSNValid)
            .min(9, globalMessages.SSNMin);
    }
    getFormValidationRule(type = "login") {
        if (type === 'login') {
            return yup.object({
                email: this.email(),
                password: this.password(),
            });
        } else {
            return yup.object({
                firstName: this.firstName(),
                lastName: this.lastName(),
                email: this.email(),
                dob: this.dobDate(),
                password: this.password(),
                confirmPassword: this.confirmPassword(),
                zip: this.zipCode(),
                ssn: this.ssn(),
            });
        }

    }
}