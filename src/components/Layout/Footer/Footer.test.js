import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

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
					<Footer />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('prelogin_footer_component');
	expect(element).toBeTruthy();
});
test('Navigate to communityguidelines', () => {
    const { container } = render(component());
	const link = container.querySelector(`a`);
    fireEvent.click(link);
    expect(link.href).toContain('/communityGuidelines');
});
test("Navigate to privacy statement", () => {
    render(component());
    const element = screen.getByTestId("privacyStatement");
    expect(element).toHaveAttribute("href",`/privacyStatement`);
    expect(element).toBeTruthy();
  
  });
test('Navigate to terms', () => {
    render(component());
    const element = screen.getByTestId("termsofuse");
    expect(element).toHaveAttribute("href",`/termsofuse`);
    expect(element).toBeTruthy();
});
test('Navigate to license', () => {
    render(component());
    const element = screen.getByTestId("licenseDisclosure");
    expect(element).toHaveAttribute("href",`/licenseDisclosure`);
    expect(element).toBeTruthy();
});
test('Navigate to texting terms', () => {
    render(component());
    const element = screen.getByTestId("textingTermsOfUse");
    expect(element).toHaveAttribute("href",`/textingTermsOfUse`);
    expect(element).toBeTruthy();
});
test('Navigate to website accessibility', () => {
    render(component());
    const element = screen.getByTestId("websiteAccessibility");
    expect(element).toHaveAttribute("href",`/websiteAccessibility`);
    expect(element).toBeTruthy();
});
test('Navigate to cac terms', () => {
    render(component());
    const element = screen.getByTestId("cac-termsofuse");
    expect(element).toHaveAttribute("href",`/cac-termsofuse`);
    expect(element).toBeTruthy();
});
test('Navigate to californiaResident', () => {
    render(component());
    const element = screen.getByTestId("californiaResident");
    expect(element).toHaveAttribute("href",`/californiaResident`);
    expect(element).toBeTruthy();
});
test('Should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});