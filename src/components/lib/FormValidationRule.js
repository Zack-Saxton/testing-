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
    stateValidation() {
        return yup
        .string(globalMessages.Address_State)
        .max(30, globalMessages.Address_State_Max)
        .required(globalMessages.Address_State_Required);
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

    spouseCityValidation() {
        return yup
        .string()
        .when("martialStatus", {
          is: "Married",
          then: yup
            .string()
            .required(globalMessages?.Address_Home_City),
        })
        .when("martialStatus", {
          is: globalMessages.MaritalStatusLegal,
          then: yup
            .string()
            .required(globalMessages?.Address_Home_City),
        });
    }
    spouseZipcode() {
        return yup
        .string()
        .when("martialStatus", {
          is: "Married",
          then: yup.string().required(globalMessages?.ZipCodeRequired),
        })
        .when("martialStatus", {
          is: globalMessages.MaritalStatusLegal,
          then: yup.string().required(globalMessages?.ZipCodeRequired),
        });
    }
    spouseSelectState() {
        return yup
        .string()
        .when("martialStatus", {
          is: "Married",
          then: yup.string().required(globalMessages?.Address_State_Required),
        })
        .when("martialStatus", {
          is: globalMessages.MaritalStatusLegal,
          then: yup.string().required(globalMessages?.Address_State_Required),
        });
    }

    spouseAddressValidation() {
        return yup
        .string()
        .when("martialStatus", {
          is: "Married",
          then: yup
            .string()
            .trim()
            .max(100, globalMessages?.Marital_Status_Max)
            .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only),
        })
        .when("martialStatus", {
          is: globalMessages.MaritalStatusLegal,
          then: yup
            .string()
            .trim()
            .max(100, globalMessages?.Marital_Status_Max)
            .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only),
        });
    }
    activeDutyValidation() {
        return yup.string().when("state", {
            is: "North Carolina",
            then: yup.string().required(globalMessages?.Active_DutyRequired),
          })
            .when("state", {
              is: "NC",
              then: yup.string().required(globalMessages?.Active_DutyRequired),
            }
            );
    }

    activeDutyRankValidation() {
        return yup.string().when("activeDuty", {
            is: "Yes",
            then: yup.string().required(globalMessages?.Active_Duty_Rank_Required),
          });
    }

    martialStatusValidation() {
        return yup.string().when("state", {
            is: "Wisconsin",
            then: yup.string().required(globalMessages?.Marital_Status_Required),
          }).when("state", {
            is: "WI",
            then: yup.string().required(globalMessages?.Marital_Status_Required),
          }
          );
    }

    phoneTypeValidation() {
        return yup
        .string(globalMessages.PhoneType)
        .max(30, globalMessages.PhoneTypeMax)
        .required(globalMessages.PhoneTypeRequired);
    }

    ssnLastFourDigitValidation() {
        return yup
        .string(globalMessages.SSNEnter)
        .required(globalMessages.SSNRequired)
        .transform((value) => value.replace(/[^\d]/g, ""))
        .matches(/^(?!0000)\d{4}$/, globalMessages.SSNValid)
        .min(4, globalMessages.SSNMin_four);
    }

    cityValidation() {
        return yup
        .string(globalMessages?.Address_City)
        .max(30, globalMessages?.Address_City_Max)
        .required(globalMessages?.Address_Home_City);
    }
    
    citizenshipValidation() {
        return yup
        .string(globalMessages?.CitizenshipEnter)
        .max(30, globalMessages?.CitizenshipMax)
        .required(globalMessages?.CitizenshipRequired);
    }

    employementStatusValidation() {
        return yup
        .string(globalMessages?.EmploymentEnter)
        .max(30, globalMessages?.EmploymentMax)
        .required(globalMessages?.EmploymentRequired);
    }

    streetAddressValidation() {
        return yup
        .string(globalMessages?.Address_Street)
        .trim()
        .max(100, globalMessages?.Address_Street_Max)
        .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only)
        .required(globalMessages?.Address_Street_Required);
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