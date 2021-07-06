import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Grid } from "@material-ui/core";
import "./app.css";
import Head from "../Layout/NormalHeader/NormalHeader";
import Foot from "../Layout/NormalFooter/NormalFooter";
import Appbar from "../Layout/AppBar/AppBar"
import Footer from "../Layout/Footer/Footer"
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


function App() {
  //authentication token
  const [token] = useState(false);

  //check for authentication token

    return (

      // <div className="App" id="main">
      //   { token ? <Main /> : <CheckMyOffers />}
      //  </div>


      <div className="App" id="main">
         <BrowserRouter>

         <Route path='/:path?' exact>
          <GeneralUser >
            <Switch>
              <Route path='/' exact > <Redirect to="/customer/accountoverview" /> </Route>
              <Route path='/components' exact component={CustomComponents} />
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
         </BrowserRouter>
       </div>
    )
}

export default App;
