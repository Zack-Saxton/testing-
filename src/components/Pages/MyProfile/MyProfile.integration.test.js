import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import MyProfile from './MyProfile';
import { GlobalStateProvider } from "../../../../src/contexts/GlobalStateProvider";
import { LoanDataMock } from "./../../../__mock__/LoanData.mock";
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
		<GlobalStateProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ProfilePicture>
						<MyProfile />
					</ProfilePicture>
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>
	);
}

jest.mock("./../AccountOverview/AccountOverviewHook/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))
Cookies.set("hasActiveLoan", true);
Cookies.set("hasApplicationStatus", "approved");
const basicComponentUtil = (getByText) =>{
	const basicInfoBtn = getByText("Basic Information").closest("button");
  fireEvent.keyDown(basicInfoBtn); 
	fireEvent.click(basicInfoBtn);
	const element = screen.getByTestId('basic-information-component');
	expect(element).toBeTruthy();
	return element;
}

const mailingAddressUtil = (getByText) =>{
	const mailingAddress = getByText("Mailing Address").closest("button");
  fireEvent.keyDown(mailingAddress); 
	fireEvent.click(mailingAddress);	
	const element = screen.getByTestId('basic-information-mailing-address');
	expect(element).toBeTruthy();
	return element;
}
const changePasswordUtil = (getByText) =>{
	const changePassword = getByText("Change Password").closest("button");
  fireEvent.keyDown(changePassword); 
	fireEvent.click(changePassword);	
	const element = screen.getByTestId('profile-change-password');
	expect(element).toBeTruthy();
	return element;
}

const paymentMethodsUtil = (getByText) =>{
	const paymentMethods = getByText("Payment Method").closest("button");
  fireEvent.keyDown(paymentMethods); 
	fireEvent.click(paymentMethods);
	const element = screen.getByTestId('profile-payment-method');
	expect(element).toBeTruthy();
	return element;
}

const textNotificationUtil = (getByText) =>{
	const mailingAddress = getByText("Text Notification - Off").closest("button");
  fireEvent.keyDown(mailingAddress); 
	fireEvent.click(mailingAddress);
	const element = screen.getByTestId('profile-text-notification');
	expect(element).toBeTruthy();
	return element;
}

test("Checks the component is rendered", () => {
  LoanDataMock();
	render(component(), { wrapper: MemoryRouter });
  const element = screen.getByTestId('profile-component-test');
	expect(element).toBeTruthy();
});
test("Check the five tabs are available in UI", () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter });
  const basicInfoBtn = container.querySelector(`button[id="scrollable-auto-tab-vertical-0"]`); 
	expect(basicInfoBtn).toBeTruthy();
	const mailingAddress = container.querySelector(`button[id="scrollable-auto-tab-vertical-1"]`); 
	expect(mailingAddress).toBeTruthy();
	const textNotification = container.querySelector(`button[id="scrollable-auto-tab-vertical-2"]`); 
	expect(textNotification).toBeTruthy();
	const paymentMethod = container.querySelector(`button[id="scrollable-auto-tab-vertical-3"]`); 
	expect(paymentMethod).toBeTruthy();
	const ChangePassword = container.querySelector(`button[id="scrollable-auto-tab-vertical-4"]`); 
	expect(ChangePassword).toBeTruthy();
});


test("--------------------Basic information component use cases--------------------", async () => {
  
});

test("Check the first name field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('jean');
});

test("Check the last name field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('llmtwxy');
});

test("Check the Date of Birth field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('**/**/1984');
});

test("Check the Email Address field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('zdunkerton@marinerfinance.com');
});

test("Check the Primary phone number field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('(***) ***-1234');
});

test("Check the upload image field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[id="selectImage"]`);
	expect(input).toBeTruthy();
});

test("First name field to be disabled in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Last name field to be disabled in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Date of Birth field to be disabled in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check can able to enter email id in Email Address filed in UI", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "vickeykgv@gmail.com" } });
	});
	expect(input.value).toBe('vickeykgv@gmail.com');
});

test("Show error message if entered invalid email id", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "vickeykgv" } });
		fireEvent.blur(input);
	});
	const errorInfo = element.querySelector(`p[id="email-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('A valid email address is required');
});

test("Check can able to enter phone number in Phone Number filed in UI", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "(123) 123-1233" } });
	});
	expect(input.value).toBe('(123) 123-1233');
});

test("Check number masking after entering phone number", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).not.toBe('1231231233');
});

test("Check number masking after entering phone number", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('(***) ***-1233');
});

test("Verify can able to click file upload", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[id="selectImage"]`);
	fireEvent.click(input);
	expect(input).toBeTruthy();
});

test("------------------------------Mailing address component use cases-----------------------", async () => {
  
});

test("When click Mailing Address menu, the mailing address component to be render", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	
});


test("Check the Street address field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="streetAddress"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('1234 MAIN AVEE');
});

test("Check the City field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);	
	const input = element.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('BEAR');
});

test("Check the state field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('DE');
});

test("Check the zipcode field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('19701');
});

test("Check the cancel button in  UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	expect(getByText("Cancel")).toBeTruthy();
});

test("Check the Save button in  UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	expect(getByText("Save Changes")).toBeTruthy();
});

test("City field to be disabled in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("State field to be disabled in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check the zipcode max length to be 5", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.maxLength).toBe(5);
});

test("Check can able to enter Street address in UI", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="streetAddress"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "4321 MAIN AVE" } });
	});
	expect(input.value).toBe('4321 MAIN AVE');
});

test("Check can able to enter Zipcode in UI", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "19701" } });
	});
	expect(input.value).toBe('19701');
});

test("Check can able to click Save button", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	await act(() => {
		fireEvent.click(screen.getByText('Save Changes'));
	});	
});

test("------------------------------Text Notification component use cases-----------------------", async () => {
  
});

test("When click Text Notification menu, the text notification component to be render", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);	
});


test("Check the the notification switch option in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	expect(InputEvent).toBeTruthy();
});

test("Check the the phone number field in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
});

test("Check the the notification switch option in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-terms');
	expect(input).toBeTruthy();
});

test("Check the cancel button in  UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	expect(getByText("Cancel")).toBeTruthy();
});

test("Check the Save button in  UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	expect(getByText("Update")).toBeTruthy();
});

test("By default the switch to be Off", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	expect(input).not.toBeChecked();
});

test("The switch to be On in click event", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	fireEvent.click(input);
	expect(input).toBeChecked();
});

test("The switch to be On and Off when click two time", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	fireEvent.click(input);
	fireEvent.click(input);
	expect(input).not.toBeChecked();
});

test("Check can able to enter phone number in Phone Number filed in UI", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "(123) 123-1235" } });
	});
	expect(input.value).toBe('(123) 123-1235');
});

test("Check number masking after entering phone number", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).not.toBe('1231231233');
});

test("Check number masking after entering phone number", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = notification.querySelector(`input[name="phone"]`);
	expect(element).toBeTruthy();
	await act(() => {
		fireEvent.change(element, { target: { value: "1231231235" } });
		fireEvent.blur(element);
	});
	expect(element.value).toBe('(***) ***-1235');
});

test("Check can able to select terms check box UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = notification.querySelector(`input[id="textingterms"]`);
	fireEvent.click(element);
	expect(element).toBeChecked();
});

test("Check can able to select and deselect terms check box UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = notification.querySelector(`input[id="textingterms"]`);
	fireEvent.click(element);
	fireEvent.click(element);
	expect(element).not.toBeChecked();
});

test("Check can able to click Cancel button", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = getByText("Cancel");
	await act(() => {
		fireEvent.click(element);
	});
});

test("Check can able to click Update button", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = getByText("Update");
	await act(() => {
		fireEvent.click(element);
	});
});

test("Check the disclosure link is showing in UI", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = screen.getByTestId('disclosure-link');
	expect(element).toBeTruthy();
});

test("Check the disclosure popup is opening when click the link", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = screen.getByTestId('disclosure-link');
	await act(() => {
		fireEvent.click(element);
	});
	const disclosurePopup = screen.getByTestId('disclosure-popup');
	expect(disclosurePopup).toBeTruthy();
});






test("------------------------------Payment Methods component use cases-----------------------", async () => {
  
});

test("When click Payment methods menu, the payment method component to be render", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
});

test("Check Add Bank Account button exist in the UI", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	expect(getByText("Add Bank Account")).toBeTruthy();
});

test("Check can able to click Add Bank Account button and showing popup", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	fireEvent.click(screen.getByTestId('add-new-account-number'));	
	const input = screen.getByTestId('add-new-bank-account-container');
	expect(input).toHaveClass("showContent");
});

test("Check all input filed exist in the UI. account Nick Name, Account Holder Name, Account Type, Rounting Number, Bank Name, Bank Account Number and set default checkbox", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	const accountNickname = element.querySelector(`input[name="accountNickname"]`);
	expect(accountNickname).toBeTruthy();
	expect(accountNickname.value).toBe('');

	const accountHolder = element.querySelector(`input[name="accountHolder"]`);
	expect(accountHolder).toBeTruthy();
	expect(accountHolder.value).toBe('');

	const accountType = element.querySelector(`input[name="accountType"]`);
	expect(accountType).toBeTruthy();
	expect(accountType).toBeChecked(false);

	const bankRoutingNumber = element.querySelector(`input[name="bankRoutingNumber"]`);
	expect(bankRoutingNumber).toBeTruthy();
	expect(bankRoutingNumber.value).toBe('');

	const bankName = element.querySelector(`input[name="bankName"]`);
	expect(bankName).toBeTruthy();
	expect(bankName.value).toBe('');

	const bankAccountNumber = element.querySelector(`input[name="bankAccountNumber"]`);
	expect(bankAccountNumber).toBeTruthy();
	expect(bankAccountNumber.value).toBe('');

	const defaultCheckBox = element.querySelector(`input[name="addBankSetDefault"]`);
	expect(defaultCheckBox).toBeTruthy();

});


test("Check Nick name validation is working", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const accountNickname = element.querySelector(`input[name="accountNickname"]`);
	expect(accountNickname).toBeTruthy();	
	await act(() => {
		fireEvent.change(accountNickname, { target: { value: "" } });		
		fireEvent.blur(accountNickname);	
	});	
	const errorInfo = element.querySelector(`p[id="accountNickname-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Account Nickname is required.');

});

test("Check Account holder name validation is working", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);		
	const accountNickname = element.querySelector(`input[name="accountHolder"]`);
	expect(accountNickname).toBeTruthy();	
	await act(() => {
		fireEvent.change(accountNickname, { target: { value: "" } });		
		fireEvent.blur(accountNickname);	
	});	
	const errorInfo = element.querySelector(`p[id="accountHolder-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Account Holder Name is required.');

});

test("Check Bank Account number validation is working", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const accountNickname = element.querySelector(`input[name="bankAccountNumber"]`);
	expect(accountNickname).toBeTruthy();	
	await act(() => {
		fireEvent.change(accountNickname, { target: { value: "" } });		
		fireEvent.blur(accountNickname);	
	});	
	const errorInfo = element.querySelector(`p[id="bankAccountNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Bank Account Number is required.');

});

test("*********************************Add Debit Card Test Cases****************************", async () => {  
});

test("Check Add Debit Card button exist in the UI", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	expect(getByText("Add Debit Card")).toBeTruthy();
});

test("Check can able to click Add Bank Account button and showing popup", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	fireEvent.click(screen.getByTestId('add-new-debit-card'));	
	const input = screen.getByTestId('add-new-debit-card-container');
	expect(input).toHaveClass("showContent");
});

test("Check all input filed exist in the UI. Card number, Name on Card, Expiration Date, CVV, ", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();
	expect(cardNumber.value).toBe('');

	const cardName = element.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();
	expect(cardName.value).toBe('');

	const expiryDate = element.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();
	expect(expiryDate.value).toBe('');

	const cvv = element.querySelector(`input[name="cvv"]`);
	expect(cvv).toBeTruthy();
	expect(cvv.value).toBe('');

	const sameAsMailAddress = element.querySelector(`input[name="sameAsMailAddress"]`);
	expect(sameAsMailAddress).toBeTruthy();
	expect(sameAsMailAddress).toBeChecked(false);

	const streetAddress = element.querySelector(`input[name="streetAddress"]`);
	expect(streetAddress).toBeTruthy();
	expect(streetAddress.value).toBe('');

	const zipcode = element.querySelector(`input[name="zipcode"]`);
	expect(zipcode).toBeTruthy();
	expect(zipcode.value).toBe('');

	const city = element.querySelector(`input[name="city"]`);
	expect(city).toBeTruthy();
	expect(city.value).toBe('');

	const state = element.querySelector(`input[name="state"]`);
	expect(state).toBeTruthy();
	expect(state.value).toBe('');

	const defaultCheckBox = element.querySelector(`input[name="setDefault"]`);
	expect(defaultCheckBox).toBeTruthy();

});

test("Check Card Number validation is working when value is empty", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = element.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Card Number is required.');

});

test("Check Card Number validation is working when entered number less than 16 digit", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "23232" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = element.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Card Number should be 13 digits.');

});

test("Check Card Number validation that accept only Visa or Master card	", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "2333232233333333" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = element.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('We only accept Visa or Master card');

});

test("Check Card Number validation that error message should not be shown when entered valid card	", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "5487990000000052" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = element.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();	

});

test("Master card image to be shown when entering valid card number", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "5487990000000052" } });		
		fireEvent.blur(cardNumber);	
	});		
	const input = screen.getByTestId('selected-card-type-image');	
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute('src', window.location.origin + "/Card/MasterCard.png");
});

test("Unknown image to be shown when entering invalid card number", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	const cardNumber = element.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "2323990000000052" } });		
		fireEvent.blur(cardNumber);	
	});		
	const input = screen.getByTestId('selected-card-type-image');	
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute('src', window.location.origin + "/Card/unknown.png");
});

test("Check Name on card validation is working", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const cardName = element.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardName, { target: { value: "" } });		
		fireEvent.blur(cardName);	
	});	
	const errorInfo = element.querySelector(`p[id="cardName-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Cardholder Name is required.');

});

test("Check card expired date validation is working", async () => {
  LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
	const expiryDate = element.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();	
	await act(() => {
		fireEvent.change(expiryDate, { target: { value: "" } });		
		fireEvent.blur(expiryDate);	
	});	
	const errorInfo = element.querySelector(`p[id="expiryDate-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Expiration Date is required');
});






test("------------------------------Change Password component use cases-----------------------", async () => {
  
});

test("When click Change Password menu, the change password component to be render", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
});

test("Check the Old password field in UI with value empty", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the New password field in UI with value empty", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the Confirm new password field in UI with value empty", () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Show error message if not entered Old passord", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = element.querySelector(`p[id="oldPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your old password is required');
});

test("Show error message if not entered New passord", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = element.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your new password is required');
});

test("Show error message if not entered confirm passord", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = element.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your password confirmation is required');
});

test("Check can able to  enter Old passord", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@" } });
	});
	expect(input.value).toBe('Mariner1@');
});

test("Show error message if entered new password is below 10 characters", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner');
	const errorInfo = element.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Password should be minimum of 10 characters in length');
});

test("Show error message when entered password is not meet the criteria", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Marinerqqqq" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Marinerqqqq');
	const errorInfo = element.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your password does not meet the criteria');
});

test("The error message should not be shown if entered password meet the criteria", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner1@1');
	const errorInfo = element.querySelector(`p[id="newPasswordWrap-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();
});

test("Show error message if entered confirm password is below 10 characters", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner');
	const errorInfo = element.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Password should be minimum of 10 characters in length');
});

test("Show error message when entered confirm password is not meet the criteria", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Marinerqqqq" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Marinerqqqq');
	const errorInfo = element.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your password does not meet the criteria');
});

test("The error message should not be shown if entered confirm password meet the criteria", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const newPassword = element.querySelector(`input[name="newPassword"]`);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.change(newPassword, { target: { value: "Mariner1@1" } });
		fireEvent.blur(input);
	});
	expect(input.value).toBe('Mariner1@1');
	const errorInfo = element.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();
});

test("Show error message if entered confirm password not matched with new password", async () => {
	LoanDataMock();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const newPassword = element.querySelector(`input[name="newPassword"]`);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.change(newPassword, { target: { value: "Mariner1@" } });
		fireEvent.blur(input);
	});
	const errorInfo = element.querySelector(`p[id="retypeNewPasswordWrap-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your confirmation password must match your password');
});