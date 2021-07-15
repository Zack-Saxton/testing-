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

   const Renting = container.getByTestId('Renting');
   expect(Renting).toBeTruthy();
   const HomeWithMortage = container.getByTestId('HomeWithMortage');
   expect(HomeWithMortage).toBeTruthy();
   const HomeWithNoMortage = container.getByTestId('HomeWithNoMortage');
   expect(HomeWithNoMortage).toBeTruthy();
   const MobileHome = container.getByTestId('MobileHome');
   expect(MobileHome).toBeTruthy();
   const LivingWithRelatives = container.getByTestId('LivingWithRelatives');
   expect(LivingWithRelatives).toBeTruthy();
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
  
     const Renting = container.getByTestId('Renting');
     const HomeWithMortage = container.getByTestId('HomeWithMortage');
     const HomeWithNoMortage = container.getByTestId('HomeWithNoMortage');
     const MobileHome = container.getByTestId('MobileHome');
     const LivingWithRelatives = container.getByTestId('LivingWithRelatives');
    fireEvent.click(Renting);
    expect(Renting).toHaveClass('activeBorder') 
    expect(HomeWithMortage).not.toHaveClass('activeBorder')
    expect(HomeWithNoMortage).not.toHaveClass('activeBorder') 
    expect(MobileHome).not.toHaveClass('activeBorder')
    expect(LivingWithRelatives).not.toHaveClass('activeBorder') 
    const ContinueButton = container.getByTestId('cntButton');
    expect(ContinueButton.hasAttribute('disabled')).toBe(false);
      
  });