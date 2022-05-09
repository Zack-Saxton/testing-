import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from '@mui/material/styles';
import NewUser from "./index.js";
import { QueryClient, QueryClientProvider } from 'react-query';

afterEach(cleanup);

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
					<NewUser />
				</CheckMyOffers>
			</QueryClientProvider>
		</ThemeProvider>	
	);
}

test("field availability test", () => {
	render(component(),{wrapper: MemoryRouter});	

	const password = screen.getByTestId("password");
	expect(password).toBeTruthy();

	const confirmPassword = screen.getByTestId("confirmpassword");
	expect(confirmPassword).toBeTruthy();

	const subtitle = screen.getByTestId("subtitle");
	expect(subtitle).toBeTruthy();

	const button = screen.getByTestId("contButton");
	expect(button).toBeTruthy();
});

test("submit with invalid password", async () => {
	const { container } = render(component(),{wrapper: MemoryRouter});	
	
	//make sure 'create password' field exists and input 'badpassword131313 as password 
	const createPassword = container.querySelector(`input[name="newPassword"]`);
	expect(createPassword).toBeTruthy();
	fireEvent.change(createPassword, { target: { value: "badpassword131313" } });
	expect(createPassword.value).toBe('badpassword131313');

	//make sure 'confirm password' field exists and input 'badpassword131313' as password 
	const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
	expect(confirmPassword).toBeTruthy();
	fireEvent.change(confirmPassword, { target: { value: "badpassword131313" } });
	expect(confirmPassword.value).toBe('badpassword131313');

	//grab 'sign in' button and try submitting
	const signInButton = screen.getByTestId("contButton");
	fireEvent.click(signInButton);

	//look for 'your password doesn't meet the criteria' error message
	expect(await screen.findByText(`Your password doesn't meet the criteria`, {exact: false})).toBeVisible();
});

test("submit with different password field values", async () => {
	const { container } = render(component(),{wrapper: MemoryRouter});	

	//make sure 'create password' field exists and input 'Pass123456789!' as password 
	const createPassword = container.querySelector(`input[name="newPassword"]`);
	expect(createPassword).toBeTruthy();
	fireEvent.change(createPassword, { target: { value: "Pass123456789!" } });
	expect(createPassword.value).toBe('Pass123456789!');

	//make sure 'confirm password' field exists and input 'Pass123456789@' as password 
	const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
	expect(confirmPassword).toBeTruthy();
	fireEvent.change(confirmPassword, { target: { value: "Pass123456789@" } });
	expect(confirmPassword.value).toBe('Pass123456789@');
	
	//grab 'sign in' button and try submitting
	const signInButton = screen.getByTestId("contButton");
	fireEvent.click(signInButton);

	//look for 'your confirmation password must match your password' error message
	expect(await screen.findByText(`Your confirmation password must match your password`, {exact: false})).toBeVisible();
});

test("submit with valid password", async () => {
	const { container } = render(component(),{wrapper: MemoryRouter});	
	
	//make sure 'create password' field exists and input 'G00dpa$$word' as password 
	const createPassword = container.querySelector(`input[name="newPassword"]`);
	expect(createPassword).toBeTruthy();
	fireEvent.change(createPassword, { target: { value: "G00dpa$$word" } });
	expect(createPassword.value).toBe('G00dpa$$word');

	//make sure 'confirm password' field exists and input 'G00dpa$$word' as password 
	const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
	expect(confirmPassword).toBeTruthy();
	fireEvent.change(confirmPassword, { target: { value: "G00dpa$$word" } });
	expect(confirmPassword.value).toBe('G00dpa$$word');

	//grab 'sign in' button and try submitting
	const signInButton = screen.getByTestId("contButton");
	fireEvent.click(signInButton);
	
	//make sure neither password field has any associated errors
	expect(createPassword.getAttribute("aria-invalid")).toBe("false");
	expect(confirmPassword.getAttribute("aria-invalid")).toBe("false");	
});