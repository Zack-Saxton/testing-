import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import EmailVerification from "../EmailVerification";
import { useBranchPortalHook } from './useBranchPortalHook';

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

jest.mock("./useBranchPortalHook", () => ({
  useBranchPortalHook: jest.fn(),
}))

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<EmailVerification />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

const mockDataBranchPortal = {
	
    "data": {
        "params": [
            "required=activation",
            "activation_token=-2b-10-5yu3yvwwfzymvute5dtbeexs-4eldqdvqzwnc5b9lwxceb0hbd9sy",
            "email=work.test568@gmail.com",
            "applicationNumber=7001-0000016058",
            "autoVerification=on",
            "collaborateOption=on"
        ],
        "emailVerificationRecord": {
            "attributes": {
                "captured_info": {
                    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                    "ip_address": "182.76.219.230",
                    "click_timestamp": "2022-07-05T11:47:32.941Z",
                    "browser": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                    "os": "Windows",
                    "consents": {
                        "consent_date": "2022-07-05T11:48:19.497Z"
                    }
                },
                "email_verified": true,
                "consents_verified": true,
                "user_activation_token_link": "-2b-10-b5qdtkqjcy4-gfowdy10poz6-f6e37ccvry0ipnkdxpp6d-7hd4gc",
                "user_activation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydW4ua0B6dWNpc3lzdGVtcy5jb20iLCJpYXQiOjE2NTcwMjE1MTZ9.qpYCWVbVNzbemxUwbWZkOb02wPbXNODiBLWBt4MQSWU",
                "reset_activation_expires_millis": "1657025116505",
                "applicationNumber": "7001-0000016058",
                "autoVerification": "on",
                "collaborateOption": "on"
            },
            "request_created_by": {
                "account_id": "60b6a6c6fbd4d70550351484"
            },
            "sorad": {
                "files": [],
                "applcationData": [
                    {
                        "applicationNumber": "7001-0000016058",
                        "numberOfFiles": 0,
                        "acquireClickedat": [
                            "7/5/2022, 07:48:54"
                        ],
                        "_id": "62c424d54fa1f7043e7f82dc",
                        "consents": {
                            "consent_date": "2022-07-05T11:48:19.497Z"
                        }
                    }
                ]
            },
            "contenttypes": [],
            "entitytype": "emailverification",
            "customer_email": "work.test568@gmail.com",
            "email_triggred_by": "mariner@mariner.com",
            "gpsUploadPending": false,
            "_id": "62c424494fa1f7043e7f8274",
            "createdat": "2022-07-05T11:45:13.740Z",
            "updatedat": "2022-07-05T12:28:29.882Z",
            "changes": [],
            "__v": 0
        },
        "numberOfFiles": 0,
        "messageType": "success"
    }
}

it("Checks the Email Verification component is rendered", () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false
  }));
  const container = render(component());
  const headingElement = container.getByTestId("emailVerification_component");
  expect(headingElement).toBeTruthy();
});

it("Load Email Verification", () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: true,
  }));
  const container = render(component());
  const headingElement = container.getByTestId("while_Loading");
  expect(headingElement).toBeTruthy();
});
 
it("Load Email Verification Heading", () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false,
		verificationData: mockDataBranchPortal,
  }));
  const container = render(component());
  const headingElement = container.getByTestId("emailVerification_heading");
  expect(headingElement).toBeTruthy();
});

it("Load Email Verification Heading", () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false,
		verificationData: mockDataBranchPortal,
  }));
  const container = render(component());
  const headingElement = container.getByTestId("emailVerification_heading");
  expect(headingElement).toBeTruthy();
});


it("Load Thank you message", async () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false,
		verificationData: mockDataBranchPortal,
  }));
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Thank you for verifying your email.")).toBeTruthy();
	}); 
})
 
it("Load Acknowledgement links", () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false,
		verificationData: mockDataBranchPortal,
  }));
  const container = render(component());
  const esignClick = container.getByTestId("esignClick");
  expect(esignClick).toBeTruthy();
	const creditContact = container.getByTestId("creditContact");
  expect(creditContact).toBeTruthy();
	const websiteTerms = container.getByTestId("websiteTerms");
  expect(websiteTerms).toBeTruthy();
	const websitePrivacy = container.getByTestId("websitePrivacy");
  expect(websitePrivacy).toBeTruthy();
}); 

it("check chekbox is clicked", () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false,
		verificationData: mockDataBranchPortal,
  }));
  const container = render(component());
  const headingElement = container.getByTestId("checkboxGrid");
  expect(headingElement).toBeTruthy();
});