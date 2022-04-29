import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import ProfilePicture from '../../../contexts/ProfilePicture';
import { GlobalStateProvider } from "../../../../src/contexts/GlobalStateProvider";

import TextNotification from './TextNotification';

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
const component = () =>{
	return(
		<GlobalStateProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ProfilePicture>
						<TextNotification/>
					</ProfilePicture>				
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>		
	);
}

test("Check the component is rendered", () => {
	render(component(),{wrapper: MemoryRouter});
	const element = screen.getByTestId('profile-text-notification');	
	expect(element).toBeTruthy();
});

test("Check the the notification switch option in UI", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('notification-switch');
  expect(element).toBeTruthy();
});

test("Check the the phone number field in UI", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();	
});

test("Check the the notification switch option in UI", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('notification-terms');
  expect(element).toBeTruthy();
});

test("Check the cancel button in  UI", ()=>{
	const { container, getByText } = render(component(),{wrapper: MemoryRouter});	
	expect(getByText("Cancel")).toBeTruthy();
});

test("Check the Save button in  UI", ()=>{
	const { container, getByText } = render(component(),{wrapper: MemoryRouter});	
	expect(getByText("Update")).toBeTruthy();
});

test("By default the switch to be Off", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('notification-switch');
  expect(element).not.toBeChecked();
});

test("The switch to be On in click event", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('notification-switch');
	fireEvent.click(element);
  expect(element).toBeChecked();
});

test("The switch to be On and Off when click two time", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('notification-switch');
  fireEvent.click(element);
  fireEvent.click(element);
  expect(element).not.toBeChecked();
});

test("Check can able to enter phone number in Phone Number filed in UI", async ()=>{
	const { container } = render(component(),{wrapper: MemoryRouter});
	const element = container.querySelector(`input[name="phone"]`);
	expect(element).toBeTruthy();	
	await act(() => {
		fireEvent.change(element, { target: { value: "(123) 123-1235" } });			
	});
	expect(element.value).toBe('(123) 123-1235');
});

test("Check number masking after entering phone number", async ()=>{
	const { container } = render(component(),{wrapper: MemoryRouter});
	const element = container.querySelector(`input[name="phone"]`);
	expect(element).toBeTruthy();	
	await act(() => {
		fireEvent.change(element, { target: { value: "1231231233" } });		
		fireEvent.blur(element);	
	});
	expect(element.value).not.toBe('1231231233');
});

test("Check number masking after entering phone number", async ()=>{
	const { container } = render(component(),{wrapper: MemoryRouter});
	const element = container.querySelector(`input[name="phone"]`);
	expect(element).toBeTruthy();	
	await act(() => {
		fireEvent.change(element, { target: { value: "1231231235" } });		
		fireEvent.blur(element);	
	});
	expect(element.value).toBe('(123) 123-1235');
});

test("Check can able to select terms check box UI", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
	const element = container.querySelector(`input[id="textingterms"]`);	
	fireEvent.click(element);
  expect(element).toBeChecked();
});

test("Check can able to select and deselect terms check box UI", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
	const element = container.querySelector(`input[id="textingterms"]`);	
	fireEvent.click(element);
	fireEvent.click(element);
  expect(element).not.toBeChecked();
});

test("Check can able to click Cancel button", async ()=>{
	const { container, getByText } = render(component(),{wrapper: MemoryRouter});	
	const element = getByText("Cancel");
	await act(() => {
		fireEvent.click(element);	
	});
});

test("Check can able to click Update button", async ()=>{
	const { container, getByText } = render(component(),{wrapper: MemoryRouter});	
	const element = getByText("Update");
	await act(() => {
		fireEvent.click(element);	
	});
});

test("Check the disclosure link is showing in UI", () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('disclosure-link');
  expect(element).toBeTruthy();
});

test("Check the disclosure popup is opening when click the link", async () => {
  const { container } = render(component(),{wrapper: MemoryRouter});	
  const element = screen.getByTestId('disclosure-link');
	await act(() => {
		fireEvent.click(element);	
	});
	const disclosurePopup = screen.getByTestId('disclosure-popup');	
  expect(disclosurePopup).toBeTruthy();
});