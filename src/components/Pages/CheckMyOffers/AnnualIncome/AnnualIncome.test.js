import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../contexts/CheckMyOffers";
import AnnualIncome from "./index.js";

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
