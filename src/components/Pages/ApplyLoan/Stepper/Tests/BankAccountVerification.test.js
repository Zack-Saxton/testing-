import { Container } from "@mui/material";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import BankAccountVerification from "../BankAccountVerification";
import Cookies from "js-cookie";
import APICall from "../../../../lib/AxiosLib";
import {apiMock} from "../../../../../__mock__/data/BankVerificationMock.data"
jest.mock("../../../../lib/AxiosLib");

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
Cookies.set("firstName", "Kelsey ");
Cookies.set("lastName", "YNKPLKSLM");


const component = () => {
  window.scrollTo = jest.fn();
  let stepsMock = [
    "Email Verification",
    "Phone Verification",
    "Financial Information",
    "ID Document & Photo",
    "ID Verification Questions",
    "Bank Account Verification",
    "Income Verification",
  ];

  const classes = {
    root: "makeStyles-root-76",
    button_div: "makeStyles-button_div-77",
    steplabel: "makeStyles-steplabel-78",
    actionsContainer: "makeStyles-actionsContainer-79",
    loadingOn: "makeStyles-loadingOn-80",
    loadingOff: "makeStyles-loadingOff-81",
    linkStyle: "makeStyles-linkStyle-82",
    resetContainer: "makeStyles-resetContainer-83",
    padTop: "makeStyles-padTop-84",
    textDecoreNone: "makeStyles-textDecoreNone-85",
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <BankAccountVerification
              next={handleClickMock}
              prev={handleClickMock}
              reset={handleClickMock}
              steps={stepsMock}
              activeStep={5}
              classes={classes}
              setLoadingFlag={handleClickMock}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

test("Availability test: Account Holder ", () => {
  render(component());
  const accountHolder = screen.getByText("Account Holder *");
  expect(accountHolder).toBeTruthy();
});

test("Availability test: Account Type ", () => {
  render(component());
  const accountType = screen.getByText("Account Type");
  expect(accountType).toBeTruthy();
  expect(screen.getByText("Savings")).toBeTruthy();
  expect(screen.getByText("Checking")).toBeTruthy();
});

test("Availability test: Bank Routing number", () => {
  render(component());
  const bankRouting = screen.getByText("Bank Routing number *");
  expect(bankRouting).toBeTruthy();
});

test("Availability test: Bank Routing number test on change", async () => {
  render(component());
  const bankRouting = screen.getByTestId("bankRoutingNumber");
  const bankInfo = screen.getByTestId("bankInformation");
  await act(() => {
    fireEvent.change(bankRouting, { target: { value: "052001633" } });
  });
  fireEvent.blur(bankRouting);
  expect(bankRouting).toBeTruthy();
  jest.useFakeTimers();
  setTimeout(() => {
    expect(bankInfo.value).toBe("BANK OF AMERICA, N.A.");
  }, 10000);
});

test("check Account Holder input field", () => {
  const { container } = render(component());
  const accountHolderInput = container.querySelector(
    `input[name="accountHolder"]`
  );
  expect(accountHolderInput).toBeTruthy();
  fireEvent.blur(accountHolderInput);
});

test("Availability test", async () => {
  APICall.mockResolvedValue(apiMock);
  const { container } = render(component());

  const accountHolder = container.querySelector(`input[name="accountHolder"]`);
  expect(accountHolder).toBeTruthy();
  fireEvent.change(accountHolder, { target: { value: "Kelsey YNKPLKSLM" } });

  const accountType = container.querySelector(`input[name="accountType"]`);
  expect(accountType).toBeTruthy();
  await act(() => {
    fireEvent.click(accountType, { target: { value: "Savings Account" } });
  });
  expect(accountType).toBeTruthy();
  expect(accountType.value).toBe("Savings Account");

  const bankRouting = screen.getByTestId("bankRoutingNumber");
  const bankInfo = screen.getByTestId("bankInformation");
  await act(() => {
    fireEvent.change(bankRouting, { target: { value: "052001633" } });
    fireEvent.change(bankInfo, { target: { value: "BANK OF AMERICA, N.A." } });
  });
  fireEvent.blur(bankRouting);
  expect(bankRouting).toBeTruthy();
  await waitFor(() => {
    expect(bankInfo.value).toBe("BANK OF AMERICA, N.A.");
  });

  const bankAccountNumber = container.querySelector(
    `input[name="bankAccountNumber"]`
  );
  expect(bankAccountNumber).toBeTruthy();
  await act(() => {
    fireEvent.change(bankAccountNumber, {
      target: { value: "3264327647268435" },
    });
  });

  const confirmBankAccountNumber = container.querySelector(
    `input[name="confirmBankAccountNumber"]`
  );
  expect(confirmBankAccountNumber).toBeTruthy();

  await act(() => {
    fireEvent.change(confirmBankAccountNumber, {
      target: { value: "3264327647268435" },
    });
  });

  const paymentMode = container.querySelector(`input[name="paymentMode"]`);
  expect(paymentMode).toBeTruthy();
  await act(() => {
    fireEvent.click(paymentMode);
  });
  expect(paymentMode).toBeChecked();

  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeTruthy();
  await act(() => {
    fireEvent.click(nextButton);
  });

    const uploadButton = screen.getByText("Upload");
  expect(uploadButton).toBeTruthy();
  await act(() => {
    fireEvent.click(uploadButton);
  });
  
  const resetButton = screen.getByText("Reset");
  expect(resetButton).toBeTruthy();
  fireEvent.click(resetButton);
});

test("Test Auto Pay Authorization", () => {
  const { getAllByText, getByTestId, getByText } = render(component());
  expect(getAllByText("Auto Pay Authorization")).toHaveLength(1);
  fireEvent.click(getByText("Auto Pay Authorization"));
  expect(getByTestId("dialogContent")).toBeInTheDocument();
  fireEvent.click(getByText("Close"));
});

test("Preventing space in the password field", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="bankRoutingNumber"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.keyDown(input, 32);
  });
  expect(input.value).toBe("");
});

test("confirmBankAccountNumber Prevent Copy Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(
    `input[name="confirmBankAccountNumber"]`
  );
  await act(() => {
    fireEvent.copy(input);
  });
  expect(input.value).toBe("");
});

test("check next button", async() => {
 render(component());
  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeTruthy();
  await act(() => {
    fireEvent.click(nextButton);
  });
});