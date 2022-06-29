import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../../contexts/NavContext";
import ReferredFromAffiliate from "./ReferredFromAffiliate";
import { usePopulatePartnerReferred } from "./ReferredFromAffiliateMockData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});
jest.mock("./ReferredFromAffiliateMockData", () => ({
  usePopulatePartnerReferred: jest.fn(),
}));
const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavContext>
            <ReferredFromAffiliate />
          </NavContext>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const mockData = {
  data: {
    application: {
      identification: {
        full_name: "mariner finance",
      },
    },
  },
};

test("Checks the component is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("ReferredFromAffiliate_component");
  expect(element).toBeTruthy();
});

it("Congratulations Image Test", async () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("congratulationsImage");
  expect(element).toBeTruthy();
});

test("We believe Text is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.findByText("We believe we have a solution for you.");
  expect(element).toBeTruthy();
});

test("Completion ApplicationText is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("completionApplicationText");
  expect(element).toBeTruthy();
});

test("Phone Number Button Availability tests", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("phoneNumber");
  expect(element).toHaveAttribute("href", "tel:+6152779090");
  expect(element).toBeTruthy();
});

test("Questions text is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.findByText("Questions?");
  expect(element).toBeTruthy();
});

test("Call Branch Text is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("callBranchText");
  expect(element).toBeTruthy();
});

test("Phone Number Button Availability tests", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("callBranchTextPhoneNumber");
  expect(element).toHaveAttribute("href", "tel:+6152779090");
  expect(element).toBeTruthy();
});

test("Questions text is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.findByText("Our business hours are listed below");
  expect(element).toBeTruthy();
});

test("Check the TableCell is available", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("tableContainer");
  expect(element).toBeTruthy();
});

test("Check number of rows rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  expect(screen.getAllByRole("row")).toHaveLength(3);
});

test("PreFooterText text is rendered", () => {
  usePopulatePartnerReferred.mockImplementation(() => ({
    isLoading: false,
    PopulatePartnerSignupData: mockData,
  }));
  render(component());
  const element = screen.getByTestId("preFooterText");
  expect(element).toBeTruthy();
});
