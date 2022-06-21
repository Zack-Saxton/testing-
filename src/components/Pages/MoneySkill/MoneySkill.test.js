import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import MoneySkill from "./MoneySkill";

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
					<MoneySkill moneySkill={true} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('MoneySkill_component');
	expect(element).toBeTruthy();
});

test("Check Dialog is rendered", () => {
	render(component());
	const element = screen.getByTestId('MoneySkill_dialog');
	expect(element).toBeTruthy();
});

test("Check Header is rendered", () => {
	render(component());
	const element = screen.getByTestId('Dialog_Heading');
	expect(element).toBeTruthy();
});

test('Check Header is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("You are about to leave marinerfinance.com")).toBeTruthy();
	}); 
})

test("Check Stay on MarinerFinance Button is rendered ", () => {
	render(component());
	const element = screen.getByTestId("closeIcon_Button");
  expect(element).toBeTruthy();
}); 

test("Check Stay on MarinerFinance Button is rendered ", () => {
	render(component());
	const element = screen.getByTestId("stayBtn");
  expect(element).toBeTruthy();
});

test("Check Stay on MarinerFinance Button is rendered ", () => {
	render(component());
	const element = screen.getByTestId("Continue_Btn");
  expect(element).toBeTruthy();
});

test("Check Money Skill Link  is displayed ", () => {
	render(component());
	const element = screen.getByTestId("moneySkillInfoLink");
  expect(element).toBeTruthy();
});