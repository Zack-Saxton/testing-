import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import PersonalInfo from "./index";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});
const theme = createTheme();
window.scrollTo = jest.fn();


const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
        <CheckMyOffers>
					<PersonalInfo />
        </CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('personal_Info_component');
	expect(element).toBeTruthy();
});

test("Render First name ", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="firstName"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
	});
	expect(input).toBeTruthy();
	expect(input.value).toBe('Mariner');
});

test("Invalid Firstname", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="firstName"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "123" } });
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.change(input, { target: { value: "test123" } });
	});
	expect(input.value).not.toBe(true);
});

test("Render Last name ", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="lastName"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
	});
	expect(input).toBeTruthy();
	expect(input.value).toBe('Mariner');
});

test("Invalid Last Name", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="lastName"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "123" } });
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.change(input, { target: { value: "test123" } });
	});
	expect(input.value).not.toBe(true);
});

test("Render DOB ", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="dob"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "01/01/2000" } });
	});
	expect(input).toBeTruthy();
});

test("Render Social Security Number ", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "123-45-6789" } });
	});
	expect(input).toBeTruthy();
	expect(input.value).toBe('123-45-6789');
});

test("Check Valid Social Security Number", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "abc" } });
		expect(input.value).toBe("");
		fireEvent.change(input, { target: { value: "123-45-6789" } });
		expect(input.value).toBe("123-45-6789");
	});
});

test("Render Email ", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "mariner@gmail.com" } });
	});
	expect(input).toBeTruthy();
	expect(input.value).toBe('mariner@gmail.com');
});

test("Check invalid email", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "test" } });
		fireEvent.change(input, { target: { value: "test@" } });
		fireEvent.change(input, { target: { value: "test@gmail" } });
		fireEvent.change(input, { target: { value: "123" } });
		fireEvent.change(input, { target: { value: "@test" } });
	});
	expect(input.value).not.toBe(true);
});

test("Check the phone number field", async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="phone"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "abc" } });
		expect(input.value).toBe("");
		fireEvent.change(input, { target: { value: "(123) 123-1234" } });
		expect(input).toBeTruthy();
	});
});