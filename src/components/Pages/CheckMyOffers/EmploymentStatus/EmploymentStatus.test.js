import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../contexts/CheckMyOffers";
import EmploymentStatus from "./index.js";

afterEach(cleanup);

test("Availability test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<EmploymentStatus />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const Hourly = container.getByTestId("Hourly");
	expect(Hourly).toBeTruthy();
	const Salary = container.getByTestId("Salary");
	expect(Salary).toBeTruthy();
	const selfEmployed = container.getByTestId("selfEmployed");
	expect(selfEmployed).toBeTruthy();
	const Unemployed = container.getByTestId("Unemployed");
	expect(Unemployed).toBeTruthy();
	const Retired = container.getByTestId("Retired");
	expect(Retired).toBeTruthy();
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton).toBeTruthy();
	expect(ContinueButton.hasAttribute("disabled")).toBe(true);
});

test("Availability test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<EmploymentStatus />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Salary");
	const selfEmployed = container.getByTestId("selfEmployed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	fireEvent.click(Hourly);
	expect(Hourly).toHaveClass("activeBorder");
	expect(Salary).not.toHaveClass("activeBorder");
	expect(selfEmployed).not.toHaveClass("activeBorder");
	expect(Unemployed).not.toHaveClass("activeBorder");
	expect(Retired).not.toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});
