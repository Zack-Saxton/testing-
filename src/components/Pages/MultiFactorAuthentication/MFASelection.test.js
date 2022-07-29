import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import MFASelection from './MFASelection';
import { mfaData, phoneListOne, phoneListTwo, phoneListThree } from '../../../__mock__/data/MultiFactorAuthentication'
import KbaQuestions from './KbaQuestions'
import MFASecurityQuestions from './MFA-SecurityQuestions';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: 500000,
      },
  },
});

const theme = createTheme();
window.scrollTo = jest.fn();
const MFASelectionComponent = (securityQuestionsSaved, uniqueNumber) => {
    return (
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <MFASelection  
                  securityQuestionsSaved={securityQuestionsSaved}
                  phoneNumberList={uniqueNumber}
                  mfaDetails={mfaData}
                />
                <KbaQuestions/>
                <MFASecurityQuestions/>
            </QueryClientProvider>
          </BrowserRouter>
        </ThemeProvider>
    );
}

it ("Check if the pop up is visible", async() => {
  const container = render(MFASelectionComponent(true, phoneListThree));
  const headingElement = container.getByTestId("phoneSelection");
  expect(headingElement).toBeTruthy();
	fireEvent.click(headingElement);
  const popUpElement = container.getByTestId("PhoneNumberPopUp_component")
  await waitFor(() => expect(popUpElement).toBeInTheDocument())  
})

it ("Check if the button is disabled on page load", () => {
  const container = render(MFASelectionComponent(true, phoneListThree));
  const buttonElement = container.getByTestId("next_Step");
  expect(buttonElement).toHaveClass("Mui-disabled");
})

it ("Check if the button is enabled after clicking security questions", () => {
  const container = render(MFASelectionComponent(true, phoneListThree));
  const radioElement = container.getByTestId("questionSelection");
  fireEvent.click(radioElement);
  const buttonElement = container.getByTestId("next_Step");
  expect(buttonElement).not.toHaveClass("Mui-disabled");
})

it ("Check if the button got enabled after selecting Phone number option (one phone number)", () => {
  const container = render(MFASelectionComponent(true, phoneListOne));
  const radioElement = container.getByTestId("phoneSelection");
  fireEvent.click(radioElement);
  const buttonElement = container.getByTestId("next_Step");
  expect(buttonElement).not.toHaveClass("Mui-disabled");
})

it ("Check if the button is disabled after selecting Phone number option (more than 1 phone number)", () => {
  const container = render(MFASelectionComponent(true, phoneListThree));
  const radioElement = container.getByTestId("phoneSelection");
  fireEvent.click(radioElement);
  const buttonElement = container.getByTestId("next_Step");
  expect(buttonElement).toHaveClass("Mui-disabled");
})

it ("Check if the button got enabled after selecting Phone number from pop up", async() => {
  const container = render(MFASelectionComponent(true, phoneListThree));
  const radioElement = container.getByTestId("phoneSelection");
  fireEvent.click(radioElement);
  const popUpElement = container.getByTestId("radio_primary_phone_2")
  await waitFor(() => expect(popUpElement).toBeInTheDocument())
  fireEvent.click(popUpElement);
  const closeElement = container.getByTestId("modalButton")
  expect(closeElement).toBeTruthy();
  fireEvent.click(closeElement);
  const button = container.getByTestId("next_Step");
  await waitFor(() => expect(button).not.toHaveClass("Mui-disabled"))
})

it("Check if clicking on Security Questions changes Button text", async() => {
  const container = render(MFASelectionComponent(true, phoneListTwo));
  const radioElement = container.getByTestId("questionSelection");
  fireEvent.click(radioElement);
  const buttonElement = screen.getByText("Proceed to Questions")
  expect(buttonElement).toBeTruthy();
})

it("Check if clicking on Phone Number changes Button text (More than 1 phone number)", async() => {
  const container = render(MFASelectionComponent(true, phoneListTwo));
  const radioElement = container.getByTestId("phoneSelection");
  fireEvent.click(radioElement);
  const popUpElement = container.getByTestId("radio_primary_phone_1")
  await waitFor(() => expect(popUpElement).toBeInTheDocument())
  fireEvent.click(popUpElement);
  const closeElement = container.getByTestId("modalButton")
  fireEvent.click(closeElement);
  const buttonElement = screen.getByText("To phone number : (***) *** 5555");
  await waitFor(() => expect(buttonElement).toBeInTheDocument())
})

it("Check if the number of radio buttons according to the Phone numbers in data", async() => {
  const container = render(MFASelectionComponent(true, phoneListTwo));
  const radioElement = container.getByTestId("phoneSelection");
  fireEvent.click(radioElement);
  const popUpElement = container.getAllByTestId('phone_List')
  await waitFor(() => expect(popUpElement).toHaveLength(2))
})

it("Check if the title varies when no phone number is present", async() => {
  render(MFASelectionComponent(true, []));
  const titleElement = screen.getByText("For your security, please select security question verification to complete your login.");
  expect(titleElement).toBeTruthy();
})

it("Check if the title varies according to Phone number availability", () => {
  render(MFASelectionComponent(true, phoneListOne));
  const titleElement = screen.getByText("Get a code on (***) *** 6789");
  expect(titleElement).toBeTruthy();
})
