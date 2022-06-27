
import { useFetchOffer } from "./../components/Pages/ApplyLoan/ApplyForLoanHook/useFetchOffer";
import { mockOffers } from "./../__mock__/data/SelectOffer.data";

jest.mock("./../components/Pages/ApplyLoan/ApplyForLoanHook/useFetchOffer", () => ({
  useFetchOffer: jest.fn(),
}))

export const FetchOfferWithLoading = () =>{
  useFetchOffer.mockImplementation(() => ({
    isLoading: true,
    offers: mockOffers,
  }));
}

export const FetchOfferWithoutLoading = () =>{
  useFetchOffer.mockImplementation(() => ({
    isLoading: false,
    offers: mockOffers,
  }));
}