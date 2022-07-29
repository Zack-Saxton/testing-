import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import MultiFactorAuthentication from './MultiFactorAuthentication';
import { MfaDataMockLoading, MfaDataMock } from '../../../__mock__/MultiFactorAuthentication.mock';
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

jest.mock("./useMultiFactorAuthentication", ()=>({
  useMultiFactorAuthentication: jest.fn(),
}))

const theme = createTheme();
window.scrollTo = jest.fn();
const MFAComponent = () => {
    return (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <MultiFactorAuthentication />
            </QueryClientProvider>
          </BrowserRouter>
        </ThemeProvider>
    );
}

it("Loading Spinner MFA content Test", () => {
    MfaDataMockLoading();
    const container = render(MFAComponent());
    const headingElement = container.getByTestId("mfa_loadingSpinnerDiv");
    expect(headingElement).toBeTruthy();
  });

it ("Fetch MFA_user API and renders content test", () => {
    MfaDataMock();
    const container = render(MFAComponent());
    const headingElement = container.getByTestId("mfa_Selection");
    expect(headingElement).toBeTruthy();
})