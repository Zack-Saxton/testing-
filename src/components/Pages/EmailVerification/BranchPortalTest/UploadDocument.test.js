import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import UploadDocument from '../UploadDocument';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});
const theme = createTheme();
window.scrollTo = jest.fn();

let file;
beforeEach(() => {
  file = new File(["profile_image"], "Card/JCB.png", { type: "image/png" });
});
let fileFormat;
beforeEach(() => {
  fileFormat = new File(["profile_image"], "Card/JCB.pngs", { type: "image/png" });
});

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>					
					<UploadDocument
					title="Upload Document"
          applicationNumber={"7001-0000016058"}
          customerEmail={"mariner@mariner.com"}
          documentType="proof_of_income" />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Check can able to choose upload type" , async () => {
  render(component());
  const button = screen.getByTestId('render_selectDocument'); 

 act(() => {
 fireEvent.click(button)
});
 expect(await screen.findByText(`Select from Existing Files`, { exact: false })).toBeVisible();

 act(() => {
 fireEvent.click(button)
});
 expect(await screen.findByText(`Upload from Camera`, { exact: false })).toBeVisible();

});


test("Check can able to capture in camera" , async () => {
  render(component());
  const button = screen.getByTestId('render_selectDocument'); 
  act(() => {
 fireEvent.click(button)
});
 expect(await screen.findByText(`Upload from Camera`, { exact: false })).toBeVisible();
 const uploadButton =  screen.getByTestId("render_uploadFromCamera")

 act(() => {
  fireEvent.click(uploadButton)
 });
  expect(await screen.findByText(`Capture Photo`, { exact: false, showCamera : true })).toBeVisible(); 

});

test("Verify upload through camera", async () => {
	
	render(component());	
	const button2 = screen.getByTestId("render_selectDocument");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleMenuClose");
	fireEvent.click(button3)


	 const uploader = screen.getByTestId("selectFile");
	fireEvent.click(uploader,{ files: [file] });
	await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      }),
  );
	
	let image = document.getElementById("selectFile");
	// check if the file is there
	expect(image.files[0].name).toBe("Card/JCB.png");
	expect(image.files.length).toBe(1);

	const uploadNewButton = screen.getByTestId('render_uploadFromCamera');
	fireEvent.click(uploadNewButton); 

	await act(() => {
		fireEvent.click(uploadNewButton); 
		
	});
	const capture = screen.getByTestId('capture');	
	await act(() => {
		fireEvent.click(capture); 
		
	});
});


test("Check empty image", async () => {
	
	render(component());
	const button2 = screen.getByTestId("render_selectDocument");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleMenuClose");
	fireEvent.click(button3)
	 const uploader = screen.getByTestId("selectFile");
	fireEvent.click(uploader,{ fileFormat: fileFormat });
	await waitFor(() =>
      fireEvent.change(uploader, {
        target: { fileFormat: fileFormat },
      }),
  );	
	await waitFor(() => expect(screen.findByText("Please upload file having extensions .jpeg .jpg .png .pdf only. ")).toBeTruthy())
	
});


test("Check upload " , async () => {
  render(component());
  const button = screen.getByTestId('render_nextButton'); 
	const button2 = screen.getByTestId("render_selectDocument");
  expect(button2).toBeTruthy();
	fireEvent.click(button2, { button: true });
	const button3 = screen.getByTestId("handleMenuClose");
	fireEvent.click(button3)
	 const uploader = screen.getByTestId("selectFile");
	fireEvent.click(uploader,{ files: [file] });
	await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      }),
  );

 act(() => {
 fireEvent.click(button)
});
});