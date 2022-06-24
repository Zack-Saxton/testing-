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
import  { useAccountOverview }  from './../AccountOverview/AccountOverviewHook/useAccountOverview';

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
const accountOverviewData = {"data":{"skip_session":true,"customer":{"extensionattributes":{"login":{"timestamp_date":"2022-04-25T12:55:04.190Z"}},"sorad":{"latest_application":{"application":"623890e6676f6d044d5a9b54","application_submission_date":"2022-03-21T14:51:18.344Z"},"submissions":["61d57e630d6ea40483403fdd","61d57e770d6ea40483404020","61d57e8a0d6ea40483404063","61d57ece0d6ea404834040a6","61d57edc0d6ea404834040e9","61d57f7f0d6ea4048340412c","61dbfbf68203da0482e6f1ba","620147a12775f104842a7c3a","620fdd0c5a3712047b74cee6","6220f00c39d65c04cd4211cd","6220f39239d65c04cd421772","6220fca039d65c04cd4224ca","6220febb39d65c04cd42268f","6221012a39d65c04cd422b33","6221030439d65c04cd422e60","6221067539d65c04cd4230ef","62210c6139d65c04cd423362","62210da139d65c04cd42340c","6238821f676f6d044d5a88c4","6238857b676f6d044d5a8aac","623890e6676f6d044d5a9b4b"],"issuedproducts":[],"applications":["5c743dbcffbf7814ab74f6db","5c7569028eb7bb0f105a7d1c","5c7694f7e3daed05e5c3abd2","5c769787881f03067f49b666","5c780e5ec8f05305e9c04ca9","5c78108dc8f05305e9c04cd1","5c7937b321b80d06c6be1e68","5c7ffb7bd90b1002d373229d","5c8006c3d90b1002d37322b8","5c812a5666e3bc09b253824f","5c812ca966e3bc09b2538266","5c81305e66e3bc09b253827e","5c8681c366395602792874fc","5c87a5ad3bc2831e5beff074","5c87a8e73bc2831e5beff0e6","5c87aa503bc2831e5beff13d","5c87b7053bc2831e5beff1aa","5c87cf4c4c8f6423f7a9fde6","5c87d2204c8f6423f7a9fe5a","5c87db534c8f6423f7a9fecf","5c87ebf64c8f6423f7a9ffc8","5c87f3674c8f6423f7aa002b","5c87f9514c8f6423f7aa012f","5c87fcb24c8f6423f7aa018a","5c880c984c8f6423f7aa01fc","5c881453e0219f33f8ba4a33","5c890626b00ac7038a9f1923","5c893f64b00ac7038a9f1b6d","5c8a3e639ca2150254795ae2","5c8a59ca80a33a0f7abf693a","5c8a607e80a33a0f7abf6a16","5c9116e68fe7231210602e9c","5c91353b8fe7231210602f28","5c91359a8fe7231210602f40","5c9135e38fe7231210602f5a","5c927507fb2d2618dd96e266","5c9294131a7daf2b41caad80","5c92942e1a7daf2b41caad9a","5c92948a1a7daf2b41caadb9","5c9297831a7daf2b41caadd8","5c93ec3ff67b0f0ef3ceada9","5c93efe9f67b0f0ef3ceaecd","5c93f5def67b0f0ef3ceafed","5c98c3e4e0c6ee039acdf236","5c9b652745ad9c02e6db2a0e","5c9d1ad8b8661917b7607a59","5c9e1deaa8cce50450a75b90","5c9e363aa8cce50450a75c9c","5c9e3d01a8cce50450a75cf3","5c9e5144e4762a1cb7c54eab","5c9e6114e4762a1cb7c54fa6","5c9e73584b2197245e05e0fa","5ca1fa3172ec48031e484f19","5ca24a6bd4bf471271de8d66","5ca38744d0fa180315cac8f7","5ca39c62d045400f49d292c0","5ca39da2d045400f49d292da","5ca3a035d045400f49d292f8","5ca3a2a0d045400f49d29314","5ca3a3bad045400f49d2932e","5ca3a47ad045400f49d29348","5ca3a4abd045400f49d29362","5ca3b05cd045400f49d2937e","5ca3bdc35708d106ef1f9d9d","5ca4cb715708d106ef1f9e19","5ca761df71430503007e8504","5ca76ad371430503007e8527","5cb873d13e64e602e91807d5","5cc6f3438fd79f02a7528847","5ceea94039cda7036e8f3557","5cf031599a129512cea48818","5cf9574b08d700029307b0ea","61d57e630d6ea40483403fe6","61d57e770d6ea40483404029","61d57e8a0d6ea4048340406c","61d57ece0d6ea404834040af","61d57edc0d6ea404834040f2","61d57f7f0d6ea40483404135","61dbfbf68203da0482e6f1c3","620147a22775f104842a7c43","620fdd0c5a3712047b74ceef","6220f00c39d65c04cd4211d6","6220f39239d65c04cd42177b","6220fca139d65c04cd4224d3","6220febb39d65c04cd422698","6221012a39d65c04cd422b3c","6221030439d65c04cd422e69","6221067539d65c04cd4230f8","62210c6139d65c04cd42336b","62210da139d65c04cd423415","62388220676f6d044d5a88cd","6238857b676f6d044d5a8ab5","623890e6676f6d044d5a9b54"],"creditmonitoring":["61caf55784a83904996f92b8"]},"identification":{"user_account_id":"5c743dbcca856c14cc2718e0","full_name":"jean llmtwxy","first_name":"jean","last_name":"llmtwxy","middle_initial":null,"citizenship":"USA Citizen","date_of_birth":"1984-05-09T00:00:00.000Z","social_security_number":"3af6fc88b4d73add18","default_bank":"Ashok","guid":"CT-JE1551121852151","trace_number":1551121852151,"last4SSN":"***-**-6310"},"latest_contact":{"address_street":"1234 MAIN AVEE","address_city":"BEAR","address_state":"DE","address_postal_code":"19701","mailing_address_street":"1234 MAIN AVEE","mailing_address_city":"BEAR","mailing_address_state":"DE","mailing_address_postal_code":"19701","email":"zdunkerton@marinerfinance.com","phone_number_primary":"1231231234","phone_type":"Cell","opted_phone_texting":"2232223221","how_did_you_hear_about_us":"Advertising"},"communication_preferences":{"marketing_emails_unsubscribe_flag":false,"do_not_contact":false},"user_account":{"status":"open","status_check_time":null},"contenttypes":[],"entitytype":"customer","_id":"5c743dbcffbf7814ab74f6da","createdat":"2019-02-25T19:10:52.156Z","updatedat":"2022-04-28T17:08:54.636Z","__v":0,"docid":"5c743dbcffbf7814ab74f6da","notes":[],"use_session":true},"applicants":[{"applicationGuid":"AP-JE1647874278340","isActive":false,"applicantGuid":"AT-JE1647874278389","status":"contact_branch","submissionDate":"03/21/2022","applicantType":"primary","product":"Personal Loan","amountRequested":5000,"loanPurpose":"Home Improvement"},{"applicationGuid":"AP-JE1647871355995","isActive":false,"applicantGuid":"AT-JE1647871356037","status":"contact_branch","submissionDate":"03/21/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Home Improvement"},{"applicationGuid":"AP-JE1647870496228","isActive":false,"applicantGuid":"AT-JE1647870496299","status":"contact_branch","submissionDate":"03/21/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Holiday Spending"},{"applicationGuid":"AP-JE1646333345662","isActive":false,"applicantGuid":"AT-JE1646333345695","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Auto Expense/Repair"},{"applicationGuid":"AP-JE1646333025574","isActive":false,"applicantGuid":"AT-JE1646333025636","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Vacation"},{"applicationGuid":"AP-JE1646331509519","isActive":false,"applicantGuid":"AT-JE1646331509564","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Auto Expense/Repair"},{"applicationGuid":"AP-JE1646330628424","isActive":false,"applicantGuid":"AT-JE1646330628466","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Auto Expense/Repair"},{"applicationGuid":"AP-JE1646330154414","isActive":false,"applicantGuid":"AT-JE1646330154465","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Vacation"},{"applicationGuid":"AP-JE1646329531608","isActive":false,"applicantGuid":"AT-JE1646329531651","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Auto Expense/Repair"},{"applicationGuid":"AP-JE1646328993117","isActive":false,"applicantGuid":"AT-JE1646328993159","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Vacation"},{"applicationGuid":"AP-JE1646326674692","isActive":false,"applicantGuid":"AT-JE1646326674727","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Auto Expense/Repair"},{"applicationGuid":"AP-JE1646325772560","isActive":false,"applicantGuid":"AT-JE1646325772608","status":"contact_branch","submissionDate":"03/03/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Auto Expense/Repair"},{"applicationGuid":"AP-JE1645206796714","isActive":false,"applicantGuid":"AT-JE1645206796779","status":"contact_branch","submissionDate":"02/18/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Vacation"},{"applicationGuid":"AP-JE1644251042028","isActive":false,"applicantGuid":"AT-JE1644251042084","status":"contact_branch","submissionDate":"02/07/2022","applicantType":"primary","product":"Personal Loan","amountRequested":10000,"loanPurpose":"Debt Consolidation"},{"applicationGuid":"AP-JE1641806838352","isActive":false,"applicantGuid":"AT-JE1641806838408","status":"contact_branch","submissionDate":"01/10/2022","applicantType":"primary","product":"Personal Loan","amountRequested":5500,"loanPurpose":"Auto Expense/Repair"}],"application":{"identification":{"full_name":"jean llmtwxy","guid":"AP-JE1647874278340","trace_number":1647874278340,"application_submission_date":"2022-03-21T14:51:18.344Z"},"processing":{"application_reviewer":{"email":"unassigned","username":"unassigned","id":null},"gen_1_score":193,"adverse_reason_codes":[],"referral_reason_codes":["B1"],"last_verification_activity_date":null,"manual_review_reason":null,"marked_as_suspicious":false,"process_error":null,"reg_b_decision_date":"2022-04-20T14:51:16.000Z","review_start_date":null,"status":"referred","under_review_date":null,"submission_id":null,"submission_parameter":null,"submission_type":"CIS","approved_by":"unassigned","approved_date":null,"final_review_by":"unassigned","final_review_date":null,"legalApp":true,"legalAppDate":"2022-03-21T14:51:26.228Z","tokens":{"utm_source":null,"utm_campaign":null,"utm_medium":null,"utm_dealer":null},"flag":{"referred":true}},"selected_offer":{"internal_credit_score":null,"credit_product":null,"credit_product_type":null,"model_code":null,"cosigner_required":null,"approved_loan_amount":null,"annual_interest_rate":null,"origination_fee_rate":null,"origination_fee_amount":null,"apr":null,"base_score":null,"monthly_payment":null,"term":null,"total_payments":null,"promo":null,"postScreenOffer":null,"lightBoxOffer":null,"payment_to_income":null},"original_offer":{"internal_credit_score":null,"credit_product":null,"credit_product_type":null,"model_code":null,"cosigner_required":null,"approved_loan_amount":null,"annual_interest_rate":null,"origination_fee_rate":null,"origination_fee_amount":null,"apr":null,"base_score":null,"monthly_payment":null,"term":null,"total_payments":null,"promo":null,"payment_to_income":null},"source_tracking":{"calculated_summary_attribution":{"attributed_source":"direct/organic","attributed_source_date":"2022-03-21T14:51:16.000Z","landing_page":null,"referrer_url":"https://cis-development.marinerfinance.io/application/form/"},"history":[{"_id":"623890e6676f6d044d5a9b56"}]},"sorad":{"product":{"attributes":{"requested_credit_product":"unsecured_individual_loan_36_month","requested_credit_product_type":"loan"},"requested_product":"58b44ccc924ecefde2ce328d"},"files":[],"collateral":[],"branch_referral":{"contenttypes":[],"entitytype":"branchinfo","branchNumber":2032,"branchName":"Bear","Address":"1831 Pulaski Hwy","branchaddress2":"","branchstate":"DE","branchcity":"Bear","branchzipcode":"19701","PhoneNumber":"302-838-5710","dripsPhoneNumber":null,"branchmanager":"Darnell Garland","branchmanageremail":"dgarland@marinerfinance.com","timezone":"Eastern","brand":"Mariner","employees":4,"date_closed":null,"google_id":"ChIJp-i22o8Hx4kRUKlM0otutEw","virtualbranchflag":"0","hq_flag":"0","latitude":"39.612832","longitutde":"-75.703031","onlinemilemaximum":"60","_id":"5c9b700445ad9c02e6db2a3c","date_opened":"2004-06-02T00:00:00.000Z","createdat":"2019-03-27T12:43:48.937Z","updatedat":"2019-08-07T22:21:52.742Z","__v":0},"applicants":[{"attributes":{"type":"primary"},"third_party_data":{"geoips":[]},"_id":"623890e6676f6d044d5a9b55","customer":{"extensionattributes":{"login":{"timestamp_date":"2022-04-25T12:55:04.190Z"}},"sorad":{"latest_application":{"application":"623890e6676f6d044d5a9b54","application_submission_date":"2022-03-21T14:51:18.344Z"},"submissions":["61d57e630d6ea40483403fdd","61d57e770d6ea40483404020","61d57e8a0d6ea40483404063","61d57ece0d6ea404834040a6","61d57edc0d6ea404834040e9","61d57f7f0d6ea4048340412c","61dbfbf68203da0482e6f1ba","620147a12775f104842a7c3a","620fdd0c5a3712047b74cee6","6220f00c39d65c04cd4211cd","6220f39239d65c04cd421772","6220fca039d65c04cd4224ca","6220febb39d65c04cd42268f","6221012a39d65c04cd422b33","6221030439d65c04cd422e60","6221067539d65c04cd4230ef","62210c6139d65c04cd423362","62210da139d65c04cd42340c","6238821f676f6d044d5a88c4","6238857b676f6d044d5a8aac","623890e6676f6d044d5a9b4b"],"issuedproducts":[],"applications":["5c743dbcffbf7814ab74f6db","5c7569028eb7bb0f105a7d1c","5c7694f7e3daed05e5c3abd2","5c769787881f03067f49b666","5c780e5ec8f05305e9c04ca9","5c78108dc8f05305e9c04cd1","5c7937b321b80d06c6be1e68","5c7ffb7bd90b1002d373229d","5c8006c3d90b1002d37322b8","5c812a5666e3bc09b253824f","5c812ca966e3bc09b2538266","5c81305e66e3bc09b253827e","5c8681c366395602792874fc","5c87a5ad3bc2831e5beff074","5c87a8e73bc2831e5beff0e6","5c87aa503bc2831e5beff13d","5c87b7053bc2831e5beff1aa","5c87cf4c4c8f6423f7a9fde6","5c87d2204c8f6423f7a9fe5a","5c87db534c8f6423f7a9fecf","5c87ebf64c8f6423f7a9ffc8","5c87f3674c8f6423f7aa002b","5c87f9514c8f6423f7aa012f","5c87fcb24c8f6423f7aa018a","5c880c984c8f6423f7aa01fc","5c881453e0219f33f8ba4a33","5c890626b00ac7038a9f1923","5c893f64b00ac7038a9f1b6d","5c8a3e639ca2150254795ae2","5c8a59ca80a33a0f7abf693a","5c8a607e80a33a0f7abf6a16","5c9116e68fe7231210602e9c","5c91353b8fe7231210602f28","5c91359a8fe7231210602f40","5c9135e38fe7231210602f5a","5c927507fb2d2618dd96e266","5c9294131a7daf2b41caad80","5c92942e1a7daf2b41caad9a","5c92948a1a7daf2b41caadb9","5c9297831a7daf2b41caadd8","5c93ec3ff67b0f0ef3ceada9","5c93efe9f67b0f0ef3ceaecd","5c93f5def67b0f0ef3ceafed","5c98c3e4e0c6ee039acdf236","5c9b652745ad9c02e6db2a0e","5c9d1ad8b8661917b7607a59","5c9e1deaa8cce50450a75b90","5c9e363aa8cce50450a75c9c","5c9e3d01a8cce50450a75cf3","5c9e5144e4762a1cb7c54eab","5c9e6114e4762a1cb7c54fa6","5c9e73584b2197245e05e0fa","5ca1fa3172ec48031e484f19","5ca24a6bd4bf471271de8d66","5ca38744d0fa180315cac8f7","5ca39c62d045400f49d292c0","5ca39da2d045400f49d292da","5ca3a035d045400f49d292f8","5ca3a2a0d045400f49d29314","5ca3a3bad045400f49d2932e","5ca3a47ad045400f49d29348","5ca3a4abd045400f49d29362","5ca3b05cd045400f49d2937e","5ca3bdc35708d106ef1f9d9d","5ca4cb715708d106ef1f9e19","5ca761df71430503007e8504","5ca76ad371430503007e8527","5cb873d13e64e602e91807d5","5cc6f3438fd79f02a7528847","5ceea94039cda7036e8f3557","5cf031599a129512cea48818","5cf9574b08d700029307b0ea","61d57e630d6ea40483403fe6","61d57e770d6ea40483404029","61d57e8a0d6ea4048340406c","61d57ece0d6ea404834040af","61d57edc0d6ea404834040f2","61d57f7f0d6ea40483404135","61dbfbf68203da0482e6f1c3","620147a22775f104842a7c43","620fdd0c5a3712047b74ceef","6220f00c39d65c04cd4211d6","6220f39239d65c04cd42177b","6220fca139d65c04cd4224d3","6220febb39d65c04cd422698","6221012a39d65c04cd422b3c","6221030439d65c04cd422e69","6221067539d65c04cd4230f8","62210c6139d65c04cd42336b","62210da139d65c04cd423415","62388220676f6d044d5a88cd","6238857b676f6d044d5a8ab5","623890e6676f6d044d5a9b54"],"creditmonitoring":["61caf55784a83904996f92b8"]},"identification":{"user_account_id":"5c743dbcca856c14cc2718e0","full_name":"jean llmtwxy","first_name":"jean","last_name":"llmtwxy","middle_initial":null,"citizenship":"USA Citizen","date_of_birth":"1984-05-09T00:00:00.000Z","social_security_number":"3af6fc88b4d73add18","default_bank":"Ashok","guid":"CT-JE1551121852151","trace_number":1551121852151,"last4SSN":"***-**-6310"},"latest_contact":{"address_street":"1234 MAIN AVEE","address_city":"BEAR","address_state":"DE","address_postal_code":"19701","mailing_address_street":"1234 MAIN AVEE","mailing_address_city":"BEAR","mailing_address_state":"DE","mailing_address_postal_code":"19701","email":"zdunkerton@marinerfinance.com","phone_number_primary":"1231231234","phone_type":"Cell","opted_phone_texting":"2232223221","how_did_you_hear_about_us":"Advertising"},"communication_preferences":{"marketing_emails_unsubscribe_flag":false,"do_not_contact":false},"user_account":{"status":"open","status_check_time":null},"contenttypes":[],"entitytype":"customer","_id":"5c743dbcffbf7814ab74f6da","createdat":"2019-02-25T19:10:52.156Z","updatedat":"2022-04-28T17:08:54.636Z","__v":0,"docid":"5c743dbcffbf7814ab74f6da","notes":[],"use_session":true},"applicant":{"contact":{"address_street":"1234 MAIN AVE","address_city":"NEWARK","address_state":"DE","address_postal_code":"19702","mailing_address_street":"1234 MAIN AVE","mailing_address_city":"NEWARK","mailing_address_state":"DE","mailing_address_postal_code":"19702","email":"zdunkerton@marinerfinance.com","first_name":"jean","full_name":"jean llmtwxy","last_name":"llmtwxy","phone_number_primary":"1231231234","phone_type":"Cell"},"funding_information":{"bank_account_holder":null,"bank_account_number":null,"bank_account_type":null,"bank_name":null,"bank_routing_number":null},"identification":{"guid":"AT-JE1647874278389","trace_number":1647874278389},"processing":{"email_verified":false,"review_state":null,"status":"referred","verification_status":null,"propensity_score":"P","propensity_score_risk":null,"distance_to_branch":40.2,"referral_ranking":2,"consents":{"credit_contact_authorization":{"consent":true,"version":"13"},"electronic_communications":{"consent":true,"version":"15"},"privacy_policy":{"consent":true,"version":null},"terms_of_use":{"consent":true,"version":"9"},"delaware_itemized_schedule_of_charges":{"consent":true,"version":"1.0"},"california_credit_education_program":{"consent":false,"version":"1.0"},"new_mexico_disclosure":{"consent":false,"version":"1.0"}},"esigns":{"credit_contact_authorization":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"electronic_communications":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"privacy_policy":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"terms_of_use":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"delaware_itemized_schedule_of_charges":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"california_credit_education_program":null,"new_mexico_disclosure":null},"flag":{"referred":true}},"self_reported":{"annual_income":120000,"citizenship":"USA Citizen","employment_status":"Employed Hourly","employer_name":null,"employer_phone_number":"3322018552","home_ownership":"Renting","household_annual_income":200000,"loan_purpose":"Home Improvement","marital_status":null,"military_status":null,"mortgage_or_rental_payment":2000,"position_at_employer":null,"relationship_to_borrower":null,"spouse_address_city":null,"spouse_address_postal_code":null,"spouse_address_state":null,"spouse_address_street":null,"tenure_at_employer":4,"years_at_current_address":null,"how_did_you_hear_about_us":null},"sorad":{"third_party_data":{"geoips":[],"soft_credit_pull":"623890f0676f6d044d5a9b62"},"files":["623890f2676f6d044d5a9b75","623890f0676f6d044d5a9b66","623890f1676f6d044d5a9b6b","623890f1676f6d044d5a9b70","623890f5676f6d044d5a9b80","623890f6676f6d044d5a9b87","623c33862c334404701be5ec","623c42512c334404701be9d7","623c7d4a314ae7044eef1e01","623c89f001711d04550652a3","623ca6c001711d04550669e3","623ca78f01711d0455066b15","623cb9e501711d04550689d4","623cbc1501711d0455068f15","624179520dad6204512ed5b5","6241797b0dad6204512ed60b","62417a2d0dad6204512ed6ad","62417cff0dad6204512ed6fc","624181680dad6204512ed75e","624194d30dad6204512ed824","624195730dad6204512ed85e","624195b10dad6204512ed8e0","6241bbbca5a2c3045364f9f8","6241bc8ea5a2c3045364fa3a","6241c8eaa5a2c3045364fb81","6241cbb6a5a2c3045364fe8c","6241cc7da5a2c3045364fff0","6241ce2ea5a2c3045365023c","6241ce37a5a2c30453650262","6241ce4fa5a2c304536502fa","6241ce84a5a2c3045365035c","6241dab6a5a2c3045365205f","6241dae5a5a2c304536520c8","6241db40a5a2c30453652110","6241dba7a5a2c30453652165","6241dc01a5a2c30453652193","6241dc20a5a2c304536521fd","6241ddb4a5a2c30453652396","6241de3ea5a2c3045365241f","6241dedea5a2c30453652482","6241df12a5a2c304536524b7","6241df30a5a2c304536524cc","6241e05ea5a2c304536526be","6241e090a5a2c3045365270b","6241e2a7a5a2c304536528ff","6241e736a5a2c30453652c6d","6241e776a5a2c30453652caf","6241e7f2a5a2c30453652d1b","6241eec9a5a2c30453653465","6241eeefa5a2c304536534a7","6241efd8a5a2c30453653516","6241f5fba5a2c304536536d7","6241f861a5a2c30453653801","6242d8d1c4464904954aba0f","6242dc8ac4464904954abdbb","6242dca3c4464904954abdfc","6242eff1c4464904954ac751","6242f00fc4464904954ac792","6242f110c4464904954ac868","6242f3c8c4464904954ac8ab","6242fa22c4464904954acab0","6242fa65c4464904954acae9","62430996c4464904954ad046","62430a08c4464904954ad091","62430b1bc4464904954ad1d1","62430b38c4464904954ad1ff","62430e991296ec04608f8b25","6243113c1296ec04608f8bf1","624311581296ec04608f8c06","624311731296ec04608f8c47","6243123b1296ec04608f8d2a","624312571296ec04608f8d5e","624312721296ec04608f8d93","6243128e1296ec04608f8dc7","624312fd1296ec04608f8e41","624313231296ec04608f8e82","6243133c1296ec04608f8e97","624313571296ec04608f8ebf","624313721296ec04608f8f00","624313a91296ec04608f8f28","624313d61296ec04608f8f83","624316031296ec04608f8fc5","624316941296ec04608f9047","624316ec1296ec04608f907c","6243184b1296ec04608f91d8","624319ba1296ec04608f926a","624431091296ec04608fc8f8","6244345b1296ec04608fc9cd","6244353d1296ec04608fca3a","624437751296ec04608fca92","6244388f1296ec04608fcade","624438a71296ec04608fcb1f","6244393f1296ec04608fcb74","624439f51296ec04608fcb98","62443a131296ec04608fcbc0","62443a491296ec04608fcbee","62443a681296ec04608fcc1c","62443a871296ec04608fcc31","62443a911296ec04608fcc66","62443abe1296ec04608fccdf","62443add1296ec04608fccf4","62443aea1296ec04608fcd22","62443af31296ec04608fcd63","62443b101296ec04608fcd91","62443b1e1296ec04608fcdd2","62443b231296ec04608fce13","62443b421296ec04608fce41","62443b781296ec04608fce82","62443ba61296ec04608fcec3","62443bdf1296ec04608fcee5","62443be81296ec04608fcf06","62443bfe1296ec04608fcf34","62443c091296ec04608fcf62","62443c211296ec04608fcf90","62443c341296ec04608fcfb2","62443c4b1296ec04608fcfd3","62443c5c1296ec04608fd001","62443c881296ec04608fd06c","62443c961296ec04608fd081","624443141296ec04608fd213","624443261296ec04608fd26b","624448211296ec04608fd85c","62445e398045c6044db52820","62445e4a8045c6044db5285e","6244609d8045c6044db52923","624460ab8045c6044db5295f","62446f8f8045c6044db52ec1","62446f988045c6044db52f09","62446fdd8045c6044db52f7b","6244704f8045c6044db5317d","624470758045c6044db531be","624470f68045c6044db531ff","624471118045c6044db53234","6244755a8045c6044db532a5","624483fb8045c6044db54313","624484718045c6044db5440b","624487bc8045c6044db54867","62449a848045c6044db5508e","62457631444f6004600c9a2b","624587c8444f6004600c9b9f","62458868444f6004600c9c3a","62458cae444f6004600c9ceb","62458cc7444f6004600c9d13","62458ce1444f6004600c9d48","62458db4444f6004600c9d8d","62458e12444f6004600c9dd5","62459d65444f6004600ca24a","6245aeef4f9eb004527627d7","6245b2434f9eb00452762880","6245b2564f9eb004527628c1","6245b3cf4f9eb00452762953","6245d8ef4f9eb00452763d6b","6245dedf4f9eb00452763fb2","6245e7d74f9eb00452764455","6245ef034f9eb004527645f1","6245f1024f9eb00452764708","62467a4b4f9eb00452764b84","6246b715ce328e04806f2de9","6246bb9ece328e04806f2e4d","6246be35ce328e04806f2eb8","6246be61ce328e04806f2f35","6246c557ce328e04806f3480","6246c7fdce328e04806f35cd","6246c818ce328e04806f360e","6246cabdce328e04806f38f3","6246ccb2ce328e04806f39ed","62471f17ce328e04806f4b77","6247225ece328e04806f4c10","624732a7f5b60e04a15cd37d","6247344cf5b60e04a15cd405","6247346ff5b60e04a15cd459","624afa365fc57d04c5955b65","624afbba5fc57d04c5955c0e","624c38305fc57d04c5958531","624c383a5fc57d04c5958549","624c905fad7c8404503f8e77","624dc31cada9d2044e81db4a","624dc4f4ada9d2044e81dbc2","624eb117ada9d2044e81ec61","624edb81ada9d2044e81f127","624ff5997859790475f8de00","624ffaf77859790475f8df36","624ffe2c7859790475f8e02b","6250025a7859790475f8e120","6250036b7859790475f8e1b2","625004567859790475f8e232","62500ba77859790475f8e28a","62500cc77859790475f8e313","62500cf27859790475f8e3a0","62500d077859790475f8e3ce","625064527859790475f9c7e5","62542651d0a72904c96cb6f7","6254440fd0a72904c96cbb45","6254445fd0a72904c96cbb89","62544461d0a72904c96cbbbd","6254476cd0a72904c96cbd3c","62544c76d0a72904c96cbdfc","62544d41d0a72904c96cbe71","62555f4ac8060404975621be","6256c53e50dbe404501f285a","6256c5be50dbe404501f28df","6256e06550dbe404501f3504","6256ee1c50dbe404501f40bb","6256ef2f50dbe404501f432a","6256efb250dbe404501f4441","6256f0bb50dbe404501f4482","6256f0d850dbe404501f44b6","625d415a6dee1e0473aa3dd9","625d41de6dee1e0473aa3e0f","625d438b6dee1e0473aa3e52","625d43ac6dee1e0473aa3e89","625d43f56dee1e0473aa3ec0","625d44696dee1e0473aa3f03","625d45886dee1e0473aa3f46","625d86f3fae61f0442474b0d","625db103fae61f04424783a9","625db298fae61f04424787f0","625db2cefae61f0442478871","625db785fae61f0442478bf7","625dbb53fae61f0442478f2c","625e7b2b017fed047fc295f8","625e81a0017fed047fc29679","625e81d2017fed047fc296ac","625e82dc017fed047fc296ee","625e82f9017fed047fc29712","625e8324017fed047fc29785","625e8563017fed047fc297d5","625e85a4017fed047fc29811","625e85c7017fed047fc2986b","625e86e3017fed047fc298c0","625e8728017fed047fc298d7","625e872b017fed047fc2992e","625e872f017fed047fc29971","625e8775017fed047fc299a7","625e87cb017fed047fc299f6","625e88cb017fed047fc29a45","625e88cd017fed047fc29a69","625e88dc017fed047fc29a93","625e8971017fed047fc29af4","625e89c6017fed047fc29b68","625e8a4a017fed047fc29bd8","625e8ad9017fed047fc29c0c","625e8b68017fed047fc29c8c","625e8bc6017fed047fc29cce","625e8cce017fed047fc29d5e","625e8d3c017fed047fc29d96","625e8daa017fed047fc29db9","625e8de5017fed047fc29e71","625e8dfe017fed047fc29ea0","625e8e0a017fed047fc29edc","625e8e1d017fed047fc29f31","625e8e45017fed047fc29f74","625e8e67017fed047fc29fdc","625e8efc017fed047fc2a047","625e90f2017fed047fc2a09b","625e90f7017fed047fc2a0de","625e910f017fed047fc2a101","625e9194017fed047fc2a145","625e91de017fed047fc2a188","625e9246017fed047fc2a1eb","625e9dbc017fed047fc2a27b","625e9e73017fed047fc2a2cb","625e9f35017fed047fc2a327","625e9fc2017fed047fc2a3fd","625ea05d017fed047fc2a42b","625ea377017fed047fc2a47a","625ea41d017fed047fc2a4b3","625ea5f4017fed047fc2a5aa","625ea645017fed047fc2a619","625ea6cc017fed047fc2a649","625ea6f9017fed047fc2a698","625ea746017fed047fc2a6db","625ea7b2017fed047fc2a71e","625ea8d6017fed047fc2a78d","625ea916017fed047fc2a7d1","625ea931017fed047fc2a808","625ea994017fed047fc2a82b","625ea9a9017fed047fc2a86e","625ea9e9017fed047fc2a8b1","625eaa03017fed047fc2a91f","625eaa9a017fed047fc2a962","625ec251017fed047fc2aaf3","625ee5bf017fed047fc2b5ce","625ee6fd017fed047fc2b68a","625fd6fb1354ec047bf937d5","625fe25d1354ec047bf9382e","625fe6dd1354ec047bf93865","625fe74c1354ec047bf93894","625fe74e1354ec047bf938ab","625fe79a1354ec047bf9392c","625fe8ff1354ec047bf9397a","625fe93b1354ec047bf939bd","625feb801354ec047bf93a10","625fecb61354ec047bf93a5c","625fecc61354ec047bf93aa4","625fedd01354ec047bf93b1e","625fef2b1354ec047bf93b75","625fef8f1354ec047bf93c09","626017be206485044a98e66a","6260282f206485044a98f023","6260313d206485044a98f4b3","6260320e206485044a98f51d","62610bb6996311046c864275","626121af8facb5043da2b893","626161dc8facb5043da2c6ce","6262801e8facb5043da2dd7b","62629c94f3173b044de1f17c","626666c9f3173b044de1ff3d","626668dbf3173b044de1ff66","62666b85f3173b044de1ffdf","62666bb3f3173b044de20003","62666be9f3173b044de20039","62666c1af3173b044de2006e","62666c5cf3173b044de200bb","62666c80f3173b044de200fe","62666d28f3173b044de2013a","62666d6bf3173b044de20175","62666dbff3173b044de201d6","62666deaf3173b044de20205","62666efcf3173b044de2025a","62666fc5f3173b044de202ae","6266705bf3173b044de202f6","6266708ff3173b044de2033e","626670bdf3173b044de20386","626671daf3173b044de203d2","626671ddf3173b044de20416","6266733df3173b044de20495","62667354f3173b044de204d1","626673a5f3173b044de20596","62667b82f3173b044de205eb","62667babf3173b044de20621","62667bd6f3173b044de20683","62667bf5f3173b044de206bf","62667c3cf3173b044de206f3","62667c5ef3173b044de20736","62667c82f3173b044de20784","62667ca4f3173b044de207ba","62667cbef3173b044de20802","62667cf7f3173b044de2084f","62667dc6f3173b044de20885","62667ddcf3173b044de208ad","62667f4af3173b044de20919","62667f55f3173b044de20949","62667f8ff3173b044de2098c","62667f94f3173b044de209bc","62668000f3173b044de20a1d","62668125f3173b044de20a64","626681b2f3173b044de20a9b","626681b7f3173b044de20abe","62668354f3173b044de20b25","62668361f3173b044de20b5b","6266837df3173b044de20ba4","626684d4f3173b044de20bec","626684fcf3173b044de20c4b","6266865cf3173b044de20c6e","62668680f3173b044de20cb5","626687bdf3173b044de20d03","626687e2f3173b044de20d58","62668ac1f3173b044de20da6","62668acff3173b044de20ddd","62668ae8f3173b044de20e2d","62668b09f3173b044de20e5d","62668b6ef3173b044de20ec4","62668bf7f3173b044de20f0c","62668c22f3173b044de20f41","62668c86f3173b044de20fa1","62668c9af3173b044de20ff8","62668c9cf3173b044de21028","62668d2ef3173b044de2109a","62668d89f3173b044de210f7","62668dbdf3173b044de21170","62668de8f3173b044de21198","62668e38f3173b044de211f5","62668e66f3173b044de2127b","62668eaaf3173b044de212e7","62668ed5f3173b044de2133c","62668fa1f3173b044de2137b","62669002f3173b044de213fd","6266b26b41594b044470139c","6266b2c341594b04447013d3","6266b618b39edc0449546f3c","6266b63bb39edc0449546f74","6266b663b39edc0449546fc0","6266b685b39edc044954701e","6266b77eb39edc044954707a","6266c2cd0797dc044591a99a","6266c3a40797dc044591a9d9","6266c4be0797dc044591aa18","6266c59f0797dc044591aa6c","6266c7080797dc044591aacc","6266dda93a668104442e2ece","6266e2f33a668104442e2fd5","6266e56a3a668104442e3164","6266ea043a668104442e3344","626917779137d1046ad6ad7e","626924d89137d1046ad6aed4","626924dc9137d1046ad6af04","626926659137d1046ad6af4d","6269269f9137d1046ad6af90","626931139137d1046ad6b221","6269314f9137d1046ad6b2d4","626933639137d1046ad6b3da","62694b544cff28045092d2ef","62694c0a4cff28045092d3b7","62694c6c4cff28045092d443","62694c8f4cff28045092d486","62694cd74cff28045092d4d9","62694d034cff28045092d53c","62694d694cff28045092d5fb","62694d6f4cff28045092d63e","62694d944cff28045092d695","626951004cff28045092d88b","626952004cff28045092d936","626952184cff28045092d96c","626967cb4cff28045092e803","6269714f4cff28045092eb13","62698dd94cff28045093096e","62698e0f4cff280450930985","62698e6e4cff2804509309d4","62699158d801b1043e5912a9","626a4a4fe18e280443869afd","626a4a68e18e280443869b40","626a5ee3e18e280443869bb5","626a5f00e18e280443869bf8","626a5f0fe18e280443869c3b","626a5f47e18e280443869c7e","626a7323e18e280443869cc8","626a7391e18e280443869d1f","626a73abe18e280443869d43","626a73c6e18e280443869d7a","626a73f5e18e280443869dbd","626a7446e18e280443869e2c","626a7487e18e280443869e6f","626a74d0e18e280443869e86","626a7519e18e280443869edc","626a7539e18e280443869f0d","626a7605e18e280443869f62","626a7705e18e280443869fb2","626a7774e18e280443869fe8","626a7794e18e28044386a01f","626a83aae18e28044386a139","626a83dae18e28044386a18c","626a8406e18e28044386a1dc","626a841ae18e28044386a213","626a8575e18e28044386a26d","626a8608e18e28044386a2f8","626a9d5be18e28044386a7b2","626ab3485ab2b10446b2f8ef","626ab3635ab2b10446b2f926","626abd085ab2b10446b2fd19","626ac9145ab2b10446b2fe62","626ac9a45ab2b10446b2feca","626ac9e85ab2b10446b2ff47"],"application":"623890e6676f6d044d5a9b54","customer":"5c743dbcffbf7814ab74f6da","external_referral":{"actionToTake":2,"appSubmitted":true,"applicationNumber":"2032-0000025205"}},"contenttypes":[],"entitytype":"applicant","applicant_type":"primary","external_borrower_type":"present borrower","pb_sales_finance_loan":false,"customer_relationship_status":null,"_id":"623890e6676f6d044d5a9b5a","random":0.5984155311964423,"createdat":"2022-03-21T14:51:18.392Z","updatedat":"2022-04-28T17:07:52.990Z","__v":0,"attributes":{"external_referral_sent":true}}}]},"contenttypes":[],"entitytype":"application","gclid":null,"eoriginal_sid":null,"processing_time":16.299,"_id":"623890e6676f6d044d5a9b54","requested_product_details":{"requested_loan_amount_raw":5000,"requested_loan_amount":5000,"requested_loan_term":36,"offer_code":null},"random":0.48227870396978956,"createdat":"2022-03-21T14:51:18.344Z","updatedat":"2022-03-28T18:07:21.540Z","__v":0,"attributes":{"branch_email_sent":true}},"applicant":{"contact":{"address_street":"1234 MAIN AVE","address_city":"NEWARK","address_state":"DE","address_postal_code":"19702","mailing_address_street":"1234 MAIN AVE","mailing_address_city":"NEWARK","mailing_address_state":"DE","mailing_address_postal_code":"19702","email":"zdunkerton@marinerfinance.com","first_name":"jean","full_name":"jean llmtwxy","last_name":"llmtwxy","phone_number_primary":"1231231234","phone_type":"Cell"},"funding_information":{"bank_account_holder":null,"bank_account_number":null,"bank_account_type":null,"bank_name":null,"bank_routing_number":null},"identification":{"guid":"AT-JE1647874278389","trace_number":1647874278389},"processing":{"email_verified":false,"review_state":null,"status":"referred","verification_status":null,"propensity_score":"P","propensity_score_risk":null,"distance_to_branch":40.2,"referral_ranking":2,"consents":{"credit_contact_authorization":{"consent":true,"version":"13"},"electronic_communications":{"consent":true,"version":"15"},"privacy_policy":{"consent":true,"version":null},"terms_of_use":{"consent":true,"version":"9"},"delaware_itemized_schedule_of_charges":{"consent":true,"version":"1.0"},"california_credit_education_program":{"consent":false,"version":"1.0"},"new_mexico_disclosure":{"consent":false,"version":"1.0"}},"esigns":{"credit_contact_authorization":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"electronic_communications":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"privacy_policy":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"terms_of_use":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"delaware_itemized_schedule_of_charges":{"date":"2022-03-21T14:51:16.045Z","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36","ipaddress":"40.128.72.32"},"california_credit_education_program":null,"new_mexico_disclosure":null},"flag":{"referred":true}},"self_reported":{"annual_income":120000,"citizenship":"USA Citizen","employment_status":"Employed Hourly","employer_name":null,"employer_phone_number":"3322018552","home_ownership":"Renting","household_annual_income":200000,"loan_purpose":"Home Improvement","marital_status":null,"military_status":null,"mortgage_or_rental_payment":2000,"position_at_employer":null,"relationship_to_borrower":null,"spouse_address_city":null,"spouse_address_postal_code":null,"spouse_address_state":null,"spouse_address_street":null,"tenure_at_employer":4,"years_at_current_address":null,"how_did_you_hear_about_us":null},"sorad":{"third_party_data":{"geoips":[],"soft_credit_pull":"623890f0676f6d044d5a9b62"},"files":["623890f2676f6d044d5a9b75","623890f0676f6d044d5a9b66","623890f1676f6d044d5a9b6b","623890f1676f6d044d5a9b70","623890f5676f6d044d5a9b80","623890f6676f6d044d5a9b87","623c33862c334404701be5ec","623c42512c334404701be9d7","623c7d4a314ae7044eef1e01","623c89f001711d04550652a3","623ca6c001711d04550669e3","623ca78f01711d0455066b15","623cb9e501711d04550689d4","623cbc1501711d0455068f15","624179520dad6204512ed5b5","6241797b0dad6204512ed60b","62417a2d0dad6204512ed6ad","62417cff0dad6204512ed6fc","624181680dad6204512ed75e","624194d30dad6204512ed824","624195730dad6204512ed85e","624195b10dad6204512ed8e0","6241bbbca5a2c3045364f9f8","6241bc8ea5a2c3045364fa3a","6241c8eaa5a2c3045364fb81","6241cbb6a5a2c3045364fe8c","6241cc7da5a2c3045364fff0","6241ce2ea5a2c3045365023c","6241ce37a5a2c30453650262","6241ce4fa5a2c304536502fa","6241ce84a5a2c3045365035c","6241dab6a5a2c3045365205f","6241dae5a5a2c304536520c8","6241db40a5a2c30453652110","6241dba7a5a2c30453652165","6241dc01a5a2c30453652193","6241dc20a5a2c304536521fd","6241ddb4a5a2c30453652396","6241de3ea5a2c3045365241f","6241dedea5a2c30453652482","6241df12a5a2c304536524b7","6241df30a5a2c304536524cc","6241e05ea5a2c304536526be","6241e090a5a2c3045365270b","6241e2a7a5a2c304536528ff","6241e736a5a2c30453652c6d","6241e776a5a2c30453652caf","6241e7f2a5a2c30453652d1b","6241eec9a5a2c30453653465","6241eeefa5a2c304536534a7","6241efd8a5a2c30453653516","6241f5fba5a2c304536536d7","6241f861a5a2c30453653801","6242d8d1c4464904954aba0f","6242dc8ac4464904954abdbb","6242dca3c4464904954abdfc","6242eff1c4464904954ac751","6242f00fc4464904954ac792","6242f110c4464904954ac868","6242f3c8c4464904954ac8ab","6242fa22c4464904954acab0","6242fa65c4464904954acae9","62430996c4464904954ad046","62430a08c4464904954ad091","62430b1bc4464904954ad1d1","62430b38c4464904954ad1ff","62430e991296ec04608f8b25","6243113c1296ec04608f8bf1","624311581296ec04608f8c06","624311731296ec04608f8c47","6243123b1296ec04608f8d2a","624312571296ec04608f8d5e","624312721296ec04608f8d93","6243128e1296ec04608f8dc7","624312fd1296ec04608f8e41","624313231296ec04608f8e82","6243133c1296ec04608f8e97","624313571296ec04608f8ebf","624313721296ec04608f8f00","624313a91296ec04608f8f28","624313d61296ec04608f8f83","624316031296ec04608f8fc5","624316941296ec04608f9047","624316ec1296ec04608f907c","6243184b1296ec04608f91d8","624319ba1296ec04608f926a","624431091296ec04608fc8f8","6244345b1296ec04608fc9cd","6244353d1296ec04608fca3a","624437751296ec04608fca92","6244388f1296ec04608fcade","624438a71296ec04608fcb1f","6244393f1296ec04608fcb74","624439f51296ec04608fcb98","62443a131296ec04608fcbc0","62443a491296ec04608fcbee","62443a681296ec04608fcc1c","62443a871296ec04608fcc31","62443a911296ec04608fcc66","62443abe1296ec04608fccdf","62443add1296ec04608fccf4","62443aea1296ec04608fcd22","62443af31296ec04608fcd63","62443b101296ec04608fcd91","62443b1e1296ec04608fcdd2","62443b231296ec04608fce13","62443b421296ec04608fce41","62443b781296ec04608fce82","62443ba61296ec04608fcec3","62443bdf1296ec04608fcee5","62443be81296ec04608fcf06","62443bfe1296ec04608fcf34","62443c091296ec04608fcf62","62443c211296ec04608fcf90","62443c341296ec04608fcfb2","62443c4b1296ec04608fcfd3","62443c5c1296ec04608fd001","62443c881296ec04608fd06c","62443c961296ec04608fd081","624443141296ec04608fd213","624443261296ec04608fd26b","624448211296ec04608fd85c","62445e398045c6044db52820","62445e4a8045c6044db5285e","6244609d8045c6044db52923","624460ab8045c6044db5295f","62446f8f8045c6044db52ec1","62446f988045c6044db52f09","62446fdd8045c6044db52f7b","6244704f8045c6044db5317d","624470758045c6044db531be","624470f68045c6044db531ff","624471118045c6044db53234","6244755a8045c6044db532a5","624483fb8045c6044db54313","624484718045c6044db5440b","624487bc8045c6044db54867","62449a848045c6044db5508e","62457631444f6004600c9a2b","624587c8444f6004600c9b9f","62458868444f6004600c9c3a","62458cae444f6004600c9ceb","62458cc7444f6004600c9d13","62458ce1444f6004600c9d48","62458db4444f6004600c9d8d","62458e12444f6004600c9dd5","62459d65444f6004600ca24a","6245aeef4f9eb004527627d7","6245b2434f9eb00452762880","6245b2564f9eb004527628c1","6245b3cf4f9eb00452762953","6245d8ef4f9eb00452763d6b","6245dedf4f9eb00452763fb2","6245e7d74f9eb00452764455","6245ef034f9eb004527645f1","6245f1024f9eb00452764708","62467a4b4f9eb00452764b84","6246b715ce328e04806f2de9","6246bb9ece328e04806f2e4d","6246be35ce328e04806f2eb8","6246be61ce328e04806f2f35","6246c557ce328e04806f3480","6246c7fdce328e04806f35cd","6246c818ce328e04806f360e","6246cabdce328e04806f38f3","6246ccb2ce328e04806f39ed","62471f17ce328e04806f4b77","6247225ece328e04806f4c10","624732a7f5b60e04a15cd37d","6247344cf5b60e04a15cd405","6247346ff5b60e04a15cd459","624afa365fc57d04c5955b65","624afbba5fc57d04c5955c0e","624c38305fc57d04c5958531","624c383a5fc57d04c5958549","624c905fad7c8404503f8e77","624dc31cada9d2044e81db4a","624dc4f4ada9d2044e81dbc2","624eb117ada9d2044e81ec61","624edb81ada9d2044e81f127","624ff5997859790475f8de00","624ffaf77859790475f8df36","624ffe2c7859790475f8e02b","6250025a7859790475f8e120","6250036b7859790475f8e1b2","625004567859790475f8e232","62500ba77859790475f8e28a","62500cc77859790475f8e313","62500cf27859790475f8e3a0","62500d077859790475f8e3ce","625064527859790475f9c7e5","62542651d0a72904c96cb6f7","6254440fd0a72904c96cbb45","6254445fd0a72904c96cbb89","62544461d0a72904c96cbbbd","6254476cd0a72904c96cbd3c","62544c76d0a72904c96cbdfc","62544d41d0a72904c96cbe71","62555f4ac8060404975621be","6256c53e50dbe404501f285a","6256c5be50dbe404501f28df","6256e06550dbe404501f3504","6256ee1c50dbe404501f40bb","6256ef2f50dbe404501f432a","6256efb250dbe404501f4441","6256f0bb50dbe404501f4482","6256f0d850dbe404501f44b6","625d415a6dee1e0473aa3dd9","625d41de6dee1e0473aa3e0f","625d438b6dee1e0473aa3e52","625d43ac6dee1e0473aa3e89","625d43f56dee1e0473aa3ec0","625d44696dee1e0473aa3f03","625d45886dee1e0473aa3f46","625d86f3fae61f0442474b0d","625db103fae61f04424783a9","625db298fae61f04424787f0","625db2cefae61f0442478871","625db785fae61f0442478bf7","625dbb53fae61f0442478f2c","625e7b2b017fed047fc295f8","625e81a0017fed047fc29679","625e81d2017fed047fc296ac","625e82dc017fed047fc296ee","625e82f9017fed047fc29712","625e8324017fed047fc29785","625e8563017fed047fc297d5","625e85a4017fed047fc29811","625e85c7017fed047fc2986b","625e86e3017fed047fc298c0","625e8728017fed047fc298d7","625e872b017fed047fc2992e","625e872f017fed047fc29971","625e8775017fed047fc299a7","625e87cb017fed047fc299f6","625e88cb017fed047fc29a45","625e88cd017fed047fc29a69","625e88dc017fed047fc29a93","625e8971017fed047fc29af4","625e89c6017fed047fc29b68","625e8a4a017fed047fc29bd8","625e8ad9017fed047fc29c0c","625e8b68017fed047fc29c8c","625e8bc6017fed047fc29cce","625e8cce017fed047fc29d5e","625e8d3c017fed047fc29d96","625e8daa017fed047fc29db9","625e8de5017fed047fc29e71","625e8dfe017fed047fc29ea0","625e8e0a017fed047fc29edc","625e8e1d017fed047fc29f31","625e8e45017fed047fc29f74","625e8e67017fed047fc29fdc","625e8efc017fed047fc2a047","625e90f2017fed047fc2a09b","625e90f7017fed047fc2a0de","625e910f017fed047fc2a101","625e9194017fed047fc2a145","625e91de017fed047fc2a188","625e9246017fed047fc2a1eb","625e9dbc017fed047fc2a27b","625e9e73017fed047fc2a2cb","625e9f35017fed047fc2a327","625e9fc2017fed047fc2a3fd","625ea05d017fed047fc2a42b","625ea377017fed047fc2a47a","625ea41d017fed047fc2a4b3","625ea5f4017fed047fc2a5aa","625ea645017fed047fc2a619","625ea6cc017fed047fc2a649","625ea6f9017fed047fc2a698","625ea746017fed047fc2a6db","625ea7b2017fed047fc2a71e","625ea8d6017fed047fc2a78d","625ea916017fed047fc2a7d1","625ea931017fed047fc2a808","625ea994017fed047fc2a82b","625ea9a9017fed047fc2a86e","625ea9e9017fed047fc2a8b1","625eaa03017fed047fc2a91f","625eaa9a017fed047fc2a962","625ec251017fed047fc2aaf3","625ee5bf017fed047fc2b5ce","625ee6fd017fed047fc2b68a","625fd6fb1354ec047bf937d5","625fe25d1354ec047bf9382e","625fe6dd1354ec047bf93865","625fe74c1354ec047bf93894","625fe74e1354ec047bf938ab","625fe79a1354ec047bf9392c","625fe8ff1354ec047bf9397a","625fe93b1354ec047bf939bd","625feb801354ec047bf93a10","625fecb61354ec047bf93a5c","625fecc61354ec047bf93aa4","625fedd01354ec047bf93b1e","625fef2b1354ec047bf93b75","625fef8f1354ec047bf93c09","626017be206485044a98e66a","6260282f206485044a98f023","6260313d206485044a98f4b3","6260320e206485044a98f51d","62610bb6996311046c864275","626121af8facb5043da2b893","626161dc8facb5043da2c6ce","6262801e8facb5043da2dd7b","62629c94f3173b044de1f17c","626666c9f3173b044de1ff3d","626668dbf3173b044de1ff66","62666b85f3173b044de1ffdf","62666bb3f3173b044de20003","62666be9f3173b044de20039","62666c1af3173b044de2006e","62666c5cf3173b044de200bb","62666c80f3173b044de200fe","62666d28f3173b044de2013a","62666d6bf3173b044de20175","62666dbff3173b044de201d6","62666deaf3173b044de20205","62666efcf3173b044de2025a","62666fc5f3173b044de202ae","6266705bf3173b044de202f6","6266708ff3173b044de2033e","626670bdf3173b044de20386","626671daf3173b044de203d2","626671ddf3173b044de20416","6266733df3173b044de20495","62667354f3173b044de204d1","626673a5f3173b044de20596","62667b82f3173b044de205eb","62667babf3173b044de20621","62667bd6f3173b044de20683","62667bf5f3173b044de206bf","62667c3cf3173b044de206f3","62667c5ef3173b044de20736","62667c82f3173b044de20784","62667ca4f3173b044de207ba","62667cbef3173b044de20802","62667cf7f3173b044de2084f","62667dc6f3173b044de20885","62667ddcf3173b044de208ad","62667f4af3173b044de20919","62667f55f3173b044de20949","62667f8ff3173b044de2098c","62667f94f3173b044de209bc","62668000f3173b044de20a1d","62668125f3173b044de20a64","626681b2f3173b044de20a9b","626681b7f3173b044de20abe","62668354f3173b044de20b25","62668361f3173b044de20b5b","6266837df3173b044de20ba4","626684d4f3173b044de20bec","626684fcf3173b044de20c4b","6266865cf3173b044de20c6e","62668680f3173b044de20cb5","626687bdf3173b044de20d03","626687e2f3173b044de20d58","62668ac1f3173b044de20da6","62668acff3173b044de20ddd","62668ae8f3173b044de20e2d","62668b09f3173b044de20e5d","62668b6ef3173b044de20ec4","62668bf7f3173b044de20f0c","62668c22f3173b044de20f41","62668c86f3173b044de20fa1","62668c9af3173b044de20ff8","62668c9cf3173b044de21028","62668d2ef3173b044de2109a","62668d89f3173b044de210f7","62668dbdf3173b044de21170","62668de8f3173b044de21198","62668e38f3173b044de211f5","62668e66f3173b044de2127b","62668eaaf3173b044de212e7","62668ed5f3173b044de2133c","62668fa1f3173b044de2137b","62669002f3173b044de213fd","6266b26b41594b044470139c","6266b2c341594b04447013d3","6266b618b39edc0449546f3c","6266b63bb39edc0449546f74","6266b663b39edc0449546fc0","6266b685b39edc044954701e","6266b77eb39edc044954707a","6266c2cd0797dc044591a99a","6266c3a40797dc044591a9d9","6266c4be0797dc044591aa18","6266c59f0797dc044591aa6c","6266c7080797dc044591aacc","6266dda93a668104442e2ece","6266e2f33a668104442e2fd5","6266e56a3a668104442e3164","6266ea043a668104442e3344","626917779137d1046ad6ad7e","626924d89137d1046ad6aed4","626924dc9137d1046ad6af04","626926659137d1046ad6af4d","6269269f9137d1046ad6af90","626931139137d1046ad6b221","6269314f9137d1046ad6b2d4","626933639137d1046ad6b3da","62694b544cff28045092d2ef","62694c0a4cff28045092d3b7","62694c6c4cff28045092d443","62694c8f4cff28045092d486","62694cd74cff28045092d4d9","62694d034cff28045092d53c","62694d694cff28045092d5fb","62694d6f4cff28045092d63e","62694d944cff28045092d695","626951004cff28045092d88b","626952004cff28045092d936","626952184cff28045092d96c","626967cb4cff28045092e803","6269714f4cff28045092eb13","62698dd94cff28045093096e","62698e0f4cff280450930985","62698e6e4cff2804509309d4","62699158d801b1043e5912a9","626a4a4fe18e280443869afd","626a4a68e18e280443869b40","626a5ee3e18e280443869bb5","626a5f00e18e280443869bf8","626a5f0fe18e280443869c3b","626a5f47e18e280443869c7e","626a7323e18e280443869cc8","626a7391e18e280443869d1f","626a73abe18e280443869d43","626a73c6e18e280443869d7a","626a73f5e18e280443869dbd","626a7446e18e280443869e2c","626a7487e18e280443869e6f","626a74d0e18e280443869e86","626a7519e18e280443869edc","626a7539e18e280443869f0d","626a7605e18e280443869f62","626a7705e18e280443869fb2","626a7774e18e280443869fe8","626a7794e18e28044386a01f","626a83aae18e28044386a139","626a83dae18e28044386a18c","626a8406e18e28044386a1dc","626a841ae18e28044386a213","626a8575e18e28044386a26d","626a8608e18e28044386a2f8","626a9d5be18e28044386a7b2","626ab3485ab2b10446b2f8ef","626ab3635ab2b10446b2f926","626abd085ab2b10446b2fd19","626ac9145ab2b10446b2fe62","626ac9a45ab2b10446b2feca","626ac9e85ab2b10446b2ff47"],"application":"623890e6676f6d044d5a9b54","customer":"5c743dbcffbf7814ab74f6da","external_referral":{"actionToTake":2,"appSubmitted":true,"applicationNumber":"2032-0000025205"}},"contenttypes":[],"entitytype":"applicant","applicant_type":"primary","external_borrower_type":"present borrower","pb_sales_finance_loan":false,"customer_relationship_status":null,"_id":"623890e6676f6d044d5a9b5a","random":0.5984155311964423,"createdat":"2022-03-21T14:51:18.392Z","updatedat":"2022-04-28T17:07:52.990Z","__v":0,"attributes":{"external_referral_sent":true}},"loanData":[{"accountNumber":"3506-005079-19","balance":8.03,"status":"Active","dueDate":"2022-06-15T00:00:00","amountDue":8.03,"loanOriginationDate":"2019-04-01T00:00:00"}],"allLoansClosed":false,"activeLoans":[{"loanDetails":{"PaymentOptions":{"NumberOfDaysAllowedForPayoff":0,"ImmediateAchFee":0,"ScheduledAchFee":0,"MaximumAchPaymentAmount":8.03,"MinimumAchPaymentAmount":1,"DebitCardFeeAmount":0,"MaxminumCardPaymentAmount":0,"MinimumCardPaymentAmount":0,"NumberDaysPastDueBeforeDelinquent":0,"RequiresThirdPartyFeeForCardPayment":false,"AllowCardPayments":false,"AllowACHPayments":true},"AccountNumber":"3506-005079-19","Name":"JEAN LLMTWXY","Address":{"HouseholdNumber":0,"Address1":"123 MAIN ST","Address2":"","City":"DAYTON","State":"OH","ZipCode":"45459"},"OriginalFinancedAmount":6688.44,"OriginalAmountFinanced":5000,"OriginalBalance":6688.44,"OriginalAPR":19.99,"LastPaymentAmount":10,"LastPaymentDate":"2022-03-29T00:00:00","NextPaymentAmount":185.79,"NextPaymentDate":"2022-06-15T00:00:00","CurrentYearToDateInterest":0,"LastYearToDateInterest":0,"InterestRate":19.99,"LoanOriginationDate":"2019-04-01T00:00:00","RegularPaymentAmount":8.03,"CurrentPayOffAmount":8.03,"LoanFeesAndCharges":0,"LoanIsDelinquent":false,"NextDueDate":"2022-06-15T00:00:00","Errors":[],"SuccessMessage":"","HasNoErrors":true},"loanPaymentInformation":{"accountDetails":{"RegularPaymentAmount":8.03,"CurrentPayOffAmount":8.03,"LoanFeesAndCharges":0,"LoanIsDeliquent":false,"NextDueDate":"2022-06-15T00:00:00","CurrentYearToDateInterest":0,"InterestRate":19.99,"LastYearToDateInterest":0,"NextPaymentAmount":185.79,"NextPaymentDate":"2022-06-15T00:00:00","LastPaymentAmount":10,"LastPaymentDate":"2022-03-29T00:00:00","OriginalFinancedAmount":6688.44,"LoanOriginationDate":"2019-04-01T00:00:00"},"hasScheduledPayment":false,"scheduledPayments":[],"paymentOptions":{"NumberOfDaysAllowedForPayoff":0,"ImmediateAchFee":0,"ScheduledAchFee":0,"MaximumAchPaymentAmount":8.03,"MinimumAchPaymentAmount":1,"DebitCardFeeAmount":0,"MaxminumCardPaymentAmount":0,"MinimumCardPaymentAmount":1,"NumberDaysPastDueBeforeDelinquent":0,"RequiresThirdPartyFeeForCardPayment":true,"AllowCardPayments":true,"AllowACHPayments":true},"appRecurringACHPayment":{"EarliestPaymentDate":"2022-06-15T00:00:00","NextPaymentDate":"2022-06-15T00:00:00","LastFourOfPaymentAccount":"8343","IsCard":false,"ReferenceNumber":0,"Amount":8.03,"PaymentAccountSequence":0,"PaymentFee":0,"RecurringOption":1,"EffectiveDate":null,"DaysBeforeDue":null,"ThirdPartyProcessingFee":0}},"loanData":{"accountNumber":"3506-005079-19","balance":8.03,"status":"Active","dueDate":"2022-06-15T00:00:00","amountDue":8.03,"loanOriginationDate":"2019-04-01T00:00:00"}}],"loanHistory":[{"accountNumber":"3506-005079-19","AppAccountHistory":[{"TransactionDate":"2022-03-29T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":8.03},{"TransactionDate":"2022-03-28T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-12,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":18.03},{"TransactionDate":"2022-03-28T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":30.03},{"TransactionDate":"2022-03-28T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":41.03},{"TransactionDate":"2022-03-28T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-12,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":52.03},{"TransactionDate":"2022-03-28T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":64.03},{"TransactionDate":"2022-03-11T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":75.03},{"TransactionDate":"2022-03-10T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":86.03},{"TransactionDate":"2022-03-10T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-12,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":97.03},{"TransactionDate":"2022-03-10T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-14,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":109.03},{"TransactionDate":"2022-03-10T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":123.03},{"TransactionDate":"2022-03-10T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-205.78,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":134.03},{"TransactionDate":"2022-03-04T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-205.78,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":339.81},{"TransactionDate":"2022-02-22T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-256,"InterestAmount":0,"OtherAmount":-15,"RunningPrincipalBalance":545.59},{"TransactionDate":"2022-01-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":801.59},{"TransactionDate":"2021-12-28T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10.78,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":801.59},{"TransactionDate":"2021-12-23T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-1419.48,"InterestAmount":0,"OtherAmount":-105,"RunningPrincipalBalance":812.37},{"TransactionDate":"2021-11-24T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-10-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-09-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-08-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-07-24T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-06-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-05-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-04-23T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2231.85},{"TransactionDate":"2021-04-14T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2241.85},{"TransactionDate":"2021-04-14T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2252.85},{"TransactionDate":"2021-04-14T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2262.85},{"TransactionDate":"2021-03-30T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2272.85},{"TransactionDate":"2021-03-30T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-185.79,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2282.85},{"TransactionDate":"2021-03-22T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-269,"InterestAmount":0,"OtherAmount":-15,"RunningPrincipalBalance":2468.64},{"TransactionDate":"2021-02-25T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2737.64},{"TransactionDate":"2021-02-18T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-12,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2737.64},{"TransactionDate":"2021-02-17T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-171,"InterestAmount":0,"OtherAmount":-15,"RunningPrincipalBalance":2749.64},{"TransactionDate":"2021-02-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":2920.64},{"TransactionDate":"2020-12-22T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2920.64},{"TransactionDate":"2020-12-22T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2930.64},{"TransactionDate":"2020-12-22T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2940.64},{"TransactionDate":"2020-12-09T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-185.79,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":2950.64},{"TransactionDate":"2020-11-20T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":3136.43},{"TransactionDate":"2020-11-20T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":3146.43},{"TransactionDate":"2020-11-06T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-2,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":3156.43},{"TransactionDate":"2020-11-05T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-2971.22,"InterestAmount":0,"OtherAmount":-225,"RunningPrincipalBalance":3158.43},{"TransactionDate":"2020-10-10T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-09-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-08-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-07-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-06-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-05-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-04-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-03-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-02-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2020-01-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-12-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-11-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-10-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-09-11T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-08-10T00:00:00","TransactionDescription":"Late Charge Assessed","PrincipalAmount":0,"InterestAmount":0,"OtherAmount":15,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-06-05T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-300,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6129.65},{"TransactionDate":"2019-05-30T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6429.65},{"TransactionDate":"2019-05-30T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-10,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6439.65},{"TransactionDate":"2019-05-02T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6449.65},{"TransactionDate":"2019-05-02T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6460.65},{"TransactionDate":"2019-05-01T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-185.79,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6471.65},{"TransactionDate":"2019-04-03T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-20,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6657.44},{"TransactionDate":"2019-04-01T00:00:00","TransactionDescription":"Regular Payment","PrincipalAmount":-11,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6677.44},{"TransactionDate":"2019-03-29T00:00:00","TransactionDescription":"Principal Decrease","PrincipalAmount":0,"InterestAmount":1688.44,"OtherAmount":0,"RunningPrincipalBalance":6688.44},{"TransactionDate":"2019-03-29T00:00:00","TransactionDescription":"Open Loan","PrincipalAmount":6688.44,"InterestAmount":0,"OtherAmount":0,"RunningPrincipalBalance":6688.44}],"Errors":[],"SuccessMessage":"","HasNoErrors":true}],"debitStateFlag":false}};

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
const mockAccountOverview = () =>{
	useAccountOverview.mockImplementation(() => ({
		accountDetails: accountOverviewData,
	}));
}

test("Checks the component is rendered", () => {
  mockAccountOverview();
	render(component(), { wrapper: MemoryRouter });
  const element = screen.getByTestId('profile-component-test');
	expect(element).toBeTruthy();
});
test("Check the five tabs are available in UI", () => {
  mockAccountOverview();
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
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('jean');
});

test("Check the last name field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('llmtwxy');
});

test("Check the Date of Birth field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('**/**/1984');
});

test("Check the Email Address field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="email"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('zdunkerton@marinerfinance.com');
});

test("Check the Primary phone number field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('(***) ***-1234');
});

test("Check the upload image field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[id="selectImage"]`);
	expect(input).toBeTruthy();
});

test("First name field to be disabled in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="firstname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Last name field to be disabled in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="lastname"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Date of Birth field to be disabled in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[name="dob"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check can able to enter email id in Email Address filed in UI", async () => {
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = basicComponentUtil(getByText);
	const input = element.querySelector(`input[id="selectImage"]`);
	fireEvent.click(input);
	expect(input).toBeTruthy();
});

test("------------------------------Mailing address component use cases-----------------------", async () => {
  
});

test("When click Mailing Address menu, the mailing address component to be render", async () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	
});


test("Check the Street address field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="streetAddress"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('1234 MAIN AVEE');
});

test("Check the City field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);	
	const input = element.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('BEAR');
});

test("Check the state field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('DE');
});

test("Check the zipcode field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('19701');
});

test("Check the cancel button in  UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	expect(getByText("Cancel")).toBeTruthy();
});

test("Check the Save button in  UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	expect(getByText("Save Changes")).toBeTruthy();
});

test("City field to be disabled in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("State field to be disabled in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check the zipcode max length to be 5", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	const input = element.querySelector(`input[name="zip"]`);
	expect(input).toBeTruthy();
	expect(input.maxLength).toBe(5);
});

test("Check can able to enter Street address in UI", async () => {
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = mailingAddressUtil(getByText);
	await act(() => {
		fireEvent.click(screen.getByText('Save Changes'));
	});	
});

test("------------------------------Text Notification component use cases-----------------------", async () => {
  
});

test("When click Text Notification menu, the text notification component to be render", async () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);	
});


test("Check the the notification switch option in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	expect(InputEvent).toBeTruthy();
});

test("Check the the phone number field in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = element.querySelector(`input[name="phone"]`);
	expect(input).toBeTruthy();
});

test("Check the the notification switch option in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-terms');
	expect(input).toBeTruthy();
});

test("Check the cancel button in  UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	expect(getByText("Cancel")).toBeTruthy();
});

test("Check the Save button in  UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	expect(getByText("Update")).toBeTruthy();
});

test("By default the switch to be Off", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	expect(input).not.toBeChecked();
});

test("The switch to be On in click event", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	fireEvent.click(input);
	expect(input).toBeChecked();
});

test("The switch to be On and Off when click two time", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = textNotificationUtil(getByText);
	const input = screen.getByTestId('notification-switch');
	fireEvent.click(input);
	fireEvent.click(input);
	expect(input).not.toBeChecked();
});

test("Check can able to enter phone number in Phone Number filed in UI", async () => {
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = notification.querySelector(`input[id="textingterms"]`);
	fireEvent.click(element);
	expect(element).toBeChecked();
});

test("Check can able to select and deselect terms check box UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = notification.querySelector(`input[id="textingterms"]`);
	fireEvent.click(element);
	fireEvent.click(element);
	expect(element).not.toBeChecked();
});

test("Check can able to click Cancel button", async () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = getByText("Cancel");
	await act(() => {
		fireEvent.click(element);
	});
});

test("Check can able to click Update button", async () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = getByText("Update");
	await act(() => {
		fireEvent.click(element);
	});
});

test("Check the disclosure link is showing in UI", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let notification = textNotificationUtil(getByText);
	const element = screen.getByTestId('disclosure-link');
	expect(element).toBeTruthy();
});

test("Check the disclosure popup is opening when click the link", async () => {
	mockAccountOverview();
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
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);	
});

test("Check Add Bank Account button exist in the UI", async () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	expect(getByText("Add Bank Account")).toBeTruthy();
});

test("Check can able to click Add Bank Account button and showing popup", async () => {
  mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	fireEvent.click(screen.getByTestId('add-new-account-number'));	
	const input = screen.getByTestId('add-new-bank-account-container');
	expect(input).toHaveClass("showContent");
});

test("Check all input filed exist in the UI. account Nick Name, Account Holder Name, Account Type, Rounting Number, Bank Name, Bank Account Number and set default checkbox", async () => {
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	expect(getByText("Add Debit Card")).toBeTruthy();
});

test("Check can able to click Add Bank Account button and showing popup", async () => {
  mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = paymentMethodsUtil(getByText);
	fireEvent.click(screen.getByTestId('add-new-debit-card'));	
	const input = screen.getByTestId('add-new-debit-card-container');
	expect(input).toHaveClass("showContent");
});

test("Check all input filed exist in the UI. Card number, Name on Card, Expiration Date, CVV, ", async () => {
	mockAccountOverview();
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
	mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
  mockAccountOverview();
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
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
});

test("Check the Old password field in UI with value empty", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="oldPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the New password field in UI with value empty", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="newPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the Confirm new password field in UI with value empty", () => {
	mockAccountOverview();
	const { container, getByText } = render(component(), { wrapper: MemoryRouter }); 
	let element = changePasswordUtil(getByText);
	const input = element.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Show error message if not entered Old passord", async () => {
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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
	mockAccountOverview();
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