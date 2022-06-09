import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import MFAGetPhoneNumber from './MFAGetPhoneNumber';

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
                    <MFAGetPhoneNumber />
                </ProfilePicture>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
test("Checks the component is rendered", () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { phoneNumber: "96532545588", mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
    const element = screen.getByTestId('phoneNumber-container');
    expect(element).toBeTruthy();
});
test("Render Next Button Onclick", () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { phoneNumber: "96532545588", mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
	const element = screen.getByTestId("next_button");
    expect(element).toBeTruthy();
});
test("Next Button Onclick", () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { phoneNumber: "96532545588", mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
	const button = screen.getByTestId("next_button");
	fireEvent.click(button);
});
test("Render Skip Button Onclick", () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { phoneNumber: "96532545588", mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
	const element = screen.getByTestId("skip_button");
    expect(element).toBeTruthy();
});
test("Skip Button Onclick", () => {
    render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { phoneNumber: "96532545588", mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
	const button = screen.getByTestId("skip_button");
	fireEvent.click(button);
});
test('Should match the snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { phoneNumber: "96532545588", mfaQueries: {} } }]}>
            {component()}
        </MemoryRouter>
    );
    expect(asFragment).toMatchSnapshot();
});