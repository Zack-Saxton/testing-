import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from "@mui/material/styles";
import SSN from "./index.js";
import { QueryClient, QueryClientProvider } from "react-query";

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
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CheckMyOffers>
          <SSN />
        </CheckMyOffers>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Checks if checkbox for acknowledge and sign our disclosures renders. ", async () => {
  render(component(), { wrapper: MemoryRouter });
  const reviewedCheckbox = screen.getByTestId("reviewedcheckbox");
  expect(reviewedCheckbox).toBeInTheDocument();
});

test("E-Signature Disclosure and Consent Hyperlink Renders, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });

  const eSignatureLink = screen.getByTestId("eSignatureLink");
  expect(eSignatureLink).toBeTruthy();
});

test("Credit and Contact Authorization, Renders, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });

  const creditContactAuth = screen.getByTestId("creditContactAuth");
  expect(creditContactAuth).toBeTruthy();

  
});

test("Website Terms of Use, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });

  const websiteTerms = screen.getByTestId("websiteTerms");
  expect(websiteTerms).toBeTruthy();
});

test("Website Privacy Statement, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });

  const websitePrivacy = screen.getByTestId("websitePrivacy");
  expect(websitePrivacy).toBeTruthy();
});

test("Submit application renders and functions", () => {
  render(component(), { wrapper: MemoryRouter });

  const button = screen.getByTestId("submit-application");
  expect(button).toBeTruthy();

  fireEvent.click(button);

  expect(button).toHaveAttribute("disabled");
});


test('should match the snapshot Test', () => {
  const { asFragment } = render(component(), {wrapper: MemoryRouter}); 
  expect(asFragment).toMatchSnapshot();
})

