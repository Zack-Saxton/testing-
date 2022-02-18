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
import SSN from "../Pages/CheckMyOffers/OneLastStep";
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
import BranchPage from "../Pages/MyBranch/BranchPage";
import StatePage from "../Pages/MyBranch/StatePage";
import BranchHeaderLayout from "../Layout/BranchLocatorLayout/BranchLocatorLayout";
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
            { componentName }
        </GeneralUser>
    );
};
const loadPostComponent = (componentName) => {
    return (
        <div id="main" style={ { marginLeft: "240px" } }>
            <PostLogin>
                { componentName }
            </PostLogin>
        </div>
    );
};
const branchHeaderComponent = (componentName) => {
    return (

            <BranchHeaderLayout>
                { componentName }
            </BranchHeaderLayout>

    );
};
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
                />
                <BrowserRouter>
                    <CheckMyOffers>
                        <ProfilePicture>
                            <Routes>
                                <Route path='/' element={ <Navigate replace to="/customers/accountOverview" /> } />
                                <Route path='/components' element={ loadGeneralUserComponent(<CustomComponents />) } />
                                <Route path='/login' element={ loadGeneralUserComponent(<LoginPage />) } />
                                <Route path='/register' element={ loadGeneralUserComponent(<RegisterPage />) } />
                                <Route path='/faq' element={ loadGeneralUserComponent(<FaqBeforeLogin />) } />
                                <Route path='/privacyStatement' element={ loadGeneralUserComponent(<Disclosure URL="/privacy" />) } />
                                <Route path='/communityGuidelines' element={ loadGeneralUserComponent(<Disclosure URL="/communityGuidelines" />) } />
                                <Route path='/termsofuse' element={ loadGeneralUserComponent(<Disclosure URL="/termsOfUse" />) } />
                                <Route path='/cac-termsofuse' element={ loadGeneralUserComponent(<Disclosure URL="/cacTermsOfUse" />) } />
                                <Route path='/licenseDisclosure' element={ loadGeneralUserComponent(<Disclosure URL="/licensing" />) } />
                                <Route path='/textingTermsOfUse' element={ loadGeneralUserComponent(<Disclosure URL="/textingTermsOfUse" />) } />
                                <Route path='/californiaResident' element={ loadGeneralUserComponent(<Disclosure URL="/california" />) } />
                                <Route path='/websiteAccessibility' element={ loadGeneralUserComponent(<Disclosure URL="/websiteAccessibility" />) } />
                                <Route path='/loan-purpose' element={ loadGeneralUserComponent(<LoanPurpose />) } />
                                <Route path='/pre-approved' element={ loadGeneralUserComponent(<PreApproved />) } />
                                <Route path='/citizenship-status' element={ loadGeneralUserComponent(<CitizenshipStatus />) } />
                                <Route path='/new-user' element={ loadGeneralUserComponent(<NewUser />) } />
                                <Route path='/existing-user' element={ loadGeneralUserComponent(<ExistingUser />) } />
                                <Route path='/employment-status' element={ loadGeneralUserComponent(<EmploymentStatus />) } />
                                <Route path='/annual-income' element={ loadGeneralUserComponent(<AnnualIncome />) } />
                                <Route path='/home-address' element={ loadGeneralUserComponent(<HomeAddress />) } />
                                <Route path='/living-place' element={ loadGeneralUserComponent(<LivingPlace />) } />
                                <Route path='/active-duty' element={ loadGeneralUserComponent(<ActiveDuty />) } />
                                <Route path='/marital-status' element={ loadGeneralUserComponent(<MarriedStatus />) } />
                                <Route path='/oneLastStep' element={ loadGeneralUserComponent(<SSN />) } />
                                <Route path='/no-offers-available' element={ loadGeneralUserComponent(<NoOffersAvailable />) } />
                                <Route path='/referred-to-branch' element={ loadGeneralUserComponent(<ReferredToBranch />) } />
                                <Route path='/eligible-for-offers' element={ loadGeneralUserComponent(<EligibleForOffers />) } />
                                <Route path='/zipcode' element={ loadGeneralUserComponent(<ZipCode />) } />
                                <Route path='/personal-info' element={ loadGeneralUserComponent(<PersonalInfo />) } />
                                <Route path='/branch/branchlocator' element={ branchHeaderComponent(<BranchLocator />) } />
                                <Route path='/branchPage' element={ branchHeaderComponent(<BranchPage />) } />
                                <Route path='/StatePage' element={ branchHeaderComponent(<StatePage />) } />
                                {/* <Route path='/branchlocator' element={ loadGeneralUserComponent(<BranchLocator />) } ></Route> */}
                                <Route path='*' element={ loadGeneralUserComponent(<ErrorBeforeLogin />) } />
                                <Route path='select-amount' element={ loadGeneralUserComponent(<SelectAmount />) } >
                                    <Route path=':amount' element={ loadGeneralUserComponent(<SelectAmount />) } />
                                </Route>
                                <Route path='customers' >
                                    <Route path='accountOverview' element={ loadPostComponent(<AccountOverview />) } />
                                    <Route path='paymentHistory' element={ loadPostComponent(<PaymentHistory />) } />
                                    <Route path='selectOffer' element={ loadPostComponent(<ApplyLoan />) } />
                                    <Route path='applyForLoan' element={ loadPostComponent(<ApplyForLoanRedirect />) } />
                                    <Route path='resumeApplication' element={ loadPostComponent(<ResumeApplication />) } />
                                    <Route path='reviewAndSign' element={ loadPostComponent(<ReviewAndSign />) } />
                                    <Route path='finalVerification' element={ loadPostComponent(<FinalVerification />) } />
                                    <Route path='receiveYourMoney' element={ loadPostComponent(<ReceiveYourMoney />) } />
                                    <Route path='loanDocument' element={ loadPostComponent(<LoanDocument />) } />
                                    <Route path='loanHistory' element={ loadPostComponent(<LoanHistory />) } />
                                    <Route path='makePayment' element={ loadPostComponent(<MakePayment />) }>
                                        <Route path=':accNo' element={ loadPostComponent(<MakePayment />) } />
                                    </Route>
                                    <Route path='moneySkill' element={ loadPostComponent(<MoneySkill />) } />
                                    <Route path='myBranch' element={ loadPostComponent(<MyBranch />) } />
                                    <Route path='myProfile' element={ loadPostComponent(<MyProfile />) } />
                                    <Route path='vantageScore' element={ loadPostComponent(<VantageScore />) } />
                                    <Route path='faq' element={ loadPostComponent(<FaqPostLogin />) } />
                                    <Route path='viewaccount' element={ loadPostComponent(<ViewAccountDetails />) } />
                                    <Route path='verification'>
                                        <Route path='email' element={ <ValidateToken /> } />
                                    </Route>
                                    <Route path='*' element={ <ErrorAfterLogin /> } />
                                </Route>
                                <Route path='partner' >
                                    <Route path='signup' element={ loadGeneralUserComponent(<ErrorBeforeLogin />) } />
                                    <Route path='signup'>
                                        <Route path='*' element={ loadGeneralUserComponent(<PartnerSignUP />) } />
                                    </Route>
                                    <Route path='confirm-signup' element={ loadGeneralUserComponent(<ConfirmationInfo />) } />
                                    <Route path='*' element={ loadGeneralUserComponent(<ErrorBeforeLogin />) } />
                                </Route>
                            </Routes>
                        </ProfilePicture>
                    </CheckMyOffers>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    );
}

export default App;
