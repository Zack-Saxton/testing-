import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import 'dotenv/config';
import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CheckMyOffers from '../../contexts/CheckMyOffers';
import LoanAccount from '../../contexts/LoanAccount';
import NavContext from "../../contexts/NavContext";
import ProfilePicture from '../../contexts/ProfilePicture';
import { CircularProgress } from '@mui/material';
const CustomComponents = lazy(() => import( "../CustomComponent"));
const Disclosure = lazy(() => import( "../Layout/DisclosureLink/Disclosure"));
const ErrorAfterLogin = lazy(() => import( "../Layout/ErrorAfterLogin/ErrorAfterLogin"));
const ErrorBeforeLogin = lazy(() => import( '../Layout/ErrorBeforeLogin/ErrorBeforeLogin'));
import GeneralUser from '../Layout/General';
import PostLogin from '../Layout/Post';
import BranchLocatorLayout from '../Layout/BranchLocatorLayout/BranchLocatorLayout';
const AccountOverview = lazy(() => import( "../Pages/AccountOverview/AccountOverview"));
const ViewAccountDetails = lazy(() => import( "../Pages/AccountOverview/ViewAccountDetails"));
const ConfirmationInfo = lazy(() => import( "../Pages/AffiliatePartner/ConfirmationInfo"));
const PartnerSignUP = lazy(() => import( "../Pages/AffiliatePartner/PartnerSignUp"));
const ApplyForLoanRedirect = lazy(() => import( "../Pages/ApplyLoan/ApplyForLoanRedirect"));
const FinalVerification = lazy(() => import( "../Pages/ApplyLoan/FinalVerification/FinalVerification"));
const ReceiveYourMoney = lazy(() => import( "../Pages/ApplyLoan/ReceiveYourMoney/ReceiveYourMoney"));
const ResumeApplication = lazy(() => import( "../Pages/ApplyLoan/ResumeApplication"));
const ReviewAndSign = lazy(() => import( "../Pages/ApplyLoan/ReviewAndSign/ReviewAndSign"));
const ApplyLoan = lazy(() => import( "../Pages/ApplyLoan/SelectOffer/SelectOffer"));
const ValidateToken = lazy(() => import( '../Pages/ApplyLoan/Stepper/ValidateToken'));
const BranchLocator = lazy(() => import( "../Pages/BranchLocator/BranchLocator"));
const BranchPage = lazy(() => import( "../Pages/BranchLocator/BranchPage"));
const StatePage = lazy(() => import( "../Pages/BranchLocator/StatePage"));
// const ActiveDuty = lazy(() => import( "../Pages/CheckMyOffers/ActiveDuty"));
// const AnnualIncome = lazy(() => import( '../Pages/CheckMyOffers/AnnualIncome'));
// const CitizenshipStatus = lazy(() => import( '../Pages/CheckMyOffers/CitizenshipStatus'));
// const EligibleForOffers = lazy(() => import( "../Pages/CheckMyOffers/EligibleForOffer"));
// const EmploymentStatus = lazy(() => import( '../Pages/CheckMyOffers/EmploymentStatus'));
// const ExistingUser = lazy(() => import( "../Pages/CheckMyOffers/ExistingUser"));
// const HomeAddress = lazy(() => import( "../Pages/CheckMyOffers/HomeAddress"));
// const LivingPlace = lazy(() => import( "../Pages/CheckMyOffers/LivingPlace"));
// const LoanPurpose = lazy(() => import( '../Pages/CheckMyOffers/LoanPurpose'));
// const MarriedStatus = lazy(() => import( "../Pages/CheckMyOffers/MarriedStatus"));
// const NewUser = lazy(() => import( '../Pages/CheckMyOffers/NewUser'));
// const NoOffersAvailable = lazy(() => import( "../Pages/CheckMyOffers/NoOffersAvailable"));
// const SSN = lazy(() => import( "../Pages/CheckMyOffers/OneLastStep"));
// const PersonalInfo = lazy(() => import( '../Pages/CheckMyOffers/PersonalInfo'));
// const PreApproved = lazy(() => import( "../Pages/CheckMyOffers/PreApproved"));
// const ReferredToBranch = lazy(() => import( "../Pages/CheckMyOffers/ReferredToBranch"));
// const SelectAmount = lazy(() => import( '../Pages/CheckMyOffers/SelectAmount'));
// const SelectAmountRouting = lazy(() => import( '../Pages/CheckMyOffers/SelectAmount/SelectAmountRouting'));
// const ZipCode = lazy(() => import( '../Pages/CheckMyOffers/Zipcode'));
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
import SelectAmountRouting from '../Pages/CheckMyOffers/SelectAmount/SelectAmountRouting';
import ZipCode from '../Pages/CheckMyOffers/Zipcode';
const EmailVerification = lazy(() => import( "../Pages/EmailVerification/EmailVerification"));
const FaqBeforeLogin = lazy(() => import( "../Pages/Faq/FaqBeforeLogin"));
const FaqPostLogin = lazy(() => import( "../Pages/Faq/FaqPostLogin"));
const LoanDocument = lazy(() => import( "../Pages/LoanDocument/LoanDocument"));
const LoanHistory = lazy(() => import( "../Pages/LoanHistory/LoanHistory"));
const LoginPage = lazy(() => import( '../Pages/Login/Login'));
const ResetPassword = lazy(() => import( '../Pages/Login/ResetPassword'));
const MakePayment = lazy(() => import( "../Pages/MakePayment/MakePayment"));
const MoneySkill = lazy(() => import( "../Pages/MoneySkill/MoneySkill"));
const MFASecurityQuestions = lazy(() => import( "../Pages/MultiFactorAuthentication/MFA-SecurityQuestions"));
const MFASelectSecurityQuestions = lazy(() => import( "../Pages/MultiFactorAuthentication/MFA-SelectSecurityQuestions"));
const MultiFactorAuthentication = lazy(() => import( "../Pages/MultiFactorAuthentication/MultiFactorAuthentication"));
const MultiFactorAuthenticationOTP = lazy(() => import( "../Pages/MultiFactorAuthentication/MultiFactorAuthenticationOTP"));
const KbaQuestions = lazy(() => import( '../Pages/MultiFactorAuthentication/KbaQuestions'));
const MyBranch = lazy(() => import( "../Pages/MyBranch/MyBranch"));
const MyProfile = lazy(() => import( "../Pages/MyProfile/MyProfile"));
const PaymentHistory = lazy(() => import( "../Pages/PaymentHistory/PaymentHistory"));
const RegisterPage = lazy(() => import( '../Pages/Register/Register'));
const VantageScore = lazy(() => import( "../Pages/VantageScore/VantageScore"));
const MFAGetPhoneNumber = lazy(() => import( "../Pages/MultiFactorAuthentication/MFAGetPhoneNumber"));
const AmOneNoOffersAvailable = lazy(() => import( "../Pages/CheckMyOffers/AmOneNoOffersAvailable/AmOneNoOffersAvailable"));
const SpringFourNoOffersAvailable = lazy(() => import( "../Pages/CheckMyOffers/SpringFourNoOffersAvailable/SpringFourNoOffersAvailable"));
const LightBox = lazy(() => import( "../Pages/CheckMyOffers/LightBox/LightBox"));
const OtherPartner = lazy(() => import( "../Pages/AffiliatePartner/OtherPartners/OtherPartner"));
const Admin = lazy(() => import( "./Admin"));
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
            <Suspense fallback = {<div id='globalSpinnerDiv'><CircularProgress id='globalSpinner'/></div>}>
            {componentName}
            </Suspense>
        </GeneralUser>
    );
};

const loadGeneralUserWithoutHeader = (componentName) => {
    return (
        <GeneralUser skipHeaderMenu={true}>
            <Suspense fallback = {<div id='globalSpinnerDiv'><CircularProgress id='globalSpinner'/></div>}>
            {componentName}
            </Suspense>
        </GeneralUser>
    );
};

const LoadPostComponent = (componentName) => {
    return (

        <div id="main" >
            <PostLogin >
            <Suspense fallback = {<div id='globalSpinnerDiv'><CircularProgress id='globalSpinner'/></div>} >
                {componentName}
            </Suspense>
            </PostLogin>
        </div>
    );
};
const branchHeaderComponent = (componentName) => {
    return (
        <BranchLocatorLayout>
        <Suspense fallback = {<div id='globalSpinnerDiv'><CircularProgress id='globalSpinner'/></div>}>
            {componentName}
        </Suspense>
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
                                                    <Route exact path='/'  element={<Admin />} />
                                                    <Route path='/components' element={loadGeneralUserComponent(<CustomComponents />)} />
                                                    <Route path='/login' element={loadGeneralUserComponent(<LoginPage />)} />
                                                    <Route path='/error' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
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
                                                    <Route path='/termsofuse' element={loadGeneralUserComponent(<Disclosure URL="/cacTermsOfUse" />)} />
                                                    <Route path='/cac-termsofuse' element={loadGeneralUserComponent(<Disclosure URL="/termsOfUse" />)} />
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
                                                    <Route path='loan-purpose' element={loadGeneralUserComponent(<LoanPurpose />)} >
                                                        <Route path=':amount' element={loadGeneralUserComponent(<LoanPurpose />)} />
                                                    </Route>
                                                    <Route path='/offer-code' element={loadGeneralUserComponent(<SelectAmount enableOffer= {true} />)} />
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
                                                        <Route path='' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                    </Route>
                                                    <Route path='branch' >
                                                        <Route path='verifyemail' element={loadGeneralUserWithoutHeader(<EmailVerification />)} />
                                                        <Route path='' element={loadGeneralUserComponent(<ErrorBeforeLogin />)} />
                                                    </Route>
                                                    <Route path='offers' >
                                                    <Route path=''  element={<SelectAmountRouting />} />
                                                        <Route path='none-available' element={loadGeneralUserComponent(<SpringFourNoOffersAvailable />)} />
                                                        <Route path='referral' element={loadGeneralUserComponent(<ReferredToBranch />)} />
                                                        <Route path='no-offers' element={loadGeneralUserComponent(<AmOneNoOffersAvailable />)} />
                                                    </Route>
                                                    <Route path='partners' >
                                                            <Route path='*' element={<LightBox />} />
                                                    </Route>
                                                    <Route path = 'application' >
                                                        <Route path = 'form' element={<OtherPartner />}>
                                                        </Route>
                                                    </Route>                                                
                                                    <Route path = 'loan_by_mail' element={<OtherPartner />} />
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
