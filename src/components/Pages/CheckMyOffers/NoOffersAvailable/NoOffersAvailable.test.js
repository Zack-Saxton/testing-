import { cleanup, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import NoOffersAvailable from "./index.js";

afterEach(cleanup);
window.scrollTo = jest.fn();
test("Image Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <NoOffersAvailable />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const NoOffersAvailablesImage = container.getByTestId("noOffersAvailableImage");
  expect(NoOffersAvailablesImage).toBeTruthy();
});

test("NoOffers Text Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <NoOffersAvailable />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const CongratsText = container.getByTestId("noOffersTypography");
  expect(CongratsText).toBeTruthy();
});

test("no Offers Brif Text Availability test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <NoOffersAvailable />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const CongratsText = container.getByTestId("noOffersBrifTypography");
  expect(CongratsText).toBeTruthy();
});

test("Blog button Availability Test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <NoOffersAvailable />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const viewOffersButton = container.getByText("Blog");
  expect(viewOffersButton).toBeTruthy();
});

test("Back To Home button Availability Test", () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <NoOffersAvailable />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const viewOffersButton = container.getByText("Back to Home");
  expect(viewOffersButton).toBeTruthy();
});
