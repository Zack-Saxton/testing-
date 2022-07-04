import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MFASelectSecurityQuestions from "./MFA-SelectSecurityQuestions";
import Cookies from 'js-cookie'


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
let now = new Date().getTime();

Cookies.set(
	"token",
	JSON.stringify({
		isLoggedIn: true,
		setupTime: now,
		applicantGuid: "AT-LA1656515305385",
		isMFA: true,
		isMFACompleted: true
	})
);

const component = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter >
                    <MFASelectSecurityQuestions />
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

test("Check the component rendered", () => {
    render(component());
    const element = screen.getByTestId('selectSecurityQuestions');
    expect(element).toBeTruthy();
});
test("Checks the title of the page", () => {
    render(component());
    const titleEl = screen.getByTestId("title");
    expect(titleEl).toBeTruthy();
});
test("Checks the title1 of the page", () => {
    render(component());
    const titleEl = screen.getByTestId("title1");
    expect(titleEl).toBeTruthy();
});

test('Check Select first questions render', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="question1"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
});
test('Select first questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer1"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "Mariner" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('Mariner');
});
test('Check Select second questions render', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="question2"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
});
test('Select second questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer2"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "New" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('New');
});
test('Check Select third questions render', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="question3"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
});
test('Select third questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer3"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "NYC" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('NYC');
});
test('Check Select four questions render', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="question4"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
});
test('Select four questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer4"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "Test" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('Test');
});
test('Check Select five questions render', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="question5"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "" } });
        fireEvent.blur(input);
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
});
test('Select five questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer5"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "WC" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('WC');
});

