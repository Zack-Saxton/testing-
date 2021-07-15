import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import { toHaveClass, not } from '@testing-library/jest-dom'
import SelecAmount from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';


 afterEach(cleanup)



 test('Availability test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <SelecAmount />
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

  test('Offer code test', () => {
    const container = render(	
     <BrowserRouter>
          <CheckMyOffers>
            <SelecAmount />
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