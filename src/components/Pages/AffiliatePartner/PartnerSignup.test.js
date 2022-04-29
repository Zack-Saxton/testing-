import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen,act } from "@testing-library/react";
import React from "react";
import PartnerSignUp from "./PartnerSignUp";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles'

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
			<BrowserRouter>
				<PartnerSignUp />
			</BrowserRouter>
		</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('partnerSignup_component');
	expect(element).toBeTruthy();
});

test("Render Email ", ()=>{
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	fireEvent.change(input, { target: { value: "mariner@gmail.com" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('mariner@gmail.com');
});

test("Check invalid email", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	fireEvent.change(input, { target: { value: "test" } });
	fireEvent.change(input, { target: { value: "test@" } });
	fireEvent.change(input, { target: { value: "test@gmail" } });
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "@test" } });
	expect(input.value).not.toBe(true);
});

test("Render  Last 4 digit Social Security Number ", ()=>{
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	fireEvent.change(input, { target: { value: "1234" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('1234');
});

test("Check Valid Last 4 digit Social Security Number", () => {
  const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "1234" } });
	expect(input.value).toBe("1234");
});


test("Render phone number ", ()=>{
	const { container } = render(component());	
	const input = container.querySelector(`input[name="callPhNo"]`);
		fireEvent.change(input, { target: { value: "(123) 123-1233" } });			
    expect(input).toBeTruthy();	
    expect(input.value).toBe('(123) 123-1233');
});

test("Check Phonenumber masking after entering phone number", async ()=>{
	const { container } = render(component());	
	const input = container.querySelector(`input[name="callPhNo"]`);
	expect(input).toBeTruthy();	
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });		
		fireEvent.blur(input);	
	});
	expect(input.value).not.toBe('1231231233');
});

test("Render phone Type ", ()=>{
	const { container } = render(component());	
	const input = container.querySelector(`input[name="phoneType"]`);		
  expect(input).toBeTruthy();	   
});

test("Select phone Type ", ()=>{
	const { container } = render(component());	
	const input = container.querySelector(`input[name="phoneType"]`);
		fireEvent.change(input, { target: { value: "cell" } });			
    expect(input).toBeTruthy();	
    expect(input.value).toBe('cell');
});

test("Render password", () => {
	const { container } = render(component());
	const element = container.querySelector(`input[name="password"]`);
	expect(element.hasAttribute("name")).toBe(true);
	fireEvent.change(element, { target: { value: "Test@123" } });
	expect(element.value).toBe("Test@123");
});


test('Password Length Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  expect(input.maxLength).toBe(30);
})

test('Password Prevent Cut Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  fireEvent.cut(input);
  expect(input.value).toBe('');
})

test('Password Prevent Copy Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  fireEvent.copy(input);
  expect(input.value).toBe('');
})

test('Password Prevent Paste Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="password"]`);
  fireEvent.paste(input);
  expect(input.value).toBe('');
})


test("Render confirmPassword", () => {
	const { container } = render(component());
	const element = container.querySelector(`input[name="confirmPassword"]`);
	expect(element.hasAttribute("name")).toBe(true);
	fireEvent.change(element, { target: { value: "Test@123" } });
	expect(element.value).toBe("Test@123");
});

test('confirmPassword Length Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  expect(input.maxLength).toBe(30);
})

test('confirmPassword Prevent Cut Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  fireEvent.cut(input);
  expect(input.value).toBe('');
})

test('confirmPassword Prevent Copy Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  fireEvent.copy(input);
  expect(input.value).toBe('');
})

test('confirmPassword Prevent Paste Test', () => {
  const { container } = render(component());
  const input = container.querySelector(`input[name="confirmPassword"]`);
  fireEvent.paste(input);
  expect(input.value).toBe('');
})


test("Button Onclick", () => {
	 render(component());  
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});

test('Should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
