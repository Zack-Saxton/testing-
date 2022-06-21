import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import CitizenshipStatus from "./index.js";

afterEach(cleanup);

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
        <BrowserRouter>
          <CheckMyOffers>
            <CitizenshipStatus />
          </CheckMyOffers>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Select On Highlight Test", () => {
  render(component());

  const USCitizen = screen.getByTestId("usCitizenBtn");
  expect(USCitizen).toBeTruthy();
  const PermanentResident = screen.getByTestId("permanentResidentBtn");
  expect(PermanentResident).toBeTruthy();
  const ForeignResident = screen.getByTestId("foreignResidentBtn");
  expect(ForeignResident).toBeTruthy();
  const ContinueButton = screen.getByTestId("citizenshipContButton");
  expect(ContinueButton).toBeTruthy();
  expect(ContinueButton.hasAttribute("disabled")).toBe(true);
});

test("Availability test", () => {
  render(component());

  const USCitizen = screen.getByTestId("usCitizenBtn");
  const PermanentResident = screen.getByTestId("permanentResidentBtn");
  const ForeignResident = screen.getByTestId("foreignResidentBtn");
  expect(USCitizen).toBeTruthy();
  fireEvent.click(USCitizen);
  expect(USCitizen).toHaveClass("activeBorder");
  expect(PermanentResident).not.toHaveClass("activeBorder");
  expect(ForeignResident).not.toHaveClass("activeBorder");
  const ContinueButton = screen.getByTestId("citizenshipContButton");
  expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Us Citizen button renders and functions correctly", () => {
  render(component());

  const citizenUs = screen.getByTestId("usCitizenBtn");

  // Making sure text on Us Citizen button Renders
	expect(screen.queryByText("U.S Citizen",{ exact: true })).toBeVisible();

  fireEvent.click(citizenUs);
});

test("Premanent Resident button renders and functions correctly", () => {
  render(component());

  const PermanentResidentBtn = screen.getByTestId("permanentResidentBtn");

  // Making sure text on permanent resident button Renders
	expect(screen.queryByText("Permanent Resident",{ exact: true })).toBeVisible();

  fireEvent.click(PermanentResidentBtn);
});

test("Foreign Resident button renders and functions correctly", () => {
  render(component());
	
  const ForeignResidentBtn = screen.getByTestId("foreignResidentBtn");

  // Making sure text on Foreign Residentbutton Renders
	expect(screen.queryByText("Foreign Resident",{ exact: true })).toBeVisible();

  fireEvent.click(ForeignResidentBtn);

  expect(screen.queryByText("We are sorry. We do not offer loans to foreign residents.",{ exact: true })).toBeVisible();
});
