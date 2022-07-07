import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanHistory from "./LoanHistory";


const theme = createTheme();
window.scrollTo = jest.fn();
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<LoanHistory />
					</BrowserRouter>
				</QueryClientProvider>
			</StyledEngineProvider>
		</ThemeProvider>
	);
}
test("Checks the component is rendered", () => {
    render(component());
    const element = screen.getByTestId("loan_history_component");
    expect(element).toBeTruthy();
  });
test('should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});
