import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import MailingAddress from './MailingAddress';
import { basicInformationData } from "../../../__mock__/data/MyProfile.data";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import { GlobalStateProvider } from "../../../../src/contexts/GlobalStateProvider";
import { mailingAddress } from "../../Controllers/MyProfileController";
jest.mock('../../Controllers/MyProfileController');

import Cookies from "js-cookie";
Cookies.set("hasActiveLoan", "true");
Cookies.set("hasApplicationStatus", "rejected");
jest.mock('../../Controllers/ZipCodeLookup');

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
		<GlobalStateProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ProfilePicture>
						<MailingAddress
							basicInformationData={ basicInformationData }
							getUserAccountDetails={[]}
						/>
					</ProfilePicture>
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('basic-information-mailing-address');
	expect(element).toBeTruthy();
});

test("Check the Street address field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="streetAddress"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('1234 MAIN AVE');
});

test("Check the City field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('NEWARK');
});

test("Check the state field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('DE');
});

test("Check the zipcode field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('19702');
});

test("Check the cancel button in  UI", () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	expect(getByText("Cancel")).toBeTruthy();
});

test("Check the Save button in  UI", () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	expect(getByText("Save Changes")).toBeTruthy();
});

test("City field to be disabled in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("State field to be disabled in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check the zipcode max length to be 5", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.maxLength).toBe(5);
});

test("Check can able to enter Street address in UI", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="streetAddress"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "4321 MAIN AVE" } });
	});
	expect(input.value).toBe('4321 MAIN AVE');
});

test("Check can able to enter Zipcode in UI", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	ZipCodeLookup.mockResolvedValue({result:{"result":"success","status":200,"data":{"zipCode":"90012","cityName":"Los Angeles","stateCode":"CA"}}});
	const input = container.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "19701" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('19701');
	await act(() => {
		fireEvent.click(screen.getByText('Save Changes'));
	});
});

test("Check can able to click Save button", async () => {
	mailingAddress.mockResolvedValue({data: {"emailUpdate":true,"notes":["Customer has updated Phone Number from 3373373373 TO 3373373374"]}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="streetAddress"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "4321 MAIN AVE11" } });
		fireEvent.click(screen.getByText('Save Changes'));
	});	
});

test("Check can able to click Save button without changing value", async () => {
	mailingAddress.mockResolvedValue({data: {"emailUpdate":true,"notes":["Customer has updated Phone Number from 3373373373 TO 3373373374"]}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	await act(() => {
		fireEvent.click(screen.getByText('Save Changes'));
	});	
});


test("Check can able to click Cancel button", async () => {
	render(component(), { wrapper: MemoryRouter });
	const resetButton = screen.getByTestId('cancel-reset-form');
	await act(() => {
		fireEvent.click(resetButton);
	});	
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});