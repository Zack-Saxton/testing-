import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import CitizenshipStatus from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import {BrowserRouter} from 'react-router-dom';


afterEach(cleanup)



 test('Availability test', () => {
   const container = render(	
    <BrowserRouter>
         <CheckMyOffers>
           <CitizenshipStatus />
       </CheckMyOffers>		
    </BrowserRouter>
      							
    ); 
 
   const USCitizen = container.getByTestId('usCitizen');
   expect(USCitizen).toBeTruthy();
   const PermanentResident = container.getByTestId('permanentResident');
   expect(PermanentResident).toBeTruthy();
   const ForeignResident = container.getByTestId('foreignResident');
   expect(ForeignResident).toBeTruthy();
   const ContinueButton = container.getByTestId('citizenshipContButton');
   expect(ContinueButton).toBeTruthy();
   expect(ContinueButton.hasAttribute('disabled')).toBe(true);

 });

 test('Availability test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <CitizenshipStatus />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const USCitizen = container.getByTestId('usCitizen');
    const PermanentResident = container.getByTestId('permanentResident');
    const ForeignResident = container.getByTestId('foreignResident');
    expect(USCitizen).toBeTruthy();
    fireEvent.click(USCitizen);
    expect(USCitizen).toHaveClass('activeBorder') 
    expect(PermanentResident).not.toHaveClass('activeBorder')
    expect(ForeignResident).not.toHaveClass('activeBorder') 
    const ContinueButton = container.getByTestId('citizenshipContButton');
    expect(ContinueButton.hasAttribute('disabled')).toBe(false);
 
  });