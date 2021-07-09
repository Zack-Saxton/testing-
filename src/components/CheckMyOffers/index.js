import Header from '../Layout/NormalHeader/NormalHeader';
import Footer from '../Layout/NormalFooter/NormalFooter';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './checkMyOffer.css';
import SelectAmount from './SelectAmount/index';

function Zipcode() {
    return(
        <div>
            
            <Header />
            
            <BrowserRouter>
  
            <Switch> 
            {/* <Route exact path='/' component={AccountOverview} /> */}
            <Route path='/select' component={SelectAmount} />

            {/* <Route path='/checkmyoffer' component={CheckMyOffers} /> */}
    
            </Switch>


        </BrowserRouter>
            <Footer />
        </div>
    );
}

export default Zipcode;