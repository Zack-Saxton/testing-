import { useUSHolidayList } from "../components/Pages/BranchLocator/useYearHolidays";
import { holidays } from "../__mock__/data/YearHolidays.data";

jest.mock("../components/Pages/BranchLocator/YearHolidays", ()=>({
  useUSHolidayList: jest.fn(),
}))

export const YearHolidaysMock = () =>{
  useUSHolidayList.mockImplementation(() => ({
		result: holidays,
	}));
}