import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import ProfilePicture from '../../../contexts/ProfilePicture';
import { GlobalStateProvider } from "../../../../src/contexts/GlobalStateProvider";
import PaymentMethod from './PaymentMethod';
import { LoanDataMock } from "./../../../__mock__/LoanData.mock";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
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
const component = () =>{
	return(
		<GlobalStateProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ProfilePicture>
						<PaymentMethod/>
					</ProfilePicture>				
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>		
	);
}
jest.mock("../../../hooks/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))


test("Check the component is rendered", async () => {
  LoanDataMock();
	render(component(),{wrapper: MemoryRouter});
	const element = screen.getByTestId('profile-payment-method');	
	expect(element).toBeTruthy();
});

test("Check Add Bank Account button exist in the UI", async () => {
  LoanDataMock();
	const { getByText } = render(component(),{wrapper: MemoryRouter});	
	expect(getByText("Add Bank Account")).toBeTruthy();
});

test("Check can able to click Add Bank Account button and showing popup", async () => {
  LoanDataMock();
	render(component(),{wrapper: MemoryRouter});	
	fireEvent.click(screen.getByTestId('add-new-account-number'));	
	const element = screen.getByTestId('add-new-bank-account-container');
	expect(element).toHaveClass("showContent");
});
test("Check all input filed exist in the UI. account Nick Name, Account Holder Name, Account Type, Rounting Number, Bank Name, Bank Account Number and set default checkbox", async () => {
  LoanDataMock();
	const { container} = render(component(),{wrapper: MemoryRouter});	
	const accountNickname = container.querySelector(`input[name="accountNickname"]`);
	expect(accountNickname).toBeTruthy();
	expect(accountNickname.value).toBe('');

	const accountHolder = container.querySelector(`input[name="accountHolder"]`);
	expect(accountHolder).toBeTruthy();
	expect(accountHolder.value).toBe('');

	const accountType = screen.getByLabelText('Checking');
	expect(accountType).toBeTruthy();
	expect(accountType).not.toBeChecked(false);

	const bankRoutingNumber = container.querySelector(`input[name="bankRoutingNumber"]`);
	expect(bankRoutingNumber).toBeTruthy();
	expect(bankRoutingNumber.value).toBe('');

	const bankName = container.querySelector(`input[name="bankName"]`);
	expect(bankName).toBeTruthy();
	expect(bankName.value).toBe('');

	const bankAccountNumber = container.querySelector(`input[name="bankAccountNumber"]`);
	expect(bankAccountNumber).toBeTruthy();
	expect(bankAccountNumber.value).toBe('');

	const defaultCheckBox = container.querySelector(`input[name="addBankSetDefault"]`);
	expect(defaultCheckBox).toBeTruthy();

});

test("Check Nick name validation is working", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const accountNickname = container.querySelector(`input[name="accountNickname"]`);
	expect(accountNickname).toBeTruthy();	
	await act(() => {
		fireEvent.change(accountNickname, { target: { value: "" } });		
		fireEvent.blur(accountNickname);	
	});	
	const errorInfo = container.querySelector(`p[id="accountNickname-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Account Nickname is required.');

});
test("Check Account holder name validation is working", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const accountNickname = container.querySelector(`input[name="accountHolder"]`);
	expect(accountNickname).toBeTruthy();	
	await act(() => {
		fireEvent.change(accountNickname, { target: { value: "" } });		
		fireEvent.blur(accountNickname);	
	});	
	const errorInfo = container.querySelector(`p[id="accountHolder-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Account Holder Name is required.');

});

test("Check Bank Account number validation is working", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const accountNickname = container.querySelector(`input[name="bankAccountNumber"]`);
	expect(accountNickname).toBeTruthy();	
	await act(() => {
		fireEvent.change(accountNickname, { target: { value: "" } });		
		fireEvent.blur(accountNickname);	
	});	
	const errorInfo = container.querySelector(`p[id="bankAccountNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Bank Account Number is required.');

});

test("Check Add Debit Card button exist in the UI", async () => {
  LoanDataMock();
	const { getByText } = render(component(),{wrapper: MemoryRouter});	
	expect(getByText("Add Debit Card")).toBeTruthy();
});

test("Check can able to click Add Bank Account button and showing popup", async () => {
  LoanDataMock();
	render(component(),{wrapper: MemoryRouter});	
	fireEvent.click(screen.getByTestId('add-new-debit-card'));	
	const element = screen.getByTestId('add-new-debit-card-container');
	expect(element).toHaveClass("showContent");
});

test("Check all input filed exist in the UI. Card number, Name on Card, Expiration Date, CVV, ", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();
	expect(cardNumber.value).toBe('');

	const cardName = container.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();
	expect(cardName.value).toBe('');

	const expiryDate = container.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();
	expect(expiryDate.value).toBe('');

	const cvv = container.querySelector(`input[name="cvv"]`);
	expect(cvv).toBeTruthy();
	expect(cvv.value).toBe('');

	const sameAsMailAddress = container.querySelector(`input[name="sameAsMailAddress"]`);
	expect(sameAsMailAddress).toBeTruthy();
	expect(sameAsMailAddress).toBeChecked(false);

	const streetAddress = container.querySelector(`input[name="streetAddress"]`);
	expect(streetAddress).toBeTruthy();
	expect(streetAddress.value).toBe('');

	const zipcode = container.querySelector(`input[name="zipcode"]`);
	expect(zipcode).toBeTruthy();
	expect(zipcode.value).toBe('');

	const city = container.querySelector(`input[name="city"]`);
	expect(city).toBeTruthy();
	expect(city.value).toBe('');

	const state = container.querySelector(`input[name="state"]`);
	expect(state).toBeTruthy();
	expect(state.value).toBe('');

	const defaultCheckBox = container.querySelector(`input[name="setDefault"]`);
	expect(defaultCheckBox).toBeTruthy();

});

test("Check Card Number validation is working when value is empty", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Card Number is required.');

});

test("Check Card Number validation is working when entered number less than 16 digit", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "23232" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Card Number should be 13 digits.');

});

test("Check Card Number validation that accept only Visa or Master card	", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "2333232233333333" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('We only accept Visa or Master card');

});

test("Check Card Number validation that error message should not be shown when entered valid card	", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "5487990000000052" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();	

});

test("Master card image to be shown when entering valid card number", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "5487990000000052" } });		
		fireEvent.blur(cardNumber);	
	});		
	const element = screen.getByTestId('selected-card-type-image');	
	expect(element).toBeTruthy();
	expect(element).toHaveAttribute('src', window.location.origin + "/Card/MasterCard.png");
});

test("Unknown image to be shown when entering invalid card number", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "2323990000000052" } });		
		fireEvent.blur(cardNumber);	
	});		
	const element = screen.getByTestId('selected-card-type-image');	
	expect(element).toBeTruthy();
	expect(element).toHaveAttribute('src', window.location.origin + "/Card/unknown.png");
});

test("Check Name on card validation is working", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const cardName = container.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardName, { target: { value: "" } });		
		fireEvent.blur(cardName);	
	});	
	const errorInfo = container.querySelector(`p[id="cardName-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Cardholder Name is required.');

});

test("Check card expired date validation is working", async () => {
  LoanDataMock();
	const { container } = render(component(),{wrapper: MemoryRouter});	
	const expiryDate = container.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();	
	await act(() => {
		fireEvent.change(expiryDate, { target: { value: "" } });		
		fireEvent.blur(expiryDate);	
	});	
	const errorInfo = container.querySelector(`p[id="expiryDate-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Expiration Date is required');
});