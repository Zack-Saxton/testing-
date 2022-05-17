import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ActiveDuty from "./index.js";


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
				<BrowserRouter>
					<CheckMyOffers>
						<ActiveDuty />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('ActiveDuty_Component');
	expect(element).toBeTruthy();
});


test("Render Active Duty", async () => {
	const { container } = render(component());
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	expect(activeDuty).toBeTruthy();
	await act(() => {
		fireEvent.change(activeDuty, { target: { value: "Active Military" } });
	});
	expect(activeDuty).toBeTruthy();
	expect(activeDuty.value).toBe('Active Military');
});

test("Check Active Duty if yes", async () => {
	const { container } = render(component());
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	const activeDutyRank = container.querySelector(`input[name="activeDutyRank"]`);

	await act(() => {
		fireEvent.change(activeDuty, { target: { value: "Yes" } });
		fireEvent.change(activeDutyRank, { target: { value: "E5 and above" } });
	});
	expect(activeDutyRank).toBeTruthy();
	expect(activeDutyRank.value).toBe('E5 and above');
});

test("Check Active Duty state for application which does not meet the requirements", async () => {
	const { container } = render(component());
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	const activeDutyRank = container.querySelector(`input[name="activeDutyRank"]`);

	await act(() => {
		fireEvent.change(activeDuty, { target: { value: "Yes" } });
		fireEvent.change(activeDutyRank, { target: { value: "E4 and above" } });
	});
	const errorInfo = screen.getByText('Unfortunately, based on the application information provided, you do not meet our application requirements.');
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Unfortunately, based on the application information provided, you do not meet our application requirements.');
});

test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("contButton");
	fireEvent.click(button);
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});
