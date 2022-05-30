import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from "../../../contexts/ProfilePicture";
import MyBranch from "./MyBranch";
const theme = createTheme();
window.scrollTo = jest.fn();
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});
const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
					<MyBranch />
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

it("Main Content is Loaded" ,()=>{
  render(component(), { wrapper: MemoryRouter });
  let main = screen.getByTestId("main-content");
  expect(main).toBeInTheDocument();
})

it("My Branch Button is loaded" ,()=>{
  render(component(),{wrapper:MemoryRouter});
  let myBranch = screen.getByTestId("my-branch");
  expect(myBranch).toBeInTheDocument();
})

it("Find Another Branch Button is Loaded" ,()=>{
  render(component(),{wrapper:MemoryRouter});
  let anotherBranch = screen.getByTestId("branch-location");
  expect(anotherBranch).toBeInTheDocument();
})

it("Branch Map is loaded",() => {
  render(component(),{wrapper:MemoryRouter});
  let branchMap = screen.getByTestId("branch-map"); 
  expect(branchMap).toBeInTheDocument();
})
