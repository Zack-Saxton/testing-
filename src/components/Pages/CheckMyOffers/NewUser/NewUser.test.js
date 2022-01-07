import React from "react";
import { cleanup, render } from "@testing-library/react";
import NewUser from "./index.js";
import CheckMyOffers from "../../../contexts/CheckMyOffers";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterEach(cleanup);

test("Availability test", () => {
	const container = render(
		<BrowserRouter>
			<CheckMyOffers>
				<NewUser />
			</CheckMyOffers>
		</BrowserRouter>
	);

	const Password = container.getByTestId("password");
	expect(Password).toBeTruthy();

	const ConfirmPassword = container.getByTestId("confirmpassword");
	expect(ConfirmPassword).toBeTruthy();

	const button = container.getByTestId("contButton");
	expect(button).toBeTruthy();
});
