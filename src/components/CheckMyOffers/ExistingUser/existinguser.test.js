import React from 'react';
import {render, cleanup, fireEvent, within } from '@testing-library/react';
import AnnualIncome from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import '@testing-library/jest-dom';


 afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <AnnualIncome />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 
 
    const Password = container.getByTestId('password');
    expect(Password).toBeTruthy();
  
    const button = container.getByTestId('contButton');
    expect(button).toBeTruthy();


 });


 