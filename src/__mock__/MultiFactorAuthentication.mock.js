import { useMultiFactorAuthentication } from '../hooks/useMultiFactorAuthentication';
import { mfaDetails } from "./data/MultiFactorAuthentication";

jest.mock('../hooks/useMultiFactorAuthentication', ()=>({
  useMultiFactorAuthentication: jest.fn(),
}))

export const MfaDataMock = () => {
  useMultiFactorAuthentication.mockImplementation(() => ({
    isLoading : false,
    data : mfaDetails,
  }));
}

export const MfaDataMockLoading = () => {
  useMultiFactorAuthentication.mockImplementation(() => ({
    isLoading: true,
  }));
}