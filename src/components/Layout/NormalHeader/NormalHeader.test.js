import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import NormalHeader from "./NormalHeader";

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
          <NormalHeader />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("pre_login_component");
  expect(element).toBeTruthy();
});

test("Image Availability Test", () => {
  render(component());
  const element = screen.getByTestId("MF_logo");
  expect(element).toBeTruthy();
});

test("Link Availability tests", () => {
  render(component());
  const element = screen.getByTestId("blogsLink");
  expect(element).toHaveAttribute(
    "href",
    `${process.env.REACT_APP_WEBSITE}/blog/`
  );
  expect(element).toBeTruthy();
});

test("Link Availability tests", () => {
  render(component());
  const element = screen.getByTestId("faqNavigation");
  expect(element).toHaveAttribute("href", `${ process.env.REACT_APP_WEBSITE }/resources/faq/`);
  expect(element).toBeTruthy();
});

test("Link Availability tests", () => {
  render(component());
  const element = screen.getByTestId("branchLocatorNavigation");
  expect(element).toHaveAttribute("href", "/branch-locator");
  expect(element).toBeTruthy();
});

test("Menu Icon Availability tests", () => {
  render(component());
  const element = screen.getByTestId("moreIcon");
  expect(element).toBeTruthy();
});

test("Mobile Menu Availability Tests", () => {
  render(component());
  const element = screen.getByTestId("mobileMenu");
  expect(element).toBeTruthy();
});

test("Link Availability tests", () => {
  render(component());
  const element = screen.getByTestId("blogNavigation");
  expect(element).toHaveAttribute(
    "href",
    `${process.env.REACT_APP_WEBSITE}/blog/`
  );
  expect(element).toBeTruthy();
});

test("Link Availability tests", () => {
  render(component());
  const element = screen.getByTestId("faqMobileNavigation");
  expect(element).toHaveAttribute("href", `${ process.env.REACT_APP_WEBSITE }/resources/faq/`);
  expect(element).toBeTruthy();
});

test("Link Availability tests", () => {
  render(component());
  const element = screen.getByTestId("branchLocatorMobileNavigation");
  expect(element).toHaveAttribute("href", "/branch-locator");
  expect(element).toBeTruthy();
});