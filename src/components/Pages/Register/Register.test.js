import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Register from "./Register";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("Checks the title of the page", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const titleEl = screen.getByTestId("title");
	expect(titleEl).toBeTruthy();
});

test("Checks the subtitle of the page", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const titleEl = screen.getByTestId("subtitle");
	expect(titleEl).toBeTruthy();
});

test("Textbox Firstname", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("First Name *");
	expect(input).toBeTruthy();
	expect(input.hasAttribute("name")).toBe(true);
});

test("Invalid Firstname", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("First Name *");
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "" } });
	fireEvent.change(input, { target: { value: "test123" } });

	expect(screen.getByLabelText("First Name *")).not.toBe(true);
});

test("Textbox Lastname", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Last Name *");
	expect(input).toBeTruthy();
	expect(input.hasAttribute("name")).toBe(true);
});

test("Invalid Lastname", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Last Name *");
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "" } });
	fireEvent.change(input, { target: { value: "test123" } });

	expect(screen.getByLabelText("Last Name *")).not.toBe(true);
});

test("Render email", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
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
			<Register />
		</Router>
	);

	const inputEl = screen.getByLabelText("Email *");
	fireEvent.change(inputEl, { target: { value: "test@mail.com" } });
	expect(inputEl.value).toBe("test@mail.com");

	expect(screen.getByLabelText("Email *")).toHaveValue("test@mail.com");
	expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
});

test("pass invalid email to test input value", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);

	const inputEl = screen.getByLabelText("Email *");
	fireEvent.change(inputEl, { target: { value: "test" } });
	fireEvent.change(inputEl, { target: { value: "test@" } });
	fireEvent.change(inputEl, { target: { value: "test@gmail" } });
	fireEvent.change(inputEl, { target: { value: "123" } });
	fireEvent.change(inputEl, { target: { value: "@test" } });
	expect(screen.getByLabelText("Email *")).not.toBe(true);
});

test("Zipcode availability test", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	expect(input).toBeTruthy();
	expect(input.value).toBe("");
	expect(input.hasAttribute("name")).toBe(true);
});

test("Zipcode Input test", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	fireEvent.change(input, { target: { value: "123" } });
	expect(input.value).toBe("123");
});

test("Get only numeric value for zipcode", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "123" } });
	expect(input.value).toBe("123");
});

it("zipcode should be 5 digits", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	expect(input.maxLength).toBe(5);
});

test("Render Date of birth", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);

	const input = screen.getByTestId("datePicker");

	expect(input).toBeTruthy();
});

test("Render password", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);

	const inputEl = screen.getByLabelText("Create new password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
	fireEvent.change(inputEl, { target: { value: "Test@123" } });
	expect(inputEl.value).toBe("Test@123");
});

test("Render confirm  password", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);

	const inputEl = screen.getByLabelText("Re-enter your password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("button Availability", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const button = screen.getByTestId("submit");

	expect(button).toBeTruthy();
});

test("Button Onclick", () => {
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<Register />
		</Router>
	);
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});
