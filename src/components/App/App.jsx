import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import 'dotenv/config';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CheckMyOffers from '../../contexts/CheckMyOffers';
import LoanAccount from '../../contexts/LoanAccount';
import NavContext from "../../contexts/NavContext";
import ProfilePicture from '../../contexts/ProfilePicture';
import CustomComponents from "../CustomComponent";
import BranchLocatorLayout from "../Layout/BranchLocatorLayout/BranchLocatorLayout";
import Disclosure from "../Layout/DisclosureLink/Disclosure";
import ErrorAfterLogin from "../Layout/ErrorAfterLogin/ErrorAfterLogin";
import ErrorBeforeLogin from '../Layout/ErrorBeforeLogin/ErrorBeforeLogin';
import GeneralUser from '../Layout/General';
import PostLogin from '../Layout/Post';
import AccountOverview from "../Pages/AccountOverview/AccountOverview";
import ViewAccountDetails from "../Pages/AccountOverview/ViewAccountDetails";
import ConfirmationInfo from "../Pages/AffiliatePartner/ConfirmationInfo";
import PartnerSignUP from "../Pages/AffiliatePartner/PartnerSignUp";
import ApplyForLoanRedirect from "../Pages/ApplyLoan/ApplyForLoanRedirect";
import FinalVerification from "../Pages/ApplyLoan/FinalVerification/FinalVerification";
import ReceiveYourMoney from "../Pages/ApplyLoan/ReceiveYourMoney/ReceiveYourMoney";
import ResumeApplication from "../Pages/ApplyLoan/ResumeApplication";
import ReviewAndSign from "../Pages/ApplyLoan/ReviewAndSign/ReviewAndSign";
import ApplyLoan from "../Pages/ApplyLoan/SelectOffer/SelectOffer";
import ValidateToken from '../Pages/ApplyLoan/Stepper/ValidateToken';
import BranchLocator from "../Pages/BranchLocator/BranchLocator";
import BranchPage from "../Pages/BranchLocator/BranchPage";
import StatePage from "../Pages/BranchLocator/StatePage";
import ActiveDuty from "../Pages/CheckMyOffers/ActiveDuty";
import AnnualIncome from '../Pages/CheckMyOffers/AnnualIncome';
import CitizenshipStatus from '../Pages/CheckMyOffers/CitizenshipStatus';
import EligibleForOffers from "../Pages/CheckMyOffers/EligibleForOffer";
import EmploymentStatus from '../Pages/CheckMyOffers/EmploymentStatus';
import ExistingUser from "../Pages/CheckMyOffers/ExistingUser";
import HomeAddress from "../Pages/CheckMyOffers/HomeAddress";
import LivingPlace from "../Pages/CheckMyOffers/LivingPlace";
import LoanPurpose from '../Pages/CheckMyOffers/LoanPurpose';
import MarriedStatus from "../Pages/CheckMyOffers/MarriedStatus";
import NewUser from '../Pages/CheckMyOffers/NewUser';
import NoOffersAvailable from "../Pages/CheckMyOffers/NoOffersAvailable";
import SSN from "../Pages/CheckMyOffers/OneLastStep";
import PersonalInfo from '../Pages/CheckMyOffers/PersonalInfo';
import PreApproved from "../Pages/CheckMyOffers/PreApproved";
import ReferredToBranch from "../Pages/CheckMyOffers/ReferredToBranch";
import SelectAmount from '../Pages/CheckMyOffers/SelectAmount';
import ZipCode from '../Pages/CheckMyOffers/Zipcode';
import EmailVerification from "../Pages/EmailVerification/EmailVerification";
import FaqBeforeLogin from "../Pages/Faq/FaqBeforeLogin";
import FaqPostLogin from "../Pages/Faq/FaqPostLogin";
import LoanDocument from "../Pages/LoanDocument/LoanDocument";
import LoanHistory from "../Pages/LoanHistory/LoanHistory";
import LoginPage from '../Pages/Login/Login';
import ResetPassword from '../Pages/Login/ResetPassword';
import MakePayment from "../Pages/MakePayment/MakePayment";
import MoneySkill from "../Pages/MoneySkill/MoneySkill";
import MFASecurityQuestions from "../Pages/MultiFactorAuthentication/MFA-SecurityQuestions";
import MFASelectSecurityQuestions from "../Pages/MultiFactorAuthentication/MFA-SelectSecurityQuestions";
import MultiFactorAuthentication from "../Pages/MultiFactorAuthentication/MultiFactorAuthentication";
import MultiFactorAuthenticationOTP from "../Pages/MultiFactorAuthentication/MultiFactorAuthenticationOTP";
import KbaQuestions from '../Pages/MultiFactorAuthentication/KbaQuestions';
import MyBranch from "../Pages/MyBranch/MyBranch";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import RegisterPage from '../Pages/Register/Register';
import VantageScore from "../Pages/VantageScore/VantageScore";
import MFAGetPhoneNumber from "../Pages/MultiFactorAuthentication/MFAGetPhoneNumber";
import NoOfferAvailable from "../Layout/offers/NoOfferAvailable"
import AmOneNoOffersAvailable from "../Pages/CheckMyOffers/AmOneNoOffersAvailable/AmOneNoOffersAvailable"
import ReferredFromAffiliate from "../Pages/CheckMyOffers/ReferredFromAffiliate/ReferredFromAffiliate"
import "./App.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 500000,
        },
    },
});
const loadGeneralUserComponent = (componentName) => {
    return (
        <GeneralUser>
            {componentName}
        </GeneralUser>
    );
};

const loadGeneralUserWithoutHeader = (componentName) => {
    return (
        <GeneralUser skipHeaderMenu={true}>
            {componentName}
        </GeneralUser>
    );
};

const LoadPostComponent = (componentName) => {
    return (

        <div id="main" >
            <PostLogin >
                {componentName}
            </PostLogin>
        </div>
    );
};
const branchHeaderComponent = (componentName) => {
    return (
        <BranchLocatorLayout>
            {componentName}
        </BranchLocatorLayout>
    );
};
const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <QueryClientProvider client={queryClient}>
                    <div className="App">
                        <ToastContainer
                            theme="colored"
                            position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            closeOnClick={true}
                            pauseOnHover={true}
                            draggable={true}
                            className="toast_message_box"
                        />
                        <BrowserRouter>
                            <CheckMyOffers>
                                <ProfilePicture>
                                    <LoanAccount>
                                        <NavContext>
                                            <Routes>
                                                <Route path='/' element={<Navigate replace to="/customers/accountOverview" />} />
                                                <Route path='/components' element={loadGeneralUserComponent(<CustomComponents />)} />
                                                <Route path='/login' element={loadGeneralUserComponent(<LoginPage />)} />
                                                <Route path='/MFA-phoneNumber' element={loadGeneralUserComponent(<MFAGetPhoneNumber />)} />
                                                <Route path='/MFA' element={loadGeneralUserComponent(<MultiFactorAuthentication />)} />
                                                <Route path='/MFA-OTP' element={loadGeneralUserComponent(<MultiFactorAuthenticationOTP />)} />
                                                <Route path='/MFA-SecurityQuestions' element={loadGeneralUserComponent(<MFASecurityQuestions />)} />
                                                <Route path='/MFA-SelectSecurityQuestions' element={loadGeneralUserComponent(<MFASelectSecurityQuestions />)} />
                                                <Route path='/mfa-kbaQuestions' element={loadGeneralUserComponent(<KbaQuestions/>)}/>
                                                <Route path='/register' element={loadGeneralUserComponent(<RegisterPage />)} />
                                                <Route path='/faq' element={loadGeneralUserComponent(<FaqBeforeLogin />)} />
                                                <Route path='/privacyStatement' element={loadGeneralUserComponent(<Disclosure URL="/privacy" />)} />
                                                <Route path='/communityGuidelines' element={loadGeneralUserComponent(<Disclosure URL="/communityGuidelines" />)} />
                                                <Route path='/termsofuse' element={loadGeneralUserComponent(<Disclosure URL="/termsOfUse" />)} />
                                                <Route path='/cac-termsofuse' element={loadGeneralUserComponent(<Disclosure URL="/cacTermsOfUse" />)} />
                                                <Route path='/licenseDisclosure' element={loadGeneralUserComponent(<Disclosure URL="/licensing" />)} />
                                                <Route path='/textingTermsOfUse' element={loadGeneralUserComponent(<Disclosure URL="/textingTermsOfUse" />)} />
                                                <Route path='/californiaResident' element={loadGeneralUserComponent(<Disclosure URL="/california" />)} />
                                                <Route path='/websiteAccessibility' element={loadGeneralUserComponent(<Disclosure URL="/websiteAccessibility" />)} />
                                                <Route path='/loan-purpose' element={loadGeneralUserComponent(<LoanPurpose />)} />
                                                <Route path='/pre-approved' element={loadGeneralUserComponent(<PreApproved />)} />
                                                <Route path='/citizenship-status' element={loadGeneralUserComponent(<CitizenshipStatus />)} />
                                                <Route path='/new-user' element={loadGeneralUserComponent(<NewUser />)} />
                                                <Route path='/existing-user' element={loadGeneralUserComponent(<ExistingUser />)} />
                                                <Route path='/employment-status' element={loadGeneralUserComponent(<EmploymentStatus />)} />
                                                <Route path='/annual-income' element={loadGeneralUserComponent(<AnnualIncome />)} />
                                                <Route path='/home-address' element={loadGeneralUserComponent(<HomeAddress />)} />
                                                <Route path='/living-place' element={loadGeneralUserComponent(<LivingPlace />)} />
                                                <Route path='/active-duty' element={loadGeneralUserComponent(<ActiveDuty />)} />
                                                <Route path='/marital-status' element={loadGeneralUserComponent(<MarriedStatus />)} />
                                                <Route path='/oneLastStep' element={loadGeneralUserComponent(<SSN />)} />
                                                <Route path='/no-offers-available' element={loadGeneralUserComponent(<NoOffersAvailable />)} />
                                                <Route path='/referred-to-branch' element={loadGeneralUserComponent(<ReferredToBranch />)} />
                                                <Route path='/eligible-for-offers' element={loadGeneralUserComponent(<EligibleForOffers />)} />
                                                <Route path='/zipcode' element={loadGeneralUserComponent(<ZipCode />)} />
                                                <Route path='/personal-info' element={loadGeneralUserComponent(<PersonalInfo />)} />
                                                <Route path='/branch-locator' element={branchHeaderComponent(<BranchLocator />)} />
                                                <Route path='/branch-locator/:statename/:branch' element={branchHeaderComponent(<BranchPage />)} />
                                                <Route path='/branch-locator' element={branchHeaderComponent(<StatePage />)} >
                                                    <Route path=':statename' element={branchHeaderComponent(<StatePage />)} />
                                                </Route>
                                                <Route path='/resetpassword' element={loadGeneralUserComponent(<ResetPassword />)} />
                                                <Route path='*' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                <Route path='select-amount' element={loadGeneralUserComponent(<SelectAmount />)} >
                                                    <Route path=':amount' element={loadGeneralUserComponent(<SelectAmount />)} />
                                                </Route>
                                                <Route path='customers' >

                                                    <Route path='accountOverview' element={LoadPostComponent(<AccountOverview />)} />
                                                    <Route path='paymentHistory' element={LoadPostComponent(<PaymentHistory />)} />
                                                    <Route path='selectOffer' element={LoadPostComponent(<ApplyLoan />)} />
                                                    <Route path='applyForLoan' element={LoadPostComponent(<ApplyForLoanRedirect />)} />
                                                    <Route path='resumeApplication' element={LoadPostComponent(<ResumeApplication />)} />
                                                    <Route path='reviewAndSign' element={LoadPostComponent(<ReviewAndSign />)} />
                                                    <Route path='finalVerification' element={LoadPostComponent(<FinalVerification />)} />
                                                    <Route path='receiveYourMoney' element={LoadPostComponent(<ReceiveYourMoney />)} />
                                                    <Route path='loanDocument' element={LoadPostComponent(<LoanDocument />)} />
                                                    <Route path='loanHistory' element={LoadPostComponent(<LoanHistory />)} />
                                                    <Route path='makePayment' element={LoadPostComponent(<MakePayment />)}>
                                                        <Route path=':accNo' element={LoadPostComponent(<MakePayment />)} />
                                                    </Route>
                                                    <Route path='moneySkill' element={LoadPostComponent(<MoneySkill />)} />
                                                    <Route path='myBranch' element={LoadPostComponent(<MyBranch />)} />
                                                    <Route path='myProfile' element={LoadPostComponent(<MyProfile />)} />
                                                    <Route path='vantageScore' element={LoadPostComponent(<VantageScore />)} />
                                                    <Route path='faq' element={LoadPostComponent(<FaqPostLogin />)} />
                                                    <Route path='viewaccount' element={LoadPostComponent(<ViewAccountDetails />)} />
                                                    <Route path='verification'>
                                                        <Route path='email' element={<ValidateToken />} />
                                                    </Route>
                                                    <Route path='*' element={<ErrorAfterLogin />} />
                                                </Route>
                                                <Route path='partner' >
                                                    <Route path='signup' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                    <Route path='signup'>
                                                        <Route path='*' element={loadGeneralUserComponent(<PartnerSignUP />)} />
                                                    </Route>
                                                    <Route path='confirm-signup' element={loadGeneralUserComponent(<ConfirmationInfo />)} />
                                                    <Route path='*' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                </Route>
                                                <Route path='branch' >
                                                    <Route path='verifyemail' element={loadGeneralUserWithoutHeader(<EmailVerification />)} />
                                                    <Route path='*' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                </Route>
                                                <Route path='offers' >
                                                    <Route path='none-available' element={loadGeneralUserComponent(<NoOfferAvailable />)} />
                                                    <Route path='no-offers' element={loadGeneralUserComponent(<AmOneNoOffersAvailable />)} />
                                                    <Route path='Referred' element={loadGeneralUserComponent(<ReferredFromAffiliate />)} />
                                                    <Route path='*' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                </Route>
                                            </Routes>
                                        </NavContext>
                                    </LoanAccount>
                                </ProfilePicture>
                            </CheckMyOffers>
                        </BrowserRouter>
                    </div>
                </QueryClientProvider>
            </StyledEngineProvider>
        </ThemeProvider>
    );
}

export default App;
