import { useMultiFactorAuthentication } from "../components/Pages/MultiFactorAuthentication/useMultiFactorAuthentication";
import { mfaDetails } from "./data/MultiFactorAuthentication";

jest.mock("../components/Pages/MultiFactorAuthentication/useMultiFactorAuthentication", ()=>({
  useMultiFactorAuthentication: jest.fn(),
}))

export const MfaDataMock = () => {
  useMultiFactorAuthentication.mockImplementation(() => ({
    loading_mfaData : false,
    mfaInfo : mfaDetails,
  }));
}

export const MfaDataMockLoading = () => {
  useMultiFactorAuthentication.mockImplementation(() => ({
    loading_mfaData: true,
  }));
}