import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import MultiFactorAuthenticationOTP from './MultiFactorAuthenticationOTP';

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
					<MultiFactorAuthenticationOTP/>
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	const element = screen.getByTestId('passcode-verification-container');
  expect(element).toBeTruthy();
});

test("Check input filed available for entering 6 digit passcode", () => {
	const { container } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	const otp1 = container.querySelector(`input[name="otp1"]`);
	expect(otp1).toBeTruthy();
	expect(otp1.value).toBe('');

  const otp2 = container.querySelector(`input[name="otp2"]`);
	expect(otp2).toBeTruthy();
	expect(otp2.value).toBe('');

  const otp3 = container.querySelector(`input[name="otp3"]`);
	expect(otp3).toBeTruthy();
	expect(otp3.value).toBe('');

  const otp4 = container.querySelector(`input[name="otp4"]`);
	expect(otp4).toBeTruthy();
	expect(otp4.value).toBe('');

  const otp5 = container.querySelector(`input[name="otp5"]`);
	expect(otp5).toBeTruthy();
	expect(otp5.value).toBe('');

  const otp6 = container.querySelector(`input[name="otp6"]`);
	expect(otp6).toBeTruthy();
	expect(otp6.value).toBe('');
});

test("Check the verify button in  UI", () => {
	const { container, getByText } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	expect(getByText("Verify Now")).toBeTruthy();
});
-test("Check the resend option in the UI", () => {
	const { container, getByText } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	expect(getByText("Resend")).toBeTruthy();
});

test("Check the OTP field allow only number", async () => {
	const { container } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	const otp1 = container.querySelector(`input[name="otp1"]`);
	expect(otp1).toBeTruthy();
	expect(otp1.value).toBe('');
  await act(() => {
		fireEvent.change(otp1, { target: { value: "aa" } });
		fireEvent.blur(otp1);
	});
	expect(otp1.value).toBe('');
});

test("Check can able to enter passcode in OTP filed", async () => {
	const { container } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	const otp1 = container.querySelector(`input[name="otp1"]`);
	expect(otp1).toBeTruthy();
	expect(otp1.value).toBe('');
  await act(() => {
		fireEvent.change(otp1, { target: { value: "8" } });
		fireEvent.blur(otp1);
	});
	expect(otp1.value).toBe('8');
});

test("Check the focus is moving to next input field", async () => {
	const { container } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	const otp1 = container.querySelector(`input[name="otp1"]`);
  const otp2 = container.querySelector(`input[name="otp2"]`);
	expect(otp1).toBeTruthy();
	expect(otp1.value).toBe('');
  await act(() => {
    fireEvent.change(otp1, { target: { value: "2" } });
    fireEvent.keyUp(otp1, {key: '2', code: '50'})
	});
  expect(otp2).toHaveFocus();
});
test('Should match the snapshot', () => {
	const { asFragment } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', state: {phoneNumber : "96532545588", mfaQueries:{}}} ]}>
      {component()}
    </MemoryRouter>
  );
	expect(asFragment).toMatchSnapshot();
});