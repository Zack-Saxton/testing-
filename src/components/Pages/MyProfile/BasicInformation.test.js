import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import BasicInformationCard from './BasicInformation';
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
					<BasicInformationCard
						basicInformationData={ basicInformationData }
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
	const { container } = render(component(), { wrapper: MemoryRouter });
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
	expect(input.value).toBe('**/**/1984');
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
	expect(input.value).toBe('(***) ***-1234');
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
	const { container } = render(component(), { wrapper: MemoryRouter });
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
	expect(input.value).toBe('(***) ***-1233');
});

test("Verify can able to click file upload", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[id="selectImage"]`);
	fireEvent.click(input);
	expect(input).toBeTruthy();
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});