import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import ChangePassword from './ChangePassword';
import { GlobalStateProvider } from "../../../../src/contexts/GlobalStateProvider";
import { basicInformationData } from "../../../__mock__/data/MyProfile.data";
import { ToastContainer } from "react-toastify";

import { changePassword } from "../../Controllers/MyProfileController";
jest.mock('../../Controllers/MyProfileController');

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
						<ChangePassword
							basicInformationData={ basicInformationData }
						/>
					</ProfilePicture>
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>
	);
}
test("Checks the component is rendered", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('profile-change-password');
	expect(element).toBeTruthy();
});

test("Check the Old password field in UI with value empty", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the New password field in UI with value empty", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the Confirm new password field in UI with value empty", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Show error message if not entered Old passord", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="oldPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your old password is required');
});

test("Show error message if not entered New passord", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your new password is required');
});

test("Show error message if not entered confirm passord", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your password confirmation is required');
});

test("Check can able to  enter Old passord", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@" } });
	});
	expect(input.value).toBe('Mariner1@');
});

test("Show error message if entered new password is below 10 characters", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner');
	const errorInfo = container.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Password should be minimum of 10 characters in length');
});

test("Show error message when entered password is not meet the criteria", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Marinerqqqq" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Marinerqqqq');
	const errorInfo = container.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your password does not meet the criteria');
});

test("The error message should not be shown if entered password meet the criteria", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner1@1');
	const errorInfo = container.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();
});

test("Show error message if entered confirm password is below 10 characters", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner');
	const errorInfo = container.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Password should be minimum of 10 characters in length');
});

test("Show error message when entered confirm password is not meet the criteria", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Marinerqqqq" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Marinerqqqq');
	const errorInfo = container.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your password does not meet the criteria');
});

test("The error message should not be shown if entered confirm password meet the criteria", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const newPassword = container.querySelector(`input[name="newPassword"]`);
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.change(newPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner1@1');
	const errorInfo = container.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();
});

test("Show error message if entered confirm password not matched with new password", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const newPassword = container.querySelector(`input[name="newPassword"]`);
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.change(newPassword, { target: { value: "Mariner1@" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your confirmation password must match your password');
});

test("Check the reset button functionality", async () => {
	render(component(), { wrapper: MemoryRouter });
	const resetButton = screen.getByTestId('reset-password-button');
	await act(() => {
		fireEvent.click(resetButton);
	});	
});

test("Check the submit functionality with old and new password same", async () => {
	changePassword.mockResolvedValue({data: {change_password:{passwordReset: true}}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const oldPassword = container.querySelector(`input[name="oldPassword"]`);
	const newPassword = container.querySelector(`input[name="newPassword"]`);
	const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
	await act(() => {
		fireEvent.change(oldPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(oldPassword);
		fireEvent.change(newPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(newPassword);
		fireEvent.change(confirmPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(confirmPassword);
	});
	const submitButton = screen.getByTestId('update-password-button');
	await act(() => {
		fireEvent.click(submitButton);
	});	
});

test("Check the submit functionality with old and new password are different", async () => {
	changePassword.mockResolvedValue({data: {change_password:{passwordReset: true}}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const oldPassword = container.querySelector(`input[name="oldPassword"]`);
	const newPassword = container.querySelector(`input[name="newPassword"]`);
	const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
	await act(() => {
		fireEvent.change(oldPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(oldPassword);
		fireEvent.change(newPassword, { target: { value: "Mariner1@2" } });
		fireEvent.blur(newPassword);
		fireEvent.change(confirmPassword, { target: { value: "Mariner1@2" } });
		fireEvent.blur(confirmPassword);
	});
	const submitButton = screen.getByTestId('update-password-button');
	await act(() => {
		fireEvent.click(submitButton);
	});	
});

test("Check the submit functionality with old and new password are different and failure response", async () => {
	changePassword.mockResolvedValue({data: {change_password:{}}});
	const { container } = render(component(), { wrapper: MemoryRouter });
	const oldPassword = container.querySelector(`input[name="oldPassword"]`);
	const newPassword = container.querySelector(`input[name="newPassword"]`);
	const confirmPassword = container.querySelector(`input[name="confirmPassword"]`);
	await act(() => {
		fireEvent.change(oldPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(oldPassword);
		fireEvent.change(newPassword, { target: { value: "Mariner1@2" } });
		fireEvent.blur(newPassword);
		fireEvent.change(confirmPassword, { target: { value: "Mariner1@2" } });
		fireEvent.blur(confirmPassword);
	});
	const submitButton = screen.getByTestId('update-password-button');
	await act(() => {
		fireEvent.click(submitButton);
	});	
});