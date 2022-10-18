import * as yup from "yup";
import moment from "moment";
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
            .min(new Date(moment().subtract(102, 'years')), globalMessages.DateOfBirthMaxAge)
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
    phoneNumber() {
        return yup
		.string(globalMessages.PhoneEnter)
		.required(globalMessages.PhoneRequired)
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(
			/^[1-9]{1}\d{2}\d{3}\d{4}$/,
			globalMessages.PhoneValid
		)
		.matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
		.min(10, globalMessages.PhoneMin)
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