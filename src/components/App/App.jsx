import 'dotenv/config';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CheckMyOffers from '../../contexts/CheckMyOffers';
import ProfilePicture from '../../contexts/ProfilePicture';
import CustomComponents from "../CustomComponent";
import Disclosure from "../Layout/DisclosureLink/Disclosure";
import ErrorAfterLogin from "../Layout/ErrorAfterLogin/ErrorAfterLogin";
import ErrorBeforeLogin from '../Layout/ErrorBeforeLogin/ErrorBeforeLogin';
import GeneralUser from '../Layout/General';
import PostLogin from '../Layout/Post';
import AccountOverview from "../Pages/AccountOverview/AccountOverview";
import ConfirmationInfo from "../Pages/AffiliatePartner/ConfirmationInfo";
import PartnerSignUP from "../Pages/AffiliatePartner/PartnerSignUp";
import ApplyForLoanRedirect from "../Pages/ApplyLoan/ApplyForLoanRedirect";
import FinalVerification from "../Pages/ApplyLoan/FinalVerification/FinalVerification";
import ReceiveYourMoney from "../Pages/ApplyLoan/ReceiveYourMoney/ReceiveYourMoney";
import ResumeApplication from "../Pages/ApplyLoan/ResumeApplication";
import ReviewAndSign from "../Pages/ApplyLoan/ReviewAndSign/ReviewAndSign";
import ApplyLoan from "../Pages/ApplyLoan/SelectOffer/SelectOffer";
import ValidateToken from '../Pages/ApplyLoan/Stepper/ValidateToken';
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
import PersonalInfo from '../Pages/CheckMyOffers/PersonalInfo';
import PreApproved from "../Pages/CheckMyOffers/PreApproved";
import ReferredToBranch from "../Pages/CheckMyOffers/ReferredToBranch";
import SelectAmount from '../Pages/CheckMyOffers/SelectAmount';
import SSN from "../Pages/CheckMyOffers/SSN";
import ZipCode from '../Pages/CheckMyOffers/Zipcode';
import FaqBeforeLogin from "../Pages/Faq/FaqBeforeLogin";
import FaqPostLogin from "../Pages/Faq/FaqPostLogin";
import LoanDocument from "../Pages/LoanDocument/LoanDocument";
import LoanHistory from "../Pages/LoanHistory/LoanHistory";
import LoginPage from '../Pages/Login/Login';
import MakePayment from "../Pages/MakePayment/MakePayment";
import MoneySkill from "../Pages/MoneySkill/MoneySkill";
import MyBranch from "../Pages/MyBranch/MyBranch";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import RegisterPage from '../Pages/Register/Register';
import VantageScore from "../Pages/VantageScore/VantageScore";
import ViewAccountDetails from "../Pages/AccountOverview/ViewAccountDetails";
import BranchLocator from "../Pages/MyBranch/BranchLocator";
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

function App() {
    return (
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
                            <GeneralUser>
                                <Routes>
                                    <Route path='/' >
                                        <Route path='' element={<AccountOverview />} />
                                        <Route path='customers/accountOverview' element={<AccountOverview />} />
                                        <Route path='/customers/verification/email' element={<ValidateToken />} />
                                        <Route path='/components' element={<CustomComponents />} />
                                        <Route path='/login' element={<LoginPage />} />
                                        <Route path='/register' element={<RegisterPage />} />
                                        <Route path='/faq' element={<FaqBeforeLogin />} />
                                        <Route path='/select-amount' element={<SelectAmount />} />
                                        <Route path='/privacyStatement' render={() => (<Disclosure URL="/privacy" />)} />
                                        <Route path='/communityGuidelines' render={() => (<Disclosure URL="/communityGuidelines" />)} />
                                        <Route path='/termsofuse' render={() => (<Disclosure URL="/termsOfUse" />)} />
                                        <Route path='/cac-termsofuse' render={() => (<Disclosure URL="/cacTermsOfUse" />)} />
                                        <Route path='/licenseDisclosure' render={() => (<Disclosure URL="/licensing" />)} />
                                        <Route path='/textingTermsOfUse' render={() => (<Disclosure URL="/textingTermsOfUse" />)} />
                                        <Route path='/californiaResident' render={() => (<Disclosure URL="/california" />)} />
                                        <Route path='/websiteAccessibility' render={() => (<Disclosure URL="/websiteAccessibility" />)} />
                                        <Route path='/loan-purpose' element={<LoanPurpose />} />
                                        <Route path='/pre-approved' element={<PreApproved />} />
                                        <Route path='/citizenship-status' element={<CitizenshipStatus />} />
                                        <Route path='/new-user' element={<NewUser />} />
                                        <Route path='/existing-user' element={<ExistingUser />} />
                                        <Route path='/employment-status' element={<EmploymentStatus />} />
                                        <Route path='/annual-income' element={<AnnualIncome />} />
                                        <Route path='/home-address' element={<HomeAddress />} />
                                        <Route path='/living-place' element={<LivingPlace />} />
                                        <Route path='/active-duty' element={<ActiveDuty />} />
                                        <Route path='/marital-status' element={<MarriedStatus />} />
                                        <Route path='/ssn' element={<SSN />} />
                                        <Route path='/no-offers-available' element={<NoOffersAvailable />} />
                                        <Route path='/referred-to-branch' element={<ReferredToBranch />} />
                                        <Route path='/eligible-for-offers' element={<EligibleForOffers />} />
                                        <Route path='/zipcode' element={<ZipCode />} />
                                        <Route path='/personal-info' element={<PersonalInfo />} />
                                        <Route path='/branchlocator' element={<BranchLocator />} />
                                    </Route>
                                </Routes>
                            </GeneralUser>
                            <Routes>
                                <Route path='/select-amount/:amount' element={<SelectAmount />} />
                            </Routes>
                            <PostLogin>
                                <Routes>
                                    <Route path='customers' >
                                        <Route path='accountOverview' element={<AccountOverview />} />
                                        <Route path='paymentHistory' element={<PaymentHistory />} />
                                        <Route path='/customers/selectOffer' element={<ApplyLoan />} />
                                        <Route path='/customers/applyForLoan' element={<ApplyForLoanRedirect />} />
                                        <Route path='/customers/resumeApplication' element={<ResumeApplication />} />
                                        <Route path='/customers/reviewAndSign' element={<ReviewAndSign />} />
                                        <Route path='/customers/finalVerification' element={<FinalVerification />} />
                                        <Route path='/customers/receiveYourMoney' element={<ReceiveYourMoney />} />
                                        <Route path='/customers/loanDocument' element={<LoanDocument />} />
                                        <Route path='/customers/loanHistory' element={<LoanHistory />} />
                                        <Route path='/customers/makePayment/:accNo?' element={<MakePayment />} />
                                        <Route path='/customers/moneySkill' element={<MoneySkill />} />
                                        <Route path='/customers/myBranch' element={<MyBranch />} />
                                        <Route path='/customers/myProfile' element={<MyProfile />} />
                                        <Route path='/customers/vantageScore' element={<VantageScore />} />
                                        <Route path='/customers/faq' element={<FaqPostLogin />} />
                                        <Route path='/customers/viewaccount' element={<ViewAccountDetails />} />
                                    </Route>
                                </Routes>
                            </PostLogin>

                            <GeneralUser>
                                <Routes>
                                    <Route path='/partner' >
                                        <Route path='/partner/signup' element={<ErrorBeforeLogin />} />
                                        <Route path='/partner/signup' element={<PartnerSignUP />} />
                                        <Route path='/partner/confirm-signup' element={<ConfirmationInfo />} />
                                        <Route path='*' element={<ErrorBeforeLogin />} />
                                    </Route>
                                </Routes>
                            </GeneralUser>
                        </ProfilePicture>
                    </CheckMyOffers>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    );
}

export default App;