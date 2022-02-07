import 'dotenv/config';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import PreApproved from "../Pages/CheckMyOffers/PreApproved";
import MarriedStatus from "../Pages/CheckMyOffers/MarriedStatus";
import NewUser from '../Pages/CheckMyOffers/NewUser';
import NoOffersAvailable from "../Pages/CheckMyOffers/NoOffersAvailable";
import PersonalInfo from '../Pages/CheckMyOffers/PersonalInfo';
import ReferredToBranch from "../Pages/CheckMyOffers/ReferredToBranch";
import SelectAmount from '../Pages/CheckMyOffers/SelectAmount';
import SSN from "../Pages/CheckMyOffers/SSN";
import Zipcode from '../Pages/CheckMyOffers/Zipcode';
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
                    <Route path='/customers/verification/email' component={ ValidateToken } />
                    <CheckMyOffers>
                        <ProfilePicture>
                            <Route path='/:path?' exact>
                                <GeneralUser>
                                    <Switch>
                                        <Route path='/' exact> <Redirect to="/customers/accountOverview" /> </Route>
                                        <Route path='/components' exact component={ CustomComponents } />
                                        <Route path='/login' exact component={ LoginPage } />
                                        <Route path='/register' component={ RegisterPage } />
                                        <Route path='/faq' component={ FaqBeforeLogin } />
                                        <Route path='/select-amount' component={ SelectAmount } />
                                        <Route path='/privacyStatement' component={ () => (<Disclosure URL="/privacy" />) } />
                                        <Route path='/communityGuidelines' component={ () => (<Disclosure URL="/communityGuidelines" />) } />
                                        <Route path='/termsofuse' component={ () => (<Disclosure URL="/termsOfUse" />) } />
                                        <Route path='/cac-termsofuse' component={ () => (<Disclosure URL="/cacTermsOfUse" />) } />
                                        <Route path='/licenseDisclosure' component={ () => (<Disclosure URL="/licensing" />) } />
                                        <Route path='/textingTermsOfUse' component={ () => (<Disclosure URL="/textingTermsOfUse" />) } />
                                        <Route path='/californiaResident' component={ () => (<Disclosure URL="/california" />) } />
                                        <Route path='/websiteAccessibility' component={ () => (<Disclosure URL="/websiteAccessibility" />) } />
                                        <Route path='/loan-purpose' exact component={ LoanPurpose } />
                                        <Route path='/pre-approved' exact component={PreApproved}/>
                                        <Route path='/citizenship-status' exact component={ CitizenshipStatus } />
                                        <Route path='/new-user' exact component={ NewUser } />
                                        <Route path='/existing-user' exact component={ ExistingUser } />
                                        <Route path='/employment-status' exact component={ EmploymentStatus } />
                                        <Route path='/annual-income' exact component={ AnnualIncome } />
                                        <Route path='/home-address' exact component={ HomeAddress } />
                                        <Route path='/living-place' exact component={ LivingPlace } />
                                        <Route path='/active-duty' exact component={ ActiveDuty } />
                                        <Route path='/marital-status' exact component={ MarriedStatus } />
                                        <Route path='/ssn' exact component={ SSN } />
                                        <Route path='/no-offers-available' exact component={ NoOffersAvailable } />
                                        <Route path='/referred-to-branch' exact component={ ReferredToBranch } />
                                        <Route path='/eligible-for-offers' exact component={ EligibleForOffers } />
                                        <Route path='/zipcode' exact><Zipcode /></Route>
                                        <Route path='/personal-info' exact><PersonalInfo /></Route>
                                        <Route path='*' component={ ErrorBeforeLogin } />
                                    </Switch>
                                </GeneralUser>
                            </Route>
                            <Route path='/select-amount/:amount' exact component={ SelectAmount } />
                            <div id="main" style={ { marginLeft: "240px" } }>
                                <Route path='/customers/:path?' exact>
                                    <PostLogin>
                                        <Switch>
                                            <Route path='/customers/accountOverview' exact component={ AccountOverview } />
                                            <Route path='/customers/paymentHistory' component={ PaymentHistory } />
                                            <Route path='/customers/selectOffer' component={ ApplyLoan } />
                                            <Route path='/customers/applyForLoan' component={ ApplyForLoanRedirect } />
                                            <Route path='/customers/resumeApplication' component={ ResumeApplication } />
                                            <Route path='/customers/reviewAndSign' component={ ReviewAndSign } />
                                            <Route path='/customers/finalVerification' component={ FinalVerification } />
                                            <Route path='/customers/receiveYourMoney' component={ ReceiveYourMoney } />
                                            <Route path='/customers/loanDocument' component={ LoanDocument } />
                                            <Route path='/customers/loanHistory' component={ LoanHistory } />
                                            <Route path='/customers/makePayment/:accNo?' component={ MakePayment } />
                                            <Route path='/customers/moneySkill' component={ MoneySkill } />
                                            <Route path='/customers/myBranch' component={ MyBranch } />
                                            <Route path='/customers/myProfile' component={ MyProfile } />
                                            <Route path='/customers/vantageScore' component={ VantageScore } />
                                            <Route path='/customers/faq' component={ FaqPostLogin } />
                                            <Route path='*' component={ ErrorAfterLogin } />

                                        </Switch>
                                    </PostLogin>
                                </Route>
                            </div>
                            <Route path='/partner/:path?' >
                                <GeneralUser>
                                    <Switch>
                                        <Route path='/partner/signup' exact component={ ErrorBeforeLogin } />
                                        <Route path='/partner/signup' component={ PartnerSignUP } />
                                        <Route path='/partner/confirm-signup' component={ ConfirmationInfo } />
                                        <Route path='*' component={ ErrorBeforeLogin } />
                                    </Switch>
                                </GeneralUser>
                            </Route>
                        </ProfilePicture>
                    </CheckMyOffers>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    );
}

export default App;