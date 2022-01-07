import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("Checks the title of the page", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);
	const titleEl = screen.getByTestId("title");
	expect(titleEl).toBeTruthy();
});

test("Render email", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);
	const inputEl = screen.getByLabelText("Email *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("pass valid email to test email input field", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
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
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);

	const inputEl = screen.getByLabelText("password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("Render checkbox", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);

	const checkbox = screen.getByLabelText("Remember Me");
	expect(checkbox).toBeInTheDocument();
});

test("checkbox initially unchecked", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);
	const checkbox = screen.getByLabelText("Remember Me");
	expect(checkbox).not.toBeChecked();
});

test("button Availability", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);
	const button = screen.getByTestId("submit");

	expect(button).toBeTruthy();
});

test("Button Onclick", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Login />
		</Router>
	);
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});
