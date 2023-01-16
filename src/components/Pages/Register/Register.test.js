import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen
} from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import { RegisterController } from "../../Controllers/LoginController";
import Register from "./Register";

jest.mock("../../Controllers/ZipCodeLookup");
jest.mock("../../Controllers/LoginController");

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
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("register_component");
  expect(element).toBeTruthy();
});

test("Render First name ", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "Mariner" } });
  });
  fireEvent.blur(input);
  expect(input).toBeTruthy();
  expect(input.value).toBe("Mariner");
});

test("Invalid Firstname", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.change(input, { target: { value: "test123" } });
  });
  expect(input.value).not.toBe(true);
  const button = screen.getByTestId("submit");
  await act(() => {
    fireEvent.click(button);
  });
});

test("Render Last name ", async () => {
  const { container } = render(component());
  const input1 = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(input1, { target: { value: "Mariner" } });
  });
  const input = container.querySelector(`input[name="lastName"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "" } });
  });
  fireEvent.blur(input);
  expect(input).toBeTruthy();
  expect(input.value).toBe("");
  const button = screen.getByTestId("submit");
  await act(() => {
    fireEvent.click(button);
  });
});

test("Invalid Last Name", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="lastName"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.change(input, { target: { value: "test123" } });
  });
  expect(input.value).not.toBe(true);
});

test("Render Email ", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="email"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "mariner@gmail.com" } });
  });
  fireEvent.blur(input);
  expect(input).toBeTruthy();
  expect(input.value).toBe("mariner@gmail.com");
});

test("Check invalid email", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="email"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input, { target: { value: "test@" } });
    fireEvent.change(input, { target: { value: "test@gmail" } });
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.change(input, { target: { value: "@test" } });
  });
  expect(input.value).not.toBe(true);
});

test("Render Social Security Number ", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="ssn"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "123-45-6789" } });
  });
  fireEvent.blur(input);
  expect(input).toBeTruthy();
  expect(input.value).toBe("123-45-6789");
});

test("Check Valid Social Security Number", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="ssn"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "abc" } });
  });
  expect(input.value).toBe("");
  await act(() => {
    fireEvent.change(input, { target: { value: "123-45-6789" } });
  });
  expect(input.value).toBe("123-45-6789");
});

test("Render ZipCode ", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="zip"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "12345" } });
  });
  fireEvent.blur(input);
  expect(input).toBeTruthy();
  expect(input.value).toBe("12345");
});

it("zipcode should be 5 digits", () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="zip"]`);
  expect(input.maxLength).toBe(5);
});

test("Zipcode Valid Input", async () => {
  ZipCodeLookup.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      zipCode: "88007",
      cityName: "Las Cruces",
      stateCode: "NM",
    },
  });
  const { container } = render(component());
  const input = container.querySelector(`input[name="zip"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "abc" } });
  });
  expect(input.value).not.toBe(true);
  await act(() => {
    fireEvent.change(input, { target: { value: "12345" } });
  });
  expect(input.value).toBe("12345");
});

test("Render DOB ", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="dob"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "01/01/2000" } });
  });
  fireEvent.blur(input);
  expect(input).toBeTruthy();
});

test("Render password", async () => {
  const { container } = render(component());
  const element = container.querySelector(`input[name="password"]`);
  expect(element.hasAttribute("name")).toBe(true);
  await act(() => {
    fireEvent.change(element, { target: { value: "Test@123" } });
  });

  expect(element.value).toBe("Test@123");
});

test("Password Length Test", () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  expect(input.maxLength).toBe(30);
});

test("Password Prevent Cut Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.cut(input);
  });
  expect(input.value).toBe("");
});

test("Password Prevent Copy Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.copy(input);
  });
  expect(input.value).toBe("");
});

test("Password Prevent Paste Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.paste(input);
  });
  expect(input.value).toBe("");
});

test("Render confirmPassword", async () => {
  const { container } = render(component());
  const element = container.querySelector(`input[name="confirmPassword"]`);
  expect(element.hasAttribute("name")).toBe(true);
  await act(() => {
    fireEvent.change(element, { target: { value: "Test@123" } });
  });

  expect(element.value).toBe("Test@123");
});

test("confirmPassword Length Test", () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  expect(input.maxLength).toBe(30);
});

test("confirmPassword Prevent Cut Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  await act(() => {
    fireEvent.cut(input);
  });
  expect(input.value).toBe("");
});

test("confirmPassword Prevent Copy Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  await act(() => {
    fireEvent.copy(input);
    fireEvent.keyDown(input, { key: "space", keyCode: 32 });
  });
  expect(input.value).toBe("");
});

test("confirmPassword Prevent Paste Test", async () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  await act(() => {
    fireEvent.paste(input);
  });
  expect(input.value).toBe("");
});

test("Check Password Match", async () => {
  const { container } = render(component());
  const newPassword = container.querySelector(`input[name="password"]`);
  const input = container.querySelector(`input[name="confirmPassword"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "Mariner1@1" } });
    fireEvent.change(newPassword, { target: { value: "Mariner1@" } });
    fireEvent.blur(input);
  });
  const errorInfo = container.querySelector(`p[id="cpass-helper-text"]`);
  expect(errorInfo).toBeTruthy();
  expect(errorInfo).toHaveTextContent(
    "Your confirmation password must match your password"
  );
});

test("Button Onclick when user password reset", async () => {
  RegisterController.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      result: "succcces",
      statusCode: 200,
      hasError: false,
      successMessage: "Password reset successful",
    },
  });
  const { container } = render(component());
  let today = new Date();
  const firstName = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(firstName, { target: { value: "Mariner" } });
  });
  const lastName = container.querySelector(`input[name="lastName"]`);
  await act(() => {
    fireEvent.change(lastName, { target: { value: "Mariner" } });
  });
  const email = container.querySelector(`input[name="email"]`);
  await act(() => {
    fireEvent.change(email, { target: { value: "mariner@gmail.com" } });
  });
  const ssn = container.querySelector(`input[name="ssn"]`);
  await act(() => {
    fireEvent.change(ssn, { target: { value: "734-63-7436" } });
  });
  const zipcode = container.querySelector(`input[name="zip"]`);
  await act(() => {
    fireEvent.change(zipcode, { target: { value: "88007" } });
  });
  expect(zipcode.value).toBe("88007");
  const dob = container.querySelector(`input[name="dob"]`);
  await act(() => {
    fireEvent.click(dob);
    fireEvent.mouseDown(dob);
  });
  const datePicker = screen.getByText(
    `${today.toLocaleString("default", {
      month: "long",
    })} ${today.getFullYear()}`
  );
  expect(datePicker).toBeTruthy();
  await act(() => {
    fireEvent.click(datePicker);
    fireEvent.mouseDown(datePicker);
  });
  const year = screen.getByText("2000");
  expect(year).toBeTruthy();
  await act(() => {
    fireEvent.click(year);
    fireEvent.mouseDown(year);
  });
  const month = screen.getByText("Jan");
  expect(month).toBeTruthy();
  await act(() => {
    fireEvent.click(month);
    fireEvent.mouseDown(month);
  });
  const day = screen.getByText("1");
  expect(day).toBeTruthy();
  await act(() => {
    fireEvent.click(day);
    fireEvent.mouseDown(day);
  });
  expect(dob.value).toBe("01/01/2000");
  const password = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(password, { target: { value: "Mariner@123" } });
  });
  expect(password.value).toBe("Mariner@123");
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  await act(() => {
    fireEvent.change(confirmPassword, { target: { value: "Mariner@123" } });
  });
  expect(confirmPassword.value).toBe("Mariner@123");
  const button = screen.getByTestId("submit");
  await act(() => {
    fireEvent.click(button);
  });
});

test("Button Onclick when More than 1 customer record", async () => {
  RegisterController.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      errorMessage: "More than 1 customer record retrieved ",
    },
  });
  const { container } = render(component());
  let today = new Date();
  const firstName = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(firstName, { target: { value: "Mariner" } });
  });
  const lastName = container.querySelector(`input[name="lastName"]`);
  await act(() => {
    fireEvent.change(lastName, { target: { value: "Mariner" } });
  });
  const email = container.querySelector(`input[name="email"]`);
  await act(() => {
    fireEvent.change(email, { target: { value: "mariner@gmail.com" } });
  });
  const ssn = container.querySelector(`input[name="ssn"]`);
  await act(() => {
    fireEvent.change(ssn, { target: { value: "734-63-7436" } });
  });
  const zipcode = container.querySelector(`input[name="zip"]`);
  await act(() => {
    fireEvent.change(zipcode, { target: { value: "88007" } });
  });
  expect(zipcode.value).toBe("88007");
  const dob = container.querySelector(`input[name="dob"]`);
  await act(() => {
    fireEvent.click(dob);
    fireEvent.mouseDown(dob);
  });
  const datePicker = screen.getByText(
    `${today.toLocaleString("default", {
      month: "long",
    })} ${today.getFullYear()}`
  );
  expect(datePicker).toBeTruthy();
  await act(() => {
    fireEvent.click(datePicker);
    fireEvent.mouseDown(datePicker);
  });
  const year = screen.getByText("2000");
  expect(year).toBeTruthy();
  await act(() => {
    fireEvent.click(year);
    fireEvent.mouseDown(year);
  });
  const month = screen.getByText("Jan");
  expect(month).toBeTruthy();
  await act(() => {
    fireEvent.click(month);
    fireEvent.mouseDown(month);
  });
  const day = screen.getByText("1");
  expect(day).toBeTruthy();
  await act(() => {
    fireEvent.click(day);
    fireEvent.mouseDown(day);
  });
  expect(dob.value).toBe("01/01/2000");
  const password = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(password, { target: { value: "Mariner@123" } });
  });
  expect(password.value).toBe("Mariner@123");
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  await act(() => {
    fireEvent.change(confirmPassword, { target: { value: "Mariner@123" } });
  });
  expect(confirmPassword.value).toBe("Mariner@123");
  const button = screen.getByTestId("submit");
  await act(() => {
    fireEvent.click(button);
  });
});

test("Button Onclick when account alread exist", async () => {
  RegisterController.mockResolvedValue({
    status: 400,
    statusText: "Bad Request",
    data: {
      result: "error",
      statusCode: 400,
      hasError: true,
      errorMessage:
        "Account already exists. Please use the login page to login or Please contact us at (844) 306-7300",
    },
  });
  const { container } = render(component());
  let today = new Date();
  const firstName = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(firstName, { target: { value: "Mariner" } });
  });
  const lastName = container.querySelector(`input[name="lastName"]`);
  await act(() => {
    fireEvent.change(lastName, { target: { value: "Mariner" } });
  });
  const email = container.querySelector(`input[name="email"]`);
  await act(() => {
    fireEvent.change(email, { target: { value: "mariner@gmail.com" } });
  });
  const ssn = container.querySelector(`input[name="ssn"]`);
  await act(() => {
    fireEvent.change(ssn, { target: { value: "734-63-7436" } });
  });
  const zipcode = container.querySelector(`input[name="zip"]`);
  await act(() => {
    fireEvent.change(zipcode, { target: { value: "88007" } });
  });
  expect(zipcode.value).toBe("88007");
  const dob = container.querySelector(`input[name="dob"]`);
  await act(() => {
    fireEvent.click(dob);
    fireEvent.mouseDown(dob);
  });
  const datePicker = screen.getByText(
    `${today.toLocaleString("default", {
      month: "long",
    })} ${today.getFullYear()}`
  );
  expect(datePicker).toBeTruthy();
  await act(() => {
    fireEvent.click(datePicker);
    fireEvent.mouseDown(datePicker);
  });
  const year = screen.getByText("2000");
  expect(year).toBeTruthy();
  await act(() => {
    fireEvent.click(year);
    fireEvent.mouseDown(year);
  });
  const month = screen.getByText("Jan");
  expect(month).toBeTruthy();
  await act(() => {
    fireEvent.click(month);
    fireEvent.mouseDown(month);
  });
  const day = screen.getByText("1");
  expect(day).toBeTruthy();
  await act(() => {
    fireEvent.click(day);
    fireEvent.mouseDown(day);
  });
  expect(dob.value).toBe("01/01/2000");
  const password = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(password, { target: { value: "Mariner@123" } });
  });
  expect(password.value).toBe("Mariner@123");
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  await act(() => {
    fireEvent.change(confirmPassword, { target: { value: "Mariner@123" } });
  });
  expect(confirmPassword.value).toBe("Mariner@123");
  const button = screen.getByTestId("submit");
  await act(() => {
    fireEvent.click(button);
  });
});

//--------------------------------------------------------

test("Button Onclick when new user register", async () => {
  RegisterController.mockResolvedValue({
    status: 200,
    statusText: "OK",
    data: {
      message: "Registered successfully",
    },
  });
  const { container } = render(component());
  let today = new Date();
  const firstName = container.querySelector(`input[name="firstName"]`);
  await act(() => {
    fireEvent.change(firstName, { target: { value: "Mariner" } });
  });
  const lastName = container.querySelector(`input[name="lastName"]`);
  await act(() => {
    fireEvent.change(lastName, { target: { value: "Mariner" } });
  });
  const email = container.querySelector(`input[name="email"]`);
  await act(() => {
    fireEvent.change(email, { target: { value: "mariner@gmail.com" } });
  });
  const ssn = container.querySelector(`input[name="ssn"]`);
  await act(() => {
    fireEvent.change(ssn, { target: { value: "734-63-7436" } });
  });
  const zipcode = container.querySelector(`input[name="zip"]`);
  await act(() => {
    fireEvent.change(zipcode, { target: { value: "88007" } });
  });
  expect(zipcode.value).toBe("88007");
  const dob = container.querySelector(`input[name="dob"]`);
  await act(() => {
    fireEvent.click(dob);
    fireEvent.mouseDown(dob);
  });
  const datePicker = screen.getByText(
    `${today.toLocaleString("default", {
      month: "long",
    })} ${today.getFullYear()}`
  );
  expect(datePicker).toBeTruthy();
  await act(() => {
    fireEvent.click(datePicker);
    fireEvent.mouseDown(datePicker);
  });
  const year = screen.getByText("2000");
  expect(year).toBeTruthy();
  await act(() => {
    fireEvent.click(year);
    fireEvent.mouseDown(year);
  });
  const month = screen.getByText("Jan");
  expect(month).toBeTruthy();
  await act(() => {
    fireEvent.click(month);
    fireEvent.mouseDown(month);
  });
  const day = screen.getByText("1");
  expect(day).toBeTruthy();
  await act(() => {
    fireEvent.click(day);
    fireEvent.mouseDown(day);
  });
  expect(dob.value).toBe("01/01/2000");
  const password = container.querySelector(`input[name="password"]`);
  await act(() => {
    fireEvent.change(password, { target: { value: "Mariner@123" } });
  });
  expect(password.value).toBe("Mariner@123");
  const confirmPassword = container.querySelector(
    `input[name="confirmPassword"]`
  );
  await act(() => {
    fireEvent.change(confirmPassword, { target: { value: "Mariner@123" } });
  });
  expect(confirmPassword.value).toBe("Mariner@123");
  const button = screen.getByTestId("submit");
  await act(() => {
    fireEvent.click(button);
  });
});

test("Should match the snapshot", () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});