import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";


const theme = createTheme();
window.scrollTo = jest.fn();
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Login />
					</BrowserRouter>
				</QueryClientProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
}
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
test("Checks the title of the page", () => {

	render(component());
	const titleEl = screen.getByTestId("title");
	expect(titleEl).toBeTruthy();
});


test("Render email", () => {

	render(component());
	const inputEl = screen.getByLabelText("Email Address *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("pass valid email to test email input field", async () => {

	render(component());

	const inputEl = screen.getByLabelText("Email Address *");
	await act(() => {
		fireEvent.change(inputEl, { target: { value: "test@mail.com" } });
	});
	expect(inputEl.value).toBe("test@mail.com");
	expect(screen.getByLabelText("Email Address *")).toHaveValue("test@mail.com");
	expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
});

test("Render password", () => {

	render(component());

	const inputEl = screen.getByLabelText("Password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});



test("button Availability", () => {

	render(component());
	const button = screen.getByTestId("submit");

	expect(button).toBeTruthy();
});

test("Button Onclick", async () => {

	render(component());
	const button = screen.getByTestId("submit");
	await act(() => {
		fireEvent.click(button);
	});

});


test('should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});

