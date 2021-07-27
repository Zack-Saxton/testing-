import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import Zipcode from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


 afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <Zipcode />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 
 
   const ZipcodeField = container.getByTestId('zipcode');
   expect(ZipcodeField).toBeTruthy();
   expect(ZipcodeField.value).toBe('');
   const City = container.getByTestId('city');
   expect(City).toBeTruthy();
   expect(City.value).toBe('');
   const streetAddress = container.getByTestId('streetAddress');
   expect(streetAddress).toBeTruthy();
   expect(streetAddress.value).toBe('');
   const state = container.getByTestId('state');
   expect(state).toBeTruthy();
   expect(state.value).toBe('');

 });

 test('Button initially disabled', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <Zipcode />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const input = container.getByTestId('homeAddressCntBtn');
    expect(input).toBeTruthy();
    // expect(input.value).toBe('');
    expect(input.hasAttribute('disabled')).toBe(false);
 
  });

  test('input validation test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <Zipcode />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const button = container.getByTestId('homeAddressCntBtn');
    const input = container.getByTestId('zipcode');
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe('12345');
    const City = container.getByTestId('city');
    fireEvent.change(City, { target: { value: "cityName" } });
    expect(City.value).toBe('cityName');
    const streetAddress = container.getByTestId('streetAddress');
    fireEvent.change(streetAddress, { target: { value: "cityName" } });
    expect(streetAddress.value).toBe('cityName');
    const state = container.getByTestId('state');
    fireEvent.change(state, { target: { value: "cityName" } });
    expect(state.value).toBe('cityName');
    expect(button.hasAttribute('disabled')).toBe(false);
 
  });

 
