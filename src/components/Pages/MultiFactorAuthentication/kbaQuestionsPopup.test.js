import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import KbaQuestionsPopup from "./KbaQuestionsPopup";

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
const closePopup = jest.fn();
const component = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <KbaQuestionsPopup
                    onClose={closePopup}
                    aria-labelledby="customize-dialog-title"
                    popupFlag={true}
                    data-testid="popup"
                    id="customDialog"
                    maxWidth="sm"
                />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
test("Checks the kba question popup is rendered", () => {
    render(component());
    const element = screen.getByTestId('popup');
    expect(element).toBeTruthy();
});
test("Popup has Close Icon test", () => {
  let container = render(component());
  const element = container.getByTestId("closeIcons");
  expect(element).toBeTruthy();
});
test("Popup has OK button test", () => {
  let container = render(component());
  const element = container.getByTestId("modButton");
  expect(element).toBeTruthy();
});
test('should match the snapshot', () => {
    const { asFragment } = render(component);
    expect(asFragment).toMatchSnapshot();
});
