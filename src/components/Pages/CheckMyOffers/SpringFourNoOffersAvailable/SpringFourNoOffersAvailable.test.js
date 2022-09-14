import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from "@mui/material/styles";
import SpringFourNoOffersAvailable from "./SpringFourNoOffersAvailable";
import { QueryClient, QueryClientProvider } from "react-query";

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
        <BrowserRouter>
          <CheckMyOffers>
            <SpringFourNoOffersAvailable />
          </CheckMyOffers>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("component text rendering test", () => {
  render(component());
  const firstParagraph = screen.getByTestId("springFourComponent");
  expect(firstParagraph).toBeTruthy();
});

test("Thank You Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("thankYouText");
  expect(firstParagraph).toBeTruthy();
});

test("Unfortunately Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("unfortunatelyText");
  expect(firstParagraph).toBeTruthy();
});

test("BlueBoxText Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("blueBoxText");
  expect(firstParagraph).toBeTruthy();
});

test("Spring four logo image renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("springFourLogo");
  expect(firstParagraph).toBeTruthy();
});

test("resources Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("resourcesText");
  expect(firstParagraph).toBeTruthy();
});

test("Financial Advice logo image renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("financialAdviceLogo");
  expect(firstParagraph).toBeTruthy();
});

test("Financial Advice Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("financialAdviceText");
  expect(firstParagraph).toBeTruthy();
});

test("Get Started Availability Test", () => {
  render(component());
  const element = screen.getByText("Get Started");
  expect(element).toBeTruthy();
});

test("Employment Services logo image renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("employmentServicesLogo");
  expect(firstParagraph).toBeTruthy();
});

test("Employment Services Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("employmentServicesText");
  expect(firstParagraph).toBeTruthy();
});

test("RentalResources logo image renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("rentalResourcesLogo");
  expect(firstParagraph).toBeTruthy();
});

test("Rental Resources Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("rentalResourcesText");
  expect(firstParagraph).toBeTruthy();
});

test("Pre Footer Text Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("preFooterTxt");
  expect(firstParagraph).toBeTruthy();
});

test("Pre Footer Last Text Text renders accordingly", () => {
  render(component());
  const firstParagraph = screen.getByTestId("preFooterLastText");
  expect(firstParagraph).toBeTruthy();
});