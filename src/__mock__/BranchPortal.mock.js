import  { useBranchPortalHook }  from './../components/Pages/EmailVerification/BranchPortalTest/useBranchPortalHook';
import { mockDataBranchPortal } from "./data/BranchPortalData";


jest.mock("./../components/Pages/EmailVerification/BranchPortalTest/useBranchPortalHook", () => ({
  useBranchPortalHook: jest.fn(),
}))
export const BranchPortalMock = () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false,
    verificationData: mockDataBranchPortal,
  }));
}

export const BranchPortalMockWithoutData = () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: false    
  }));
}

export const BranchPortalMockIsLoading = () => {
  useBranchPortalHook.mockImplementation(() => ({
    isLoading: true,   
  }));
}

