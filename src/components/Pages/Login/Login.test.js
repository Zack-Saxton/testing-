import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient({
	defaultOptions: {
			queries: {
					refetchOnWindowFocus: false,
					retry: false,
					staleTime: 500000,
			},
	},
});

test("Checks the title of the page", () => {

	render(
		<QueryClientProvider client={ queryClient }>
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		 </QueryClientProvider>
			
	);
	const titleEl = screen.getByTestId("title");
	expect(titleEl).toBeTruthy();
});

test("Render email", () => {

	render(
		<QueryClientProvider client={ queryClient }>
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		 </QueryClientProvider>
	);
	const inputEl = screen.getByLabelText("Email Address *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});

test("pass valid email to test email input field", () => {

	render(
		<QueryClientProvider client={ queryClient }>
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	 </QueryClientProvider>
	);

	const inputEl = screen.getByLabelText("Email Address *");
	fireEvent.change(inputEl, { target: { value: "test@mail.com" } });
	expect(inputEl.value).toBe("test@mail.com");
	expect(screen.getByLabelText("Email Address *")).toHaveValue("test@mail.com");
	expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
});

test("Render password", () => {

	render(
		<QueryClientProvider client={ queryClient }>
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	 </QueryClientProvider>
	);

	const inputEl = screen.getByLabelText("Password *");
	expect(inputEl).toBeTruthy();
	expect(inputEl.hasAttribute("name")).toBe(true);
});



test("button Availability", () => {

	render(
		<QueryClientProvider client={ queryClient }>
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	 </QueryClientProvider>
	);
	const button = screen.getByTestId("submit");

	expect(button).toBeTruthy();
});

test("Button Onclick", () => {

	render(
		<QueryClientProvider client={ queryClient }>
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	 </QueryClientProvider>
	);
	const button = screen.getByTestId("submit");
	fireEvent.click(button);

});


test('should match the snapshot', () => {
	const { asFragment } = render(<QueryClientProvider client={ queryClient }>
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	 </QueryClientProvider>);
	expect(asFragment).toMatchSnapshot();
});


// ************************************* << Referrence for integration testing *************************************


// test("Render checkbox", () => {

// 	render(
// 		<Router history={ history }>
// 			<Login />
// 		</Router>
// 	);

// 	const checkbox = screen.getByLabelText("Remember Me");
// 	expect(checkbox).toBeInTheDocument();
// });

// test("checkbox initially unchecked", () => {

// 	render(
// 		<Router history={ history }>
// 			<Login />
// 		</Router>
// 	);
// 	const checkbox = screen.getByLabelText("Remember Me");
// 	expect(checkbox).not.toBeChecked();
// });

// test('navigation test', async() => {
// render(<QueryClientProvider client={ queryClient }>
// 		<BrowserRouter>
// 			<Login />
// 		</BrowserRouter>
// 	 </QueryClientProvider>);
// 	fireEvent.change(getByLabelText(/email/i), {target: {value: 'dan@example.com'}})
// 	fireEvent.change(getByLabelText(/password/i), {target: {value: 'password1234'}})
// 	fireEvent.click(getByText(/submit/i))
	
// 	await waitForElement(() => getByText(/logged out/i))
// });