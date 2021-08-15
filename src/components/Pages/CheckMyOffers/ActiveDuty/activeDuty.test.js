import React from 'react';
import {render, cleanup, fireEvent, within } from '@testing-library/react';
import ActiveDuty from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import '@testing-library/jest-dom';


 afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <ActiveDuty />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 
 
    const input = container.getByTestId('ADselect');
    expect(input).toBeTruthy();
    const button = container.getByTestId('contButton');
    expect(button).toBeTruthy();


 });

 test('Button initially disabled', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <ActiveDuty />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
     fireEvent.mouseDown(document.querySelector('#mui-component-select-activeDuty'));
  
     const listbox = within(container.getByRole('listbox'));
 
     expect(listbox.getByText(/Yes/i)).toBeTruthy();
     expect(listbox.getByText(/No/i)).toBeTruthy(); 
 
  });


  test('selecting a option', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <ActiveDuty />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
     fireEvent.mouseDown(document.querySelector('#mui-component-select-activeDuty'));
  
     fireEvent.mouseDown(document.querySelector('#mui-component-select-activeDuty'));
  
     const listbox = within(container.getByRole('listbox'));
 
 
     fireEvent.click(listbox.getByText(/Yes/i));
 
     const input = container.getByTestId('ADinput');
     expect(input.value).toBe("Yes");
 
  });


 
