import { cleanup, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ReferredToBranch from "./index.js";

afterEach(cleanup);
window.scrollTo = jest.fn();
test("Text Availability test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const CongratsText = container.getByTestId("congratsTypography");
	expect(CongratsText).toBeTruthy();
});

test("receive Money Texts Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const receiveMoneyTexts = container.getByTestId("receiveMoneyGrid");
	expect(receiveMoneyTexts).toBeTruthy();
});


test("Before Visiting Text Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const beforeVisitingText = container.getByTestId("beforeVisitingTypography");
	expect(beforeVisitingText).toBeTruthy();
});

test("Precautions Text Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const precautionsText = container.getByTestId("precautionsTypography");
	expect(precautionsText).toBeTruthy();
});


test("Loan Approval Text Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const loanApprovalText = container.getByTestId("loanApprovalTextDiv");
	expect(loanApprovalText).toBeTruthy();
});

test("Approval Application Text Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const approvalApplicationText = container.getByTestId("loanApprovalApplicationTypography");
	expect(approvalApplicationText).toBeTruthy();
});

test("Finish by Branch button Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const finishByBranchButton = container.getByText("Finish by Branch");
	expect(finishByBranchButton).toBeTruthy();
});

test("Finish by Phone button Availability Test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<ReferredToBranch />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const finishByPhoneButton = container.getByText("Finish by Phone");
	expect(finishByPhoneButton).toBeTruthy();
});