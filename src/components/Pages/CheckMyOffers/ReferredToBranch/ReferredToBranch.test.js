import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ReferredToBranch from "./index.js";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { waitFor, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from 'react-query';


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
        <ReferredToBranch />
      </CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Check component is rendered", () => {
	render(component());
	const element = screen.getByTestId('referredToBranch_Component');
	expect(element).toBeTruthy();
});

test("Check logo is rendered", () => {
	render(component());
	const element = screen.getByTestId('ReferToBranchLogo');
	expect(element).toBeTruthy();
});

test("Check congrats Typography is rendered", () => {
	render(component());
	const element = screen.getByTestId('congratsTypography');
	expect(element).toBeTruthy();
});

test('Check congratulation is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Congratulations!")).toBeTruthy();
	}); 
})

test("Check receive Money is rendered", () => {
	render(component());
	const element = screen.getByTestId('receiveMoneyGrid');
	expect(element).toBeTruthy();
});


test('Check Representative message is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Your local representative is waiting to talk to you.")).toBeTruthy();
	}); 
})

test("Check Finish by Phone Button is rendered", () => {
	render(component());
	const element = screen.getByTestId('finishByPhone_button');
	expect(element).toBeTruthy();
});

test('Check Finish by Phone text in button is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Finish by Phone")).toBeTruthy();
	}); 
})

test("Check Finish by Branch Button is rendered", () => {
	render(component());
	const element = screen.getByTestId('finishByBranch_button');
	expect(element).toBeTruthy();
});

test('Check Finish by Branch text in button is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Finish by Branch")).toBeTruthy();
	}); 
})

test("Check Before Visiting text is rendered", () => {
	render(component());
	const element = screen.getByTestId('beforeVisitingTypography');
	expect(element).toBeTruthy();
});

test('Check Before Visiting text is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Things you should know before you call or visit.")).toBeTruthy();
	}); 
})

test("Check precautions text is rendered", () => {
	render(component());
	const element = screen.getByTestId('precautionsTypography');
	expect(element).toBeTruthy();
});

test("Check loan Approval text is rendered", () => {
	render(component());
	const element = screen.getByTestId('loanApprovalTextDiv');
	expect(element).toBeTruthy();
});

test('Check loan Approval text is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("It's a good idea to know how much money you make a year.")).toBeTruthy();
	}); 
})

test("Approval Application Text Availability Test", () => {
	const container = render(component());
	const approvalApplicationText = container.getByTestId("loanApprovalApplicationTypography");
	expect(approvalApplicationText).toBeTruthy();
});