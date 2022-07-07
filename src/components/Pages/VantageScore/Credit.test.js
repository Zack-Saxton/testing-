import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, queryByAttribute } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import Credit from "./Credit";
import ProfilePicture from '../../../contexts/ProfilePicture';
import { creditDataScore1, creditDataScore2 } from "../../../__mock__/data/CreditScore.data";

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
const component = (creditDataScore) => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
        <Credit creditData={ creditDataScore }/>
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component(creditDataScore1), { wrapper: MemoryRouter });
	const element = screen.getByTestId('credit-score-testid');
	expect(element).toBeTruthy();
});

test("Check the chart content is render", () => {
  const getById = queryByAttribute.bind(null, 'id');
	const { container } = render(component(creditDataScore1), { wrapper: MemoryRouter });
  const input = getById(container, 'gauge-chart4');
	expect(input).toBeTruthy();
});

test("Check in the chart content that the score value is 818", () => {
  render(component(creditDataScore1), { wrapper: MemoryRouter });
  expect(screen.getByText(/818/)).toBeVisible();
});

test("If the credit score is 750, then show the message ' Congratulations, you have an Excellent credit score!'", () => {
  render(component(creditDataScore1), { wrapper: MemoryRouter });
  expect(screen.getByText(/Congratulations, you have an Excellent credit score!/)).toBeVisible();
});

test("If the credit score is greater than last month, then show the message ' Your credit score has increased since last month'", () => {
  render(component(creditDataScore1), { wrapper: MemoryRouter });
  expect(screen.getByText(/Your credit score has increased since last month./)).toBeVisible();  
});

test("Check in the chart content that the score value is 570", () => {
  render(component(creditDataScore2), { wrapper: MemoryRouter });
  expect(screen.getByText(/570/)).toBeVisible();
});

test("If the credit score is 570, then show the message 'Sorry, you have a Poor credit score!'", () => {
  render(component(creditDataScore2), { wrapper: MemoryRouter });
  expect(screen.getByText(/Sorry, you have a Poor credit score!/)).toBeVisible();
});

test("If the credit score is greater than last month, then show the message ' Your credit score has increased since last month'", () => {
  render(component(creditDataScore2), { wrapper: MemoryRouter });
  expect(screen.getByText(/Your credit score has increased since last month./)).toBeVisible();  
});