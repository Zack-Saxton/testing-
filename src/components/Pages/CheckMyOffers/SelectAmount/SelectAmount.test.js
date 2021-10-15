import React from 'react';
import {cleanup, render} from '@testing-library/react';
import SelectAmount from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import {BrowserRouter} from 'react-router-dom';


afterEach(cleanup)



 test('Availability test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <SelectAmount />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
     const Slider = container.getByRole('slider');
     expect(Slider).toBeTruthy();
    const offerCode = container.getByTestId('offer');
    expect(offerCode).toBeTruthy();
    const offerTrigger = container.getByTestId('offerCodeTriggerText');
    expect(offerTrigger).toBeTruthy();
    const button = container.getByTestId('contButton');
    expect(button).toBeTruthy();
    const descriptionInside = container.getByTestId('descriptionInside');
    expect(descriptionInside).toBeTruthy();
    const descriptionOutside = container.getByTestId('descriptionOutside');
    expect(descriptionOutside).toBeTruthy(); 
  });

  test('Offer code test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <SelectAmount />
        </CheckMyOffers>		
     </BrowserRouter>
                                   
     ); 
  
    const Slider = container.getByRole('slider');
    expect(Slider).toBeTruthy();
    const offercode = container.getByTestId('offer');
    expect(offercode).toBeTruthy();
    const OfferTrigger = container.getByTestId('offerCodeTriggerText');
    expect(OfferTrigger).toBeTruthy();
    const Button = container.getByTestId('contButton');
    expect(Button).toBeTruthy();
    const descriptionInside = container.getByTestId('descriptionInside');
    expect(descriptionInside).toBeTruthy();
    const descriptionOutside = container.getByTestId('descriptionOutside');
    expect(descriptionOutside).toBeTruthy(); 
  });
