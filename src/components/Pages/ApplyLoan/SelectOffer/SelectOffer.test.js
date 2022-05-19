import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../../contexts/NavContext";
import { useFetchOffer } from "../ApplyForLoanHook/useFetchOffer";
import ApplyLoan from "./SelectOffer";


const theme = createTheme();

const mockOffers = {
  "data": {
    Offers: {
      "12": [
        {
          "model_code": "individual-credit-engine-mariner-12-month",
          "cosigner_required": false,
          "loan_amount": 7000,
          "annual_interest_rate": 0.2648,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2648,
          "monthly_payment": 670.35,
          "term": 12,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.22087314662273477,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.23320285714285713,
          "post_loan_debt_and_expenses_to_net_income": 0.44808,
          "post_loan_debt_to_net_income": 0.31093714285714286,
          "_id": "6246c3b7ce328e04806f326f",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan-12-month",
              "guid": "PT-UN00001005"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_12_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product 12 month",
            "_id": "58f52e87924ecefde2ce3293",
            "createdat": "2017-04-17T00:00:00.000Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$7,000.00"
        },
        {
          "model_code": "individual-credit-engine-mariner-12-month",
          "cosigner_required": false,
          "loan_amount": 6500,
          "annual_interest_rate": 0.2715,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2715,
          "monthly_payment": 624.59,
          "term": 12,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.20579571663920923,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.22535828571428576,
          "post_loan_debt_and_expenses_to_net_income": 0.43762057142857147,
          "post_loan_debt_to_net_income": 0.3004777142857143,
          "_id": "6246c3b7ce328e04806f326e",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan-12-month",
              "guid": "PT-UN00001005"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_12_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product 12 month",
            "_id": "58f52e87924ecefde2ce3293",
            "createdat": "2017-04-17T00:00:00.000Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$6,500.00"
        },
        {
          "model_code": "individual-credit-engine-mariner-12-month",
          "cosigner_required": false,
          "loan_amount": 6000,
          "annual_interest_rate": 0.2789,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2789,
          "monthly_payment": 578.71,
          "term": 12,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.19067874794069195,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.21749314285714288,
          "post_loan_debt_and_expenses_to_net_income": 0.4271337142857143,
          "post_loan_debt_to_net_income": 0.28999085714285716,
          "_id": "6246c3b7ce328e04806f326d",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan-12-month",
              "guid": "PT-UN00001005"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_12_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product 12 month",
            "_id": "58f52e87924ecefde2ce3293",
            "createdat": "2017-04-17T00:00:00.000Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$6,000.00"
        }
      ],
      "24": [
        {
          "model_code": "individual-credit-engine-mariner-24-month",
          "cosigner_required": false,
          "loan_amount": 7000,
          "annual_interest_rate": 0.2628,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2628,
          "monthly_payment": 378.11,
          "term": 24,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.12458319604612851,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.18310457142857145,
          "post_loan_debt_and_expenses_to_net_income": 0.38128228571428574,
          "post_loan_debt_to_net_income": 0.2441394285714286,
          "_id": "6246c3b7ce328e04806f3282",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan-24-month",
              "guid": "PT-UN00001004"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_24_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product 24 month",
            "_id": "58f52e74924ecefde2ce3292",
            "createdat": "2017-04-17T00:00:00.000Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$7,000.00"
        },
        {
          "model_code": "individual-credit-engine-mariner-24-month",
          "cosigner_required": false,
          "loan_amount": 6500,
          "annual_interest_rate": 0.2695,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2695,
          "monthly_payment": 353.31,
          "term": 24,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.11641186161449753,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.17885314285714285,
          "post_loan_debt_and_expenses_to_net_income": 0.3756137142857143,
          "post_loan_debt_to_net_income": 0.23847085714285712,
          "_id": "6246c3b7ce328e04806f3281",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan-24-month",
              "guid": "PT-UN00001004"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_24_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product 24 month",
            "_id": "58f52e74924ecefde2ce3292",
            "createdat": "2017-04-17T00:00:00.000Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$6,500.00"
        },
        {
          "model_code": "individual-credit-engine-mariner-24-month",
          "cosigner_required": false,
          "loan_amount": 6000,
          "annual_interest_rate": 0.2769,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2769,
          "monthly_payment": 328.38,
          "term": 24,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.10819769357495881,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.17457942857142858,
          "post_loan_debt_and_expenses_to_net_income": 0.3699154285714286,
          "post_loan_debt_to_net_income": 0.23277257142857144,
          "_id": "6246c3b7ce328e04806f3280",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan-24-month",
              "guid": "PT-UN00001004"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_24_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product 24 month",
            "_id": "58f52e74924ecefde2ce3292",
            "createdat": "2017-04-17T00:00:00.000Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$6,000.00"
        }
      ],
      "36": [
        {
          "model_code": "individual-credit-engine-mariner-36-month",
          "cosigner_required": false,
          "loan_amount": 7000,
          "annual_interest_rate": 0.2599,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2599,
          "monthly_payment": 282,
          "term": 36,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.0929159802306425,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.16662857142857143,
          "post_loan_debt_and_expenses_to_net_income": 0.3593142857142857,
          "post_loan_debt_to_net_income": 0.22217142857142858,
          "_id": "6246c3b7ce328e04806f3295",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan",
              "guid": "PT-UN00001001"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_36_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product",
            "_id": "58b44ccc924ecefde2ce328d",
            "createdat": "2017-02-27T17:27:00.201Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$7,000.00"
        },
        {
          "model_code": "individual-credit-engine-mariner-36-month",
          "cosigner_required": false,
          "loan_amount": 6500,
          "annual_interest_rate": 0.2665,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2665,
          "monthly_payment": 264.14,
          "term": 36,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.08703130148270181,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.16356685714285715,
          "post_loan_debt_and_expenses_to_net_income": 0.355232,
          "post_loan_debt_to_net_income": 0.21808914285714284,
          "_id": "6246c3b7ce328e04806f3294",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan",
              "guid": "PT-UN00001001"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_36_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product",
            "_id": "58b44ccc924ecefde2ce328d",
            "createdat": "2017-02-27T17:27:00.201Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$6,500.00"
        },
        {
          "model_code": "individual-credit-engine-mariner-36-month",
          "cosigner_required": false,
          "loan_amount": 6000,
          "annual_interest_rate": 0.2739,
          "origination_fee_rate": 0,
          "origination_fee_amount": 0,
          "apr": 0.2739,
          "monthly_payment": 246.21,
          "term": 36,
          "display": true,
          "type": "online_underwriting",
          "pricing_grade": null,
          "marginal_offer": 0,
          "displayPromoOffer": false,
          "postScreenOffer": null,
          "payment_to_income": 0.08112355848434927,
          "displayLightBoxOffer": false,
          "lightBoxOffer": null,
          "maximum_post_loan_detni": 0.65,
          "post_loan_debt_to_income": 0.16049314285714286,
          "post_loan_debt_and_expenses_to_net_income": 0.35113371428571427,
          "post_loan_debt_to_net_income": 0.21399085714285715,
          "_id": "6246c3b7ce328e04806f3293",
          "applicant": "6246c3acce328e04806f3238",
          "product": {
            "identification": {
              "name": "unsecured-individual-loan",
              "guid": "PT-UN00001001"
            },
            "contenttypes": [],
            "entitytype": "product",
            "credit_product": "unsecured_individual_loan_36_month",
            "credit_product_type": "loan",
            "parent_product_type": "unsecured_individual_loan",
            "description": "unsecured individual loan product",
            "_id": "58b44ccc924ecefde2ce328d",
            "createdat": "2017-02-27T17:27:00.201Z",
            "updatedat": "2022-04-28T16:59:25.930Z"
          },
          "offerType": "online",
          "loan_proceeds": "$6,000.00"
        }
      ]
    }
  }
}

jest.mock("../ApplyForLoanHook/useFetchOffer", () => ({
  useFetchOffer: jest.fn(),
}))


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

const MockActiveloans = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavContext>
              <ApplyLoan />
            </NavContext>
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}

describe("while loading", () => {
  it("renders a loader", () => {
    useFetchOffer.mockImplementation(() => ({
      isLoading: true,
      offers: mockOffers,
    }));
    const container = render(MockActiveloans());
    const selectOffer = screen.getByText("1. Select Offer");
    expect(selectOffer).toBeTruthy();
  });

  it("renders the Stepper Bar with all the steps", () => {
    useFetchOffer.mockImplementation(() => ({
      isLoading: true,
      offers: mockOffers,
    }));
    render(MockActiveloans());
    const selectOffer = screen.getByText("1. Select Offer");
    expect(selectOffer).toBeTruthy();
    expect(selectOffer.hasAttribute('disabled')).not.toBe(true);
    const reviewAndSignTab = screen.getByText("2. Review & Sign");
    expect(reviewAndSignTab.hasAttribute('disabled')).toBe(true);
    const finalVerifyTab = screen.getByText("3. Final Verification");
    expect(finalVerifyTab.hasAttribute('disabled')).toBe(true);
    const reciveMoney = screen.getByText("4. Receive your money");
    const reciveMoney123 = screen.getByTestId("offerTableBlock");
    expect(reciveMoney123).toBeTruthy();
    expect(reciveMoney.hasAttribute('disabled')).toBe(true);
  });

  it("Renders Offer Table Page", () => {
    useFetchOffer.mockImplementation(() => ({
      isLoading: false,
      offers: mockOffers,
    }));
    const container = render(MockActiveloans());
    const offerTableBlock = container.getByTestId("offer_Table");
    expect(offerTableBlock).toBeTruthy();
    // container.debug(offerTableBlock, 300000);
    const termGrid = container.getByTestId("termGrid");
    expect(termGrid).toBeTruthy();
  });
});

it("Check number of rows in Offer Table", () => {
  useFetchOffer.mockImplementation(() => ({
    isLoading: false,
    offers: mockOffers,
  }));
  const container = render(MockActiveloans());
  expect(container.getAllByRole('row')).toHaveLength(4);
});

it("Check the Button is disabled Initially", () => {
  useFetchOffer.mockImplementation(() => ({
    isLoading: false,
    offers: mockOffers,
  }));
  const container = render(MockActiveloans());
  const offerTableBlock = container.getByTestId("Continue_Button");
  expect(offerTableBlock.getAttribute("disabled")).toBe("");
});

it("Continue Button Enable Test", () => {
  useFetchOffer.mockImplementation(() => ({
    isLoading: false,
    offers: mockOffers,
  }));
  const container = render(MockActiveloans());
  const radioButtonDetect = container.getByTestId("offer_Table_Radio_1")
  expect(radioButtonDetect).toBeTruthy();
  fireEvent.click(radioButtonDetect);
  container.debug(radioButtonDetect, 300000)
  const offerTableBlock = container.getByTestId("Continue_Button");
  expect(offerTableBlock.getAttribute("disabled")).toBe("");
});
