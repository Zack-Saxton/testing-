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
				<ProfilePicture>
					<MailingAddress
						basicInformationData={ basicInformationData }
						getUserAccountDetails={[]}
					/>
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
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
	const input = container.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "19701" } });
	});
	expect(input.value).toBe('19701');
});

test("Check can able to click Save button", async () => {
	render(component(), { wrapper: MemoryRouter });
	await act(() => {
		fireEvent.click(screen.getByText('Save Changes'));
	});	
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});