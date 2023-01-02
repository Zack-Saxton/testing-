import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from "../../../contexts/ProfilePicture";
import MFAGetPhoneNumber from "./MFAGetPhoneNumber";
import Cookies from "js-cookie";
import {
  SavePhoneNumber,
  fetchQuestionMFA,
} from "./../../Controllers/MFAController";
import { act } from "react-dom/test-utils";
jest.mock("../../Controllers/MFAController");
jest.mock("../../Controllers/CommonController");
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
let now = new Date().getTime();
Cookies.set(
  "token",
  JSON.stringify({
    isLoggedIn: true,
    setupTime: now,
    applicantGuid: "AT-LA1656515305385",
    isMFA: true,
    isMFACompleted: true,
  })
);
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProfilePicture>
          <MFAGetPhoneNumber />
        </ProfilePicture>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
test("Checks the component is rendered", () => {
  SavePhoneNumber.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        Message:
          "Phone number [6284648249] saved for Customer jeevaasekar2127@gmail.com",
      },
    },
  });
  fetchQuestionMFA.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        MFAInformation: {
          email: "jeevaasekar2127@gmail.com",
          firstname: "yan",
          lastname: "su",
          MFA: true,
          MFAttributes: {
            deviceType: "Chrome",
            deviceTimeStamp: "2023-01-02T09:53:21.464Z",
            deviceFlag: true,
          },
          LockUserByMFA: false,
          phone_number_primary: null,
          phone_type: null,
          opted_phone_texting: null,
          mfa_phone_texting: null,
          securityQuestionsSaved: false,
          securityQuestions: [],
        },
      },
    },
  });
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId("phoneNumber-container");
  expect(element).toBeTruthy();
});
test("Render Next Button Onclick", () => {
  SavePhoneNumber.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        Message:
          "Phone number [6284648249] saved for Customer jeevaasekar2127@gmail.com",
      },
    },
  });
  fetchQuestionMFA.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        MFAInformation: {
          email: "jeevaasekar2127@gmail.com",
          firstname: "yan",
          lastname: "su",
          MFA: true,
          MFAttributes: {
            deviceType: "Chrome",
            deviceTimeStamp: "2023-01-02T09:53:21.464Z",
            deviceFlag: true,
          },
          LockUserByMFA: false,
          phone_number_primary: null,
          phone_type: null,
          opted_phone_texting: null,
          mfa_phone_texting: null,
          securityQuestionsSaved: false,
          securityQuestions: [],
        },
      },
    },
  });
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId("next_button");
  expect(element).toBeTruthy();
});
test("Next Button Onclick", async () => {
  SavePhoneNumber.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        Message:
          "Phone number [6284648249] saved for Customer jeevaasekar2127@gmail.com",
      },
    },
  });
  fetchQuestionMFA.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        MFAInformation: {
          email: "jeevaasekar2127@gmail.com",
          firstname: "yan",
          lastname: "su",
          MFA: true,
          MFAttributes: {
            deviceType: "Chrome",
            deviceTimeStamp: "2023-01-02T09:53:21.464Z",
            deviceFlag: true,
          },
          LockUserByMFA: false,
          phone_number_primary: null,
          phone_type: null,
          opted_phone_texting: null,
          mfa_phone_texting: null,
          securityQuestionsSaved: false,
          securityQuestions: [],
        },
      },
    },
  });
  const { container } = render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  const input = container.querySelector(`input[name='phone']`);
  fireEvent.change(input, {
    target: { value: "(***) ***-8249" },
  });
  const button = screen.getByTestId("next_button");
  fireEvent.click(button);
});
test("Render Skip Button Onclick", () => {
  SavePhoneNumber.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        Message:
          "Phone number [6284648249] saved for Customer jeevaasekar2127@gmail.com",
      },
    },
  });
  fetchQuestionMFA.mockResolvedValue({
    data: {
      status: 200,
      statusText: "OK",
      data: {
        result: "success",
        statusCode: 200,
        hasError: false,
        MFAInformation: {
          email: "jeevaasekar2127@gmail.com",
          firstname: "yan",
          lastname: "su",
          MFA: true,
          MFAttributes: {
            deviceType: "Chrome",
            deviceTimeStamp: "2023-01-02T09:53:21.464Z",
            deviceFlag: true,
          },
          LockUserByMFA: false,
          phone_number_primary: null,
          phone_type: null,
          opted_phone_texting: null,
          mfa_phone_texting: null,
          securityQuestionsSaved: false,
          securityQuestions: [],
        },
      },
    },
  });
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId("skip_button");
  expect(element).toBeTruthy();
});
test("Should prevent space()", () => {
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  const space = screen.getByTestId("phoneField");
  const spacefield = space.querySelector(`input[name="phone"]`);
  expect(spacefield).toBeTruthy();
  fireEvent.keyDown(spacefield, 32);
  expect(spacefield.value).toBe("");
});

test("Check phonenumber is mask when onBlur", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/",
            state: { phoneNumber: "96532545588", mfaQueries: {} },
          },
        ]}
      >
        {component()}
      </MemoryRouter>
    );
    const space = screen.getByTestId("phoneField");
    const spacefield = space.querySelector(`input[name="phone"]`);
    fireEvent.change(spacefield, {
      target: { value: "6284648249" },
    });
    fireEvent.blur(spacefield);
  });

test("Skip Button Onclick", () => {
  SavePhoneNumber.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      result: "success",
      statusCode: 200,
      hasError: false,
      Message:
        "Phone number [null] saved for Customer jeevaasekar2127@gmail.com",
    },
  });
  fetchQuestionMFA.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      result: "success",
      statusCode: 200,
      hasError: false,
      MFAInformation: {
        email: "jeevaasekar2127@gmail.com",
        firstname: "yan",
        lastname: "su",
        MFA: true,
        MFAttributes: {
          deviceType: "Chrome",
          deviceTimeStamp: "2023-01-02T09:53:21.464Z",
          deviceFlag: true,
        },
        LockUserByMFA: false,
        phone_number_primary: null,
        phone_type: null,
        opted_phone_texting: null,
        mfa_phone_texting: null,
        securityQuestionsSaved: false,
        securityQuestions: [],
      },
    },
  });
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  const button = screen.getByTestId("skip_button");
  fireEvent.click(button);
});
test("Should match the snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/",
          state: { phoneNumber: "96532545588", mfaQueries: {} },
        },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  expect(asFragment).toMatchSnapshot();
});