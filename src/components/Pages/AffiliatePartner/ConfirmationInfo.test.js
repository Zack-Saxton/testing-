import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../contexts/NavContext";
import SelectOffer from "../ApplyLoan/SelectOffer/SelectOffer";
import ConfirmationInfo from "./ConfirmationInfo";
import { mockData } from './PartnerMockData';


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
const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<NavContext>
						<ConfirmationInfo />
						<SelectOffer />
					</NavContext>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('confirmationInfo_component');
	expect(element).toBeTruthy();
});

test("Render First name ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="firstName"]`);
	fireEvent.change(input, { target: { value: "Mariner" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('Mariner');
});


test("Invalid Firstname", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="firstName"]`);
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "" } });
	fireEvent.change(input, { target: { value: "test123" } });
	expect(input.value).not.toBe(true);
});


test("Render Last name ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="lastName"]`);
	fireEvent.change(input, { target: { value: "Mariner" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('Mariner');
});

test("Invalid Last Name", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="lastName"]`);
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "" } });
	fireEvent.change(input, { target: { value: "test123" } });
	expect(input.value).not.toBe(true);
});

test("Render Address", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="streetAddress"]`);
	fireEvent.change(input, { target: { value: "1234 MAIN AVE" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('1234 MAIN AVE');
});

test("Render City", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="city"]`);
	fireEvent.change(input, { target: { value: "NEWARK" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('NEWARK');
});

test("Render State", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
	fireEvent.change(input, { target: { value: "DE" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('DE');
});

test("Render Zipcode", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	fireEvent.change(input, { target: { value: "19702" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('19702');
});

test("Check city field is disabled", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check state field is disabled", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check the zipcode max length to be 5", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.maxLength).toBe(5);
});

test("Check Active Duty", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	const activeDutyRank = container.querySelector(`input[name="activeDutyRank"]`);

	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "North Carolina" } });
		fireEvent.change(activeDuty, { target: { value: "Yes" } });
		fireEvent.change(activeDutyRank, { target: { value: "E5 and above" } });
		fireEvent.blur(input);
	});
	expect(activeDutyRank).toBeTruthy();
	expect(activeDutyRank.value).toBe('E5 and above');
});

test("Check Active Duty state for application which does not meet the requirements", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	const activeDutyRank = container.querySelector(`input[name="activeDutyRank"]`);

	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "North Carolina" } });
		fireEvent.change(activeDuty, { target: { value: "Yes" } });
		fireEvent.change(activeDutyRank, { target: { value: "E4 and above" } });
		fireEvent.blur(input);
	});
	const errorInfo = screen.getByText('Unfortunately, based on the application information provided, you do not meet our application requirements.');
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Unfortunately, based on the application information provided, you do not meet our application requirements.');
});

test("Check Marital status for state winconsin", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
	const martialStatus = container.querySelector(`input[name="martialStatus"]`);
	const spouseAddress = container.querySelector(`input[name="spouseadd"]`);
	const spouseZipcode = container.querySelector(`input[name="spouseZipcode"]`);
	const spousecity = container.querySelector(`input[name="spousecity"]`);
	const spouseSelectState = container.querySelector(`input[name="spouseSelectState"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Wisconsin" } });
		fireEvent.change(martialStatus, { target: { value: "Married" } });
		fireEvent.change(spouseAddress, { target: { value: "4321 MAIN AVE" } });
		fireEvent.change(spouseZipcode, { target: { value: "19701" } });
		fireEvent.change(spousecity, { target: { value: "NEWARK" } });
		fireEvent.change(spouseSelectState, { target: { value: "DE" } });
		fireEvent.blur(input);
	});
	expect(martialStatus).toBeTruthy();
	expect(martialStatus.value).toBe('Married');
	expect(spouseAddress.value).toBe('4321 MAIN AVE');
	expect(spouseZipcode.value).toBe('19701');
	expect(spousecity.value).toBe('NEWARK');
	expect(spouseSelectState.value).toBe('DE');
});

test("Render Citizenship", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="citizenship"]`);
	expect(input).toBeTruthy();
});

test("Select Citizenship", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="citizenship"]`);
	fireEvent.change(input, { target: { value: "USA Citizen" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('USA Citizen');
});

test("Check Foreign citizenship", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="citizenship"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Foreign Resident" } });
		fireEvent.blur(input);
	});
	const errorInfo = screen.getByText('We are sorry. We do not offer loans to foreign residents.');
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('We are sorry. We do not offer loans to foreign residents.');
});

test("Render Personal Income", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="personalIncome"]`);
	expect(input).toBeTruthy();
});

test("Check Personal Income", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="personalIncome"]`);
	fireEvent.change(input, { target: { value: "$300,000" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('$300,000');
});

test('Check Personal Income MaxLength', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="personalIncome"]`);
	expect(input.maxLength).toBe(10);
})

test("Render HouseHold Income", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="householdIncome"]`);
	expect(input).toBeTruthy();
});

test("Check HouseHold Income", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="householdIncome"]`);
	fireEvent.change(input, { target: { value: "$500,000" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('$500,000');
});

test('Check HouseHold Income MaxLength', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="householdIncome"]`);
	expect(input.maxLength).toBe(10);
})

test("Check HouseHold Income is greater than or equal to Personal Income", async () => {
	const { container } = render(component());
	const personalIncome = container.querySelector(`input[name="personalIncome"]`);
	const input = container.querySelector(`input[name="householdIncome"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "$300,000" } });
		fireEvent.change(personalIncome, { target: { value: "$400,000" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="annualHousehold-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Annual household income must be greater than or equal to Annual personal income');
});

test("Render Employement Status", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="employementStatus"]`);
	expect(input).toBeTruthy();
});

test("Select Employement Status", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="employementStatus"]`);
	fireEvent.change(input, { target: { value: "Employed Salaried" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('Employed Salaried');
});


test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});

it("Navigate to Respective Page", async () => {
	render(component());
	const input = screen.getByTestId("submit");
	expect(input).toBeTruthy();
	fireEvent.click(input);
	const asyncMock = jest.fn().mockResolvedValue(mockData);
	await asyncMock();
	const page = screen.getByTestId("selectOfferComponent")
	await waitFor(() => expect(page).toBeInTheDocument());
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});
