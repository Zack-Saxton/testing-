import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import { toHaveClass, not } from '@testing-library/jest-dom'
import LoanPurpose from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


 afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <LoanPurpose />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 
 
   const Home = container.getByTestId('home');
   expect(Home).toBeTruthy();
   const AutoExpence = container.getByTestId('autoExpense');
   expect(AutoExpence).toBeTruthy();
   const Vacation = container.getByTestId('vacation');
   expect(Vacation).toBeTruthy();
   const Holiday = container.getByTestId('holiday');
   expect(Holiday).toBeTruthy();
   const Medical = container.getByTestId('medical');
   expect(Medical).toBeTruthy();
   const Dept = container.getByTestId('deptConsolidation');
   expect(Dept).toBeTruthy();
   const LifeEvent = container.getByTestId('lifeEvent');
   expect(LifeEvent).toBeTruthy();
   const Bills = container.getByTestId('unexpectedBills');
   expect(Bills).toBeTruthy();
   const Major = container.getByTestId('majorPurchase');
   expect(Major).toBeTruthy();
   const Others = container.getByTestId('others');
   expect(Others).toBeTruthy();
   const ContinueButton = container.getByTestId('contButton');
   expect(ContinueButton).toBeTruthy();
   expect(ContinueButton.hasAttribute('disabled')).toBe(true);

 });

 test('selection test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <LoanPurpose />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
     const Home = container.getByTestId('home');
     const AutoExpence = container.getByTestId('autoExpense');
     const Vacation = container.getByTestId('vacation');
     const Holiday = container.getByTestId('holiday');
     const Medical = container.getByTestId('medical');
     const Dept = container.getByTestId('deptConsolidation');
     const LifeEvent = container.getByTestId('lifeEvent');
     const Bills = container.getByTestId('unexpectedBills');
     const Major = container.getByTestId('majorPurchase');
     const Others = container.getByTestId('others');
    fireEvent.click(Home);
    expect(Home).toHaveClass('activeCard ') 
    expect(AutoExpence).not.toHaveClass('activeCard ')
    expect(Vacation).not.toHaveClass('activeCard ') 
    expect(Holiday).not.toHaveClass('activeCard ')
    expect(Medical).not.toHaveClass('activeCard ') 
    expect(Dept).not.toHaveClass('activeCard ')
    expect(LifeEvent).not.toHaveClass('activeCard ') 
    expect(Bills).not.toHaveClass('activeCard ')
    expect(Major).not.toHaveClass('activeCard ') 
    expect(Others).not.toHaveClass('activeCard ') 
    const ContinueButton = container.getByTestId('contButton');
    expect(ContinueButton.hasAttribute('disabled')).toBe(false);
 
  });