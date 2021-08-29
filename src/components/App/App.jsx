import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import "./app.css";
import AccountOverview from "../Pages/AccountOverview/AccountOverview"
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory"
import ApplyLoan from "../Pages/ApplyLoan/SelectOffer/SelectOffer"
import ReviewAndSign from "../Pages/ApplyLoan/ReviewAndSign/ReviewAndSign"
import FinalVerification from "../Pages/ApplyLoan/FinalVerification/FinalVerification"
import ReceiveYourMoney from "../Pages/ApplyLoan/ReceiveYourMoney/ReceiveYourMoney";
import LoanHistory  from "../Pages/LoanHistory/LoanHistory"
import MakePayment from "../Pages/MakePayment/MakePayment"
import MoneySkill from "../Pages/MoneySkill/MoneySkill"
import MyBranch from "../Pages/MyBranch/MyBranch"
import MyProfile from "../Pages/MyProfile/MyProfile"
import VantageScore from "../Pages/VantageScore/VantageScore"
import LoanDocument from "../Pages/LoanDocument/LoanDocument"
import CustomComponents from "../CustomComponent";
import GeneralUser from '../Layout/General';
import PostLogin from '../Layout/Post';
import Loginpage from '../Pages/Login/Login'
import Registerpage from '../Pages/Register/Register'
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
import HomeAddress from "../Pages/CheckMyOffers/home-address";
import LivingPlace from "../Pages/CheckMyOffers/LivingPlace";
import ActiveDuty from "../Pages/CheckMyOffers/ActiveDuty";
import MarriedStatus from "../Pages/CheckMyOffers/MarriedStatus";
import SSN from "../Pages/CheckMyOffers/SSN";
import NoOffersAvailable from "../Pages/CheckMyOffers/NoOffersAvailable";
import RefferedToBranch from "../Pages/CheckMyOffers/RefferedToBranch";
import EligibleForOffers from "../Pages/CheckMyOffers/EligibleForOffer";
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);

  return (
    <div className="App"  >
      
       <BrowserRouter>
       <CheckMyOffers>
       <Route path='/:path?' exact>
        <GeneralUser >
          <Switch>
            <Route path='/' exact > <Redirect to="/customers/accountoverview" /> </Route>
            <Route path='/components' exact component={CustomComponents} />
            <Route path='/login' exact component={Loginpage}  setToken={setToken} />
            <Route path='/register'  component={Registerpage} />
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
            <Route path='/reffered-to-branch' exact component={RefferedToBranch} />  
            <Route path='/eligible-for-offers' exact component={EligibleForOffers} />  
            <Route path='/zipcode' exact >
              {/* <CheckMyOffers> */}
                <Zipcode />  
              {/* </CheckMyOffers> */}
            </Route>
            {/* <Route path='/personal-info' exact component={PersonalInfo} /> */}
            <Route path='/personal-info' exact >
              {/* <CheckMyOffers> */}
                <PersonalInfo />  
              {/* </CheckMyOffers> */}
            </Route>
          </Switch>
        </GeneralUser>
      </Route>

      <div id="main" style={{marginLeft:"73px"}}>
        <Route path='/customers/:path?' exact>
          <PostLogin>
            <Switch>
              <Route path='/customers/accountoverview' exact component={AccountOverview} />
              <Route path='/customers/paymenthistory' component={PaymentHistory} />
              <Route path='/customers/selectoffer' component={ApplyLoan} />
              <Route path='/customers/reviewandsign' component={ReviewAndSign} />
              <Route path='/customers/finalverification' component={FinalVerification} />
              <Route path='/customers/receiveyourmoney' component={ReceiveYourMoney} />
              <Route path='/customers/loandocument' component={LoanDocument} />
              <Route path='/customers/loanhistory' component={LoanHistory} />
              <Route path='/customers/makepayment' component={MakePayment} />
              <Route path='/customers/moneyskill' component={MoneySkill} />
              <Route path='/customers/mybranch' component={MyBranch} />
              <Route path='/customers/myprofile' component={MyProfile} />
              <Route path='/customers/vantageScore' component={VantageScore} />
            </Switch>
          </PostLogin>
        </Route>
        </div>
            
            </CheckMyOffers>
         </BrowserRouter>
         
       </div>
    )
}

export default App;
