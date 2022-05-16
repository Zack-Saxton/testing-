import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, queryByAttribute } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import Credit from "./Credit";
import ProfilePicture from '../../../contexts/ProfilePicture';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});
const creditDataScore1 = [{"sorad":{"guid":"CT-JE1551121852151"},"_id":"61caf55784a83904996f92b8","contenttypes":[],"entitytype":"creditmonitoring","parsed":{"vantage_score":"818","reason1":"65","reason2":"12","reason3":"43","reason4":"8","first_name":"JEAN","last_name":"LLMTWXY","middle_initial":null,"address_city":"NEWARK","address_state":"DE","address_street":"1234 MAIN AVE","address_postal_code":"19702","score_change":"NoChange"},"expireAt":"2022-06-28T11:30:32.390Z","createdat":"2021-12-28T11:30:32.390Z","updatedat":"2021-12-28T11:30:32.390Z","source":"Equifax","changes":[],"__v":0}];
const creditDataScore2 = [{"sorad":{"guid":"CT-JE1551121852151"},"_id":"61caf55784a83904996f92b8","contenttypes":[],"entitytype":"creditmonitoring","parsed":{"vantage_score":"570","reason1":"65","reason2":"12","reason3":"43","reason4":"8","first_name":"JEAN","last_name":"LLMTWXY","middle_initial":null,"address_city":"NEWARK","address_state":"DE","address_street":"1234 MAIN AVE","address_postal_code":"19702","score_change":"NoChange"},"expireAt":"2022-06-28T11:30:32.390Z","createdat":"2021-12-28T11:30:32.390Z","updatedat":"2021-12-28T11:30:32.390Z","source":"Equifax","changes":[],"__v":0}];
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
  const { container } = render(component(creditDataScore1), { wrapper: MemoryRouter });
  expect(screen.getByText(/818/)).toBeVisible();
});

test("If the credit score is 750, then show the message ' Congratulations, you have an Excellent credit score!'", () => {
  const { container } = render(component(creditDataScore1), { wrapper: MemoryRouter });
  expect(screen.getByText(/Congratulations, you have an Excellent credit score!/)).toBeVisible();
});

test("If the credit score is greater than last month, then show the message ' Your credit score has increased since last month'", () => {
  render(component(creditDataScore1), { wrapper: MemoryRouter });
  expect(screen.getByText(/Your credit score has increased since last month./)).toBeVisible();  
});

test("Check in the chart content that the score value is 570", () => {
  const { container } = render(component(creditDataScore2), { wrapper: MemoryRouter });
  expect(screen.getByText(/570/)).toBeVisible();
});

test("If the credit score is 570, then show the message 'Sorry, you have a Poor credit score!'", () => {
  const { container } = render(component(creditDataScore2), { wrapper: MemoryRouter });
  expect(screen.getByText(/Sorry, you have a Poor credit score!/)).toBeVisible();
});

test("If the credit score is greater than last month, then show the message ' Your credit score has increased since last month'", () => {
  render(component(creditDataScore2), { wrapper: MemoryRouter });
  expect(screen.getByText(/Your credit score has increased since last month./)).toBeVisible();  
});