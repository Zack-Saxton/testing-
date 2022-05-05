import "@testing-library/jest-dom";
import { fireEvent, render, screen, act, cleanup, within } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import MarriedStatus from "./index.js";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import ProfilePicture from '../../../../contexts/ProfilePicture';

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
window.scrollTo = jest.fn();
const component = () =>{
	return(
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
			<CheckMyOffers>
				<ProfilePicture>
					<MarriedStatus />
				</ProfilePicture>		
			</CheckMyOffers>						
			</QueryClientProvider>
		</ThemeProvider>
	);
}
test("Checks the component is rendered", () => {
	const container  = render(component(),{wrapper: MemoryRouter});
	const element = container.getByTestId('married-status-component');
	expect(element).toBeTruthy();
});

test("Checks the marital status is visible in UI", () => {
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const input = container.querySelector(`input[name="maritalStatus"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the Continue button in  UI", ()=>{
	const { container, getByText } = render(component(),{wrapper: MemoryRouter});	
	expect(getByText("Continue")).toBeTruthy();
});

test("Check can able to select marital option", async () => {
	const container = render(component(),{wrapper: MemoryRouter});	
  const input = container.getByTestId('marital-status-list');
	await act(() => {
		fireEvent.change(input, { target: { value: "Unmarried" } });			
		fireEvent.blur(input);	
	});
	expect(input.value).toEqual('Unmarried');
});

test("If the marital status is married, then show spouse's address details", async () => {
	const container = render(component(),{wrapper: MemoryRouter});	
  const input = container.getByTestId('marital-status-list');
	await act(() => {
		fireEvent.change(input, { target: { value: "Married" } });			
		fireEvent.blur(input);	
	});
	expect(input.value).toEqual('Married');
	const element = screen.getByTestId('address-details-for-spouse');
	expect(element).toHaveClass("showMsg");
});

test("If the marital status is married, then show spouse's address details", async () => {
	const container = render(component(),{wrapper: MemoryRouter});	
  const input = container.getByTestId('marital-status-list');
	await act(() => {
		fireEvent.change(input, { target: { value: "Unmarried" } });			
		fireEvent.blur(input);	
	});
	expect(input.value).toEqual('Unmarried');
	const element = screen.getByTestId('address-details-for-spouse');
	expect(element).toHaveClass("hideMsg");
});

test("Check all spouse's address filed are showing in UI", async () => {
	const { container, getByTestId } = render(component(),{wrapper: MemoryRouter});	
  const input = getByTestId('marital-status-list');
	await act(() => {
		fireEvent.change(input, { target: { value: "Married" } });			
		fireEvent.blur(input);	
	});
	expect(input.value).toEqual('Married');
	const element = getByTestId('address-details-for-spouse');
	expect(element).toHaveClass("showMsg");
	const address = container.querySelector(`input[name="add"]`);
  expect(address).toBeTruthy();
	const spouseZipcode = container.querySelector(`input[name="spouseZipcode"]`);
  expect(spouseZipcode).toBeTruthy();
	const spouseCity = container.querySelector(`input[name="spouseCity"]`);
  expect(spouseCity).toBeTruthy();
	const spouseSelectState = container.querySelector(`input[name="spouseSelectState"]`);
  expect(spouseSelectState).toBeTruthy();
});