import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import SideNav from "./SideNav";
import CheckMyOffers from "../../../contexts/CheckMyOffers";
import LoanAccount from "../../../contexts/LoanAccount";
import NavContext from "../../../contexts/NavContext";
import ProfilePicture from "../../../contexts/ProfilePicture";
import { LoanDataMock } from "./../../../__mock__/LoanData.mock";

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
            <ProfilePicture>
              <LoanAccount>
                <NavContext>
                  <SideNav />
                </NavContext>
              </LoanAccount>
            </ProfilePicture>
          </CheckMyOffers>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
jest.mock("../../Pages/AccountOverview/AccountOverviewHook/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))
test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("side_nav_component");
  expect(element).toBeTruthy();
});

test("App Bar Availability Test", () => {
  render(component());
  const element = screen.getByTestId("appBar");
  expect(element).toBeTruthy();
});

test("Menu Icon Availability Test", () => {
  render(component());
  const element = screen.getByTestId("menuIcon");
  expect(element).toBeTruthy();
});

test("Qick Pay Link Icon Availability Test", () => {
  render(component());
  LoanDataMock();
  const element = screen.getByTestId("qickPayIcon");
  expect(element).toBeTruthy();
});

test("Settings Icon Availability Test", () => {
  render(component());
  const element = screen.getByTestId("settingsIcon");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavfaqNavigation");
  expect(element).toHaveAttribute("href", "https://www.marinerfinance.com/resources/faq/");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavBlogNavigation");
  expect(element).toHaveAttribute(
    "href",
    `${process.env.REACT_APP_WEBSITE}/blog/`
  );
  expect(element).toBeTruthy();
});

test("MoneySkill Button Availability Test", () => {
  render(component());
  const element = screen.getByTestId("moneySkill");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavVantageScoreNavigation");
  expect(element).toHaveAttribute("href", "/customers/vantageScore");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavLoanHistoryNavigation");
  expect(element).toHaveAttribute("href", "/customers/loanHistory");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavMyProfileNavigation");
  expect(element).toHaveAttribute("href", "/customers/myProfile");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavMyBranchNavigation");
  expect(element).toHaveAttribute("href", "/customers/myBranch");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavLoanDocumentsNavigation");
  expect(element).toHaveAttribute("href", "/customers/loanDocument");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavMakePaymentNavigation");
  expect(element).toHaveAttribute("href", "/customers/makePayment");
  expect(element).toBeTruthy();
});

test("Side Navigation buttons Availability Test", () => {
  render(component());
  const element = screen.getByTestId("sideNavAccountOverviewNavigation");
  expect(element).toHaveAttribute("href", "/customers/accountOverview");
  expect(element).toBeTruthy();
});

test("MF Logo Availability Test", () => {
  render(component());
  const element = screen.getByTestId("mfLogo");
  expect(element).toBeTruthy();
});
