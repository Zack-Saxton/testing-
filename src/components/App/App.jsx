import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./App.css";
import AccountOverview from "../Pages/AccountOverview/AccountOverview";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import ApplyLoan from "../Pages/ApplyLoan/SelectOffer/SelectOffer";
import ReviewAndSign from "../Pages/ApplyLoan/ReviewAndSign/ReviewAndSign";
import FinalVerification from "../Pages/ApplyLoan/FinalVerification/FinalVerification";
import ReceiveYourMoney from "../Pages/ApplyLoan/ReceiveYourMoney/ReceiveYourMoney";
import LoanHistory from "../Pages/LoanHistory/LoanHistory";
import MakePayment from "../Pages/MakePayment/MakePayment";
import MoneySkill from "../Pages/MoneySkill/MoneySkill";
import MyBranch from "../Pages/MyBranch/MyBranch";
import MyProfile from "../Pages/MyProfile/MyProfile";
import VantageScore from "../Pages/VantageScore/VantageScore";
import LoanDocument from "../Pages/LoanDocument/LoanDocument";
import CustomComponents from "../CustomComponent";
import GeneralUser from '../Layout/General';
import PostLogin from '../Layout/Post';
import LoginPage from '../Pages/Login/Login';
import RegisterPage from '../Pages/Register/Register';
import SelectAmount from '../Pages/CheckMyOffers/SelectAmount';
import LoanPurpose from '../Pages/CheckMyOffers/LoanPurpose';
import CitizenshipStatus from '../Pages/CheckMyOffers/CitizenshipStatus';
import ZipCode from '../Pages/CheckMyOffers/Zipcode';
import PersonalInfo from '../Pages/CheckMyOffers/PersonalInfo';
import NewUser from '../Pages/CheckMyOffers/NewUser';
import ExistingUser from "../Pages/CheckMyOffers/ExistingUser";
import CheckMyOffers from '../../contexts/CheckMyOffers';
import EmploymentStatus from '../Pages/CheckMyOffers/EmploymentStatus';
import AnnualIncome from '../Pages/CheckMyOffers/AnnualIncome';
import HomeAddress from "../Pages/CheckMyOffers/HomeAddress";
import LivingPlace from "../Pages/CheckMyOffers/LivingPlace";
import ActiveDuty from "../Pages/CheckMyOffers/ActiveDuty";
import MarriedStatus from "../Pages/CheckMyOffers/MarriedStatus";
import SSN from "../Pages/CheckMyOffers/SSN";
import NoOffersAvailable from "../Pages/CheckMyOffers/NoOffersAvailable";
import ReferredToBranch from "../Pages/CheckMyOffers/ReferredToBranch";
import EligibleForOffers from "../Pages/CheckMyOffers/EligibleForOffer";
import PartnerSignUP from "../Pages/AffiliatePartner/PartnerSignUp";
import ConfirmationInfo from "../Pages/AffiliatePartner/ConfirmationInfo";
import FaqPostLogin from "../Pages/Faq/FaqPostLogin";
import FaqBeforeLogin from "../Pages/Faq/FaqBeforeLogin";
import 'react-toastify/dist/ReactToastify.css';
import ValidateToken from '../Pages/ApplyLoan/Stepper/ValidateToken';
import ErrorBeforeLogin from '../Layout/ErrorBeforeLogin/ErrorBeforeLogin';
import ErrorAfterLogin from "../Layout/ErrorAfterLogin/ErrorAfterLogin";
import ApplyForLoanRedirect from "../Pages/ApplyLoan/ApplyForLoanRedirect";
import { ToastContainer } from "react-toastify";
import ProfilePicture from '../../contexts/ProfilePicture';
import { QueryClientProvider, QueryClient } from 'react-query';
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
        <QueryClientProvider client={ queryClient }>
            <div className="App">
                <ToastContainer
                    theme="colored"
                    position="bottom-center"
                    autoClose={ 5000 }
                    hideProgressBar={ false }
                    closeOnClick={ true }
                    pauseOnHover={ true }
                    draggable={ true }
                    className="toast_message_box"
                    style={ { width: "50%", } }
                />
                <BrowserRouter>
                    <Routes>
                        <Route path='/customers/verification/email' element={ <ValidateToken /> } />
                        <CheckMyOffers>
                            <ProfilePicture>
                                <Route path='/:path?' exact>
                                    <GeneralUser>
                                        <Route path='/' exact element={ <Navigate to="/customers/accountOverview" /> } />
                                        <Route path='/components' exact element={ <CustomComponents /> } />
                                        <Route path='/login' exact element={ <LoginPage /> } />
                                        <Route path='/register' element={ <RegisterPage /> } />
                                        <Route path='/faq' element={ <FaqBeforeLogin /> } />
                                        <Route path='/select-amount' exact element={ <SelectAmount /> } />
                                        <Route path='/loan-purpose' exact element={ <LoanPurpose /> } />
                                        <Route path='/citizenship-status' exact element={ <CitizenshipStatus /> } />
                                        <Route path='/new-user' exact element={ <NewUser /> } />
                                        <Route path='/existing-user' exact element={ <ExistingUser /> } />
                                        <Route path='/employment-status' exact element={ <EmploymentStatus /> } />
                                        <Route path='/annual-income' exact element={ <AnnualIncome /> } />
                                        <Route path='/home-address' exact element={ <HomeAddress /> } />
                                        <Route path='/living-place' exact element={ <LivingPlace /> } />
                                        <Route path='/active-duty' exact element={ <ActiveDuty /> } />
                                        <Route path='/marital-status' exact element={ <MarriedStatus /> } />
                                        <Route path='/ssn' exact element={ <SSN /> } />
                                        <Route path='/no-offers-available' exact element={ <NoOffersAvailable /> } />
                                        <Route path='/referred-to-branch' exact element={ <ReferredToBranch /> } />
                                        <Route path='/eligible-for-offers' exact element={ <EligibleForOffers /> } />
                                        <Route path='/zipcode' exact element={ <ZipCode /> } />
                                        <Route path='/personal-info' exact element={ <PersonalInfo /> } />
                                        <Route path='*' element={ <ErrorBeforeLogin /> } />
                                    </GeneralUser>
                                </Route>
                                <div id="main" style={ { marginLeft: "240px" } }>
                                    <Route path='/customers/:path?' exact>
                                        <PostLogin>
                                            <Routes>
                                                <Route path='/customers/accountOverview' exact element={ <AccountOverview /> } />
                                                {/* <Route path='/customers/verification/email' element={ValidateToken}/> */ }
                                                <Route path='/customers/paymentHistory' element={ <PaymentHistory /> } />
                                                <Route path='/customers/selectOffer' element={ <ApplyLoan /> } />
                                                <Route path='/customers/applyForLoan' element={ <ApplyForLoanRedirect /> } />
                                                <Route path='/customers/reviewAndSign' element={ <ReviewAndSign /> } />
                                                <Route path='/customers/finalVerification' element={ <FinalVerification /> } />
                                                <Route path='/customers/receiveYourMoney' element={ <ReceiveYourMoney /> } />
                                                <Route path='/customers/loanDocument' element={ <LoanDocument /> } />
                                                <Route path='/customers/loanHistory' element={ <LoanHistory /> } />
                                                <Route path='/customers/makePayment/:accNo?' element={ <MakePayment /> } />
                                                <Route path='/customers/moneySkill' element={ <MoneySkill /> } />
                                                <Route path='/customers/myBranch' element={ <MyBranch /> } />
                                                <Route path='/customers/myProfile' element={ <MyProfile /> } />
                                                <Route path='/customers/vantageScore' element={ <VantageScore /> } />
                                                <Route path='/customers/faq' element={ <FaqPostLogin /> } />
                                                <Route path='*' element={ <ErrorAfterLogin /> } />
                                            </Routes>
                                        </PostLogin>
                                    </Route>
                                </div>
                                <Route path='/partner/:path?' >
                                    <GeneralUser>
                                        <Routes>
                                            <Route path='/partner/signup' exact element={ <ErrorBeforeLogin /> } />
                                            <Route path='/partner/signup' element={ <PartnerSignUP /> } />
                                            <Route path='/partner/confirm-signup' element={ <ConfirmationInfo /> } />
                                            <Route path='*' element={ <ErrorBeforeLogin /> } />
                                        </Routes>
                                    </GeneralUser>
                                </Route>
                            </ProfilePicture>
                        </CheckMyOffers>
                    </Routes>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    );
}

export default App;
