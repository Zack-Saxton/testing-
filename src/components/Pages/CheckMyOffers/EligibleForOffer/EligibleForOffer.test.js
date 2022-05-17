import { cleanup, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import EligibleForOffer from "./index.js";

afterEach(cleanup);
window.scrollTo = jest.fn();
test("Image Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EligibleForOffer />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const EligibleForOffersImage = container.getByTestId(
    "EligibleForOffersImage"
  );
  expect(EligibleForOffersImage).toBeTruthy();
});

test("Congrats Text Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EligibleForOffer />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const CongratsText = container.getByTestId("congratsTypography");
  expect(CongratsText).toBeTruthy();
});

test("Eligible Text Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EligibleForOffer />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const EligibleText = container.getByTestId("eligibleTypography");
  expect(EligibleText).toBeTruthy();
});

test("View Offers button Availability Test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EligibleForOffer />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const viewOffersButton = container.getByText("View Offers");
  expect(viewOffersButton).toBeTruthy();
});

test("Loan Funding Text Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EligibleForOffer />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const LoanFundingText = container.getByTestId("loanFundingTypography");
  expect(LoanFundingText).toBeTruthy();
});

test("Loan Funding Text Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EligibleForOffer />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const ApprovalLoanText = container.getByTestId("approvalLoanTextTypography");
  expect(ApprovalLoanText).toBeTruthy();
});
