import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from '@mui/material/styles';
import ExistingUser from "./index.js";
import { QueryClient, QueryClientProvider } from 'react-query';

afterEach(cleanup);
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

const theme = createTheme();
const component = () =>{
	return(
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CheckMyOffers>
					<ExistingUser />
				</CheckMyOffers>
			</QueryClientProvider>
		</ThemeProvider>	
	);
}


 // Testing to Making sure all fields exist for user

	test("Field Availability test", () => {
		render(component(),{wrapper: MemoryRouter});	
		
		//Check if Sign In button renders
		const button = screen.getByTestId("SignInButton");
		expect(button).toBeTruthy();

		//Check if password input field renders
		const password = screen.getByTestId("password");
		expect(password).toBeTruthy();

		// Check if subtitle renders
		const subtitle = screen.getByTestId("subtitle");
		expect(subtitle).toBeTruthy();
		
	});

// Check if Show and Hide button renders
	test("Show and Hide button renders", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });

	const button =  container.querySelector(".MuiButtonBase-root");
	expect(button).toBeTruthy();

	});

// Check if sign in button functions correctly
	test("Checks that Sign In button functions correctly", () => {
		render(component(), { wrapper: MemoryRouter });
		const button = screen.getByTestId("SignInButton");
		fireEvent.click(button);
	});

	// Show and hide button functionality works
	test("Show and hide button functionality works", () => {

	const { container } = render(component(), { wrapper: MemoryRouter });
  const showButton = container.querySelector(`input[name="password"]`);
  expect(showButton).toHaveAttribute("type", "password");

	const button =  container.querySelector(".MuiButtonBase-root");
	fireEvent.click(button);


	const hideButton = container.querySelector(`input[name="password"]`);
	expect(hideButton).toHaveAttribute("type", "text");  
	
		});

		test('should match the snapshot Test', () => {
			const { asFragment } = render(component(), {wrapper: MemoryRouter}); 
			expect(asFragment).toMatchSnapshot();
		})
















	
	
