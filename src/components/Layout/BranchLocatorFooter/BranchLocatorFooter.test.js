import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import BranchLocatorFooter from "./BranchLocatorFooter";

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
          <BranchLocatorFooter />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("branch_locater_footer_component");
  expect(element).toBeTruthy();
});

test("Footer Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("facebookIcon");
  expect(element).toHaveAttribute(
    "href",
    "https://www.facebook.com/MarinerFinance/"
  );
  expect(element).toBeTruthy();
});

test("Footer Link Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("twitterIcon");
  expect(element).toHaveAttribute("href", "https://twitter.com/MarinerFinance");
  expect(element).toBeTruthy();
});

test("Footer Link Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("linkedInIcon");
  expect(element).toHaveAttribute(
    "href",
    "https://www.linkedin.com/company/mariner-finance/"
  );
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("personalTexts");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("helpTexts");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("processTexts");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("satisfactionText");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("californiaText");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("footerLogoImage");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("footerAddressText");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("housingImage");
  expect(element).toBeTruthy();
});

test("Footer Text availability tests", () => {
  render(component());
  const element = screen.getByTestId("copyrightText");
  expect(element).toBeTruthy();
});
