import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import EmploymentStatus from './index.js';
import CheckMyOffers from '../../../contexts/CheckMyOffers';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup)

test('Availability test', () => {
  const container = render(
    <BrowserRouter>
      <CheckMyOffers>
        <EmploymentStatus />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const Renting = container.getByTestId('Renting');
  expect(Renting).toBeTruthy();
  const HomeWithMortgage = container.getByTestId('HomeWithMortgage');
  expect(HomeWithMortgage).toBeTruthy();
  const HomeWithNoMortgage = container.getByTestId('HomeWithNoMortgage');
  expect(HomeWithNoMortgage).toBeTruthy();
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
        <EmploymentStatus />
      </CheckMyOffers>
    </BrowserRouter>
  );

  const Renting = container.getByTestId('Renting');
  const HomeWithMortgage = container.getByTestId('HomeWithMortgage');
  const HomeWithNoMortgage = container.getByTestId('HomeWithNoMortgage');
  const MobileHome = container.getByTestId('MobileHome');
  const LivingWithRelatives = container.getByTestId('LivingWithRelatives');
  fireEvent.click(Renting);
  expect(Renting).toHaveClass('activeBorder')
  expect(HomeWithMortgage).not.toHaveClass('activeBorder')
  expect(HomeWithNoMortgage).not.toHaveClass('activeBorder')
  expect(MobileHome).not.toHaveClass('activeBorder')
  expect(LivingWithRelatives).not.toHaveClass('activeBorder')
  const ContinueButton = container.getByTestId('cntButton');
  expect(ContinueButton.hasAttribute('disabled')).toBe(false);

});
