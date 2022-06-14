import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserHistory } from "history";
import MFASelectSecurityQuestions from "./MFA-SelectSecurityQuestions";


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
// const test = () => {
//     return (
//     <MFASelectSecurityQuestions
//       name="select"
//       labelform="Language Known"
//       required={true}
//       select='[
//           {"label": "What was the name of your favorite pet?", "value": "New"},
//           {"label": "What was the name of your favorite teacher?", "value": "New"},
//           {"label": "What city did you meet your current spouse?", "value": "New"},
//           {"label": "What is your favorite vacation destination?", "value": "New"},
//           {"label": "Where did you and your spouse marry?", "value": "New"},
//           {"label": "What was your favorite restaurant in college?", "value": "New"},
//           {"label": "What city is your vacation home located?", "value": "New"},
//           {"label": "What is your favorite car brand?", "value": "New"},
//           {"label": "What is the name of your best friend?", "value": "New"},
//           {"label": "What is your mother’s middle name?", "value": "New"},
//           {"label": "What is your father’s middle name?", "value": "New"},
//           {"label": "What is your favorite color?", "value": "New"},
//           {"label": "What city were you born in?", "value": "New"},
//         ]'
//       value="New"
//     />
//   );
// };
const component = () => {
    // const history = createBrowserHistory();
    // const state = {
    //     mfaSecurityQuestions: {
    //         mfaDetails: {
    //             securityQuestions:
    //                 [
    //                     {
    //                         "question_id": "2",
    //                         "question": "What was the name of your favorite teacher?"
    //                     }
    //                 ]
    //         }
    //     }
    // }
    //history.push("/", state);
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter >
                    <MFASelectSecurityQuestions
                    
                    />
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


test('Select first questions  Availability ', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="question1"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "What was the name of your favorite pet?" } });
        fireEvent.blur(input);
    });
    expect(input).toBeTruthy();
    screen.debug(undefined,100000000);

    expect(input.value).toBe('What was the name of your favorite pet?');

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

test('Select second questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer2"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "New" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('New');
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
test('Select four questions answer input Box Availability', async () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="answer4"]`);
    await act(() => {
        fireEvent.change(input, { target: { value: "Test" } });
    });
    expect(input).toBeTruthy();
    expect(input.value).toBe('Test');
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

