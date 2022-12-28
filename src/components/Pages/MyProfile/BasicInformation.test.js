import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import BasicInformationCard from './BasicInformation';
import { basicInformationData } from "../../../__mock__/data/MyProfile.data";
import { LoanDataMock } from "./../../../__mock__/LoanData.mock";
import { basicInformation } from "../../Controllers/MyProfileController";
import Cookies from "js-cookie";
Cookies.set("hasActiveLoan", "true");
Cookies.set("hasApplicationStatus", "rejected");

jest.mock('../../Controllers/MyProfileController');

let file;
beforeEach(() => {
  file = new File(["profile_image"], "Card/JCB.png", { type: "image/png" });
});
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
jest.mock('../../../hooks/useAccountOverview', ()=>({
  useAccountOverview: jest.fn(),
}))
test("Checks the component is rendered", () => {
	LoanDataMock();
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('basic-information-component');
	expect(element).toBeTruthy();
});

test("Check the first name field in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('jean');
});

test("Check the last name field in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('llmtwxy');
});

test("Check the Date of Birth field in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('**/**/1984');
});

test("Check the Email Address field in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('zdunkerton@marinerfinance.com');
});

test("Check the Primary phone number field in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('(***) ***-1234');
});

test("Check the upload image field in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[id="selectImage"]`);
	expect(input).toBeTruthy();
});

test("First name field to be disabled in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Last name field to be disabled in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Date of Birth field to be disabled in UI", () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check can able to enter email id in Email Address filed in UI", async () => {
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "vickeykgv@gmail.com" } });
	});
	expect(input.value).toBe('vickeykgv@gmail.com');
});

test("Show error message if entered invalid email id", async () => {
	LoanDataMock();
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
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "(123) 123-1233" } });
	});
	expect(input.value).toBe('(123) 123-1233');
});

test("Check number masking after entering phone number", async () => {
	LoanDataMock();
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
	LoanDataMock();
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('(***) ***-1233');
});
test("Click submit button without changing value", async () => {
	LoanDataMock();
	render(component(), { wrapper: MemoryRouter });
	const submitButton = screen.getByTestId('basic-information-submit');
	await act(() => {
		fireEvent.click(submitButton);
	});

});
test("Verify can able to click file upload", async () => {
	LoanDataMock();
	basicInformation.mockResolvedValue({data: {"emailUpdate":true,"notes":["Customer has updated Phone Number from 3373373373 TO 3373373374"]}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const uploader = container.querySelector(`input[id="selectImage"]`);
	await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
  );
	// get the same uploader from the dom
	const uploadNewButton = screen.getByTestId('upload-new-photo-button');
	let image = document.getElementById("selectImage");
	// check if the file is there
	expect(image.files[0].name).toBe("Card/JCB.png");
	expect(image.files.length).toBe(1);
	const input = container.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.click(uploadNewButton);
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	const submitButton = screen.getByTestId('basic-information-submit');
	await act(() => {
		fireEvent.click(submitButton);
	});
});

test("Submit form without image upload", async () => {
	LoanDataMock();
	basicInformation.mockResolvedValue({data: {"emailUpdate":true,"notes":["Customer has updated Phone Number from 3373373373 TO 3373373374"]}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	const email = container.querySelector(`input[name="email"]`);
	expect(email).toBeTruthy();
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(email, { target: { value: "vickeykgv@gmail.com" } });
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	const submitButton = screen.getByTestId('basic-information-submit');
	await act(() => {
		fireEvent.click(submitButton);
	});
});

test("Submit form with error response", async () => {
	LoanDataMock();
	basicInformation.mockResolvedValue({data: {statusCode:400, "emailUpdate":true,"notes":["Customer has updated Phone Number from 3373373373 TO 3373373374"]}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="phone"]`);
	const email = container.querySelector(`input[name="email"]`);
	expect(email).toBeTruthy();
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(email, { target: { value: "vickeykgv@gmail.com" } });
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	const submitButton = screen.getByTestId('basic-information-submit');
	await act(() => {
		fireEvent.click(submitButton);
	});
});

test("Check reset button functionality", async () => {
	LoanDataMock();
	render(component(), { wrapper: MemoryRouter });
	const resetButton = screen.getByTestId('basic-information-reset');
	await act(() => {
		fireEvent.click(resetButton);
	});
});

test('Should match the snapshot', () => {
	LoanDataMock();
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});