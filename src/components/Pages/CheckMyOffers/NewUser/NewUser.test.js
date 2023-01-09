import "@testing-library/jest-dom";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ProfilePicture from "../../../../contexts/ProfilePicture";
import { createTheme } from "@mui/material/styles";
import NewUser from "./index.js";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  RegisterController,
} from "../../../Controllers/LoginController";
jest.mock("../../../Controllers/LoginController");

afterEach(cleanup);
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
          <ProfilePicture>
            <NewUser />
          </ProfilePicture>
        </CheckMyOffers>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("field availability test", () => {
  render(component(), { wrapper: MemoryRouter });

  const password = screen.getByTestId("password");
  expect(password).toBeTruthy();

  const confirmPassword = screen.getByTestId("confirmpassword");
  expect(confirmPassword).toBeTruthy();

  const subtitle = screen.getByTestId("subtitle");
  expect(subtitle).toBeTruthy();

  const button = screen.getByTestId("contButton");
  expect(button).toBeTruthy();
});

test("submit with invalid password", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });

  //make sure 'create password' field exists and input 'badpassword131313 as password
  const createPassword = container.querySelector(`input[name="newPassword"]`);
  expect(createPassword).toBeTruthy();
  await act(() => {
    fireEvent.change(createPassword, {
      target: { value: "badpassword131313" },
    });
    expect(createPassword.value).toBe("badpassword131313");
  });

  //make sure 'confirm password' field exists and input 'badpassword131313' as password
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  expect(confirmPassword).toBeTruthy();
  await act(() => {
    fireEvent.change(confirmPassword, {
      target: { value: "badpassword131313" },
    });
    expect(confirmPassword.value).toBe("badpassword131313");
  });

  //grab 'sign in' button and try submitting
  await act(() => {
    const signInButton = screen.getByTestId("contButton");
    fireEvent.click(signInButton);
  });
  //look for 'your password doesn't meet the criteria' error message
  expect(
    await screen.findByText(`Your password doesn't meet the criteria`, {
      exact: false,
    })
  ).toBeVisible();
});

test("submit with different password field values", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });

  //make sure 'create password' field exists and input 'Pass123456789!' as password
  const createPassword = container.querySelector(`input[name="newPassword"]`);
  expect(createPassword).toBeTruthy();
  await act(() => {
    fireEvent.change(createPassword, { target: { value: "Pass123456789!" } });
    expect(createPassword.value).toBe("Pass123456789!");
  });

  //make sure 'confirm password' field exists and input 'Pass123456789@' as password
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  expect(confirmPassword).toBeTruthy();
  await act(() => {
    fireEvent.change(confirmPassword, { target: { value: "Pass123456789@" } });
    expect(confirmPassword.value).toBe("Pass123456789@");
  });

  //grab 'sign in' button and try submitting
  await act(() => {
    const signInButton = screen.getByTestId("contButton");
    fireEvent.click(signInButton);
  });
  //look for 'your confirmation password must match your password' error message
  expect(
    await screen.findByText(
      `Your confirmation password must match your password`,
      { exact: false }
    )
  ).toBeVisible();
});

test("submit with valid password", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });

  //make sure 'create password' field exists and input 'G00dpa$$word' as password
  const createPassword = container.querySelector(`input[name="newPassword"]`);
  expect(createPassword).toBeTruthy();
  await act(() => {
    fireEvent.change(createPassword, { target: { value: "G00dpa$$word" } });
    expect(createPassword.value).toBe("G00dpa$$word");
  });

  //make sure 'confirm password' field exists and input 'G00dpa$$word' as password
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  expect(confirmPassword).toBeTruthy();
  await act(() => {
    fireEvent.change(confirmPassword, { target: { value: "G00dpa$$word" } });
    expect(confirmPassword.value).toBe("G00dpa$$word");
  });

  //grab 'sign in' button and try submitting
  await act(() => {
    const signInButton = screen.getByTestId("contButton");
    fireEvent.click(signInButton);
  });

  //make sure neither password field has any associated errors
  expect(createPassword.getAttribute("aria-invalid")).toBe("false");
  expect(confirmPassword.getAttribute("aria-invalid")).toBe("false");
});

test("Preventing space in the password field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="newPassword"]`);
  expect(input).toBeTruthy();
  fireEvent.keyDown(input, 32);
  expect(input.value).toBe("");
});

test("Check the submit functinality", async () => {
  RegisterController.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      userFound: true,
      customerFound: false,
      loans: false,
      is_registration_failed: false,
      branchInfo: {
        BranchNumber: "8021",
        BranchName: "Raleigh",
        Address: "1466 Garner Station Blvd., Raleigh, NC 27603",
        PhoneNumber: "919-773-7425",
        openDate: "07/01/2014",
        latitude: "35.724946",
        longitude: "-78.653068",
        branchManager: "Jeff Zuch",
      },
      customer: {
        extensionattributes: {
          login: {
            timestamp_date: "2023-01-09T10:33:47.116Z",
          },
        },
        sorad: {
          latest_application: {
            application_submission_date: "2023-01-09T10:33:47.116Z",
          },
          submissions: [],
          issuedproducts: [],
          applications: [],
          creditmonitoring: [],
        },
        identification: {
          user_account_id: "63bbed8b2c5d5a04c9642515",
          full_name: "dfkjh jhlcd",
          first_name: "dfkjh",
          last_name: "jhlcd",
          middle_initial: null,
          citizenship: null,
          date_of_birth: "1931-02-12T00:00:00.000Z",
          social_security_number: "3bf3fe89bad231da1c",
          default_bank: null,
          guid: "CT-DF1673260427112",
          trace_number: 1673260427112,
        },
        latest_contact: {
          address_street: "347R59",
          address_city: "RALEIGH",
          address_state: "NC",
          address_postal_code: "27610",
          mailing_address_street: "347r59",
          mailing_address_city: "RALEIGH",
          mailing_address_state: "NC",
          mailing_address_postal_code: "27610",
          email: "jdhf@gmail.com",
          phone_number_primary: null,
          phone_type: null,
          opted_phone_texting: null,
          mfa_phone_texting: null,
          how_did_you_hear_about_us: null,
        },
        communication_preferences: {
          marketing_emails_unsubscribe_flag: false,
          do_not_contact: false,
        },
        user_account: {
          status: "open",
          status_check_time: null,
        },
        contenttypes: [],
        entitytype: "customer",
        _id: "63bbed8bd720cd044c5bbee1",
        createdat: "2023-01-09T10:33:47.116Z",
        updatedat: "2023-01-09T10:33:47.116Z",
        changes: [],
        __v: 0,
      },
      message: "Registered successfully",
      user: {
        contenttypes: [],
        entitytype: "user",
        locked: false,
        description: "No profile",
        activated: false,
        accounttype: "basic",
        assets: [],
        coverimages: [],
        userroles: [],
        tags: [],
        categories: [],
        customusertype: "basic",
        _id: "63bbed8b2c5d5a04c9642515",
        email: "jdhf@gmail.com",
        firstname: "dfkjh",
        lastname: "jhlcd",
        password:
          "$2b$10$CXHb44JycRLKk6WdNDSy2Ogo9qNlXftt4.0HOeZFyB2uKTy/Yc9e2",
        attributes: {
          sor_data: {
            customer_guid: "CT-DF1673260427112",
            customer_id: "63bbed8bd720cd044c5bbee1",
          },
        },
        apikey: "1673260427186_HSMGKMCfOxi52A!A",
        createdat: "2023-01-09T10:33:47.187Z",
        updatedat: "2023-01-09T10:33:47.187Z",
        changes: [],
        random: 0.36464722928956816,
        __v: 0,
        extensionattributes: {
          login: {
            attempts: 0,
            timestamp: 1673260427595,
            timestamp_date: "2023-01-09T10:33:47.595Z",
            flagged: false,
            freezeTime: 1673260427595,
            freezeTime_date: "2023-01-09T10:33:47.595Z",
            jwt_token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2M2JiZWQ4YjJjNWQ1YTA0Yzk2NDI1MTUiLCJlbnQiOiJ1c2VyIiwiZXhwIjoxNjczMjYyMjI3NTk0fQ.uT46vrlRckXPdITL708ZTPXes1QPVnqpmL9P0Mj2rJI",
          },
        },
      },
      previousTimestampDate: "2023-01-09T10:33:47.579Z",
    },
  });
  const {container,getByTestId}=render(component(), { wrapper: MemoryRouter });
  const newPassword = container.querySelector(`input[name="newPassword"]`);
  await act(()=>{
    fireEvent.change(newPassword, { target: { value: "Mariner@123" } });
  })
  expect(newPassword.value).toBe("Mariner@123")
  const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
  await act(()=>{
    fireEvent.change(confirmPassword, { target: { value: "Mariner@123" } });
  })
  expect(confirmPassword.value).toBe("Mariner@123")
  const signInButton = getByTestId("contButton");
  expect(signInButton).toBeEnabled();
  screen.debug(signInButton,40000)
  await act(()=>{
    fireEvent.click(signInButton);
  })
});