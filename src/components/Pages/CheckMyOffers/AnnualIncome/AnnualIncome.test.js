import React from "react";
import { cleanup, render } from "@testing-library/react";
import AnnualIncome from "./index.js";
import CheckMyOffers from "../../../contexts/CheckMyOffers";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterEach(cleanup);

test("Availability test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<AnnualIncome />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const annualIncome = container.getByTestId("annualIncome");
	expect(annualIncome).toBeTruthy();
	const personalIncome = container.getByTestId("personalIncome");
	expect(personalIncome).toBeTruthy();
	const button = container.getByTestId("contButton");
	expect(button).toBeTruthy();
});
