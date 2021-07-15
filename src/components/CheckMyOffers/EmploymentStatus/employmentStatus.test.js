import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import { toHaveClass, not } from '@testing-library/jest-dom'
import EmploymenmtStatus from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


 afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <EmploymenmtStatus />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 

   const Hourly = container.getByTestId('Hourly');
   expect(Hourly).toBeTruthy();
   const Salary = container.getByTestId('Salary');
   expect(Salary).toBeTruthy();
   const selfEmployed = container.getByTestId('selfEmployed');
   expect(selfEmployed).toBeTruthy();
   const Unemployed = container.getByTestId('Unemployed');
   expect(Unemployed).toBeTruthy();
   const Retired = container.getByTestId('Retired');
   expect(Retired).toBeTruthy();
   const ContinueButton = container.getByTestId('cntButton');
   expect(ContinueButton).toBeTruthy();
   expect(ContinueButton.hasAttribute('disabled')).toBe(true);

   
 });

 test('Availability test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <EmploymenmtStatus />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const Hourly = container.getByTestId('Hourly');
    const Salary = container.getByTestId('Salary');
    const selfEmployed = container.getByTestId('selfEmployed');
    const Unemployed = container.getByTestId('Unemployed');
    const Retired = container.getByTestId('Retired');
    fireEvent.click(Hourly);
    expect(Hourly).toHaveClass('activeBorder') 
    expect(Salary).not.toHaveClass('activeBorder')
    expect(selfEmployed).not.toHaveClass('activeBorder') 
    expect(Unemployed).not.toHaveClass('activeBorder')
    expect(Retired).not.toHaveClass('activeBorder') 
    const ContinueButton = container.getByTestId('cntButton');
    expect(ContinueButton.hasAttribute('disabled')).toBe(false);
      
  });