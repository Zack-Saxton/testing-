import React, { useState } from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { Grid } from "@material-ui/core";
import "./app.css";
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




function App() {
  //authentication token
  const [token] = useState();

  //check for authentication token

    return (
      // <>
      //   <Router>
      //     <Grid className="gridStyle">
      //       { !token ? <CustomComponents /> : <Login /> }
      //     </Grid>
      //   </Router>
      // </>
      <div className="App" id="main">
     <BrowserRouter>
           <div>
           <Appbar />
         </div>
         <div id="body">
         <Grid className="sample"></Grid>
 
 
      
         <div>
         <Switch> 
             <Route exact path='/' component={AccountOverview} />
             <Route path='/accountoverview' component={AccountOverview} />

             <Route path='/applyloan' component={ApplyLoan} />
           
             <Route path='/loandocument' component={LoanDocument} />
             <Route path='/main/loanhistory' component={LoanHistory} />
             <Route path='/makepayment' component={MakePayment} />
             <Route path='/moneyskill' component={MoneySkill} />
             <Route path='/mybranch' component={MyBranch} />
             <Route path='/myprofile' component={MyProfile} />
             <Route path='/vantageScore' component={VantageScore} />
             </Switch> 
         </div>
        
 
 
 
         </div>
         <div>
           <Footer />
         </div> 
 
         </BrowserRouter>
       </div>
    )
}

export default App;
