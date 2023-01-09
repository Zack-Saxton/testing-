import "@testing-library/jest-dom";
import {
  cleanup,
  render,
  act,
  screen,
  fireEvent,
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from "@mui/material/styles";
import ExistingUser from "./index.js";
import LoginController from "../../../Controllers/LoginController";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import { QueryClient, QueryClientProvider } from "react-query";

afterEach(cleanup);

jest.mock("../../../Controllers/LoginController");
jest.mock("../../../Controllers/AccountOverviewController");

window.scrollTo = jest.fn();
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
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CheckMyOffers>
          <ExistingUser />
        </CheckMyOffers>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

// Testing to Making sure all fields exist for user

test("Field Availability test", () => {
  render(component(), { wrapper: MemoryRouter });

  //Check if Sign In button renders
  const button = screen.getByTestId("SignInButton");
  expect(button).toBeTruthy();

  //Check if password input field renders
  const password = screen.getByTestId("password");
  expect(password).toBeTruthy();

  // Check if subtitle renders
  const subtitle = screen.getByTestId("subtitle");
  expect(subtitle).toBeTruthy();
});

// Check if Show and Hide button renders
test("Show and Hide button renders", () => {
  const { container } = render(component(), { wrapper: MemoryRouter });

  const button = container.querySelector(".MuiButtonBase-root");
  expect(button).toBeTruthy();
});

// Check if sign in button functions correctly
test("Checks that Sign In button functions correctly", async () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("SignInButton");
  await act(() => {
    fireEvent.click(button);
  });
});

// Show and hide button functionality works
test("Show and hide button functionality works", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const showButton = container.querySelector(`input[name="password"]`);
  expect(showButton).toHaveAttribute("type", "password");
  const button = container.querySelector(".MuiButtonBase-root");
  act(() => {
    fireEvent.click(button);
  });
  const hideButton = container.querySelector(`input[name="password"]`);
  expect(hideButton).toHaveAttribute("type", "text");
});

// -------------------------------------------------

test("test password field ", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const showButton = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(showButton, { target: { value: "" } });
  });
  expect(showButton.value).toBe("");
});

test("test sign in button onclick", async () => {
  LoginController.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      userFound: true,
      loginUserSuccess: true,
      user: {
        extensionattributes: {
          login: {
            jwt_token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ZDcwMWZlNjYwYTU0NTc4YzkzNDlmNWIiLCJlbnQiOiJ1c2VyIiwiZXhwIjoxNjczMDE4MTY2OTcyfQ.MQUG5ag1rBhU366mEaZVviTk1Ep-3fn681ZwAJkTptY",
          },
        },
      },
    },
  });
  usrAccountDetails.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      customer: {
        user_account: {
          status: "closed",
        },
      },
    },
  });
  const { container } = render(component(), { wrapper: MemoryRouter });
  const showButton = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(showButton, { target: { value: "Mariner@123" } });
    fireEvent.keyDown(showButton, { code: "32" });
  });
  expect(showButton.value).toBe("Mariner@123");
  const button = screen.getByTestId("SignInButton");
  await act(() => {
    fireEvent.click(button);
  });
});

test("test sign in button onclick when occur error", async () => {
  LoginController.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      result: "error",
    },
  });
  const { container } = render(component(), { wrapper: MemoryRouter });
  const showButton = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(showButton, { target: { value: "Mariner@123" } });
    fireEvent.keyDown(showButton, { code: "32" });
  });
  expect(showButton.value).toBe("Mariner@123");
  const button = screen.getByTestId("SignInButton");
  await act(() => {
    fireEvent.click(button);
  });
});

test("should match the snapshot Test", () => {
  const { asFragment } = render(component(), { wrapper: MemoryRouter });
  expect(asFragment).toMatchSnapshot();
});