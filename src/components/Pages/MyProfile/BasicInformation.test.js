import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import BasicInformationCard from './BasicInformation';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});
const basicInformationData = { "extensionattributes": { "login": { "timestamp_date": "2022-04-25T12:55:04.190Z" } }, "sorad": { "latest_application": { "application": "623890e6676f6d044d5a9b54", "application_submission_date": "2022-03-21T14:51:18.344Z" }, "submissions": [ "61d57e630d6ea40483403fdd", "61d57e770d6ea40483404020", "61d57e8a0d6ea40483404063", "61d57ece0d6ea404834040a6", "61d57edc0d6ea404834040e9", "61d57f7f0d6ea4048340412c", "61dbfbf68203da0482e6f1ba", "620147a12775f104842a7c3a", "620fdd0c5a3712047b74cee6", "6220f00c39d65c04cd4211cd", "6220f39239d65c04cd421772", "6220fca039d65c04cd4224ca", "6220febb39d65c04cd42268f", "6221012a39d65c04cd422b33", "6221030439d65c04cd422e60", "6221067539d65c04cd4230ef", "62210c6139d65c04cd423362", "62210da139d65c04cd42340c", "6238821f676f6d044d5a88c4", "6238857b676f6d044d5a8aac", "623890e6676f6d044d5a9b4b" ], "issuedproducts": [], "applications": [ "5c743dbcffbf7814ab74f6db", "5c7569028eb7bb0f105a7d1c", "5c7694f7e3daed05e5c3abd2", "5c769787881f03067f49b666", "5c780e5ec8f05305e9c04ca9", "5c78108dc8f05305e9c04cd1", "5c7937b321b80d06c6be1e68", "5c7ffb7bd90b1002d373229d", "5c8006c3d90b1002d37322b8", "5c812a5666e3bc09b253824f", "5c812ca966e3bc09b2538266", "5c81305e66e3bc09b253827e", "5c8681c366395602792874fc", "5c87a5ad3bc2831e5beff074", "5c87a8e73bc2831e5beff0e6", "5c87aa503bc2831e5beff13d", "5c87b7053bc2831e5beff1aa", "5c87cf4c4c8f6423f7a9fde6", "5c87d2204c8f6423f7a9fe5a", "5c87db534c8f6423f7a9fecf", "5c87ebf64c8f6423f7a9ffc8", "5c87f3674c8f6423f7aa002b", "5c87f9514c8f6423f7aa012f", "5c87fcb24c8f6423f7aa018a", "5c880c984c8f6423f7aa01fc", "5c881453e0219f33f8ba4a33", "5c890626b00ac7038a9f1923", "5c893f64b00ac7038a9f1b6d", "5c8a3e639ca2150254795ae2", "5c8a59ca80a33a0f7abf693a", "5c8a607e80a33a0f7abf6a16", "5c9116e68fe7231210602e9c", "5c91353b8fe7231210602f28", "5c91359a8fe7231210602f40", "5c9135e38fe7231210602f5a", "5c927507fb2d2618dd96e266", "5c9294131a7daf2b41caad80", "5c92942e1a7daf2b41caad9a", "5c92948a1a7daf2b41caadb9", "5c9297831a7daf2b41caadd8", "5c93ec3ff67b0f0ef3ceada9", "5c93efe9f67b0f0ef3ceaecd", "5c93f5def67b0f0ef3ceafed", "5c98c3e4e0c6ee039acdf236", "5c9b652745ad9c02e6db2a0e", "5c9d1ad8b8661917b7607a59", "5c9e1deaa8cce50450a75b90", "5c9e363aa8cce50450a75c9c", "5c9e3d01a8cce50450a75cf3", "5c9e5144e4762a1cb7c54eab", "5c9e6114e4762a1cb7c54fa6", "5c9e73584b2197245e05e0fa", "5ca1fa3172ec48031e484f19", "5ca24a6bd4bf471271de8d66", "5ca38744d0fa180315cac8f7", "5ca39c62d045400f49d292c0", "5ca39da2d045400f49d292da", "5ca3a035d045400f49d292f8", "5ca3a2a0d045400f49d29314", "5ca3a3bad045400f49d2932e", "5ca3a47ad045400f49d29348", "5ca3a4abd045400f49d29362", "5ca3b05cd045400f49d2937e", "5ca3bdc35708d106ef1f9d9d", "5ca4cb715708d106ef1f9e19", "5ca761df71430503007e8504", "5ca76ad371430503007e8527", "5cb873d13e64e602e91807d5", "5cc6f3438fd79f02a7528847", "5ceea94039cda7036e8f3557", "5cf031599a129512cea48818", "5cf9574b08d700029307b0ea", "61d57e630d6ea40483403fe6", "61d57e770d6ea40483404029", "61d57e8a0d6ea4048340406c", "61d57ece0d6ea404834040af", "61d57edc0d6ea404834040f2", "61d57f7f0d6ea40483404135", "61dbfbf68203da0482e6f1c3", "620147a22775f104842a7c43", "620fdd0c5a3712047b74ceef", "6220f00c39d65c04cd4211d6", "6220f39239d65c04cd42177b", "6220fca139d65c04cd4224d3", "6220febb39d65c04cd422698", "6221012a39d65c04cd422b3c", "6221030439d65c04cd422e69", "6221067539d65c04cd4230f8", "62210c6139d65c04cd42336b", "62210da139d65c04cd423415", "62388220676f6d044d5a88cd", "6238857b676f6d044d5a8ab5", "623890e6676f6d044d5a9b54" ], "creditmonitoring": [ "61caf55784a83904996f92b8" ] }, "identification": { "user_account_id": "5c743dbcca856c14cc2718e0", "full_name": "jean llmtwxy", "first_name": "jean", "last_name": "llmtwxy", "middle_initial": null, "citizenship": "USA Citizen", "date_of_birth": "1984-05-09T00:00:00.000Z", "social_security_number": "3af6fc88b4d73add18", "default_bank": "Ashok", "guid": "CT-JE1551121852151", "trace_number": 1551121852151, "last4SSN": "***-**-6310" }, "latest_contact": { "address_street": "1234 MAIN AVE", "address_city": "NEWARK", "address_state": "DE", "address_postal_code": "19702", "mailing_address_street": "1234 MAIN AVE", "mailing_address_city": "NEWARK", "mailing_address_state": "DE", "mailing_address_postal_code": "19702", "email": "zdunkerton@marinerfinance.com", "phone_number_primary": "1231231234", "phone_type": "Cell", "opted_phone_texting": "2232223221", "how_did_you_hear_about_us": "Advertising" }, "communication_preferences": { "marketing_emails_unsubscribe_flag": false, "do_not_contact": false }, "user_account": { "status": "open", "status_check_time": null }, "contenttypes": [], "entitytype": "customer", "_id": "5c743dbcffbf7814ab74f6da", "createdat": "2019-02-25T19:10:52.156Z", "updatedat": "2022-04-27T11:10:44.383Z", "__v": 0, "docid": "5c743dbcffbf7814ab74f6da", "notes": [], "use_session": true };
const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
					<BasicInformationCard
						basicInformationData={basicInformationData}
						getUserAccountDetails={[]}
						getProfileImage={""}
					/>
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
test("Checks the component is rendered", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('basic-information-component');
	expect(element).toBeTruthy();
});

test("Check the first name field in UI", () => {
	const { container, debug } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('jean');
});

test("Check the last name field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('llmtwxy');
});

test("Check the Date of Birth field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('05/09/1984');
});

test("Check the Email Address field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('zdunkerton@marinerfinance.com');
});

test("Check the Primary phone number field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('(123) 123-1234');
});

test("Check the upload image field in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[id="selectImage"]`);
	expect(input).toBeTruthy();
});

test("First name field to be disabled in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Last name field to be disabled in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Date of Birth field to be disabled in UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check can able to enter email id in Email Address filed in UI", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "vickeykgv@gmail.com" } });
	});
	expect(input.value).toBe('vickeykgv@gmail.com');
});

test("Show error message if entered invalid email id", async () => {
	const { container, debug } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "vickeykgv" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="email-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('A valid email address is required');
});

test("Check can able to enter phone number in Phone Number filed in UI", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "(123) 123-1233" } });
	});
	expect(input.value).toBe('(123) 123-1233');
});

test("Check number masking after entering phone number", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).not.toBe('1231231233');
});

test("Check number masking after entering phone number", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('(123) 123-1233');
});

test("Verify can able to click file upload", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[id="selectImage"]`);
	userEvent.click(input);
	expect(input).toBeTruthy();
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});