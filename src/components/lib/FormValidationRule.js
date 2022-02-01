import * as yup from "yup";
import globalValidation from "../lib/Lang/globalValidation.json";
export class FormValidationRules {

    constructor() {
    }
    email() {
        return yup
            .string(globalValidation.EmailRequired)
            .email(globalValidation.EmailValid)
            .matches(
                /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
                globalValidation.EmailValid
            )
            .required(globalValidation.EmailRequired);
    }
    password() {
        return yup
            .string(globalValidation.PasswordEnter)
            .when('isRegisterForm', {
                is: (isRegisterForm) => isRegisterForm == 1,
                then: yup
                    .string()
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
                        globalValidation.PasswordCriteria
                    )
            })
            .max(30, globalValidation.PasswordMax)
            .min(8, globalValidation.PasswordMin)
            .required(globalValidation.PasswordRequired);
    }

    confirmPassword() {
        return yup
            .string()
            .max(30, globalValidation.PasswordMax)
            .min(8, globalValidation.PasswordMin)
            .required(globalValidation.PasswordRequired)
            .when("password", {
                is: (password) => password && password.length > 0,
                then: yup
                    .string()
                    .oneOf(
                        [ yup.ref("password") ],
                        globalValidation.PasswordConfirmationMatch
                    ),
            });
    }
    firstName() {
        return yup
            .string(globalValidation.FirstNameEnter)
            .max(30, globalValidation.FirstNameMax)
            .min(2, globalValidation.FirstNameMin)
            .required(globalValidation.FirstNameRequired);
    }
    lastName() {
        return yup
            .string(globalValidation.LastNameEnter)
            .max(30, globalValidation.LastNameMax)
            .min(2, globalValidation.LastNameMin)
            .required(globalValidation.LastNameRequired);
    }
    dobDate() {
        return yup
            .date(globalValidation.DateOfBirthValid)
            .nullable()
            .required(globalValidation.DateOfBirthRequired)
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
                globalValidation.DateOfBirthMinAge
            )
            .min(new Date(1919, 1, 1), globalValidation.DateOfBirthMaxAge)
            .typeError(globalValidation.DateOfBirthValid);
    }

    zipCode() {
        return yup
            .string(globalValidation.ZipCodeEnter)
            .max(5, globalValidation.ZipCodeMax)
            .required(globalValidation.ZipCodeRequired);
    }
    ssn() {
        return yup
            .string(globalValidation.SSNEnter)
            .required(globalValidation.SSNRequired)
            .transform((value) => value.replace(/[^\d]/g, ""))
            .matches(
                /^(?!000)[0-8]\d{2}(?!00)\d{2}(?!0000)\d{4}$/,
                globalValidation.SSNValid
            )
            .matches(/^(\d)(?!\1+$)\d{8}$/, globalValidation.SSNValid)
            .min(9, globalValidation.SSNMin);
    }
    getFormValidationRule(type = 'login') {
        if (type == 'login') {
            return yup.object({
                email: this.email(),
                password: this.password(),
            });
        } else {
            return yup.object({
                firstname: this.firstName(),
                lastname: this.lastName(),
                email: this.email(),
                date: this.dobDate(),
                password: this.password(),
                confirmPassword: this.confirmPassword(),
                zip: this.zipCode(),
                ssn: this.ssn(),
            });
        }

    }
}