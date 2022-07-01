import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import MultiFactorAuthentication from './MultiFactorAuthentication';
import {  MemoryRouter } from "react-router-dom";
import Cookies from 'js-cookie'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 500000,
        },
    },
});

let now = new Date().getTime();
Cookies.set(
	"token",
	JSON.stringify({
		isLoggedIn: true,
		setupTime: now,
		applicantGuid: "AT-LA1656515305385",
		isMFA: true,
		isMFACompleted: true
	})
);

const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <MultiFactorAuthentication />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

test("Checks the Two Phonenumber component is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": "9297320400",
        "phone_type": "Cell",
        "opted_phone_texting": null,
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": "5713438877",
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2,
        "securityQuestions": [
            {
                "question_id": "8",
                "question": "What is your favorite car brand?"
            }
        ]

    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});
test("Checks the One Phonenumber component is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": "9297320400",
        "phone_type": "Cell",
        "opted_phone_texting": null,
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": null,
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2,
        "securityQuestions": [
            {
                "question_id": "8",
                "question": "What is your favorite car brand?"
            }
        ]

    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});
test("Checks the Two Phonenumber component with phone number and option phonenumber is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": "9297320400",
        "phone_type": "Cell",
        "opted_phone_texting": "9297320400",
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": null,
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2,
        "securityQuestions": [
            {
                "question_id": "8",
                "question": "What is your favorite car brand?"
            }
        ]

    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});

test("Checks the One Phonenumber component without phone number and option phonenumber is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": null,
        "phone_type": "Cell",
        "opted_phone_texting": null,
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": null,
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2

    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});

test("Checks the One Phonenumber component without cell number and security questions is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": null,
        "phone_type": "",
        "opted_phone_texting": null,
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": null,
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2

    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});
test("Checks the Two Phonenumber component without security questions is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": "234567890f2",
        "phone_type": "Cell",
        "opted_phone_texting": "234567890f2",
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": null,
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2

    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});
test("Checks the Two Phonenumber component without security questions is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": "234567890f2",
        "phone_type": "Cell",
        "opted_phone_texting": "234567890f2",
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": null,
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2,
        "securityQuestions": [
            {
                "question_id": "8",
                "question": "What is your favorite car brand?"
            }
        ]
    }
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});

test("Checks the Two Phonenumber component without optional phone number is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": "234567890f2",
        "phone_type": "Cell",
        "opted_phone_texting": null,
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": "5235325326",
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2,
        "securityQuestions": [
            {
                "question_id": "8",
                "question": "What is your favorite car brand?"
            }
        ]
    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});
test("Checks the One Phonenumber component without optional phone number and phone number is rendered", () => {
    const mfaDetails = {
        "MFA": true,
        "phone_number_primary": null,
        "phone_type": "Cell",
        "opted_phone_texting": null,
        "attempts": 0,
        "LockUserByMFA": false,
        "mfa_phone_texting": "5235325326",
        "securityQuestionsSaved": false,
        "LockUserByMFACounter": 2,
        "securityQuestions": [
            {
                "question_id": "8",
                "question": "What is your favorite car brand?"
            }
        ]
    }

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => { return mfaDetails }
    }));
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { mfaDetails, mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
});