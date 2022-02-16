import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import Login from "./Login";

test("Checks the title of the page", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);
	const titleEl = screen.getByTestId("title");
	expect(titleEl).toBeTruthy();
});

test("Render email", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);
	const inputEl = screen.getByLabelText("Email *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("pass valid email to test email input field", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);

	const inputEl = screen.getByLabelText("Email *");
	fireEvent.change(inputEl, { target: { value: "test@mail.com" } });
	expect(inputEl.value).toBe("test@mail.com");
	expect(screen.getByLabelText("Email *")).toHaveValue("test@mail.com");
	expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
});

test("Render password", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);

	const inputEl = screen.getByLabelText("password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("Render checkbox", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);

	const checkbox = screen.getByLabelText("Remember Me");
	expect(checkbox).toBeInTheDocument();
});

test("checkbox initially unchecked", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);
	const checkbox = screen.getByLabelText("Remember Me");
	expect(checkbox).not.toBeChecked();
});

test("button Availability", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);
	const button = screen.getByTestId("submit");

	expect(button).toBeTruthy();
});

test("Button Onclick", () => {
	const navigate = createMemoryHistory();

	render(
		<Router history={ history }>
			<Login />
		</Router>
	);
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});
