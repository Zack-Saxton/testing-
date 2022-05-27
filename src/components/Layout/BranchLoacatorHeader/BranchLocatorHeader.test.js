import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import BranchLocatorHeader from "./BranchLocatorHeader";
const ServerURL = `${process.env.REACT_APP_WEBSITE}`;

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
          <BranchLocatorHeader />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
// 1
test("Checks the component is rendered", () => {
  render(component());
  const element = screen.getByTestId("branch_locater_header_component");
  expect(element).toBeTruthy();
});
// 2
test("Image availability test", () => {
  render(component());
  const element = screen.getByTestId("MF_logo");
  expect(element).toBeTruthy();
});

// 3
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("desktopMenuLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/personal-loans/`);
  expect(element).toBeTruthy();
});
// 4
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("unexpectedExpenses");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/unexpected-expenses/`
  );
  expect(element).toBeTruthy();
});
// 5
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("vacationLoans");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/vacation-loans/`
  );
  expect(element).toBeTruthy();
});
// 6
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("debtConsolidationLoans");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/debt-consolidation-loans/`
  );
  expect(element).toBeTruthy();
});
// 7
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("homeImprovementLoans");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/home-improvement-loans/`
  );
  expect(element).toBeTruthy();
});
// 8
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("weddingLoans");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/wedding-loans/`
  );
  expect(element).toBeTruthy();
});
// 9
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("carLoansLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/car-loans/`);
  expect(element).toBeTruthy();
});
// 10
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("autoRefinancingLoans");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/car-loans/auto-refinance/`
  );
  expect(element).toBeTruthy();
});
// 11
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("financeCarLoans");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/car-loans/new-car-loan/`
  );
  expect(element).toBeTruthy();
});
// 12
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("financeUsedCarLoan");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/car-loans/used-car-loan/`
  );
  expect(element).toBeTruthy();
});
// 13
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("homeLoansLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/home-loans/`);
  expect(element).toBeTruthy();
});
// 14
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("homePurchase");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/home-loans/mortgage-loans/`
  );
  expect(element).toBeTruthy();
});
// 15
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("homeRefinance");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/home-loans/home-refinance/`
  );
  expect(element).toBeTruthy();
});
// 16
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("meetOurLoanOfficers");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/home-loans/meet-our-loan-officers/`
  );
  expect(element).toBeTruthy();
});
// 17
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("howToApplyLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/resources/how-to-apply/`
  );
  expect(element).toBeTruthy();
});
// 18
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("FAQLink");
  expect(element).toHaveAttribute("href", "/faq");
  expect(element).toBeTruthy();
});
// 19
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("BlogLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/blog/`);
  expect(element).toBeTruthy();
});
// 20
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("marinerStates");
  expect(element).toHaveAttribute("href", "/branch-locator");
  expect(element).toBeTruthy();
});
// 21
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("LegalLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/resources/legal/`);
  expect(element).toBeTruthy();
});
// 22
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("whyUsLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/why-mariner-finance/`);
  expect(element).toBeTruthy();
});
// 23
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("testimonialsLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/testimonials/`);
  expect(element).toBeTruthy();
});
// 24
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("marinerFinanceReviewsLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/mariner-finance-reviews/`
  );
  expect(element).toBeTruthy();
});
// 25
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("customerServiceLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/excellent-customer-service/`
  );
  expect(element).toBeTruthy();
});
// 26
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("marinerFinanceHistoryLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/history/`
  );
  expect(element).toBeTruthy();
});
// 27
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("partnerWithUs");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/`
  );
  expect(element).toBeTruthy();
});
// 28
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("pointOfSaleLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/point-of-sale-financing/`
  );
  expect(element).toBeTruthy();
});
// 29
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("corporateAcquisitionLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/corporate-acquisition/`
  );
  expect(element).toBeTruthy();
});
// 30
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("affiliateProgramLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/affiliate-program/`
  );
  expect(element).toBeTruthy();
});
// 31
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("communityOutreachLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/community-outreach/`
  );
  expect(element).toBeTruthy();
});
// 32
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("careersLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/careers/`);
  expect(element).toBeTruthy();
});
// 33
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("branchProgramLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/careers/branch-manager-trainee-and-internship-programs/`
  );
  expect(element).toBeTruthy();
});
// 34
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("jobsForVeteransLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/careers/jobs-for-veterans/`
  );
  expect(element).toBeTruthy();
});
// 35
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("corporateCultureLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/careers/corporate-culture/`
  );
  expect(element).toBeTruthy();
});
// 36
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("benefitsLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/careers/benefits/`);
  expect(element).toBeTruthy();
});
// 37
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("FAQsLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/careers/faq/`);
  expect(element).toBeTruthy();
});
// 38
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("sweepstakesLink");
  expect(element).toHaveAttribute("href", `${ServerURL}/sweepstakes/`);
  expect(element).toBeTruthy();
});
// 39
test("Desktop Menu Link availability tests", () => {
  render(component());
  const element = screen.getByTestId("MailOfferLink");
  expect(element).toHaveAttribute("href", "/select-amount/");
  expect(element).toBeTruthy();
});
//40
test("Check My Offers Button availability test", () => {
  render(component());
  const element = screen.getByTestId("checkMyOffers");
  expect(element).toBeTruthy();
});

//41
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("menuHamburgerButton");
  expect(element).toBeTruthy();
});
//42
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("personalLoansLink");
  expect(element).toBeTruthy();
});
//43
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("unexpectedExpensesLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/unexpected-expenses/`
  );
  expect(element).toBeTruthy();
});
//44
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("vacationLoansLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/vacation-loans/`
  );
  expect(element).toBeTruthy();
});
//45
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("debtConsolidationLoanLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/debt-consolidation-loans/`
  );
  expect(element).toBeTruthy();
});
//46
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("homeImprovementLoansLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/home-improvement-loans/`
  );
  expect(element).toBeTruthy();
});
//47
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("weddingLoansLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/personal-loans/wedding-loans/`
  );
  expect(element).toBeTruthy();
});
//48
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("carLoanLinkMobile");
  expect(element).toHaveAttribute("href", `${ServerURL}/car-loans/`);
  expect(element).toBeTruthy();
});
//49
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("autoRefinancingLoansLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/car-loans/auto-refinance/`
  );
  expect(element).toBeTruthy();
});
//50
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("financeCarLoansLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/car-loans/new-car-loan/`
  );
  expect(element).toBeTruthy();
});
//51
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("financeUsedCarLoanLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/car-loans/used-car-loan/`
  );
  expect(element).toBeTruthy();
});
//52
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("homeLoansLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/home-loans`);
  expect(element).toBeTruthy();
});
//53
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("homePurchaseLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/home-loans/mortgage-loans/`
  );
  expect(element).toBeTruthy();
});
//54
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("homeRefinanceLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/home-loans/home-refinance/`
  );
  expect(element).toBeTruthy();
});
//55
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("meetOurLoanOfficersLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/home-loans/meet-our-loan-officers/`
  );
  expect(element).toBeTruthy();
});
//56
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("ResourcesLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/resources/`);
  expect(element).toBeTruthy();
});
//57
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("ApplyLoanLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/resources/how-to-apply/`
  );
  expect(element).toBeTruthy();
});
//58
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("FAQLinks");
  expect(element).toHaveAttribute("href", "/faq");
  expect(element).toBeTruthy();
});
//59
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("blogLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/blog/`);
  expect(element).toBeTruthy();
});
//60
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("marinerStatesLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/state/`);
  expect(element).toBeTruthy();
});
//61
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("LegalLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/resources/legal/`);
  expect(element).toBeTruthy();
});
//62
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("whyUsLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/why-mariner-finance/`);
  expect(element).toBeTruthy();
});
//63
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("whyUsLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/why-mariner-finance/`);
  expect(element).toBeTruthy();
});
//64
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("testimonialsLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/testimonials/`);
  expect(element).toBeTruthy();
});
//65
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("marinerFinanceReviewsLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/mariner-finance-reviews/`
  );
  expect(element).toBeTruthy();
});
//66
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("excellentCustomerServiceLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/excellent-customer-service/`
  );
  expect(element).toBeTruthy();
});
//67
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("marinerFinanceHistoryLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/history/`
  );
  expect(element).toBeTruthy();
});
//68
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("partnerWithUsLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/`
  );
  expect(element).toBeTruthy();
});
//69
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("pointofSaleFinancingLink");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/point-of-sale-financing/`
  );
  expect(element).toBeTruthy();
});
//70
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("corporateAcquisitionLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/corporate-acquisition/`
  );
  expect(element).toBeTruthy();
});
//71
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("affiliateProgramLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/partner-with-us/`
  );
  expect(element).toBeTruthy();
});
//72
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("communityOutreachLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/why-mariner-finance/community-outreach/`
  );
  expect(element).toBeTruthy();
});
//73
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("careersLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/careers/`);
  expect(element).toBeTruthy();
});
//74
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("programsLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/careers/branch-manager-trainee-and-internship-programs/`
  );
  expect(element).toBeTruthy();
});
//75
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("jobsForVeteransLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/careers/jobs-for-veterans/`
  );
  expect(element).toBeTruthy();
});
//76
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("corporateCultureLinks");
  expect(element).toHaveAttribute(
    "href",
    `${ServerURL}/careers/corporate-culture/`
  );
  expect(element).toBeTruthy();
});
//77
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("benefitsLinks");
  expect(element).toHaveAttribute("href", `${ServerURL}/careers/benefits/`);
  expect(element).toBeTruthy();
});
//78
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("FAQ_Links");
  expect(element).toHaveAttribute("href", `${ServerURL}/careers/faq/`);
  expect(element).toBeTruthy();
});
//79
test("Mobile Menu Hamburger Button availability test", () => {
  render(component());
  const element = screen.getByTestId("MailOfferLinks");
  expect(element).toHaveAttribute("href", "/select-amount/");
  expect(element).toBeTruthy();
});
