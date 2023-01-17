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
import LoginController, {
  RegisterController,
} from "../../../Controllers/LoginController";
import { registerResponseMock, loginResponseMock } from "../../../../__mock__/data/registerResponseMockData";
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
  LoginController.mockResolvedValue(loginResponseMock);
  RegisterController.mockResolvedValue(registerResponseMock);
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
  await act(()=>{
    fireEvent.click(signInButton);
  })
});


test("Check the submit functinality with error response", async () => {
  LoginController.mockResolvedValue({data: {
    "result": "error",
    "loginUserSuccess": false,
  }});
  RegisterController.mockResolvedValue(registerResponseMock);
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
  await act(()=>{
    fireEvent.click(signInButton);
  })
});

test("Check the submit functinality with error response", async () => {
  RegisterController.mockResolvedValue({data: {
    result: "error",
    statusCode: 400,
    
  }});
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
  await act(()=>{
    fireEvent.click(signInButton);
  })
});