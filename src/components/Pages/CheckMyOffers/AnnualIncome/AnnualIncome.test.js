import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom";
import {
  act,
  cleanup,
  fireEvent,
  render,
} from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ProfilePicture from "../../../../contexts/ProfilePicture";
import AnnualIncome from "./index.js";

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
window.scrollTo = jest.fn();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CheckMyOffers>
          <ProfilePicture>
            <AnnualIncome />
          </ProfilePicture>
        </CheckMyOffers>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
test("Checks the component is rendered", () => {
  const container = render(component(), { wrapper: MemoryRouter });
  const element = container.getByTestId("annual-income-component");
  expect(element).toBeTruthy();
});

test("Checks Annual personal Income filed in the UI", () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="personalIncome"]`);
  expect(input).toBeTruthy();
  expect(input.value).toBe("");
});

test("Checks House hold Income filed in the UI", () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="householdIncome"]`);
  expect(input).toBeTruthy();
  expect(input.value).toBe("");
});

test("Check the Continue button in  UI", () => {
  const { getByText } = render(component(), { wrapper: MemoryRouter });
  expect(getByText("Continue")).toBeTruthy();
});

test("Check can able to enter Annual personal Income in the input field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="personalIncome"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "150000" } });
  });
  expect(input.value).toBe("150000");
});

test("Check can able to enter House hold Income in the input field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="householdIncome"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "75000" } });
  });
  expect(input.value).toBe("75000");
});

test("Check accept only number in Annual personal Income field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="personalIncome"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "Mariner" } });
  });
  expect(input.value).toBe("");
});

test("Check accept only number in House hold Income field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="householdIncome"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "Mariner" } });
  });
  expect(input.value).toBe("");
});

test("Check the validation is working for Annual personal Income field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="personalIncome"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
  });
  const errorInfo = container.querySelector(
    `p[id="personalIncome-helper-text"]`
  );
  expect(errorInfo).toBeTruthy();
  expect(errorInfo).toHaveTextContent("Annual personal income is required");
});

test("Check the validation is working for House hold Income field", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });
  const input = container.querySelector(`input[name="householdIncome"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
  });
  const errorInfo = container.querySelector(
    `p[id="householdIncome-helper-text"]`
  );
  expect(errorInfo).toBeTruthy();
  expect(errorInfo).toHaveTextContent("Annual household income is required");
});

// --------------------------------------------------------------

test("Check More Information", async () => {
  const { getByText } = render(component(), { wrapper: MemoryRouter });
  const input = getByText("More Information");
  expect(input).toBeTruthy();
  fireEvent.click(input);
  const closePopup = getByText("OK");
  fireEvent.click(closePopup);
});

test("test onKeyDown in annual income input field", async () => {
  const { container } = render(component(), {
    wrapper: MemoryRouter,
  });
  const input = container.querySelector(`input[name="personalIncome"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "150" } });
  });
  expect(input.value).toBe("150");
  fireEvent.blur(input);
  fireEvent.keyDown(input, { key: "A", code: "190" });
});

test("test continue button is onclick", async () => {
  const { container, getByText } = render(component(), {
    wrapper: MemoryRouter,
  });
  const personalIncome = container.querySelector(
    `input[name="personalIncome"]`
  );
  expect(personalIncome).toBeTruthy();
  await act(() => {
    fireEvent.change(personalIncome, { target: { value: "15000" } });
    fireEvent.blur(personalIncome);
  });
  const householdIncome = container.querySelector(
    `input[name="householdIncome"]`
  );
  await act(() => {
    fireEvent.change(householdIncome, { target: { value: "20000" } });
    fireEvent.blur(householdIncome);
  });
  expect(getByText("Continue")).toBeTruthy();
  fireEvent.click(getByText("Continue"));
});

test("test continue button without any input", () => {
  const { getByText } = render(component(), {
    wrapper: MemoryRouter,
  });
  expect(getByText("Continue")).toBeTruthy();
  fireEvent.click(getByText("Continue"));
});

test("Should match the snapshot", () => {
  const { asFragment } = render(component(), { wrapper: MemoryRouter });
  expect(asFragment).toMatchSnapshot();
});