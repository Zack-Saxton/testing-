import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Zipcode from './index.js';
import CheckMyOffers from '../../../../contexts/CheckMyOffers';
import {BrowserRouter} from 'react-router-dom';


afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <Zipcode />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 
 
   const input = container.getByTestId('zipcode');
   expect(input).toBeTruthy();
   expect(input.value).toBe('');
   expect(input.hasAttribute('name')).toBe(true);

 });

 test('Button initially disabled', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <Zipcode />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const input = container.getByTestId('zipcodeButton');
    expect(input).toBeTruthy();
    // expect(input.value).toBe('');
    expect(input.hasAttribute('disabled')).toBe(true);
 
  });

  test('input validation test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <Zipcode />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const button = container.getByTestId('zipcodeButton');
    const input = container.getByTestId('zipcode');
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: "12345" } });
    expect(input.value).toBe('12345');
    expect(button.hasAttribute('disabled')).toBe(false);
 
  });

 
