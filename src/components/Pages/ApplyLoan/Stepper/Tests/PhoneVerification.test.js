import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import '@testing-library/jest-dom';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import PhoneVerification from "../PhoneVerification";

const handleClickMock = jest.fn();

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});


const component = () => {
  window.scrollTo = jest.fn()
  let stepsMock = [
    "Email Verification",
    "Phone Verification",
    "Financial Information",
    "ID Document & Photo",
    "ID Verification Questions",
    "Bank Account Verification",
    "Income Verification"
  ]

  const classes = {
    "root": "makeStyles-root-76",
    "button_div": "makeStyles-button_div-77",
    "steplabel": "makeStyles-steplabel-78",
    "actionsContainer": "makeStyles-actionsContainer-79",
    "loadingOn": "makeStyles-loadingOn-80",
    "loadingOff": "makeStyles-loadingOff-81",
    "linkStyle": "makeStyles-linkStyle-82",
    "resetContainer": "makeStyles-resetContainer-83",
    "padTop": "makeStyles-padTop-84",
    "textDecoreNone": "makeStyles-textDecoreNone-85"
  };

  const getApplicationStatus = () => {
    nextOnSkip:  {
      length:0
      name:"getApplicationStatus"}}
 
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <PhoneVerification
              nextOnSkip={getApplicationStatus}
              next={handleClickMock}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={1}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

const mockSubmitData = {
  passcode: 1234,
  res:{
    data: {     
      phone_verification: ""
  }
}}

test("Enter correct passcode", async () => {
  const { container } = render(component())
  const input = container.querySelector(`input[name="enterPasscode"]`);
  
  fireEvent.change(input, { target: { value: "1234" } });
  const sendPasscode = screen.getByTestId("nextClickButton");
  expect(sendPasscode).toBeTruthy();
  await act(() => {
    fireEvent.click(sendPasscode)
  });
    const asyncMockCA = jest.fn().mockResolvedValue(mockSubmitData);
    await asyncMockCA();
});

test("Enter invalid passcode ", async () => {
  const { container } = render(component())
const inputWrong = container.querySelector(`input[name="enterPasscode"]`);
  fireEvent.change(inputWrong, { target: { value: "12" } });
  const sendPasscode = screen.getByTestId("nextClickButton");
  expect(sendPasscode).toBeTruthy();  
  await act(() => {
    fireEvent.click(sendPasscode)
  });
});

test("Enter Empty passcode ", async () => {
  const { container } = render(component())
const inputEmpty = container.querySelector(`input[name="enterPasscode"]`);
  fireEvent.change(inputEmpty, { target: { value: "" } });
  const sendPasscode = screen.getByTestId("nextClickButton");
  expect(sendPasscode).toBeTruthy();  
  await act(() => {
    fireEvent.click(sendPasscode)
  });
});

test("Availability test: Phone number Field", () => {
  render(component());
  const phoneNumber = screen.getByText("Phone number *");
  expect(phoneNumber).toBeTruthy();
});

test("Availability test: Delivery Method Field", () => {
  render(component());
  const deliveryMethod = screen.getByText("Delivery Method");
  expect(deliveryMethod).toBeTruthy();
});

test("Availability test: Text and call options", () => {
  render(component());
  const textOption = screen.getByText("Text");
  expect(textOption).toBeTruthy();
  const callOption = screen.getByText("Call");
  expect(callOption).toBeTruthy();
});

test("Availability test: Text content", () => {
  render(component());
  const phoneNumberFrom = screen.getByText("This is the Phone number you provided in your application");
  expect(phoneNumberFrom).toBeTruthy();
  const ratesApplyText = screen.getByText("Standard text message and voice rates apply.");
  expect(ratesApplyText).toBeTruthy();
});

test("Availability test: Send passcode", () => {
  render(component());
  const textOption = screen.getByText("Send Passcode");
  expect(textOption).toBeTruthy();
});

test("Availability test: Send passcode", () => {
  render(component());
  const sendPasscode = screen.getByTestId("enterPasscode");
  expect(sendPasscode).toHaveClass("close");
});

test("Enter passcode field appear on click", async () => {
  render(component());
  const sendPasscode = screen.getByTestId("enterPasscode");
  expect(sendPasscode).toBeTruthy();
  const sendPasscodeButton = screen.getByText("Send Passcode");
  await act(() => {
    fireEvent.click(sendPasscodeButton)
  });
  await waitFor(() => expect(screen.getByTestId("enterPasscode")).toHaveClass("open"))
});

test("Availability test: I do not have access to this phone", () => {
  render(component());
  const textOption = screen.getByText("I do not have access to this phone");
  expect(textOption).toBeTruthy();
});

test("I do not have access to this phone : On click", async () => {
  render(component());
  const textOption = screen.getByText("I do not have access to this phone");
  await act(() => {
    fireEvent.click(textOption)
  });
  await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy())
});

test("Confirmation pop up - availability", async () => {
  render(component());
  const textOption = screen.getByText("I do not have access to this phone");
  await act(() => {
    fireEvent.click(textOption)
  });
  await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy())

  const confirmText = screen.getByTestId("confirmationText");
  expect(confirmText).toBeTruthy();
  const returnToSelection = screen.getByText("Return To Selection");
  expect(returnToSelection).toBeTruthy();
  const verifyPhoneLater = screen.getByText("Verify Phone Later");
  expect(verifyPhoneLater).toBeTruthy();
  await act(() => {
        fireEvent.click(verifyPhoneLater)
      });
});

test("Confirmation pop up - close", async () => {
  render(component());
  const textOption = screen.getByText("I do not have access to this phone");
  await act(() => {
    fireEvent.click(textOption)
  });
  await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy())

  const confirmText = screen.getByTestId("confirmationText");
  expect(confirmText).toBeTruthy();
  const returnToSelection = screen.getByText("Return To Selection");
  expect(returnToSelection).toBeTruthy();
  await act(() => {
    fireEvent.click(returnToSelection)
  });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
});