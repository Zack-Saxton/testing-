import * as yup from "yup";
import propertyMessages from "../lib/Lang/Login.json";

export class FormValidationRules {

    constructor() {
    }
    email() {
        return yup
            .string("Your email is required")
            .email("A valid email address is required")
            .matches(
                /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
                "A valid email address is required"
            )
            .required(propertyMessages.Email_required);
    }
    password() {
        return yup
            .string("Enter your password")
            .when('isRegisterForm', {
                is: (isRegisterForm) => isRegisterForm == 1,
                then: yup
                    .string()
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
                        "Your password doesn't meet the criteria"
                    )
            })
            .max(30, "Password can be upto 30 characters length")
            .min(8, "Password should be minimum of 8 characters length")
            .required("Your password is required");
    }

    confirmPassword() {
        return yup
            .string()
            .max(30, "Password can be upto 30 characters length")
            .min(8, "Password should be minimum of 8 characters length")
            .required("Your password confirmation is required")
            .when("password", {
                is: (password) => password && password.length > 0,
                then: yup
                    .string()
                    .oneOf(
                        [ yup.ref("password") ],
                        "Your confirmation password must match your password"
                    ),
            });
    }
    firstName() {
        return yup
            .string("Enter your firstname")
            .max(30, "Firstname can be upto 30 characters length")
            .min(2, "Firstname should be minimum of 2 letters")
            .required("Your first name is required");
    }
    lastName() {
        return yup
            .string("Enter your Lastname")
            .max(30, "Lastname can be upto 30 characters length")
            .min(2, "Lastname should be minimum of 2 letters")
            .required("Your last name is required");
    }
    dobDate() {
        return yup
            .date("Please enter a valid date")
            .nullable()
            .required("Your date of birth is required")
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
                "You must be at least 18 years old"
            )
            .min(new Date(1919, 1, 1), "You are too old")
            .typeError("Please enter a valid date");
    }

    zipCode() {
        return yup
            .string("Enter your Zip")
            .max(5, "Zipcode should be of maximum 5 characters length")
            .required("Your home ZIP code is required");
    }
    ssn() {
        return yup
            .string("Enter a SSN")
            .required("Your SSN is required")
            .transform((value) => value.replace(/[^\d]/g, ""))
            .matches(
                /^(?!000)[0-8]\d{2}(?!00)\d{2}(?!0000)\d{4}$/,
                "Please enter a valid SSN"
            )
            .matches(/^(\d)(?!\1+$)\d{8}$/, "Please enter a valid SSN")
            .min(9, "Name must contain at least 9 digits");
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