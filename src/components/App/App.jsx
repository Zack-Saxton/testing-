import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import "./app.css";
import AccountOverview from "../Pages/AccountOverview/AccountOverview"
import ApplyLoan from "../Pages/ApplyLoan/ApplyLoan"
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
import SelectAmount from '../CheckMyOffers/SelectAmount';
import LoanPurpose from '../CheckMyOffers/LoanPurpose';
import CitizenshipStatus from '../CheckMyOffers/CitizenshipStatus';
import Zipcode from '../CheckMyOffers/Zipcode';
import PersonalInfo from '../CheckMyOffers/PersonalInfo';
import NewUser from '../CheckMyOffers/NewUser';
import ExistingUser from "../CheckMyOffers/ExistingUser";
import CheckMyOffers from '../../contexts/CheckMyOffers';
import EnploymentStatus from '../CheckMyOffers/EnploymentStatus';
import AnnualIncome from '../CheckMyOffers/AnnualIncome';
import HomeAddress from "../CheckMyOffers/home-address";
import LivingPlace from "../CheckMyOffers/LivingPlace";
import ActiveDuty from "../CheckMyOffers/ActiveDuty";
import MarriedStatus from "../CheckMyOffers/MarriedStatus";
import SSN from "../CheckMyOffers/SSN";

function App() {

  //check for authentication token

    return (

      // <div className="App" id="main">
      //   { token ? <Main /> : <CheckMyOffers />}
      //  </div>


      <div className="App" id="main">
        
         <BrowserRouter>
         <CheckMyOffers>
         <Route path='/:path?' exact>
          <GeneralUser >
            <Switch>
              <Route path='/' exact > <Redirect to="/login" /> </Route>
              <Route path='/components' exact component={CustomComponents} />
              <Route path='/login' exact component={Loginpage} />
              <Route path='/register'  component={Registerpage} />
              <Route path='/select-amount' exact component={SelectAmount} />
              <Route path='/loan-purpose' exact component={LoanPurpose} />
              <Route path='/citizenship-status' exact component={CitizenshipStatus} />
              <Route path='/new-user' exact component={NewUser} />
              <Route path='/existing-user' exact component={ExistingUser} />
              <Route path='/employment-status' exact component={EnploymentStatus} />
              <Route path='/annual-income' exact component={AnnualIncome} />   
              <Route path='/home-address' exact component={HomeAddress} />     
              <Route path='/living-place' exact component={LivingPlace} /> 
              <Route path='/active-duty' exact component={ActiveDuty} />       
              <Route path='/marital-status' exact component={MarriedStatus} /> 
              <Route path='/ssn' exact component={SSN} />  
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

        <Route path='/customer/:path?' exact>
          <PostLogin>
            <Switch>
              <Route path='/customer/accountoverview' exact component={AccountOverview} />
              <Route path='/customer/applyloan' component={ApplyLoan} />
              <Route path='/customer/loandocument' component={LoanDocument} />
              <Route path='/customer/loanhistory' component={LoanHistory} />
              <Route path='/customer/makepayment' component={MakePayment} />
              <Route path='/customer/moneyskill' component={MoneySkill} />
              <Route path='/customer/mybranch' component={MyBranch} />
              <Route path='/customer/myprofile' component={MyProfile} />
              <Route path='/customer/vantageScore' component={VantageScore} />
            </Switch>
          </PostLogin>

        </Route>
            {/* <Switch>
                <Route path='/main'> <Main /> </Route>
                <Route path='/check'> <Home /> </Route>
            </Switch> */}
            </CheckMyOffers>
         </BrowserRouter>
         
       </div>
    )
}

export default App;
