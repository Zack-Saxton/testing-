import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import Register from "./Register";

test("Checks the title of the page", () => {
	
	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const titleEl = screen.getByTestId("title");
	expect(titleEl).toBeTruthy();
});

test("Checks the subtitle of the page", () => {
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const titleEl = screen.getByTestId("subtitle");
	expect(titleEl).toBeTruthy();
});

test("Textbox Firstname", () => {
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("First Name *");
	expect(input).toBeTruthy();
	expect(input.hasAttribute("name")).toBe(true);
});

test("Invalid Firstname", () => {
	

	render(
		<Router history={ history }>
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
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Last Name *");
	expect(input).toBeTruthy();
	expect(input.hasAttribute("name")).toBe(true);
});

test("Invalid Lastname", () => {
	

	render(
		<Router history={ history }>
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
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const inputEl = screen.getByLabelText("Email *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("pass valid email to test email input field", () => {
	

	render(
		<Router history={ history }>
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
	

	render(
		<Router history={ history }>
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
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	expect(input).toBeTruthy();
	expect(input.value).toBe("");
	expect(input.hasAttribute("name")).toBe(true);
});

test("Zipcode Input test", () => {
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	fireEvent.change(input, { target: { value: "123" } });
	expect(input.value).toBe("123");
});

test("Get only numeric value for zipcode", () => {
	

	render(
		<Router history={ history }>
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
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const input = screen.getByLabelText("Zipcode *");
	expect(input.maxLength).toBe(5);
});

test("Render Date of birth", () => {
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);

	const input = screen.getByTestId("datePicker");

	expect(input).toBeTruthy();
});

test("Render password", () => {
	

	render(
		<Router history={ history }>
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
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);

	const inputEl = screen.getByLabelText("Re-enter your password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("button Availability", () => {
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const button = screen.getByTestId("submit");

	expect(button).toBeTruthy();
});

test("Button Onclick", () => {
	

	render(
		<Router history={ history }>
			<Register />
		</Router>
	);
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});
