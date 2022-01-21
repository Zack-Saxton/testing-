import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
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
import LoginPage from '../Pages/Login/Login'
import RegisterPage from '../Pages/Register/Register'
import SelectAmount from '../Pages/CheckMyOffers/SelectAmount';
import LoanPurpose from '../Pages/CheckMyOffers/LoanPurpose';
import CitizenshipStatus from '../Pages/CheckMyOffers/CitizenshipStatus';
import Zipcode from '../Pages/CheckMyOffers/Zipcode';
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
import FaqBeforeLogin from "../Pages/Faq/FaqBeforeLogin"
import 'react-toastify/dist/ReactToastify.css';
import ValidateToken from '../Pages/ApplyLoan/Stepper/ValidateToken'
import ErrorBeforeLogin from '../Layout/ErrorBeforeLogin/ErrorBeforeLogin';
import ErrorAfterLogin from "../Layout/ErrorAfterLogin/ErrorAfterLogin"
import ApplyForLoanRedirect from "../Pages/ApplyLoan/ApplyForLoanRedirect"
import { ToastContainer } from "react-toastify";
import ProfilePicture from '../../contexts/ProfilePicture';
import { QueryClientProvider, QueryClient } from 'react-query';



const queryClient = new QueryClient();



function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <ToastContainer theme="colored" />
                <BrowserRouter>
                    <Route path='/customers/verification/email' component={ValidateToken} />
                    <CheckMyOffers>
                        <ProfilePicture>
                            <Route path='/:path?' exact>
                                <GeneralUser>
                                    <Switch>
                                        <Route path='/' exact> <Redirect to="/customers/accountOverview" /> </Route>

                                        <Route path='/components' exact component={CustomComponents} />
                                        <Route path='/login' exact component={LoginPage} />
                                        <Route path='/register' component={RegisterPage} />
                                        <Route path='/faq' component={FaqBeforeLogin} />
                                        <Route path='/select-amount' exact component={SelectAmount} />
                                        <Route path='/loan-purpose' exact component={LoanPurpose} />
                                        <Route path='/citizenship-status' exact component={CitizenshipStatus} />
                                        <Route path='/new-user' exact component={NewUser} />
                                        <Route path='/existing-user' exact component={ExistingUser} />
                                        <Route path='/employment-status' exact component={EmploymentStatus} />
                                        <Route path='/annual-income' exact component={AnnualIncome} />
                                        <Route path='/home-address' exact component={HomeAddress} />
                                        <Route path='/living-place' exact component={LivingPlace} />
                                        <Route path='/active-duty' exact component={ActiveDuty} />
                                        <Route path='/marital-status' exact component={MarriedStatus} />
                                        <Route path='/ssn' exact component={SSN} />
                                        <Route path='/no-offers-available' exact component={NoOffersAvailable} />
                                        <Route path='/referred-to-branch' exact component={ReferredToBranch} />
                                        <Route path='/eligible-for-offers' exact component={EligibleForOffers} />
                                        <Route path='/zipcode' exact><Zipcode /></Route>
                                        <Route path='/personal-info' exact><PersonalInfo /></Route>
                                        <Route path='*' component={ErrorBeforeLogin} />
                                    </Switch>
                                </GeneralUser>

                            </Route>

                            <div id="main" style={{ marginLeft: "240px" }}>
                                <Route path='/customers/:path?' exact>
                                    <PostLogin>
                                        <Switch>
                                            <Route path='/customers/accountOverview' exact component={AccountOverview} />
                                            {/* <Route path='/customers/verification/email' component={ValidateToken}/> */}
                                            <Route path='/customers/paymentHistory' component={PaymentHistory} />
                                            <Route path='/customers/selectOffer' component={ApplyLoan} />
                                            <Route path='/customers/applyForLoan' component={ApplyForLoanRedirect} />
                                            <Route path='/customers/reviewAndSign' component={ReviewAndSign} />
                                            <Route path='/customers/finalVerification' component={FinalVerification} />
                                            <Route path='/customers/receiveYourMoney' component={ReceiveYourMoney} />
                                            <Route path='/customers/loanDocument' component={LoanDocument} />
                                            <Route path='/customers/loanHistory' component={LoanHistory} />
                                            <Route path='/customers/makePayment/:accNo?' component={MakePayment} />
                                            <Route path='/customers/moneySkill' component={MoneySkill} />
                                            <Route path='/customers/myBranch' component={MyBranch} />
                                            <Route path='/customers/myProfile' component={MyProfile} />
                                            <Route path='/customers/vantageScore' component={VantageScore} />
                                            <Route path='/customers/faq' component={FaqPostLogin} />
                                            <Route path='*' component={ErrorAfterLogin} />

                                        </Switch>
                                    </PostLogin>
                                </Route>
                            </div>


                            <Route path='/partner/:path?' >
                                <GeneralUser>
                                    <Switch>
                                        <Route path='/partner/signup' exact component={ErrorBeforeLogin} />
                                        <Route path='/partner/signup' component={PartnerSignUP} />
                                        <Route path='/partner/confirm-signup' component={ConfirmationInfo} />
                                        <Route path='*' component={ErrorBeforeLogin} />

                                    </Switch>
                                </GeneralUser>
                            </Route>


                        </ProfilePicture>
                    </CheckMyOffers>
                </BrowserRouter>




            </div>
        </QueryClientProvider>
    )
}

export default App;
